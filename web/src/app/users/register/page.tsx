"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { api } from "@/lib/api"



const formSchema = z.object({
  username: z.string().min(2, {
    message: "Esse campo precisa ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({ message: "Endereço de email  inválido." }),
  password: z.string().min(6, { message: "Esse campo precisa ter pelo menos 6 caracteres." }),
  passwordVerify: z.string().min(6, { message: "Esse campo precisa ter pelo menos 6 caracteres." }),
}).refine(data => data.password === data.passwordVerify, {
  message: "As senhas não conferem",
  path: ["passwordVerify"],
})

export default function Register() {
  const router = useRouter()
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordVerify: '',
    },
  })

  const onSubmit = async (data: any) => {
    try {
      await api.post('/users/register', {
        name: data.username,
        email: data.email,
        password: data.password
      })
      
      toast.success('Cadastro bem-sucedido!')
      router.push('/')
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 409) {
          toast.error('Usuário já cadastrado.')
        }
      }
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>Cadastre-se para ter acesso aos serviços</CardDescription>
        </CardHeader>
        <Form {...control}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} />
                      </FormControl>
                      {errors.username && <FormMessage>{errors.username.message}</FormMessage>}
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Seu email" {...field} />
                      </FormControl>
                      {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Sua senha" {...field} />
                      </FormControl>
                      {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="passwordVerify"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repita a senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirme sua senha" {...field} />
                      </FormControl>
                      {errors.passwordVerify && <FormMessage>{errors.passwordVerify.message}</FormMessage>}
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm">Já possui conta? <Button variant={'link'} className="p-0"><Link href={'/users/login'}>Entre aqui</Link></Button></p>
              <Button
                type="submit"
                className="flex gap-2 items-center"
              >
                Confirmar
                <CheckIcon className="w-4 h-4" />
              </Button>              
            </CardFooter>            
          </form>
        </Form>
      </Card>
    </div>
  )
}
