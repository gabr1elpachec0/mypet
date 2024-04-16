import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Navbar } from "../../components/navbar";
import { DogIcon, PencilIcon, Trash, InfoIcon } from 'lucide-react'
import * as Popover from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

import dayjs from 'dayjs'

type Pets = {
  name: string;
  birthDate: Date;
  breed: string;
  size: string;
  gender: string;
}

export function Pets() {
  const [pets, setPets] = useState<Pets[]>([])

  useEffect(() => {
    api.get('/pets').then(response => {
      setPets(response.data)
    })
  }, [])

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <button className="flex gap-2 text-sm items-center mt-8 mb-6 border-2 px-5 py-3 border-zinc-800 hover:border-orange-500 transition-colors duration-300 rounded-xl text-zinc-300">
          <span>
            <PlusCircleIcon className="w-6 h-6 text-orange-500" />
          </span>
          Novo pet
        </button>

        {
          pets.map(pet => {
            return (
              <div className='flex gap-3 border-2 text-zinc-400  border-zinc-800 rounded-xl p-4 items-center justify-between mb-6'>
                <div className="text-sm flex items-center gap-3">
                  <DogIcon className='w-6 h-6' />
                  <div>
                    <h1 className='text-zinc-300'>{pet.name}</h1>
                    <p>{dayjs(pet.birthDate).format('DD/MM/YYYY')}</p>
                    <a href="#" className='text-orange-500'>Carteira digital</a>
                  </div>
                </div>
                <div className='flex text-sm gap-10 items-center'>
                  <Popover.Root>
                    <Popover.Trigger>
                      <button className='align-items center flex cursor-pointer'>
                        <InfoIcon className='w-4 h-4 hover:text-orange-500 transition-colors duration-300'/>
                      </button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content>
                        <div className='text-sm text-zinc-300 bg-zinc-900 p-2 border-2 border-zinc-800 rounded-lg mr-2 mt-6 lg:mt-4 shadow-lg'>
                          <p>{pet.breed} | Porte {pet.size} | {pet.gender}</p>
                        </div>            
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                  <div className='flex gap-4'>
                    <a href="">
                      <PencilIcon className='w-4 h-4 hover:text-orange-500 transition-colors duration-300'/>
                    </a>
                    <a href="">
                      <Trash className='w-4 h-4 hover:text-orange-500 transition-colors duration-300'/>
                    </a>
                  </div>                       
                </div>
              </div> 
            )
          })
        }  
      </div>
    </div>
  )
}
