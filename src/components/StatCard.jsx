function StatCard({label, value }){
    return(
        <div className="rounded-2x1 border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3x1 font-bold">{value}</p>
        </div>
    )
}

export default StatCard
