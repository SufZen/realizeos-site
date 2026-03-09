export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <img src="/img/logo-mark.svg" alt="" className="h-7 w-7" />
      <span className="text-xl font-bold tracking-tight">
        <span className="text-foreground">Realize</span>
        <span className="text-brand-yellow">OS</span>
      </span>
    </span>
  );
}
