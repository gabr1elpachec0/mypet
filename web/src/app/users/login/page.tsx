"use client"

import { useEffect, useState } from "react";
import { CheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";


const formSchema= z.object({
  email: z.string().email({ message: 'Endereço de email inválido.' }),
  password: z.string().nonempty({ message: 'Esse campo precisa ser preenchido' })
})

export default function Login() {
  const [token, setToken] = useState('')
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
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Entre na sua conta</CardTitle>
          <CardDescription>Entre para ter acesso aos serviços</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Seu email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Sua senha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-xs">Não possui uma conta? <Button variant={'link'} className="p-0 text-xs"><Link href={'/users/login'}>Entre aqui</Link></Button></p>
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