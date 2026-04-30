# Promptų anatomija – Interaktyvus DI Mokymas

**6 promptų struktūros blokai, vienas nuoseklus mokymas – sistema nuo A iki Z.**

Interaktyvus mokymas apie DI (dirbtinio intelekto) promptų struktūrą: **6 moduliai** (6 blokų sistema, žinių testas, praktika, konteksto inžinerija, pažangus testas, projektas). Orientuotas į verslo problemų sprendimą ir **praktinius rezultatus** – kursas moko kurti promptus ir scenarijus, ne tik suprasti teoriją.

## 🎯 Apie projektą

Mokymo kursas (treniruoklis), kuris moko **kurti** efektyvius DI promptus naudojant **6 blokų sistemą**:

| Blokas | Paskirtis |
|--------|-----------|
| 1️⃣ **Meta** | Rolė, kontekstas ir tikslas |
| 2️⃣ **Input** | Duomenys, faktai ir apribojimai |
| 3️⃣ **Output** | Formatas, struktūra ir reikalavimai |
| 4️⃣ **Reasoning** | Mąstymo seka ir logika |
| 5️⃣ **Quality Control** | Kokybės kriterijai |
| 6️⃣ **Advanced Parameters** | Temperature, reasoning gylis, atsakymo kontrolė |

## ✨ Pagrindinės funkcijos

- **6 moduliai:** 1) 6 Blokų Sistema (teorija) → 2) Žinių Patikrinimas (testas) → 3) Praktinis Pritaikymas (6 scenarijų) → 4) Konteksto inžinerija (pažangus teorija) → 5) Prezentacijos sprintas (testas) → 6) Projekto kūrimas (praktika)
- **6 blokų sistema** su workflow, technikomis ir mąstymo modeliais (CoT, ToT)
- **Praktiniai verslo scenarijai** (Modulis 3) ir **vienas integruotas projektas** (Modulis 6)
- **Progreso sekimas** (localStorage, versijavimas) ir automatinis išsaugojimas
- **Žodynėlis** (terminai), **Įrankiai** (DI įrankių katalogas pagal modulius) ir **Apklausa** (bendras žinių patikrinimas)
- **Promptų biblioteka** (pagrindiniame puslapyje) su kopijavimo funkcija
- **Responsive dizainas**, tamsusis/šviesusis režimas, klaviatūros navigacija
- **Lazy loading** komponentų, **Error Boundary**, **SEO** (react-helmet-async)

## 🚀 Greitas startas

### Reikalavimai
- Node.js 18+ (rekomenduojama `engines` iš `package.json`: node >=18, npm >=9)
- npm arba yarn

### Instaliacija

```bash
git clone https://github.com/DITreneris/anatomija.git
cd anatomija
npm install
npm run dev
```

Aplikacija bus prieinama: `http://localhost:3000`

### Build produkcijai

Prieš build automatiškai vykdoma JSON schemų validacija (`npm run validate:schema` per `prebuild`). Komandos:

```bash
npm run build
npm run preview
```

**MVP build** (tik moduliai 1–3, testuotojams):

```bash
VITE_MVP_MODE=1 npm run build
```

**Windows (PowerShell):** Jei `&&` neveikia, naudokite `;` arba `cmd /c "cd anatomija && npm run build"`.

### Testavimas

```bash
npm test              # Watch mode
npm run test:run      # Vienkartinis paleidimas
npm run test:coverage # Su coverage report
```

## 📚 Modulių struktūra

| Modulis | Pavadinimas | Turinys |
|---------|-------------|---------|
| 1 | **6 Blokų Sistema** | Teorija: promptų struktūra, workflow, technikos, kiekvienas blokas (Meta, Input, Output, Reasoning, Quality, Advanced). |
| 2 | **Žinių Patikrinimas** | Testas: klausimai su paaiškinimais; sertifikatas nuo 70%. |
| 3 | **Praktinis Pritaikymas** | 6 verslo scenarijų su žingsniais ir pavyzdiniais sprendimais. |
| 4 | **Konteksto inžinerija** | Pažangus teorija: RAG, Deep research, tokenų ekonomika, manipuliacijos, žinių patikrinimas. |
| 5 | **Prezentacijos sprintas** | 15 min prezentacijos draftas + mini suvokimo testas. ≥70% rekomenduojama prieš Modulį 6. |
| 6 | **Projekto kūrimas** | Vienas integruotas projektas (capstone) su 6 blokų sistema ir pažangiomis temomis. |

**Navigacija:** Pagrindinis → Moduliai → Žodynėlis → Įrankiai → Apklausa. Duomenys: `src/data/modules.json` (moduliai, skaidrės, klausimai).

## ⚙️ Konfigūracija

### Modulių duomenų keitimas

- **Moduliai ir skaidrės:** `src/data/modules.json` (moduliai 1–6, skaidrės, Modulio 2/5 klausimai, apklausa). Galite pridėti/pašalinti skaidres, keisti tekstus ir klausimus.
- **Žodynėlis:** `src/data/glossary.json`.
- **Promptų biblioteka:** `src/data/promptLibrary.json`.
- **Įrankiai:** `src/data/tools.json` (DI įrankių katalogas pagal modulius).
- Duomenys įkraunami per `src/data/modulesLoader.ts` (cache, validacija). **Paprasti turinio pakeitimai** – redaguokite JSON, be kodo keitimo.

