/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

type Pet = {
  id: string
  name: string
  birthDate: string
  breed: string
  size: string
  gender: string
}

type Token = {
  userId: string
  userType: string
}

export default function Pets() {
  const [pets, setPets] = useState<Pet[]>([])

  const token = Cookies.get('token')
  let decodedToken: Token
  let userId: string

  if (token) {
    decodedToken = jwtDecode(token)
    userId = decodedToken.userId
  }
  
  const getPets = async () => {
    try {
      const response = await api.get(`/pets/${userId}`)
      setPets(response.data.pets)
    } catch (error) {
      toast.error('Erro ao obter pets')
    }
  }

  useEffect(() => {
    getPets()
  }, [])

  return (
    <div className="max-w-6xl m-auto mt-12">
      <h1>Pets</h1>
      {
        pets.map((pet: Pet) => (
          <p key={pet.id}>{pet.name}</p>
        ))
      }
    </div>
  )
}