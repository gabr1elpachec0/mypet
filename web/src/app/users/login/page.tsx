"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import LoginForm from "./components/LoginForm";

const formSchema= z.object({
  email: z.string().email({ message: 'Endereço de email inválido.' }),
  password: z.string().nonempty({ message: 'Esse campo precisa ser preenchido' })
})

export default function Login() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const login = await api.post('/users/login', {
        email: values.email,
        password: values.password
      })
      
      toast.success('Login bem-sucedido')

      Cookies.set('token', login.data.token)
      router.push('/')
    } catch (error: any) {
      toast.error('Usuário não encontrado. Tente novamente.')
    }
  }

  return (
    <div className="flex h-screen w-screen items-center">
      <div className="flex w-[50%] justify-center">
        <h1>Sobre a plataforma MyPet</h1>
      </div>
      <div className="flex w-[50%] justify-center">
        <div className="flex w-[75%] items-center">
          <div className="w-full">
            <LoginForm form={form} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}