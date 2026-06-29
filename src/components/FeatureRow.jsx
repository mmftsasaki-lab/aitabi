import { Icon } from "./Icon.jsx";

export function FeatureRow({ icon = "spark", title, body, image, reverse = false }) {
  return (
    <div className={`grid items-center gap-8 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky text-teal">
          <Icon name={icon} />
        </div>
        <h3 className="mt-5 font-serif text-3xl leading-tight text-espresso">{title}</h3>
        <p className="mt-4 leading-8 text-ink">{body}</p>
      </div>
      {image ? (
        <img className="aspect-[4/3] w-full rounded-card object-cover shadow-soft" src={image} alt="" />
      ) : null}
    </div>
  );
}
