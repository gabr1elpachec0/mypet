import Link from "next/link";
import { Button } from "./ui/button";
import { CatIcon, DogIcon, LogIn, UserPlus2Icon } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";

export default function Navbar() {
  return (
    <header className="flex flex-1 justify-between items-center">
      <div className="flex gap-2">
        <Button variant={'link'}>
          <Link href={'/'}>
            MyPet
          </Link>
        </Button>
        <Button variant={'ghost'}>
          <Link href={'/pets'}>
            Meus Pets
          </Link>
        </Button>
        <Button variant={'ghost'}>
          <Link href={'/'}>
            Blog
          </Link>
        </Button>
        <Button variant={'ghost'}>
          <Link href={'/'}>
            Doações
          </Link>
        </Button>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
        <Button variant={'outline'} className="flex gap-2 items-center">
          <Link href={'/login'}>
            Entrar
          </Link>
          <LogIn className="w-4 h-4" />
        </Button>
        <Button variant={'default'} className="flex gap-2 items-center">
          <Link href={'/users/register'}>
            Criar Conta
          </Link>
          <UserPlus2Icon className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}