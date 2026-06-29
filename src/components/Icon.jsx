const paths = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  book: "M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5v-16Zm0 0v16",
  camera: "M4 8h3l1.5-2h7L17 8h3v11H4V8Zm8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  check: "m5 12 4 4L19 6",
  edit: "M4 20h4L19 9l-4-4L4 16v4Zm11-15 4 4",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z",
  map: "M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Zm0 0V3m6 18V6",
  menu: "M4 7h16M4 12h16M4 17h16",
  search: "m19 19-4-4m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm6 12 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 9a7 7 0 0 0-14 0"
};

export function Icon({ name = "spark", className = "h-5 w-5", strokeWidth = 1.8 }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={paths[name] || paths.spark}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
