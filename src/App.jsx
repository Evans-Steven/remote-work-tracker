import { useEffect, useState } from "react"
import Header from "./components/Header"
import StatCard from "./components/StatCard"
import ApplicationTable from "./components/ApplicationTable"
import TaskPanel from "./components/TaskPanel"
import ApplicationForm from "./components/ApplicationForm"
import { applications as initialApplications,
         tasks as initialTasks, 
        } from "./data/mockData"

function App() {
  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem("applications")

    return savedApplications
      ? JSON.parse(savedApplications)
      : initialApplications
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")

    return savedTasks ? JSON.parse(savedTasks) : initialTasks
  })

  const [sortOption, setSortOption] = useState("newest")

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

  function handleUpdateApplicationStatus(id, newStatus) {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    )
  }

  function handleUpdateApplicationNotes(id, updatedNotes) {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, notes: updatedNotes } : app
      )
    )
  }

  function handleToggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, complete: !task.complete }
          : task
      )
    )
  }

  function handleAddTask(title) {
    const newTask = {
      id: Date.now(),
      title,
      complete: false,
    }

    setTasks([newTask, ...tasks])
  }

  function handleEditTask(id, updatedTitle) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: updatedTitle } : task
      )
    )
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function handleExportApplications() {
    const headers = [
      "Company",
      "Role",
      "Status",
      "Date",
      "Location",
      "Salary",
      "Job URL",
      "Notes",
    ]

    const rows = applications.map((app) => [
      app.company,
      app.role,
      app.status,
      app.date,
      app.location || "",
      app.salary || "",
      app.jobUrl || "",
      app.notes || "",
    ])

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n")

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.download = "career-command-center-applications.csv"
    link.click()

    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    localStorage.setItem(
      "applications",
      JSON.stringify(applications)
    )
  }, [applications])

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    )
  }, [tasks])

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

  const upcomingInterviewCount = applications.filter(
    (app) => app.interviewDate
  ).length

  const interviewRate =
    applications.length > 0
      ? Math.round((interviewCount / applications.length) * 100)
      : 0

  const offerRate =
    applications.length > 0
      ? Math.round((offerCount / applications.length) * 100)
      : 0

  const filteredApplications = applications
    .filter((app) => {
      const matchesSearch =
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.role.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === "All" || app.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortOption === "newest") {
        return b.id - a.id
      }

      if (sortOption === "oldest") {
        return a.id - b.id
      }

      if (sortOption === "company-az") {
        return a.company.localeCompare(b.company)
      }

      if (sortOption === "company-za") {
        return b.company.localeCompare(a.company)
      }

      if (sortOption === "status") {
        return a.status.localeCompare(b.status)
      }

      return 0
    })
  
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <Header />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          <StatCard
            label="Total"
            value={applications.length}
            onClick={() => setStatusFilter("All")}
            active={statusFilter === "All"}
          />

          <StatCard
            label="Saved"
            value={savedCount}
            onClick={() => setStatusFilter("Saved")}
            active={statusFilter === "Saved"}
          />

          <StatCard
            label="Applied"
            value={appliedCount}
            onClick={() => setStatusFilter("Applied")}
            active={statusFilter === "Applied"}
          />

          <StatCard
            label="Interviews"
            value={interviewCount}
            onClick={() => setStatusFilter("Interviewing")}
            active={statusFilter === "Interviewing"}
          />

          <StatCard
            label="Offers"
            value={offerCount}
            onClick={() => setStatusFilter("Offer")}
            active={statusFilter === "Offer"}
          />

          <StatCard
            label="Rejected"
            value={rejectedCount}
            onClick={() => setStatusFilter("Rejected")}
            active={statusFilter === "Rejected"}
          />

          <StatCard label="Open Tasks" value={openTaskCount} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">Search & Filter</h2>

                <button
                  type="button"
                  onClick={handleExportApplications}
                  className="rounded-lg border border-emerald-500/30 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-500/10"
                >
                  Export CSV
                </button>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
                <input
                  type="text"
                  placeholder="Search company or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
                >
                  <option>All</option>
                  <option>Saved</option>
                  <option>Applied</option>
                  <option>Interviewing</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="company-az">Company A-Z</option>
                  <option value="company-za">Company Z-A</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>

            <ApplicationTable
              applications={filteredApplications}
              onDeleteApplication={handleDeleteApplication}
              onUpdateApplicationStatus={handleUpdateApplicationStatus}
              onUpdateApplicationNotes={handleUpdateApplicationNotes}
            />

            <ApplicationForm
              onAddApplication={handleAddApplication}
            />
            
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="text-lg font-semibold">Career Analytics</h2>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">Interview Rate</p>
                  <p className="text-lg font-bold">{interviewRate}%</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">Offer Rate</p>
                  <p className="text-lg font-bold">{offerRate}%</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">Active Leads</p>
                  <p className="text-lg font-bold">
                    {savedCount + appliedCount + interviewCount}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">
                    Upcoming Interviews
                  </p>

                  <p className="text-lg font-bold">
                    {upcomingInterviewCount}
                  </p>
                </div>
              </div>
            </div>

            <TaskPanel
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>

      </section>
    </main>
  )
}

export default App
