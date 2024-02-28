import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Navbar } from "../../components/navbar";
import { DogIcon, PencilIcon, Trash } from 'lucide-react'

export function Pets() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <button className="flex gap-2 text-sm items-center my-8 border-2 px-5 py-3 border-zinc-800 hover:border-orange-500 transition-colors duration-300 rounded-xl text-zinc-300">
          <span>
            <PlusCircleIcon className="w-6 h-6 text-orange-500" />
          </span>
          Novo pet
        </button>

        <div className='flex gap-3 border-2 text-zinc-400  border-zinc-800 rounded-xl p-4 items-center justify-between'>
          <div className="text-sm flex items-center gap-3">
            <DogIcon className='w-6 h-6' />
            <div>
              <h1 className=' font-bold'>Mirb</h1>
              <p>21/10/2018</p>
              <a href="" className='text-orange-500'>Carteira digital</a>
            </div>
          </div>
          <div className='flex text-sm gap-10 items-center'>
            <p>Dachshund | Porte pequeno | Macho</p>
            <div className='flex gap-4'>
              <a href="">
                <PencilIcon className='w-4 h-4'/>
              </a>
              <a href="">
                <Trash className='w-4 h-4'/>
              </a>
            </div>           
            
          </div>
        </div>   

        <br />

        <div className='flex gap-3 border-2 text-zinc-400  border-zinc-800 rounded-xl p-4 items-center justify-between'>
          <div className="text-sm flex items-center gap-3">
            <DogIcon className='w-6 h-6' />
            <div>
              <h1 className=' font-bold'>Molly</h1>
              <p>03/02/2022</p>
              <a href="" className='text-orange-500'>Carteira digital</a>
            </div>
          </div>
          <div className='flex text-sm gap-10 items-center'>
            <p>Dachshund | Porte pequeno | Fêmea</p>
            <div className='flex gap-4'>
              <a href="">
                <PencilIcon className='w-4 h-4'/>
              </a>
              <a href="">
                <Trash className='w-4 h-4'/>
              </a>
            </div>           
            
          </div>
        </div>    
      </div>
    </div>
  )
}
