import { useState } from "react"

function ApplicationForm({ onAddApplication }) {
    const [formData, setFormData] = useState({
        company: "",
        role: "",
        location: "",
        salary: "",
        jobUrl: "",
        notes: "",
        status: "Saved",
    })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (!formData.company || !formData.role) return

        onAddApplication(formData)

        setFormData({
            company: "",
            role: "",
            location: "",
            salary: "",
            jobUrl: "",
            notes: "",
            status: "Saved",
        })
    }

    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-xl font-semibold">Add Application</h2>

            <form
                onSubmit={handleSubmit}
                className="mt-5 flex flex-col gap-4"
            >
                <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
                />

                <input
                    type="text"
                    name="role"
                    placeholder="Role Title"
                    value={formData.role}
                    onChange={handleChange}
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location / Remote"
                    value={formData.location}
                    onChange={handleChange}
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
                />

                <input
                    type="text"
                    name="salary"
                    placeholder="Salary Range"
                    value={formData.salary}
                    onChange={handleChange}
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
                />

                <input
                    type="url"
                    name="jobUrl"
                    placeholder="Job Posting URL"
                    value={formData.jobUrl}
                    onChange={handleChange}
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
                />

                <textarea
                    name="notes"
                    placeholder="Notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
                >
                    <option>Saved</option>
                    <option>Applied</option>
                    <option>Interviewing</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                </select>

                <button
                    type="submit"
                    className="rounded-xl bg-sky-600 px-4 py-3 font-medium hover:bg-sky-500"
                >
                    Add Application
                </button>
            </form>
        </section>
    )
}

export default ApplicationForm
