import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn, UserPlus2Icon } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";

export default function Navbar() {
  return (
    <header className="flex flex-1 justify-between items-center">
      <div className="flex gap-2">
        <Button variant={'ghost'}>
          <Link href={'/pets'}>
            Meus Pets
          </Link>
        </Button>
        <Button variant={'ghost'}>
          <Link href={'/pets'}>
            Blog
          </Link>
        </Button>
        <Button variant={'ghost'}>
          <Link href={'/pets'}>
            Doações
          </Link>
        </Button>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
        <Button variant={'outline'} className="flex gap-2 items-center">
          Entrar
          <LogIn className="w-4 h-4" />
        </Button>
        <Button variant={'default'} className="flex gap-2 items-center">
          Criar Conta
          <UserPlus2Icon className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}