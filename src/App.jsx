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

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "All" || app.status === statusFilter

    return matchesSearch && matchesStatus
  })
  
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

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="text-xl font-semibold">Search & Filter</h2>

              <div className="mt-4 grid gap-4 md:grid-cols-[2fr_1fr]">
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
              </div>
            </div>

            <ApplicationTable
              applications={filteredApplications}
              onDeleteApplication={handleDeleteApplication}
              onUpdateApplicationStatus={handleUpdateApplicationStatus}
              onUpdateApplicationNotes={handleUpdateApplicationNotes}
            />
          </div>

          <TaskPanel 
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>

      </section>
    </main>
  )
}

export default App
