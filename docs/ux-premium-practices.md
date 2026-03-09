# Premium SaaS UI/UX – MUST / SHOULD / WANT

Geriausių praktikų (GitHub, Vercel, Linear, Stripe stilius) pritaikymas projekte. Šis dokumentas fiksuoja, kas jau įdiegta ir ką verta daryti toliau.

---

## MUST (būtina – įdiegta)

| Praktika | Paskirtis | Projekte |
|----------|-----------|----------|
| **Semantinės spalvos** | Viena brand paletė (dark, accent) – lengva keisti ir laikyti konsistenciją | `tailwind.config.js`: `brand-dark`, `brand-accent`; komponentai naudoja `brand-*` |
| **Accent gradientas ir primary CTA** | Vienas accent gradientas visur – keičiamas vienoje vietoje (config) | `tailwind.config.js`: `backgroundImage['accent-gradient']`; visi primary CTA (Hero, Navbar, Pricing, Ecosystem, Cancel, skip link) naudoja `bg-accent-gradient` |
| **Ecosystem spalvos** | Kortelių spalvos centralizuotos theme | `tailwind.config.js`: `colors.ecosystem` (1–4); Ecosystem.jsx naudoja `bg-ecosystem-1` … `bg-ecosystem-4` |
| **Focus states** | Prieinamumas ir aiškūs interaktyvūs elementai | Visur `focus-visible:ring-2 ring-brand-accent ring-offset-2` |
| **Smooth scroll** | Natūralus anchor scroll | `index.css`: `html { scroll-behavior: smooth }` + `prefers-reduced-motion` override |
| **Button micro-feedback** | Jausmas „paspaudimas“ | CTA/mygtukai: `active:scale-[0.98]`, `duration-200` |
| **Card hover** | Kortelės atrodo paspaudžiamos | Pricing, Methodology, Ecosystem: `hover:-translate-y-0.5`, `hover:shadow-soft-lg`, `duration-300` |
| **Shadow hierarchy** | Šviesūs, ne „plokšti“ šešėliai | `shadow-soft`, `shadow-soft-lg`, `shadow-soft-top`, `shadow-glow-accent` (Tailwind extend) |
| **Footer gylis** | Mažesnis ryškumas apačioje, atskyrimas nuo turinio | Footer: `bg-slate-50` + `shadow-soft-top` + `border-t border-slate-100` |
| **Transition duration** | Vienodas atsakas į hover/focus | `duration-200` mygtukams, `duration-300` kortelėms |
| **Trust bar** | Skaitomumas be per didelio „pilko“ | Pricing trust eilutė: nuo `opacity-40 grayscale` pakeista į `text-slate-400` |
| **Reduced motion** | Prieinamumas vartotojams su jautria vestibular sistema | `index.css`: animacijos/transition sumažinami |

---

## SHOULD (rekomenduojama – dalis įdiegta)

| Praktika | Paskirtis | Būsena |
|----------|-----------|--------|
| **Hero CTA shadow on hover** | CTA atrodo „pakilęs“ | Įdiegta: `hover:shadow-glow-accent`, `hover:-translate-y-0.5` |
| **Nav logo hover** | Brand blokas reaguoja | Įdiegta: `group-hover:shadow-glow-accent` ant logo |
| **Pricing card border on hover** | Akcentas be per didelio kontrasto | Įdiegta: `hover:border-brand-accent/30` |
| **Loading micro-copy** | Vietoj „Loading...“ – kontekstinis tekstas | Galima: pvz. „Redirecting to checkout...“ (Success/Cancel flow) |
| **Section fade-in on scroll** | Turinio atsiradimas su scroll | WANT – žr. žemiau |

---

## WANT (norima – ateities tobulinimai)

| Praktika | Pastaba |
|----------|--------|
| **Scroll-triggered reveal** | Fade-in + `translateY` sekcijoms (Intersection Observer), 400–600 ms |
| **Contextual loading text** | Prie checkout: „Opening secure payment…“ ir pan. |
| **Dark mode** | Jei reikia – brand spalvos jau centralizuotos |
| **Subtle nav underline on hover** | Nav link: `hover:underline` arba `border-b-2 border-brand-accent` (pasirinktinai) |

---

## Nuorodos

- [docs/INDEX.md](INDEX.md) – dokumentų indeksas
- [docs/audit-mobile-ux-user-journey.md](audit-mobile-ux-user-journey.md) – mobilus UX auditas
- Tailwind theme: `frontend/tailwind.config.js` (colors, boxShadow)
