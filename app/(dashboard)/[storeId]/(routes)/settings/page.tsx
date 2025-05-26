import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import SettingsForm from './components/settings-form'

interface SettingsPageProps {
  params:{
    storeId:string
  }
}

const SettingPage: React.FC<SettingsPageProps> = async({params}) => {
  const { userId } = await auth();

  if(!userId){
    redirect("/sign-in")
  }

  const store = await prismadb.store.findFirst({
    where:{
      id:params.storeId,
      userId
    }
  })

  if(!store){
    redirect("/")
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 px-4 py-8 pt-6">
        <SettingsForm initialData={store}/>
      </div>
    </div>
  )
}

export default SettingPage