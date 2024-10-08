"use client";
import { FiEdit, FiX } from "react-icons/fi";
import { useState } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Meu perfil - GameHub",
    description: "Perfil do usuário"
}

export function FavoriteCard() {
    const [input, setInput] = useState("");
    const [showInput, setShowInput] = useState(false)
    const [gameName, setGameName] = useState("")

    function handleClick(){
        setShowInput(!showInput)
        if(input !== ""){
            setGameName(input)
        }

        setInput("")
    }

    return (
        <div className="w-full bg-gray-700 p-4 h-44 text-white rounded-lg flex justify-between flex-col">
            {showInput ?(
                <div className="flex items-center justify-center gap-3">
                    <input type="text" onChange={(e) => setInput(e.target.value)} className="w-full rounded-md h-8 text-black px-2"/>
                    <button>
                        <FiX size={24} color="#fff" onClick={handleClick}/>
                    </button>
                </div>
            ) : (
                <button onClick={handleClick} className="self-start hover:scale-110 duration-200 transition-all">
                    <FiEdit size={24} color="#fff" />
                </button>
            )}
           
           {gameName ?(
            <div>
                <span className="text-white">Jogo Favorito:</span>
                <p className="font-bold text-white">{gameName}</p>
            </div>
           ): (
            <p className="font-bold text-white">Adicionar Game</p>
           )}
            
        </div>
    );
}
