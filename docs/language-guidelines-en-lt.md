# Kalbos gairės: LT ir EN

Trumpas vadovas rašant ir vertinant vartotojui matomą tekstą (LP, puslapiai, klaidos). Naudoti vertimų redagavimui ir naujoms frazėms.

---

## 1. Prekės ženklas / pavadinimas

| Kalba | Pilnas pavadinimas | Navbar / logotipas (nav.brandPromptu + brandAnatomija) |
|-------|--------------------|----------------------------------------------------------|
| **EN** | **Prompt Anatomy** – AI Operating System | PROMPT ANATOMY |
| **LT** | **Promptų Anatomija** – DI Operating System | PROMPTŲ ANATOMIJA |

- EN kontekste (tarptautiniam vartotojui) visada naudoti **Prompt Anatomy**, ne „Promptų Anatomija“ – skaitomumas ir įsimintinumą.
- LT kontekste – **Promptų Anatomija**.
- **AI / DI:** LT kalboje vartoti **DI** (dirbtinis intelektas); EN kalboje – **AI**. Pvz. LT: „DI Operating System“, „DI Powered“, „DI agentai“; EN: „AI Operating System“, „AI Powered“, „AI agents“.

---

## 2. Terminai (abiejose kalbose)

Šiuos laikyti nesiverčiamais arba vienodai abejuose failuose:

- **Lifetime access** / **Lifetime prieiga** (LT) – palikti „Lifetime“ kaip atributą.
- **Repo**, **Stripe Verified**. **AI Powered** (EN) / **DI Powered** (LT) – brand; AI/DI pagal kalbą (žr. skyrių 1).
- **Operating Model**, **System**, **Network** (nav/footer) – EN originalas; LT atitikmenys „Metodas“, „Ekosistema“, „Kainodara“ ir t. t. pagal `lt.json`.

---

## 3. Tonas ir stilius

- **Kreipinys:** „you“ (EN) / „jūs“ (LT) – vienodas, tiesus.
- **Edu / produktas:** aiškūs CTA („Get access“ / „Gauti prieigą“), trumpi sakiniai, be perteklinio žargono.
- **Klaidos ir pranešimai:** trumpi, veiksmažodžiu („Bandykite vėliau.“ / „Try again later.“).

---

## 4. Techninis įgyvendinimas

- Vertimai: [frontend/src/i18n/translations/lt.json](../frontend/src/i18n/translations/lt.json), [en.json](../frontend/src/i18n/translations/en.json).
- Naujas tekstas: tas pats raktas abiejuose failuose, vertimas pagal šias gaires.
- Raktų struktūra: `meta.*`, `nav.*`, `hero.*`, `methodology.*`, `ecosystem.*`, `pricing.*`, `footer.*`, `success.*`, `cancel.*`, `common.*`, `errors.*` (žr. [documentation.md](process/documentation.md)).
- Gramatika ir stilius: remtis [audit-language-en-lt.md](audit-language-en-lt.md).
