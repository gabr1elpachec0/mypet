import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Navbar } from "../../components/navbar";
import { DogIcon, PencilIcon, Trash, InfoIcon } from 'lucide-react'
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, CheckIcon } from '@radix-ui/react-icons';
import dayjs from 'dayjs';

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
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="flex gap-2 text-sm items-center mt-8 mb-6 border-2 px-5 py-3 border-zinc-800 hover:border-orange-500 transition-colors duration-300 rounded-xl text-zinc-300">
              <span>
                <PlusCircleIcon className="w-6 h-6 text-orange-500" />
              </span>
              Novo pet
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-800 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Dialog.Title className="m-0 text-[17px] font-medium text-zinc-200">
                Adicionar pet
              </Dialog.Title>
              <Dialog.Description className="text-orange-600 mt-[10px] mb-5 text-[15px] leading-normal">
                Adicione aqui as informações do seu pet
              </Dialog.Description>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label className="font-medium w-[90px] text-right text-sm text-zinc-300" htmlFor="name">
                  Nome
                </label>
                <input
                  className="text-sm text-zinc-300 border border-zinc-500 bg-zinc-800 inline-flex h-[35px] w-full flex-1 items-center justify-start rounded-lg px-[10px] text-[15px] leading-none outline-none focus:border-orange-600"
                  id="name"
                  defaultValue="Garfield"
                />
              </fieldset>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label className="w-[90px] text-right text-sm text-zinc-300" htmlFor="username">
                  Data de nascimento
                </label>
                <input
                  className="text-sm text-zinc-300 border border-zinc-500 bg-zinc-800 inline-flex h-[35px] w-full flex-1 items-center justify-start rounded-lg px-[10px] text-[15px] leading-none outline-none focus:border-orange-600"
                  id="birthday"
                  type="date"
                />
              </fieldset>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label className="w-[90px] text-right text-sm text-zinc-300" htmlFor="name">
                  Raça
                </label>
                <input
                  className="text-sm text-zinc-300 border border-zinc-500 bg-zinc-800 inline-flex h-[35px] w-full flex-1 items-center justify-start rounded-lg px-[10px] text-[15px] leading-none outline-none focus:border-orange-600"
                  id="breed"
                  defaultValue="Dachshund"
                />
              </fieldset>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label className="w-[90px] text-right text-sm text-zinc-300" htmlFor="username">
                  Porte
                </label>
                <div className="flex gap-2">
                  <input
                    className="checked:bg-orange-500"
                    id="small"
                    name="size"
                    value="Pequeno"
                    type="radio"                              
                  />
                  <label htmlFor="small" className="text-sm text-zinc-300">
                    Pequeno
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    className=""
                    id="medium"
                    name="size"
                    value="Medio"
                    type="radio"
                  />
                  <label htmlFor="medium" className="text-sm text-zinc-300">
                    Medio
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    className=""
                    id="big"
                    name="size"
                    value="Grande"
                    type="radio"
                  />
                  <label htmlFor="big" className="text-sm text-zinc-300">
                    Grande
                  </label>
                </div>
              </fieldset>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label className="w-[90px] text-right text-sm text-zinc-300" htmlFor="username">
                  Gênero
                </label>
                <div className="flex gap-2">
                  <input
                    className=""
                    id="male"
                    name="gender"
                    value="Macho"
                    type="radio"
                  />
                  <label htmlFor="male" className="text-sm text-zinc-300">
                    Macho
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    className=""
                    id="female"
                    name="gender"
                    value="Fêmea"
                    type="radio"
                  />
                  <label htmlFor="female" className="text-sm text-zinc-300">
                    Fêmea
                  </label>
                </div>
              </fieldset>
              <div className="mt-[25px] flex justify-end">
                <Dialog.Close asChild>
                  <button className="flex gap-2 text-sm items-center border-2 px-5 py-3 border-zinc-700 hover:border-orange-500 transition-colors duration-300 rounded-xl text-zinc-300">
                    Confirmar
                    <span>
                      <CheckIcon className="w-5 h-5 text-orange-600" />
                    </span>
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Close asChild>
                <button
                  className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full hover:text-orange-600 transition-colors"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
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
