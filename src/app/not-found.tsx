import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function NotFound() {
 
  return (
    <main className="flex items-center h-full p-16 bg-background text-foreground">
    <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
      <div className="max-w-md text-center">
        <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
          <span className="sr-only">Error</span>404
        </h2>
        <p className="text-2xl font-semibold md:text-3xl">Desculpe, não conseguimos encontrar essa página</p>
        <p className="mt-4 mb-8 ">Mas não se preocupe, você pode encontrar muitas outras coisas em nossa página inicial.</p>
        <Button
        asChild
        variant="default"
        >
        <Link href={"/"} rel="noopener noreferrer" >Voltar para a Página Inicial</Link>
        </Button>
      </div>
    </div>
  </main>
  );
}
