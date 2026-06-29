import { Icon } from "./Icon.jsx";

const variants = {
  primary: "bg-teal text-white shadow-lift hover:bg-[#285f63]",
  secondary: "border border-rose bg-paper text-espresso hover:bg-[#fff7f3]",
  ghost: "text-teal hover:bg-sky"
};

const sizes = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-6 text-sm",
  lg: "min-h-14 px-8 text-base"
};

export function Button({
  as: Component = "a",
  children,
  className = "",
  icon,
  iconPosition = "right",
  size = "md",
  variant = "primary",
  ...props
}) {
  return (
    <Component
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full font-medium transition ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" ? <Icon name={icon} className="h-4 w-4" /> : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? <Icon name={icon} className="h-4 w-4" /> : null}
    </Component>
  );
}
