import { useEffect, useState } from "react"
import Header from "./components/Header"
import StatCard from "./components/StatCard"
import ApplicationTable from "./components/ApplicationTable"
import TaskPanel from "./components/TaskPanel"
import ApplicationForm from "./components/ApplicationForm"
import { applications as initialApplications, tasks } from "./data/mockData"
import { use } from "react"

function App() {
  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem("applications")

    return savedApplications
      ? JSON.parse(savedApplications)
      : initialApplications
  })

  function handleAddApplication(newApplication) {
    const application = {
      id: Date.now(),
      ...newApplication,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      remote: true,
    }

    setApplications([application, ...applications])
  }

  function handleDeleteApplication(id) {
    setApplications(applications.filter((app) => app.id !== id))
  }

  useEffect(() => {
    localStorage.setItem(
      "applications",
      JSON.stringify(applications)
    )
  }, [applications])

  const savedCount = applications.filter((app) => app.status === "Saved").length

  const appliedCount = applications.filter(
    (app) => app.status === "Applied"
  ).length

  const interviewCount = applications.filter(
    (app) => app.status === "Interviewing"
  ).length

  const offerCount = applications.filter((app) => app.status === "Offer").length

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length

  const openTaskCount = tasks.filter((task) => !task.complete).length
  
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <Header />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          <StatCard label="Total" value={applications.length} />
          <StatCard label="Saved" value={savedCount} />
          <StatCard label="Applied" value={appliedCount} />
          <StatCard label="Interviews" value={interviewCount} />
          <StatCard label="Offers" value={offerCount} />
          <StatCard label="Rejected" value={rejectedCount} />
          <StatCard label="Open Tasks" value={openTaskCount} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <ApplicationForm
              onAddApplication={handleAddApplication}
            />

            <ApplicationTable
              applications={applications}
              onDeleteApplication={handleDeleteApplication}
            />
          </div>

          <TaskPanel tasks={tasks} />
        </div>

      </section>
    </main>
  )
}

export default App
