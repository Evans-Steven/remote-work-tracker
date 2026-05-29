import { Fragment, useState } from "react"

function ApplicationTable({
    applications,
    onDeleteApplication,
    onUpdateApplicationStatus,
    onUpdateApplicationNotes,
}) {
    const [expandedId, setExpandedId] = useState(null)

    const [editingNotesId, setEditingNotesId] = useState(null)
    const [editingNotes, setEditingNotes] = useState("")

    function toggleDetails(id) {
        setExpandedId(expandedId === id ? null : id)
    }

    function getStatusStyles(status) {
        if (status === "Saved") return "bg-slate-500/10 text-slate-300"
        if (status === "Applied") return "bg-sky-500/10 text-sky-300"
        if (status === "Interviewing") return "bg-amber-500/10 text-amber-300"
        if (status === "Offer") return "bg-emerald-500/10 text-emerald-300"
        if (status === "Rejected") return "bg-red-500/10 text-red-300"

        return "bg-slate-500/10 text-slate-300"
    }

    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 p-5">
                <h2 className="text-xl font-semibold">Job Applications</h2>
                <p className="mt-1 text-sm text-slate-400">
                    Keep track of roles, companies, dates, and current status.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950/60 text-slate-400">
                        <tr>
                            <th className="px-5 py-3 font-medium">Company</th>
                            <th className="px-5 py-3 font-medium">Role</th>
                            <th className="px-5 py-3 font-medium">Status</th>
                            <th className="px-5 py-3 font-medium">Date</th>
                            <th className="px-5 py-3 font-medium">Details</th>
                            <th className="px-5 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.map((app) => (
                            <Fragment key={app.id}>
                                <tr className="border-t border-slate-800">
                                    <td className="px-5 py-4 font-medium">{app.company}</td>
                                    <td className="px-5 py-4 text-slate-300">{app.role}</td>
                                    <td className="px-5 py-4">
                                        <select
                                            value={app.status}
                                            onChange={(e) =>
                                                onUpdateApplicationStatus(app.id, e.target.value)
                                            }
                                            className={`rounded-full border border-transparent px-3 py-1 text-xs font-medium outline-none ${getStatusStyles(
                                                app.status
                                            )}`}
                                        >
                                            <option>Saved</option>
                                            <option>Applied</option>
                                            <option>Interviewing</option>
                                            <option>Offer</option>
                                            <option>Rejected</option>
                                        </select>
                                    </td>
                                    <td className="px-5 py-4 text-slate-400">{app.date}</td>
                                    <td className="px-5 py-4">
                                        <button
                                            onClick={() => toggleDetails(app.id)}
                                            className="rounded-lg border border-sky-500/30 px-3 py-1 text-xs font-medium text-sky-300 hover:bg-sky-500/10"
                                        >
                                            {expandedId === app.id
                                                ? "▾ Hide"
                                                : "▸ Details"}
                                        </button>
                                    </td>
                                    <td className="px-5 py-4">
                                        <button
                                            onClick={() => onDeleteApplication(app.id)}
                                            className="rounded-lg border border-red-500/30 px-3 py-1 text-xs font-medium text-red-300 hover:bg-red-500/10"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>

                                {expandedId === app.id && (
                                    <tr className="border-t border-slate-800 bg-slate-950/40">
                                        <td colSpan="9" className="px-5 py-4">
                                            <div className="grid gap-4 md:grid-cols-4">
                                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                                        Location
                                                    </p>
                                                    <p className="mt-2 text-sm text-slate-300">
                                                        {app.location || "Not provided"}
                                                    </p>
                                                </div>

                                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                                        Salary
                                                    </p>
                                                    <p className="mt-2 text-sm text-slate-300">
                                                        {app.salary || "Not provided"}
                                                    </p>
                                                </div>

                                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                                        Job Link
                                                    </p>

                                                    {app.jobUrl ? (
                                                        <a
                                                            href={app.jobUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mt-2 inline-block text-sm font-medium text-sky-400 hover:text-sky-300"
                                                        >
                                                            View Posting
                                                        </a>
                                                    ) : (
                                                        <p className="mt-2 text-sm text-slate-300">Not provided</p>
                                                    )}
                                                </div>

                                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                                        Interview
                                                    </p>

                                                    <p className="mt-2 text-sm text-slate-300">
                                                        {app.interviewDate
                                                            ? `${app.interviewDate}${app.interviewTime ? ` at ${app.interviewTime}` : ""}`
                                                            : "Not scheduled"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                                <div className="flex items-center justify-between gap-4">
                                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                                        Notes
                                                    </p>

                                                    {editingNotesId !== app.id && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEditingNotesId(app.id)
                                                                setEditingNotes(app.notes || "")
                                                            }}
                                                            className="rounded-lg border border-sky-500/30 px-3 py-1 text-xs font-medium text-sky-300 hover:bg-sky-500/10"
                                                        >
                                                            Edit Notes
                                                        </button>
                                                    )}
                                                </div>

                                                {editingNotesId === app.id ? (
                                                    <div className="mt-3 space-y-3">
                                                        <textarea
                                                            value={editingNotes}
                                                            onChange={(e) => setEditingNotes(e.target.value)}
                                                            rows="4"
                                                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
                                                        />

                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    onUpdateApplicationNotes(app.id, editingNotes)
                                                                    setEditingNotesId(null)
                                                                    setEditingNotes("")
                                                                }}
                                                                className="rounded-lg border border-emerald-500/30 px-3 py-1 text-xs font-medium text-emerald-300 hover:bg-emerald-500/10"
                                                            >
                                                                Save Notes
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setEditingNotesId(null)
                                                                    setEditingNotes("")
                                                                }}
                                                                className="rounded-lg border border-slate-600 px-3 py-1 text-xs font-medium text-slate-300 hover:bg-slate-800"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="mt-3 text-sm text-slate-400">
                                                        {app.notes || "No notes added yet."}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default ApplicationTable
