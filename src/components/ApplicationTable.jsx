function ApplicationTable({ applications, onDeleteApplication }) {
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
                            <th className="px-5 py-3 font-medium">Remote</th>
                            <th className="px-5 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.map((app) => (
                            <tr key={app.id} className="border-t border-slate-800">
                                <td className="px-5 py-4 font-medium">{app.company}</td>
                                <td className="px-5 py-4 text-slate-300">{app.role}</td>
                                <td className="px-5 py-4">
                                    <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
                                        {app.status}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-slate-400">{app.date}</td>
                                <td className="px-5 py-4 text-slate-400">
                                    {app.remote ? "Yes" : "No"}
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
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default ApplicationTable
