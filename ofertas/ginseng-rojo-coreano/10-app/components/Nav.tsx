"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", ico: "🏠", label: "Hoy" },
  { href: "/cronograma", ico: "🌙", label: "21 noches" },
  { href: "/ritual", ico: "🫙", label: "Ritual" },
  { href: "/diario", ico: "📸", label: "Diario" },
  { href: "/bonos", ico: "🎁", label: "Bonos" },
];

/** O test de piel ocupa a tela inteira: sem nav competindo com as respostas. */
const SIN_NAV = ["/bienvenida"];

export default function Nav() {
  const path = usePathname();
  if (SIN_NAV.some((p) => path.startsWith(p))) return null;

  return (
    <nav className="nav" aria-label="Navegación principal">
      {ITEMS.map(({ href, ico, label }) => {
        const activo = href === "/" ? path === "/" : path.startsWith(href);
        return (
          <Link key={href} href={href} aria-current={activo ? "page" : undefined}>
            <span className="ico" aria-hidden="true">{ico}</span>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
