# ADR-0001: LP typeface = OS sans (be webfonto)

## Kontekstas

LP dizaino sistema ([design_system_roadmap2.md](../design_system_roadmap2.md)) apibrėžia spalvas, utility klases ir svorius, bet ne typeface failą. `--font-sans` yra `ui-sans-serif, system-ui, sans-serif`. Agentai kartais siūlo Inter/Geist, nes footeris Windows’e atrodo kaip „du šriftai“ (Segoe UI Black vs Segoe UI Regular). Roadmap §9 jau draudžia full font stack be performance diskusijos.

## Galimybės

- A: Palikti OS stack ir kanonizuoti (Windows = Segoe UI, macOS = SF Pro). Footerio „du šriftai“ gydyti svoriais/dydžiais, ne nauja šeima.
- B: Self-hosted webfontas (Inter/Geist) visam LP — atskiras performance PR (bundle, FOIT/FOUT, [performance-baseline.md](../performance-baseline.md)).

## Sprendimas

Pasirinkta **A**. LP nenaudoja webfonto. Webfontas tik su atskiru performance PR ir explicit savininko sprendimu.

Footerio taisyklė: wordmark gali būti `font-black` (900, kaip Navbar). Tagline / nuorodos / legal = `font-medium` (500) arba kolonų antraštės `font-bold` (700). Nemaišyti 900 su 400 tame pačiame kūno bloke; jokio `text-[11px]` fine print.

## Pasekmės

- Teigiamos: nulis font requestų critical path; agentai nebeieško Inter; Windows/macOS vizualas skiriasi, bet tai priimta.
- Neigiamos / ribos: Segoe UI Black ir Regular vis tiek skiriasi kirpimu; vienodumas tarp OS — ne šio kanono tikslas.
