# Sibling memo — Entity footer line (QW1b)

**Iš:** hub `promptanatomy.app` (repo `059_home_page` / [DITreneris/promptanatomy](https://github.com/DITreneris/promptanatomy))  
**Kam:** spoke / discovery sibling repo agentai ir savininkai  
**Data:** 2026-08-09  
**Hub TODO:** `[QW1b]`  
**Kanonas:** [ecosystem-governance.md](ecosystem-governance.md), [ecosystem-canon.md](ecosystem-canon.md)

---

## 1. Tikslas

Be domain 301: kiekvienas spoke / discovery domenas aiškiai priklauso **Prompt Anatomy** ir turi vieną kelią atgal į konversijos hubą `.app`.

Tai **entity + route home**, ne promo badge ir ne antras „Buy Core“ CTA.

Hub GEO (`llms.txt`, Org `sameAs`, ItemList) jau hub repo. Sibling’ams — matoma **footer** eilutė žmonėms.

---

## 2. Vieninga vs individualu

| Sluoksnis | Vienoda visur? | Pastaba |
|-----------|----------------|---------|
| Copy (EN + LT jei locale) | **Taip** | §3 |
| Hub URL | **Taip** | `https://www.promptanatomy.app/` |
| Placement principas | **Taip** | Footer (arba juosta virš footer) |
| DoD | **Taip** | §5 |
| CSS / komponentas | **Ne** | Kiekvienas repo savaip |
| UTM `utm_source` | **Skiriasi** | Domeno trumpinys |

**Išvada:** kontraktas bendras; implementacija lokali. Pixel-perfect dizainas **nebūtinas**.

---

## 3. Kanoninis copy (be founder vardo)

**EN:**  
`Part of Prompt Anatomy · Training & checkout → promptanatomy.app`

**LT** (jei spoke turi LT UI):  
`Promptų Anatomijos ekosistema · Mokymai ir checkout → promptanatomy.app`

- Nuoroda (ant `promptanatomy.app` arba visos eilutės) → `https://www.promptanatomy.app/`
- Optional UTM:  
  `https://www.promptanatomy.app/?utm_source=<cloud|pro|site|help|ceo|info|space|blog|lol>&utm_medium=entity_footer&utm_campaign=ecosystem`

Founder („by Tomas Staniulis“) **nedėti** šioje eilutėje — lieka JSON-LD / About / `.pro`.

---

## 4. Grafinis minimumas (ne dizaino sistema)

- Tekstas kaip esamas footer linkas spoke’e (body/small), ne H2  
- Be kortelės, shadow, sticky promo, floating badge, hero overlay  
- Skaitomas kontrastas; keyboard focus jei tai `<a>`  
- Mobile: eilutė gali lūžti į 2 eilutes  

Jei spoke **jau** turi aiškų „Prompt Anatomy“ brand + hub CTA + `llms.txt` → `.app`: greitas auditas; trūkumą uždaryti šia eilute, ne nauju komponentu.

---

## 5. Definition of Done (kiekvienas sibling)

- [ ] Footer entity line matoma desktop + mobile  
- [ ] Copy sutampa su §3 (EN; LT jei taikoma)  
- [ ] Link → `https://www.promptanatomy.app/` (+ optional UTM)  
- [ ] Neužgožia spoke pirminio CTA  
- [ ] Nėra floating sticker / hero overlay  
- [ ] Optional: `entity_footer_click` (jei spoke turi analytics)

---

## 6. Rollout eilė

| Prioritetas | Domenai |
|-------------|---------|
| **P1** | `.site`, `.cloud`, `.pro` |
| **P2** | `.help`, `.ceo`, `.info` |
| **P3** | `.space`, `.blog`, `.lol` (+ spoke GEO minimum) |

**Hub `.app`:** šios eilutės **nedėti**.

**Ne kanone:** `promptanatomy.online` — nėra [ecosystem-canon.md](ecosystem-canon.md). Jei domenas gyvas: map’inti į esamą rolę arba atskiras ADR — ne įtraukti tyliai.

---

## 7. Ko nedaryti

- Skirtingas brand wording kiekviename spoke, jei skelia entity  
- Hard sell „Buy Core €99“ entity eilutėje  
- Dėti spoke URL į hub `sitemap.xml`  
- Full domain 301 į `.app` subpaths (park; hub-and-spoke lieka)

---

## 8. Atsakymas sibling agentui

> Implement §3 copy as a footer line per §2–4. Match the contract; keep your layout. When done: PR/deploy URL + short note (EN/LT, UTM yes/no).

Hub `[QW1b]` uždaromas, kai **P1** (`.site` / `.cloud` / `.pro`) live.
