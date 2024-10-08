import { Container } from "@/components/container";
import Image from 'next/image'
import userImg from '../../../public/user.png'
import { FaShareAlt } from "react-icons/fa";
import { FavoriteCard } from "./components/favorite";

export default function Profile() {
    return(
        <main className="w-full text-black">
            <Container>
                <section className="mt-8 mb-6 flex flex-col items-center justify-between relative gap-3 sm:flex-row">
                    <div className="w-full flex justify-center items-center gap-4 text-lg flex-col sm:flex-row sm:justify-start">
                        <Image alt="imagem perfil do usuário" src={userImg} priority={false} className="rounded-full w-56 h-56 object-cover"/>
                        <h2 className="font-bold text-2xl">William Uteich</h2>
                    </div>
                    <div className="flex justify-center items-center sm:absolute right-0 top-0 gap-3">
                        <button className="px-4 p-2 bg-gray-700 rounded-lg text-white hover:scale-105 transition-all">Configurações</button>
                        <button className="bg-gray-700 p-2 rounded-lg text-white hover:scale-105 transition-all">
                            <FaShareAlt size={24}/>
                        </button>
                    </div>
                </section>
                <section className="flex flex-wrap gap-5 w-full flex-col justify-between md:flex-row">
                    <div className="flex-grow flex-wrap">
                        <FavoriteCard/>
                    </div>
                    <div className="flex-grow flex-wrap">
                        <FavoriteCard/>
                    </div>
                    <div className="flex-grow flex-wrap">
                        <FavoriteCard/>
                    </div>
                </section>
            </Container>
        </main>
    )
}