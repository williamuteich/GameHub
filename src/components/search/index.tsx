"use client"

import { FormEvent, useState } from "react"
import { BsSearch } from 'react-icons/bs'
import { useRouter } from "next/navigation"

export function Search() {
    const [input, setInput] = useState("")
    const router = useRouter()

    function handleSearch(e: FormEvent) {
        e.preventDefault()
        if(input === "") return

        router.push(`/game/search/${input}`)
    }

    return(
        <form 
            onSubmit={handleSearch}
            className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2"
            >
            <input type="text" 
            placeholder="Procurar Game"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="bg-slate-200 outline-none w-11/12"
            />
            <button type="submit">
                <BsSearch size={24} color="#ea580c"/>
            </button>
        </form>
    )
}