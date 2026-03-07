# Gili kodo bazės analizė: Marketinginis tinklalapis „Promptų anatomija“

## 1. Kas dabar yra projekte

| Failas | Aprašymas |
|--------|-----------|
| **react.txt** | Vieno failo React landing page: Navbar, Hero, Methodology, Ecosystem, Pricing, Footer + „purchased“ ekranas. Naudoja Lucide ikonas, Tailwind-style klasės, theme (navy #0B1320, auksas #CFA73A). |
| **README_SOT.md** | Produkto SOT readme: 6 modulių DI mokymas, 6 blokų sistema, technologijos (React, Vite, Tailwind ir kt.), struktūra, deployment. |

**Projekto aplinka:** Kataloge `059_home_page` nėra `package.json`, `src/`, `node_modules/` – tik šie du failai. Tai turinio/dizaino medžiaga, o ne paleidžiamas projektas.

---

## 2. react.txt – kas jau padaryta (stipriosios pusės)

- **Dizainas:** Aiškūs brendo spalvai (slate, gold, dark gradient), „premium“ stilius, glass/nuostabos efektai.
- **Sekcijos:** Hero su CTA, metodologija (3 žingsniai: Skaidymas, Inžinerija, Scale), ekosistema (4 vertikalūs varikliai), pricing (99€, lifetime), footer.
- **Navigacija:** Fiksuota navbar su scroll reakcija, smooth scroll į #pricing.
- **Interaktyvumas:** CTA „Gauti prieigą“ scrollina į pricing; mygtukas „Gauti prieigą dabar“ perjungia į „Sėkmingas diegimas“ ekraną (simuliacija, be tikros apmokėjimo logikos).
- **Kongruencija su README_SOT:** Vertikalūs varikliai (HR, Marketing, RE Broker, AI Automation), 6 blokų kontekstas (Hero kode rodomas pavyzdys: ROLE, CONTEXT, SCHEMA), lifetime prieiga, bendruomenė – atitinka SOT aprašymą.

---

## 3. Tarpai ir neatitikimai

### 3.1 Navigacija vs turinys

- Meniu punktas **„Repo“** nukreipia į `#library`, bet **puslapyje nėra sekcijos su `id="library"`**. Vartotojas paspaudęs „Repo“ niekur neateina.
- **Siūloma:** Prideti „Promptų / Repo“ sekciją (pvz. bibliotekos preview, „500+ Assets“ iš SOT) arba laikinai nuorodą nuvesti į `#pricing` ar kitą esamą sekciją.

### 3.2 CTA ir konversija

- „Gauti prieigą“ tik scrollina į pricing; „Gauti prieigą dabar“ atidaro **tik simuliuotą** sėkmės ekraną („Patikrinkite paštą“). Nėra:
  - Tikros apmokėjimo integracijos (Stripe ir kt.)
  - Formos (el. paštas, vardas) ar lead capture
  - Nuorodos į išorinį (WhatsApp, Gumroad, Notion ir t. t.)
- **Klausimas:** Ar planuojate tik lead capture (el. paštas), tik nuorodą į išorinį checkout/kontaktą, ar pilną Stripe (ar kito) checkout čia?

### 3.3 Turinio atitikimas README_SOT

- **SOT:** 6 modulių mokymas, žodynėlis, įrankiai, apklausa, promptų biblioteka, 6 blokų sistema.
- **Landing:** Pabrėžiama „AI OS“, metodologija (3 žingsniai), 4 vertikalūs varikliai, „12 modulių“, „500+ Repo“. Skaičiai „12 modulių“ vs SOT „6 moduliai“ – reikėtų sutapatinti žinutę (ar tai 12 *inžinerinių* modulių Core, o 6 – mokymo moduliai?).
- **Siūloma:** Vienas aiškus skaičiavimas (pvz. „6 mokymo modulių“ vs „12 inžinerinių modulių“) ir vienoda terminologija tarp LP ir SOT.

### 3.4 Techninė būsena

- **react.txt** yra vienas didelis komponentas be `package.json`, be importų iš `lucide-react` / `react` – tai **snippet**, o ne paleidžiamas projektas.
- Kad būtų marketinginis tinklalapis:
  - Reikia React projekto (pvz. Vite + React), `npm install`, `lucide-react`, Tailwind (arba atitikmuo su SOT: Vite, Tailwind).
  - Ar naudoti `react.txt` kaip vieną `App.tsx`/`App.jsx`, ar išskaidyti į komponentus (Navbar, Hero, …) – priklauso nuo to, ar planuojate toliau plėtoti (daugiau puslapių, A/B testai ir t. t.).

### 3.5 Mažesni dalykai

- **Hero:** „2,481 Commits“, „500+ narys“ – ar tai realūs skaičiai, ar placeholder? Jei placeholder – geriau „X+ narių“ arba atnaujinti į realius.
- **Pricing:** „Liko 14 licencijų“ – ar tai dinamiška (iš DB/API), ar statinis tekstas?
- **Footer:** „© 2024“ – SOT turi „© 2024-2026“; nuorodos „LinkedIn“, „Discord HQ“, „System Log“ – ar bus realūs URL?
- **Mobile:** Navbar turi `hidden md:flex` – nėra mobilaus meniu (hamburger). Jei tinklalapis bus naudojamas mobiliajame – reikėtų pridėti.

---

## 4. Rekomenduojami žingsniai (prioritetas)

1. **Greitas:** Pridėti sekciją `id="library"` (Repo) arba pakeisti nav nuorodą, kad „Repo“ vėstų į esamą sekciją.
2. **Turinys:** Sutapatinti žinutes su README_SOT (6 vs 12 moduliai, terminologija).
3. **CTA:** Nuspręsti: tik lead form (el. paštas), nuoroda į WhatsApp/Gumroad, ar pilnas checkout – ir implementuoti vieną variantą.
4. **Projektas:** Sukurti minimalų Vite+React+Tailwind projektą ir įdiegti `react.txt` turinį (vienas failas arba suskaidyti komponentus).
5. **Mobilumas:** Pridėti mobile menu (hamburger) ir patikrinti visą LP ant mažo ekrano.

---

## 5. Klausimai tau (kad būtų aišku)

1. **Repo / Library sekcija:** Ar norite atskiros sekcijos „Promptų repo“ su pavyzdžiais / „500+ Assets“, ar pakanka, kad „Repo“ nuveda į pricing ar ekosistemą?
2. **CTA po „Gauti prieigą“:** Ką tiksliai norite: tik el. pašto surinkimą, nuorodą į išorinį puslapį (koks?), ar Stripe (ar kitą) checkout šiame domene?
3. **Skaičiai:** „12 modulių“, „500+ Repo“, „2,481 Commits“, „500+ narys“, „Liko 14 licencijų“ – kurie iš jų turi būti realūs / atnaujinami, o kurie – statinė marketingo formulė?
4. **Projekto vieta:** Ar marketinginis tinklalapis turi būti **šitame** kataloge (`059_home_page`) kaip atskiras Vite/React projektas, ar integruotas į kitą repo (pvz. `anatomija` su pilna mokymo app)?
5. **Domenas / deployment:** Ar jau žinote, kur hostinsite (Vercel, GitHub Pages, kitas)? README_SOT mini `base path /anatomija/` – ar šis LP bus tame pačiame repo su `base`, ar atskirame subdomene/domene?

---

Kai atsakysite į šiuos klausimus, galima tiksliai suplanuoti pakeitimus (pvz. „Pridėk library sekciją“, „CTA → el. pašto forma + nuoroda į WhatsApp“, „Sukurk Vite projektą čia“) ir juos atlikti žingsnis po žingsnio.
