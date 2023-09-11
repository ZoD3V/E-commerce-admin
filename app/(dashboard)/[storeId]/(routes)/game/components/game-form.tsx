"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import * as z from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { Game, Category } from "@prisma/client";
import ImageUpload from "@/components/ui/image-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SettingProps {
  initialData: Game | null;
  categoryData: Category[]
}

const formSchema = z.object({
  name: z.string().min(1),
  categoryId: z.string().min(1),
  name_dev: z.string().min(1),
  desc: z.string().min(1),
  imgUrl: z.string().min(1),
});

type GameFormValues = z.infer<typeof formSchema>;

const GameForm: React.FC<SettingProps> = ({ initialData,categoryData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit a Game" : "Create Game";
  const description = initialData ? "Edit a Game" : "Add a new Game";
  const toastMsg = initialData ? "Game Updated" : "Game Created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<GameFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      categoryId: "",
      name_dev: "",
      desc: "",
      imgUrl: "",
    },
  });

  const params = useParams();
  const router = useRouter();

  const onSubmit = async (data: GameFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/game/${params.gameId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/game`, data);
      }
      router.push(`/${params.storeId}/game`);
      router.refresh();
      toast.success(toastMsg);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/game/${params.gameId}`);
      router.refresh();
      router.push(`/${params.storeId}/game`);
      toast.success("Game deleted");
    } catch (error) {
      toast.error("Make sure you removed all categories using this Game");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
           <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={
                      field.value
                        ? [field.value]
                        : initialData?.imgUrl
                        ? [initialData?.imgUrl]
                        : []
                    }
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name Game</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a billboard" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryData.map((item) => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name_dev"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name Developer</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Name Developer Game"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default GameForm;
