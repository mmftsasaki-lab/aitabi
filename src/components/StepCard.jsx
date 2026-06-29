export function StepCard({ number, title, body }) {
  return (
    <article className="rounded-card border border-line bg-paper p-6 shadow-soft">
      <p className="font-serif text-4xl text-rose">{number}</p>
      <h3 className="mt-5 font-serif text-2xl text-espresso">{title}</h3>
      <p className="mt-3 leading-7 text-ink">{body}</p>
    </article>
  );
}
