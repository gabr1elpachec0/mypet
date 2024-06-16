"use client"

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import Cookies from 'js-cookie'

export default function Pets() {
  const [pets, setPets] = useState([])

  const cookie = document.cookie
  console.log(cookie)
  
  const getPets = async () => {
    try {
      await api.get('/pets').then((response) => setPets(response.data))
    } catch (error) {
      toast.error('Erro ao obter pets')
    }
  }

  return (
    <div className="max-w-6xl m-auto mt-12">
      <h1>Pets</h1>
    </div>
  )
}