### Spalvų schema

Spalvos konfigūruojamos `tailwind.config.js` (brand – navy/slate, accent – auksinė):

```javascript
// theme.extend.colors
brand: { 500: '#627d98', 600: '#486581', ... },  // Navy / slate mėlyna
accent: { 500: '#d4a520', 600: '#b8860b', ... }  // Auksinė
```

Pilna paletė (50–950) ir papildomos spalvos (slate, di-visata) – žr. `tailwind.config.js`.

## 🌐 Deployment

### GitHub Pages (demo / istoriškai)

1. GitHub repo: Settings → Pages
2. Source: pasirinkite "GitHub Actions"
3. Push į `main` automatiškai deployina

Demo prieiga (jei naudojate seną GitHub Pages deploy): `https://ditreneris.github.io/anatomija/`

Produkcija (šio repo kontekste): `https://www.promptanatomy.app/anatomija/`

**Pastaba:** GitHub Actions deployina tik modulius 1–3 (MVP). Pilnai 6 moduliams – žr. Release planą.

**Pastaba:** `vite.config.ts` naudoja base path `/anatomija/`. Jei keičiate repo pavadinimą, atnaujinkite base.

### Kiti variantai

- **Vercel**: `vercel`
- **Netlify**: Build `npm run build`, publish `dist`

## 🛠️ Technologijos

| Technologija | Paskirtis |
|--------------|-----------|
| React 18 | UI biblioteka (lazy loading, Suspense) |
| TypeScript | Tipai (`src/types/modules.ts`) |
| Vite | Build ir dev serveris |
| Tailwind CSS | Styling (brand, accent, dark mode) |
| Vitest + React Testing Library | Unit ir integraciniai testai |
| react-helmet-async | SEO (title, description pagal puslapį) |
| lucide-react | Ikonos; recharts – diagramos (pvz. haliucinacijų rodikliai); canvas-confetti – šventimas |

## 📁 Projekto struktūra

```
src/
├── components/       # React komponentai
│   ├── slides/       # Skaidrės: types/ (AllSlides, ContentSlides, BlockSlides, TestPracticeSlides), shared/ (CopyButton, PracticalTask, ProcessStepper, EnlargeableImage, …), utils/
│   ├── ui/           # ErrorBoundary, LoadingSpinner
│   ├── HomePage.tsx, ModulesPage.tsx, ModuleView.tsx, QuizPage.tsx, GlossaryPage.tsx, ToolsPage.tsx
│   ├── AppNav.tsx, ModuleCompleteScreen.tsx, QuizResultsView.tsx, CircularProgress.tsx
│   ├── SlideContent.tsx, PromptLibrary.tsx, Celebration.tsx, HallucinationRatesDashboard.tsx
│   └── __tests__/    # progress.integration, App.quiz.integration, QuizPage, ErrorBoundary, a11y.smoke, mvp.gating
├── data/             # modules.json, modulesLoader.ts, glossary.json, promptLibrary.json, tools.json, hallucinationRates.ts
├── types/            # modules.ts (tipai moduliams, skaidrėms, quiz)
├── utils/            # progress.ts, useAutoSave.ts, useQuizState.ts, useSlideNavigation.ts, useTheme.ts, logger.ts + __tests__
└── test/             # Vitest setup
```

## 📖 Dokumentacija

- **README.md** – šis failas
- **docs/DOCUMENTATION_INDEX.md** – **kur kuo remtis:** SOT, aktyvūs dokumentai, archyvas (pirmiausia atsidaryk čia)
- **turinio_pletra.md** – turinio planas (Moduliai 1–3, SOT)
- **docs/turinio_pletra_moduliai_4_5_6.md** – turinio planas Moduliams 4–6 (SOT)
- **docs/development/RELEASE_QA_CHECKLIST.md** – 5 min sanity prieš release
- **TODO.md** – dabartinės užduotys
- **docs/README.md** – dokumentacijos struktūra; pasenę dokumentai – **docs/archive/** (žr. ARCHIVE_README.md)

## 📄 Licencija

**Mokymo turinys:** © 2024-2026 Tomas Staniulis. Visos teisės saugomos.

**Programinė įranga:** MIT License

## 📧 Kontaktai

- **Autorius:** Tomas Staniulis
- **GitHub:** [DITreneris](https://github.com/DITreneris)
- **Klausimai:** Sukurkite issue GitHub repozitorijoje
- **Bendruomenė (CTA):** [Vieša Telegram grupė](https://t.me/prompt_anatomy) – diskusijos apie promptus, atnaujimai, pasiūlymai toliau (Modulis 4 ir kt.)

---

<div align="center">

**Promptų anatomija** - Interaktyvus DI Mokymas

Autorinė mokymo medžiaga © 2024-2026 Tomas Staniulis

*Sukurta verslo problemų sprendimui su DI* 🎯

</div>