function TaskPanel({ tasks }) {
    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-xl font-semibold">Focus Tasks</h2>
            <p className="mt-1 text-sm text-slate-400">
                Keep the job search moving without losing track.
            </p>

            <div className="mt-5 space-y-3">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3"
                    >
                        <span
                            className={`h-3 w-3 rounded-full ${task.complete ? "bg-emerald-400" : "bg-slate-600"
                                }`}
                        />

                        <p className={task.complete ? "text-slate-500 line-through" : ""}>
                            {task.title}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TaskPanel
