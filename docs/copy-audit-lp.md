# LP copy auditas: kartojimai ir esmė

Trumpa analizė pagal projekto gaires (language-guidelines, outcome-based copy, lean).

---

## Problema

1. **„6 blokų“ per daug kartų** – skaitytojas mato tą patį 4×: whatIs.intro, whatIs.bullet1, methodology.paragraph, pricing.features. Esmė skendėja, atrodo prirašyta.
2. **Esmė pranyksta** – prekės ženklas **Promptų Anatomija** ir vienas aiškus pažadas (aiškus, nuspėjamas, patikrinamas rezultatas) skildomi tarp hero, „Kas yra“, metodologijos ir kainodaros; nėra vienos stiprios linijos.
3. **Kartojasi ne tik skaičius** – „mokymasis → patikrinimas → praktika“ ir panašios frazės pasikartoja (whatIs.bullet3, methodology.paragraph).

---

## Geriausios praktikos (projektas)

- **language-guidelines-en-lt.md:** trumpi sakiniai, aiškūs CTA, mažiau žargono.
- **CHANGELOG / outcome-based:** copy orientuotas į rezultatą, ne į sąrašą savybių.
- **Lean:** vienas kartas – viena vieta; kitur nuoroda ar kita nauda.

---

## Rekomendacijos

| Vieta | Dabar | Pasiūlymas |
|-------|--------|------------|
| **whatIs** | Vienintelė vieta, kur pilnai apibrėžti „6 blokų“ (META→…→ADVANCED). Intro = esmė + vienas sakinys apie sistemą. | Bulletai **be** pakartotinio „6 blokų“: repo, keliai, modulių eiga, skaičiai (žodynas, įrankiai). |
| **methodology.paragraph** | „6 blokų sistemą – kiekviename modulyje: mokymasis → patikrinimas → praktika.“ | Tik rezultatas ir eiga: atsisakyti atsitiktinumo, inžinerinis mąstymas, kiekviename modulyje: mokymasis → patikrinimas → praktika. **Neminėti** „6 blokų“. |
| **pricing.features** | „6 blokų sistema“ kaip bullet. | Palikti **vieną** trumpą bullet („6 blokų sistema“ arba „Viena 6 blokų metodika“) – pakanka, nes whatIs jau apibrėžia. |
| **Esmė / brand** | Hero be prekės ženklo; „Kas yra“ po antrašte iš karto į 6 blokų. | whatIs.intro pirmą sakinį pradėti nuo **Promptų Anatomija** (LT) / **Prompt Anatomy** (EN): kas tai ir kokiam rezultatui (aiškus, nuspėjamas, patikrinamas), tada vienas sakinys apie 6 blokų sistemą. |

---

## Įgyvendinimas

- **lt.json / en.json:** pakeisti `whatIs.intro`, `whatIs.bullet1`, `methodology.paragraph`, laikyti `pricing.features` su vienu „6 blokų“ bullet.
- Po pakeitimų: „6 blokų“ matoma **2 kartus** (whatIs.intro + pricing), esmė (brand + rezultatas) – pirmoje whatIs eilutėje.
