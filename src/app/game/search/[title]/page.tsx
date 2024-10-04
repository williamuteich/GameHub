import { GameProps } from "@/utils/types/game";
import { Container } from "@/components/container";
import { Search as SearchComponent } from "@/components/search";
import { GameCards } from "@/components/gameCards";

async function getData(title: string) {
    try{
        const decodeTitle = decodeURI(title)
        console.log("aquiiii", decodeTitle)
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`)
        return res.json();
    }catch(error){
        console.error('Erro ao fazer requisição', error)
        return [];
    }
}



export default async function Search({params: {title}} : {params: {title: string}}){
    const games: GameProps[]  = await getData(title);

    console.log(games)
    return(
        <main className="w-full text-black">
            <Container>
                <SearchComponent/>
                <h1 className="font-bold text-xl mt-8 mb-5">Resultado Encontrado:</h1>

                {!games && (
                    <div>
                        <p>Jogo não encontrado</p>
                    </div>
                )}

                <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {games && games.map((item) => (
                        <GameCards key={item.id} data={item} />
                    ))}
                </section>
            </Container>
        </main>
    )
}