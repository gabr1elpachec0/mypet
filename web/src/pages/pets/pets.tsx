import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Navbar } from "../../components/navbar";
import { DogIcon, PencilIcon, Trash, InfoIcon } from 'lucide-react'
import * as Popover from "@radix-ui/react-popover";

export function Pets() {
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

        <div className='flex gap-3 border-2 text-zinc-400  border-zinc-800 rounded-xl p-4 items-center justify-between mb-6'>
          <div className="text-sm flex items-center gap-3">
            <DogIcon className='w-6 h-6' />
            <div>
              <h1 className='text-zinc-300'>Mirb</h1>
              <p>21/10/2018</p>
              <a href="" className='text-orange-500'>Carteira digital</a>
            </div>
          </div>
          <div className='flex text-sm gap-10 items-center'>
            <Popover.Root>
              <Popover.Trigger>
                <button className='align-items center flex cursor-default'>
                  <InfoIcon className='w-4 h-4 hover:text-orange-500 transition-colors duration-300'/>
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content>
                  <div className='text-sm text-zinc-300 bg-zinc-900 p-2 border-2 border-zinc-800 rounded-lg mr-2 mt-6 lg:mt-4 shadow-lg'>
                    <p>Dachshund | Porte pequeno | Macho</p>
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

        <div className='flex gap-3 border-2 text-zinc-400  border-zinc-800 rounded-xl p-4 items-center justify-between'>
          <div className="text-sm flex items-center gap-3">
            <DogIcon className='w-6 h-6' />
            <div>
              <h1 className='text-zinc-300'>Molly</h1>
              <p>03/02/2022</p>
              <a href="" className='text-orange-500'>Carteira digital</a>
            </div>
          </div>
          <div className='flex text-sm gap-10 items-center'>
            <Popover.Root>
              <Popover.Trigger>
                <button className='align-items center flex cursor-default'>
                  <InfoIcon className='w-4 h-4 hover:text-orange-500 transition-colors duration-300'/>
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content>
                  <div className='text-sm text-zinc-300 bg-zinc-900 p-2 border-2 border-zinc-800 rounded-lg mr-2 mt-6 lg:mt-4 shadow-lg'>
                    <p>Dachshund | Porte pequeno | Fêmea</p>
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
      </div>
    </div>
  )
}
