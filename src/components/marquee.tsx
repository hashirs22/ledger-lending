type Props = {
  items: string[];
  /** Seconds for one full loop. */
  speed?: number;
};

/** Seamless monochrome ticker. Duplicates the row so the loop is continuous. */
export function Marquee({ items, speed = 42 }: Props) {
  const row = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden">
      <ul
        className="flex w-max items-center motion-safe:animate-[marquee_var(--dur)_linear_infinite]"
        style={{ ["--dur" as string]: `${speed}s` }}
      >
        {row.map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center whitespace-nowrap text-[0.82rem] font-bold uppercase tracking-[0.18em] text-foreground/45"
          >
            {item}
            <span className="mx-7 text-foreground/25">&bull;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
