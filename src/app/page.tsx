import { Container } from "@/components/container";
import { GameProps } from "@/utils/types/game";
import Link from "next/link";
import Image from "next/image";

import {BsArrowRightSquare} from 'react-icons/bs'
import { Search } from "@/components/search";
import { GameCards } from "@/components/gameCards";

async function getGameHub() {
  try{
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { next: { revalidate: 350 } })

    return res.json();
    
  } catch(error){
    console.error('Erro ao fazer requisição', error)
  }
}

async function getGamesData(){
  try{
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, {next: { revalidate: 350 }})

    return res.json();  

  }catch(error){
    console.error('Erro ao fazer requisição', error)
  }
}

export default async function Home() {

  const gameHub: GameProps = await getGameHub();
  const games: GameProps[] = await getGamesData();
  console.log(gameHub)
  return (
      <main className="w-full">
        <Container>
          <h1 className="text-center font-bold text-xl mt-8 mb-5">Jogos Exclusivos Semanalmente!</h1>
          <Link href={`/game/${gameHub.id}`}>
            <section className="w-full bg-black rounded-lg">
              <div className="w-full max-h-96 h-96 relative rounded-lg">
                <div className="absolute z-20 flex bottom-0 p-3 justify-center items-center gap-2">
                  <p className="font-bold text-x1 text-white">{gameHub.title}</p>
                  <BsArrowRightSquare size={24} color="#fff"/>
                </div>
                <Image 
                  src={`${gameHub.image_url}`} 
                  priority alt={gameHub.title} 
                  quality={100}
                  className="max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                  fill={true}
                  />
              </div>
            </section>
          </Link>
          <Search />
          <h2 className="text-lg font-bold mt-8 mb-5">Biblioteca De Jogos</h2>
          <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {games.map((item) => (
              <div key={item.id}>
                <GameCards key={item.id} data={item}/>
              </div>
            ))}
          </section>
        </Container>
      </main>
  );
}
