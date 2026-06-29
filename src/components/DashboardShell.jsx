export function DashboardShell({ children, sidebar, title, actions }) {
  return (
    <main className="container-page grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      {sidebar ? (
        <aside className="rounded-card border border-line bg-paper p-4 shadow-soft">{sidebar}</aside>
      ) : null}
      <section className="min-w-0">
        {(title || actions) ? (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            {title ? <h1 className="font-serif text-3xl text-espresso md:text-4xl">{title}</h1> : null}
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        ) : null}
        {children}
      </section>
    </main>
  );
}

export function DashboardPanel({ children, className = "" }) {
  return (
    <div className={`rounded-card border border-line bg-paper p-5 shadow-soft ${className}`}>
      {children}
    </div>
  );
}

export function DashboardStat({ label, value, note }) {
  return (
    <div className="rounded-card border border-line bg-paper p-5">
      <p className="text-sm text-rose">{label}</p>
      <p className="mt-2 font-serif text-3xl text-espresso">{value}</p>
      {note ? <p className="mt-2 text-sm text-ink">{note}</p> : null}
    </div>
  );
}
