"use client"
import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Copy,Server } from 'lucide-react'
import { Badge,BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

interface ApiAlertProps{
  title:string,
  description:string,
  variant:"public"|"admin"
}

const TextMap:Record<ApiAlertProps["variant"],string> = {
  public:"Public",
  admin:"Admin"
}

const VariantMap:Record<ApiAlertProps["variant"],BadgeProps["variant"]> = {
  public:"secondary",
  admin:"destructive"
}



export const ApiAlert = ({title,description,variant = "public"}:ApiAlertProps) => {
  const onCopy = () => {
  navigator.clipboard.writeText(description)
  toast.success("Api Copy Successfully")
  }

  return(
    <Alert>
      <Server className="h-4 w-4"/>
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge
        variant={VariantMap[variant]}
        >{TextMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>

        <Button
        variant="outline"
        size="icon"
        className="hidden md:flex"
        onClick={onCopy}>
          <Copy className="w-4 h-4"/>
        </Button>
      </AlertDescription>
    </Alert>
  )
}