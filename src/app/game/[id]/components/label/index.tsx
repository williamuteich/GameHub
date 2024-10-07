interface LabelProps{
    data: string
}

export default function Label({ data }: LabelProps){
    return(
        <div className="flex-grow sm:flex-grow-0 py-1 px-3 bg-slate-200 text-black text-center rounded-lg hover:font-bold duratio-200">
            {data}
        </div>
    )
}