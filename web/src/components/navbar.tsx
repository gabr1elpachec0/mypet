import Link from "next/link";
import { Button } from "./ui/button";
import { CatIcon, DogIcon, LogIn, UserPlus2Icon } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";

export default function Navbar() {
  return (
    <header className="flex flex-1 justify-between items-center">
      <div className="flex gap-2">
        <Link href={'/'}>
          <Button variant={'link'}>
            MyPet
          </Button>
        </Link>
        <Link href={'/pets'}>
          <Button variant={'ghost'}>
            Meus pets
          </Button>
        </Link>
        <Link href={'/blog'}>
          <Button variant={'ghost'}>
            Blog
          </Button>
        </Link>
        <Link href={'/donations'}>
          <Button variant={'ghost'}>
            Doações
          </Button>
        </Link>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
        <Link href={'/users/login'}>
          <Button variant={'outline'} className="flex gap-2 items-center">
            Entrar
            <LogIn className="w-4 h-4" />
          </Button>
        </Link>
        <Link href={'/users/register'}>
          <Button variant={'default'} className="flex gap-2 items-center">
            Criar Conta
            <UserPlus2Icon className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </header>
  )
}