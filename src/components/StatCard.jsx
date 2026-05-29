function StatCard({label, value, onClick, active }){
    return(
        <button
            type="button"
            onClick={onClick}
            className={`rounded-2xl border p-5 text-left transition ${active
                    ? "border-sky-400 bg-sky-500/10"
                    : "border-slate-800 bg-slate-900 hover:border-sky-500/30"
                }`}
        >
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        </button>
    )
}

export default StatCard
