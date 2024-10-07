import { GameProps } from "@/utils/types/game";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/container";
import Label from "./components/label";
import { GameCards } from "@/components/gameCards";

import { Metadata } from "next";

interface PropsParams{
    params: {
        id: string;
    }
}

export async function generateMetadata({ params }: PropsParams): Promise<Metadata> {
    try {
      const response: GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`, { next: { revalidate: 60 } })
        .then((res) => res.json())
        .catch(() => {
          return {
            title: "GameHub - Descubra jogos incríveis para se divertir."
          }
        })
  
      return {
        title: response.title,
        description: `${response.description.slice(0, 100)}...`,
        openGraph: {
          title: response.title,
          images: [response.image_url]
        },
        robots: {
          index: true,
          follow: true,
          nocache: true,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: true,
          }
        }
      }
  
  
  
    } catch (err) {
      return {
        title: "DalyGames - Descubra jogos incríveis para se divertir."
      }
    }
  }


async function detailsGame(id : string){
    try{
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, {cache: "no-store"})
        console.log(res)
        return res.json();
    }catch(error){
        console.error('Erro ao tentar fazer requisição')
    }
}

async function gameDay() {
    try{
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, {cache: "no-store"})
        return res.json()
    }catch(error){
        console.error('Erro ao tentar fazer requisição')
    }
}

export default async function Game({
    params: {id}
} : {
    params: {id: string}
}){
    const resP: GameProps  = await detailsGame(id);
    const gerarGame: GameProps = await gameDay()

    if(!resP ){
        redirect("/")
    }
    return(
        <main className="w-full text-black flex flex-col justify-center items-center">
            <div className="bg-black sm:h-96 h-80 w-full relative flex justify-center items-center 2xl:max-w-[1536px] 2xl:max-h-[768px]">
                <Image 
                    className="object-cover w-full h-80 sm:h-96 opacity-80  "
                    src={resP.image_url} 
                    alt={resP.title} 
                    priority={true} 
                    fill={true} 
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"/>
            </div>
                <Container>
                    <h1 className="font-bold text-x1 my-4">{resP.title}</h1>
                    <p>{resP.description}</p>

                    <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
                    <div className="flex gap-2 flex-wrap">
                        {resP.platforms.map((item) => (
                            <Label key={item} data={item}/>
                        ))}
                    </div>

                    <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
                    <div className="flex gap-2 flex-wrap">
                        {resP.categories.map((item) => (
                            <Label key={item} data={item}/>
                        ))}
                    </div>

                    <p className="mt-7 mb-2"><strong>Data de Lançamento</strong>{resP.release}</p>

                    <h2 className="font-bold text-lg mt-7 mb-2">Jogo Recomendado</h2>
                    <div className="flex">
                        <div className="flex-grow">
                            <GameCards data={gerarGame} />
                        </div>
                    </div>
                </Container>
        </main>
    )
}