# Prompt Anatomy – UI / UX / SEO MOSCOW tobulinimo planas

## Tikslas

Pagerinti:

- konversiją
- aiškumą vartotojui
- SEO indeksavimą
- produkto supratimą

**Neliečiant:**

- React struktūros
- Vite build
- routing
- Stripe flow
- webhook
- backend

**Keičiamas tik:**

- tekstas
- HTML semantika
- komponentų vidinis turinys
- landing struktūra

---

## MUST (kritiniai patobulinimai)

### 1. Hero sekcijos aiškumas

**Dabar:**

- Nustok kalbėti.
- Pradėk programuoti.

**Problema:** neaišku ką žmogus gauna.

**Sprendimas:** Pridėti aiškų produkto paaiškinimą.

**Hero struktūra:**

- **H1:** Nustok kalbėti. Pradėk programuoti.
- **SUB:** AI operacinė sistema darbui su ChatGPT, agentais ir automatizacija.
- **3 bullet:**
  - Prompt engineering framework
  - AI workflow automation
  - Real business use cases
- **CTA:** Žiūrėti planus

### 2. Vienas aiškus produktas

**Dabar** vartotojas nesupranta: ar tai kursas, ar SaaS, ar community.

**Sprendimas:** Sekcija po hero:

**Kas yra Prompt Anatomy**

Prompt Anatomy – tai sistema, kuri leidžia valdyti AI kaip operacinę sistemą.

Ji susideda iš:

- metodikos
- prompt bibliotekos
- automatizavimo šablonų
- AI workflow modelių

### 3. SEO struktūra (nekeičiant React)

Pridėti semantines antraštes.

**Dabar:** `div`

**Reikia:** `<h1>`, `<h2>`, `<h3>`

Pvz.:

- **h1:** AI operacinė sistema darbui su ChatGPT
- **h2:** Prompt Anatomy metodas
- **h2:** Kaip veikia sistema
- **h2:** Kainodara

Tai labai svarbu indeksavimui.

**SEO rekomendacija:** primary keyword, title, meta description, headers – turi sutapti.

### 4. ALT tekstai ikonoms

**Dabar:** `<img src="icon.svg">`

**Reikia:** `<img src="icon.svg" alt="Prompt engineering framework">`

### 5. Kalbos bug

**Dabar:** `/en` → 404

**Must fix.**

**Sprendimas:** `/en/index` arba hreflang

---

## SHOULD (labai vertingi patobulinimai)

### 6. Demonstracija

Hero dešinėje vietoje pseudo terminalo.

**Geriau:** 30 sec demo video arba GIF: prompt → AI output

Tai padidina konversiją.

### 7. Social proof

Pridėti sekciją:

**Naudoja:**

- AI konsultantai
- marketing specialistai
- founderiai

arba **500+ narių**

### 8. Kaip tai veikia

Sekcija:

1. Pasirenki workflow
2. Generuoji promptą
3. Dirbi su AI
4. Automatizuoji procesą

### 9. Pricing aiškumas

**Dabar** CTA → planai.

Pridėti: Starter | Professional | Team

---

## COULD (papildomi patobulinimai)

### 10. Blog / knowledge base

Pvz. `/blog`

- Prompt engineering
- AI automation
- Agent workflows

Tai generuoja SEO.

### 11. Interactive demo

Mini prompt generator: mode | role | task → generate prompt

### 12. Playground

test prompt

---

## WON'T (kol kas nedarome)

Kad negriautume architektūros.

**Nedarome:**

- Next.js migracijos
- SSR
- headless CMS
- multi-page routing
- login sistemos

---

## Dizaino taisyklės

Spalvos paliekamos.

**Design system:**

- **Primary:** #C9A33B
- **Dark:** #0B1220
- **Background:** #F5F7FA

---

## UX principai

Svarbiausi principai:

- aiški hierarchija
- mažas cognitive load
- konsistencija

Tai sumažina vartotojo mentalinę apkrovą ir pagerina navigaciją.

---

## Sėkmės KPI

Matavimas:

- Bounce rate
- Scroll depth
- Pricing clicks
- Checkout rate

---

## Greitas roadmap

| Savaitė | Turinys |
|---------|---------|
| **1** | Hero + tekstai |
| **2** | SEO + ALT + headers |
| **3** | Demo + social proof |
| **4** | Blog / content |
