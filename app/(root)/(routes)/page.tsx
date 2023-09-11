"use client";
import { useEffect } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(()=>{
    if(!isOpen){
      onOpen()
    }
  },[onOpen,isOpen])
  
  return null;
};

export default SetupPage;
