export function SectionTitle({ eyebrow, title, body, align = "left", className = "" }) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow ? (
        <p className="text-sm font-medium tracking-[0.22em] text-rose">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-serif text-3xl leading-tight text-espresso md:text-5xl">
        {title}
      </h2>
      {body ? <p className="mt-5 leading-8 text-ink">{body}</p> : null}
    </div>
  );
}
