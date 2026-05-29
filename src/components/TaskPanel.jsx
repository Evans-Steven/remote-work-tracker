import { useState } from "react"

function TaskPanel({
    tasks,
    onToggleTask,
    onAddTask,
    onEditTask,
    onDeleteTask,
}) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [editingTaskId, setEditingTaskId] = useState(null)
    const [editingTitle, setEditingTitle] = useState("")

    function handleSubmit(e) {
        e.preventDefault()

        if (!newTaskTitle.trim()) return

        onAddTask(newTaskTitle.trim())
        setNewTaskTitle("")
    }

    function startEditing(task) {
        setEditingTaskId(task.id)
        setEditingTitle(task.title)
    }

    function cancelEditing() {
        setEditingTaskId(null)
        setEditingTitle("")
    }

    function saveEdit(id) {
        if (!editingTitle.trim()) return

        onEditTask(id, editingTitle.trim())
        setEditingTaskId(null)
        setEditingTitle("")
    }

    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-xl font-semibold">Focus Tasks</h2>

            <p className="mt-1 text-sm text-slate-400">
                Keep the job search moving without losing track.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 flex gap-2">
                <input
                    type="text"
                    placeholder="Add a focus task..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                />

                <button
                    type="submit"
                    className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-medium hover:bg-sky-500"
                >
                    Add
                </button>
            </form>

            <div className="mt-5 space-y-3">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="rounded-xl border border-slate-800 bg-slate-950/60 p-3"
                    >
                        {editingTaskId === task.id ? (
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                                />

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => saveEdit(task.id)}
                                        className="rounded-lg border border-emerald-500/30 px-3 py-1 text-xs font-medium text-emerald-300 hover:bg-emerald-500/10"
                                    >
                                        Save
                                    </button>

                                    <button
                                        type="button"
                                        onClick={cancelEditing}
                                        className="rounded-lg border border-slate-600 px-3 py-1 text-xs font-medium text-slate-300 hover:bg-slate-800"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start justify-between gap-3">
                                <button
                                    type="button"
                                    onClick={() => onToggleTask(task.id)}
                                    className="flex flex-1 items-center gap-3 text-left"
                                >
                                    <span
                                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${task.complete
                                                ? "border-emerald-400 bg-emerald-400 text-slate-950"
                                                : "border-slate-600"
                                            }`}
                                    >
                                        {task.complete && "✓"}
                                    </span>

                                    <span
                                        className={
                                            task.complete
                                                ? "text-slate-500 line-through"
                                                : "text-slate-200"
                                        }
                                    >
                                        {task.title}
                                    </span>
                                </button>

                                <div className="flex shrink-0 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => startEditing(task)}
                                        className="rounded-lg border border-sky-500/30 px-2 py-1 text-xs font-medium text-sky-300 hover:bg-sky-500/10"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onDeleteTask(task.id)}
                                        className="rounded-lg border border-red-500/30 px-2 py-1 text-xs font-medium text-red-300 hover:bg-red-500/10"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TaskPanel
