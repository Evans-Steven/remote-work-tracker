function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-sky-400">
            Job Search Command Center
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            RemoteWork Tracker
          </h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Track remote job applications, portfolio tasks, follow-ups, and interview progress from one focused dashboard.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Applications</p>
            <p className="mt-2 text-3xl font-bold">12</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Interviews</p>
            <p className="mt-2 text-3xl font-bold">3</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Offers</p>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Open Tasks</p>
            <p className="mt-2 text-3xl font-bold">7</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
