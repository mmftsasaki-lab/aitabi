import { navItems } from "../data.js";
import { Button } from "./Button.jsx";
import { Icon } from "./Icon.jsx";

export function Header({ activePath = "/" }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/88 backdrop-blur">
      <div className="container-page flex min-h-20 items-center justify-between gap-4">
        <a className="focus-ring inline-flex items-baseline gap-2 rounded-sm" href="/">
          <span className="font-serif text-3xl text-espresso">Aitabi</span>
          <span className="hidden text-xs tracking-[0.2em] text-rose sm:inline">AI旅記録</span>
        </a>
        <nav aria-label="主要ナビゲーション" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={`focus-ring rounded-full px-4 py-2 text-sm transition hover:bg-sky ${
                activePath === item.href ? "bg-sky text-teal" : "text-ink"
              }`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/create" size="sm" icon="edit">はじめる</Button>
          <button
            aria-label="メニュー"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-espresso lg:hidden"
            type="button"
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
