import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Navbar } from "../../components/navbar";

export function Pets() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <button className="flex gap-2 text-sm items-center my-8 border-2 px-5 py-3 border-zinc-800 hover:border-orange-600 transition-colors duration-300 rounded-xl text-zinc-300">
          <span>
            <PlusCircleIcon className="w-6 h-6 text-orange-600" />
          </span>
          Novo pet
        </button>

        <div className="py-4 items-center text-zinc-400 text-sm">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <caption className="caption-bottom mt-8 mb-2">
                Seus pets são listados aqui.
              </caption>
              <thead className="text-zinc-400">
                <tr>
                  <th className="px-4 py-2">Nome</th>
                  <th className="px-4 py-2">Data de nascimento</th>
                  <th className="px-4 py-2">Raça</th>
                  <th className="px-4 py-2">Porte</th>
                  <th className="px-4 py-2 text-right">Editar</th>
                  <th className="px-4 py-2 text-right">Excluir</th>
                </tr>
              </thead>

              <tbody className="text-zinc-300">
                <tr className="border-t border-zinc-800">
                  <td className="px-4 py-2">Mirb</td>
                  <td className="px-4 py-2">21/10/2018</td>
                  <td className="px-4 py-2">Dachshund</td>
                  <td className="px-4 py-2">Pequeno</td>
                  <td className="px-4 py-2 text-right">
                    <a href="" className="hover:underline text-orange-500">
                      Editar
                    </a>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <a href="" className="hover:underline text-orange-500">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr className="border-t border-zinc-800">
                  <td className="px-4 py-2">Molly</td>
                  <td className="px-4 py-2">03/02/2022</td>
                  <td className="px-4 py-2">Dachshund</td>
                  <td className="px-4 py-2">Pequeno</td>
                  <td className="px-4 py-2 text-right">
                    <a href="" className="hover:underline text-orange-500">
                      Editar
                    </a>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <a href="" className="hover:underline text-orange-500">
                      Excluir
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>        
      </div>
    </div>
  )
}
