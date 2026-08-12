# „Prompt Anatomy“ ekosistemos chirurginis verslo, GEO/AEO, SEO, CRO ir AI architektūros auditas

## Vadovų lygmens išvada ir vertinimo matrica

**Galutinė išvada:** „Prompt Anatomy“ šiuo metu yra stipresnis **mokymo ir metodinio turinio produktas** negu masteliui paruoštas SaaS ar enterprise AI operacinės sistemos verslas. Produkto branduolys — praktinis mokymasis, šešių blokų metodika, interaktyvūs moduliai, šablonų biblioteka ir konteksto inžinerija — yra gerokai brandesnis už tipines „promptų bibliotekas“. Tačiau augimą stabdo keturi sisteminiai trūkumai: per plati daugiadomenė architektūra, silpnai patvirtintas socialinis įrodymas, mažos vienkartinės kainos bei nepakankamai aiški riba tarp mokymo kurso, nemokamų įrankių ekosistemos ir enterprise AI valdymo produkto. citeturn0search0turn0search1turn0search9

Pagal šiame audite naudojamą griežtą formulę — 🟢 = 2 taškai, 🟡 = 1, 🔴 = 0 — produktas surenka **39 iš 100 enterprise parengties taškų**: vienas kriterijus atitinka aukštą standartą, devyni turi reikšmingų spragų, keturi yra kritiniai. Tai nėra rinkos reitingas ar išorinis benchmarkas; tai skaidrus šio audito prioritetų indeksas.

Auditas remiasi viešai pasiekiamomis svetainėmis, paieškos sistemų indeksuojamu turiniu ir viešų projekto repozitorijų kodu. Nebuvo atliktas realus pirkimas, nebuvo gauta prieiga prie visų daugiau nei 500 šablonų, „Stripe“, „Supabase“, „PostHog“, „Search Console“, pardavimų duomenų, backlinkų komercinių indeksų ar patvirtintų „CrUX“ lauko duomenų. Todėl 🟢 statusas skirtas tik tam, ką buvo galima pakankamai patikrinti.

| Vertinama sritis | Statusas | Esminė išvada |
|---|---:|---|
| Vertės pasiūlymas ir pozicionavimas | 🟡 **[WARN]** | Problema suprantama, bet kategorija ir enterprise diferenciacija dar nepakankamai tikslios |
| Monetizacija ir kainodara | 🔴 **[FAIL]** | €39–€99 lifetime modelis negali finansuoti ilgalaikio produkto, palaikymo ir B2B plėtros |
| Socialinis įrodymas ir pasitikėjimas | 🔴 **[FAIL]** | Yra baziniai teisiniai ir mokėjimo signalai, bet trūksta patikrintų rezultatų, klientų ir B2B garantijų |
| Entiteto autoritetas | 🔴 **[FAIL]** | Vidinė ekosistema plati, tačiau išorinė autoriteto ir identiteto koncentracija silpna |
| LLM ištraukiamumas ir tiesioginiai atsakymai | 🟡 **[WARN]** | Techninis GEO pagrindas geras, tačiau semantika tarp domenų nenuosekli |
| Citavimo kabliukai | 🟡 **[WARN]** | Yra originalių terminų, bet nepakanka duomenų, tyrimų ir vieno kanoninio metodikos šaltinio |
| Domenų ir ekosistemos architektūra | 🔴 **[FAIL]** | Per daug atskirų domenų skaido autoritetą, vartotojo kelią ir analitiką |
| Informacijos architektūra, schema ir crawlability | 🟡 **[WARN]** | Įdiegta daug gero, bet trūksta viešų intencinių puslapių ir pilno entiteto grafo |
| Greitis, mobilumas ir Core Web Vitals | 🟡 **[WARN]** | Kodas optimizuojamas, tačiau nėra pakankamai viešų lauko duomenų enterprise statusui |
| Magic-link onboarding | 🟡 **[WARN]** | Paprastas be slaptažodžio, bet grįžimo procesas per ilgas ir silpnai komunikuojamas |
| Interaktyvus mokymasis ir praktikos variklis | 🟢 **[OK]** | Tai stipriausia produkto dalis: praktika, patikros, progresas ir taikymo keliai |
| CTA ir konversijų architektūra | 🟡 **[WARN]** | CTA matomi, bet trūksta demonstravimo, įrodymų ir vienos dominuojančios konversijos |
| Šešių blokų metodika | 🟡 **[WARN]** | Gera edukacinė sistema, tačiau dar ne pilna enterprise vykdymo specifikacija |
| Šablonų kokybė ir apsaugos | 🟡 **[WARN]** | Yra stiprių pavyzdžių, bet „500+“ kolekcijos produkcinė kokybė neįrodyta |

**Trys stipriausi strateginiai laimėjimai.** Pirma, produktas pagrįstai juda nuo „parašyk geresnį promptą“ prie pakartojamų darbo eigų, konteksto, testavimo, versijavimo ir savininkystės. Antra, GEO techninis pasirengimas yra aukštesnis nei daugumos mažų edukacinių produktų: veikia `llms.txt`, išsamus LLM indeksas, statiniai „Markdown“ resursai, AI botų leidimai, schema, hreflang ir sitemap infrastruktūra. Trečia, interaktyvi mokymosi architektūra — patyrimas, patikra, praktika, moduliai, sertifikatai ir vaidmenimis grįsti keliai — yra realus produktinis pranašumas, o ne vien turinio pakuotė. citeturn0search1turn0search10turn5search11 fileciteturn6file0L2-L2

**Trys kritinės pažeidžiamos vietos.** Pirma, dešimties ar daugiau skirtingų domenų tinklas labiau atrodo kaip kelių prototipų portfelis negu viena patikima enterprise platforma. Antra, vienkartinis lifetime mokestis neatitinka nuolatinio AI modelių testavimo, turinio atnaujinimo, palaikymo, analitikos ir organizacinių funkcijų kaštų. Trečia, svetainė teigia turinti daugiau nei 600 praktikų ir daugiau nei 500 šablonų, tačiau viešas pirkėjas nemato pakankamai vardinių atsiliepimų, įmonių logotipų, patikrintų „prieš ir po“ rezultatų ar nepriklausomų rekomendacijų. fileciteturn9file0L2-L2

## Verslo modelis, vertės pasiūlymas ir pasitikėjimas

### Vertės pasiūlymas ir pozicionavimo aiškumas

**Statusas: 🟡 [WARN]**

**Diagnozė.** Pagrindinis pažadas „Turn random AI chats into repeatable business workflows“ yra suprantamas, orientuotas į problemą ir per kelias sekundes paaiškina transformaciją. Hero dalyje taip pat nurodomi daugiau nei 500 šablonų, GPT, automatizacijų ir komandinio pakartotinio naudojimo rezultatai. Tai yra stipriau už generinį „geresni promptai“ pozicionavimą. fileciteturn9file0L2-L2

Problema prasideda kategorijos lygmenyje. Vienur produktas pristatomas kaip „AI Operating System“, kitur kaip mokymo sistema, metodika, biblioteka, nemokamų įrankių ekosistema ar vadovų sprendimų rinkinys. `.cloud` ir dalis `.pro` turinio remiasi penkių dalių struktūra, o pagrindinis mokymas ir `.blog` — šešių blokų metodika. `.site` dar naudoja savo Anatomizer konstrukciją. Generatyvinei sistemai ir žmogui nėra iki galo aišku, ar tai viena universali metodika su skirtingais režimais, ar keli susiję metodai. citeturn0search2turn1view4turn5search7turn0search9

„Stop talking. Start building.“ yra energingas šūkis, bet jis nėra unikalus ir neapibrėžia idealios auditorijos. Enterprise pirkėjui reikia iškart suprasti tris dalykus: kam skirtas produktas, kokį procesą jis standartizuoja ir kokį rizikos arba produktyvumo rezultatą duoda.

**Strateginis taisymas.** Kategoriją reikia susiaurinti iki vieno kanoninio apibrėžimo:

> **Prompt Anatomy is an AI workflow operating system for teams: a method, training environment and template registry for turning one-off AI conversations into versioned, tested and reusable business workflows.**

Hero struktūra turėtų būti:

- H1: **Build AI workflows your team can reuse, test and govern.**
- Paaiškinimas: **A six-block method, interactive training and production-ready workflow templates for operations, marketing, HR and management teams.**
- Pirminis CTA: **Try a two-minute workflow**
- Antrinis CTA: **See individual and team plans**
- Įrodymo eilutė: konkretus išmatuotas rezultatas, o ne vien bendruomenės dydis.

„AI Operating System“ galima palikti kaip brandinę kategoriją, tačiau ją būtina paaiškinti vienu sakiniu. Penkių dalių įrankiai turi būti pervadinti į **„Quick mode based on the Six-Block Method“**, o ne pristatomi kaip lygiagreti architektūra.

### Monetizacija ir kainodaros architektūra

**Statusas: 🔴 [FAIL]**

**Diagnozė.** Dabartinė vieša pasiūla — „Starter“ už €39, apimantis pirmus tris modulius, ir „Core“ už €99, apimantis pirmus šešis modulius, su vienkartiniu mokėjimu bei lifetime prieiga. Kode taip pat numatyti aukštesni lygiai ir vėlesni moduliai, o svetainės tekste minimas €399 organizacijų pilotas. citeturn2search1 fileciteturn3file0L2-L2 fileciteturn9file0L2-L2

Toks modelis gali veikti kaip ankstyvas mokymo produkto validavimo mechanizmas, tačiau jis netinka deklaruojamai „AI operacinės sistemos“ ambicijai. Lifetime pažadas sukuria nuolatinį atnaujinimų ir palaikymo įsipareigojimą be pasikartojančių pajamų. AI modeliai, API, saugos rekomendacijos ir promptų praktikos keičiasi; produkcinės metodikos vertė remiasi būtent tęstiniu suderinamumu, vertinimu ir atnaujinimu.

Kainų architektūroje taip pat trūksta aiškių B2B vertės vienetų: vietų skaičiaus, administratoriaus funkcijų, progreso ataskaitų, komandinių šablonų registro, patvirtinimų, SLA, DPA, organizacijos diegimo ir atnaujinimų dažnio. €399 „pilotas“ yra pernelyg pigus, jeigu apima realią organizacijos diagnostiką, mokymus ir įgyvendinimą; tokia kaina pritrauks mažo įsipareigojimo klientus ir apsunkins aukštesnės kainos pardavimą.

**Strateginis taisymas.** Lifetime pasiūlymų nereikia nedelsiant naikinti. Juos reikia perkelti į **individualaus mokymosi įėjimo produktą**, o pasikartojančias pajamas kurti aplink komandinius ir nuolat atnaujinamus elementus:

| Pasiūlymas | Rekomenduojama logika | Vertės vienetas |
|---|---|---|
| Free | Keli vieši įrankiai, diagnostika ir ribotas metodikos preview | Lead ir produkto patyrimas |
| Individual Starter | Vienkartinė kaina, moduliai ir baziniai šablonai | Asmeninis mokymasis |
| Individual Core | Vienkartinė kaina arba metinis „updates pass“ | Visa pagrindinė metodika |
| Team | Apytiksliai €1 500–€3 000 per metus iki 10 vietų | Vietos, admin, ataskaitos, bendras registras |
| Team Pilot | €1 500–€3 000, įskaitomas į metinę sutartį | Vienas procesas, workshop, diegimas ir matavimas |
| Enterprise | Nuo maždaug €8 000 per metus ir įgyvendinimas | SSO, DPA, auditai, versijavimas, SLA, integracijos |

Aukščiausios vertės recurring sluoksnis neturi būti „daugiau promptų“. Jis turi parduoti:

- modelių suderinamumo testus;
- vertinimo rinkinius ir regresijos testus;
- komandinį promptų bei workflow registrą;
- governance atnaujinimus;
- administratoriaus analitiką;
- patvirtinimo ir publikavimo procesą;
- periodines ekspertų konsultacijas.

### Socialinis įrodymas ir pasitikėjimo architektūra

**Statusas: 🔴 [FAIL]**

**Diagnozė.** Bazinis pasitikėjimo sluoksnis egzistuoja: mokėjimus apdoroja „Stripe“, privatumo politika paaiškina minimalių pirkimo identifikatorių saugojimą, prieigos el. pašto naudojimą, „PostHog“ ir „Vercel“ analitiką, o taisyklėse pateikiami grąžinimo bei kontaktavimo principai. citeturn0search4turn0search8

Tačiau viešas B2B pirkėjas nemato pilno pasitikėjimo rinkinio. Teiginys „600+ practitioners“ nėra lydimas aiškaus skaičiavimo metodo, aktyvių naudotojų apibrėžimo ar patvirtintų rezultatų. Nerasta stipraus vardinių klientų atsiliepimų, įmonių logotipų, patvirtintų atvejų analizių, viešų partnerių ar nepriklausomų apžvalgų sluoksnio. Paieškoje dominuoja paties produkto domenai ir kūrėjo publikacijos; tai padeda entiteto nuoseklumui, bet nėra nepriklausomas rinkos patvirtinimas. citeturn12search0turn12search1turn12search2turn12search3

Vieša „Telegram“ grupė tinkama bendruomenės palaikymui, bet nėra pakankamas enterprise palaikymo kanalas. Organizacijos tikėsis privataus supporto, atsakymo terminų, duomenų tvarkymo susitarimo, subprocesorių sąrašo, incidentų kontakto ir aiškaus paslaugos lygio.

**Strateginis taisymas.** Artimiausias tikslas turėtų būti ne „daugiau testimonials“, o **patikrinamas įrodymų paketas**:

1. Trys vardinės atvejų analizės su kliento vaidmeniu, pradiniu procesu, diegta workflow, matavimo laikotarpiu ir rezultatu.
2. Penki trumpi vardiniai atsiliepimai su LinkedIn profiliu arba įmonės identitetu.
3. Aiškus „600+“ skaičiaus apibrėžimas arba jo pašalinimas.
4. Viešas saugumo ir duomenų puslapis: duomenų srautai, saugojimo terminai, subprocesoriai, regionai, DPA užklausa, incidentų kontaktas.
5. Konkreti grąžinimo politika viename sakinyje prie kainos, ne vien nuoroda „contact us“.
6. B2B supporto el. paštas ir atsakymo laikas, pavyzdžiui, viena darbo diena.
7. „Built by“ blokas su kūrėjo kompetencija, publikacijomis ir aiškiu juridiniu paslaugos teikėju.

## GEO ir AEO pasirengimas

### Entiteto autoritetas ir žinių grafas

**Statusas: 🔴 [FAIL]**

**Diagnozė.** Vidinis entiteto žemėlapis techniškai yra gana išsamus. Pagrindinės repozitorijos dokumentacijoje apibrėžiami `promptanatomy.app`, `/anatomy/`, `.site`, `.cloud`, `.info`, `.space`, `.help`, `.ceo`, `.pro`, `.blog` ir `.lol` vaidmenys, nurodomas kūrėjas Tomas Staniulis ir išoriniai profiliai. `llms.txt` taip pat pateikia kūrėją, kainas, ekosistemos nuorodas ir pagrindinius apibrėžimus. fileciteturn3file0L2-L2 citeturn0search6

Tačiau žinių grafui svarbu ne tik tarpusavio nuorodos, bet ir vienas stabilus entiteto centras, vienoda terminija bei nepriklausomi patvirtinimai. Šiuo metu:

- tas pats brandas išdėstytas per daug atskirų root domenų;
- penkių ir šešių blokų terminija konkuruoja;
- „AI Operating System“, „training system“, „executive kit“, „prompt library“ ir „ecosystem“ vartojami kaip beveik lygiavertės kategorijos;
- „Prompt Anatomy“ yra bendrinio pobūdžio frazė, vartojama ir nesusijusiuose promptų straipsniuose bei tyrimuose, todėl kūrėjo ir produkto disambiguacija yra būtina. citeturn4search10turn12search5turn12search7

Išorinė autoriteto bazė nedidelė. Kūrėjo „Medium“ straipsniai naudingi semantiniam padengimui, bet išlieka savarankiškai publikuotas turinys, o ne trečiųjų šalių citatos ar nepriklausomi produkto įvertinimai. citeturn12search2turn12search11

**Strateginis taisymas.** Reikia sukurti vieną kanoninį entiteto centrą `promptanatomy.app/about` arba `promptanatomy.app/methodology`, kuriame būtų:

- vieno sakinio apibrėžimas;
- kūrėjo vardas ir `Person` schema;
- organizacijos `Organization` schema;
- `sameAs` nuorodos;
- metodikos pavadinimas ir versija;
- publikavimo data bei changelog;
- nuorodos į visas oficialias nuosavybes;
- aiškus penkių dalių įrankių santykis su šešių blokų metodika;
- cituojamas metodikos PDF arba HTML tyrimo dokumentas.

Kiekvienas satelitinis domenas turi identiškai nurodyti: **„Part of the Prompt Anatomy ecosystem by Tomas Staniulis; canonical methodology at Prompt Anatomy“** ir naudoti tą patį organizacijos bei kūrėjo identifikatorių.

### LLM ištraukiamumas ir tiesioginių atsakymų optimizavimas

**Statusas: 🟡 [WARN]**

**Diagnozė.** Tai viena techniškai stipriausių sričių. Build procesas generuoja trumpą `llms.txt`, išsamų `llms-full.txt`, anglų ir lietuvių kalbų „Markdown“ puslapius, teisinių puslapių santraukas ir atnaujina sitemap `lastmod`. LLM dokumentuose išvardijami kūrėjas, publikacijos, kainos, ekosistema, FAQ, kontaktai ir temos. fileciteturn6file0L2-L2

`robots.txt` aiškiai leidžia Google, Bing, OAI Search, GPTBot, Claude, Perplexity ir kitus AI crawlerius. Transakciniai keliai ir mokymo aplikacija yra blokuojami, kas apsaugo uždarą aplikaciją nuo nereikalingo indeksavimo. fileciteturn7file0L2-L2

Vis dėlto `llms.txt` yra bendruomenės konvencija, o ne oficialus paieškos reitingavimo ar citavimo standartas. Nėra pagrindo tikėtis, kad vien jo buvimas užtikrins citatas ChatGPT, Gemini ar Perplexity. citeturn11search10

Didesnė rizika yra turinio prieštaringumas. Vienas AI crawleris gali iš `.app` ištraukti šešių blokų metodą, kitas iš `.cloud` — penkių dalių sistemą, trečias iš `.pro` — penkių blokų vadovo struktūrą. Be aiškaus „pagrindinė metodika / supaprastintas režimas“ santykio LLM gali pateikti neteisingą blokų skaičių arba sumaišyti jų pavadinimus. citeturn0search2turn1view4turn0search9

**Strateginis taisymas.**

Kanoninis metodikos atsakymo blokas turi būti vienodas visuose domenuose:

> **Prompt Anatomy is a six-block AI workflow methodology: Meta, Input, Output, Decision Process, Quality and Advanced Controls. Some ecosystem tools use a simplified five-part interface, but they map back to the six-block canonical method.**

Reikia sukurti viešus, statinius ir crawlable endpointus:

- `/what-is-prompt-anatomy/`
- `/six-block-method/`
- `/glossary/`
- `/prompt-registry/`
- `/ai-workflow-template/`
- `/teams/`
- `/research/`
- `/methodology.md`
- `/glossary.json`

Kiekviename apibrėžime turi būti trumpas 40–70 žodžių atsakymas, išplėstas paaiškinimas, lentelė, pavyzdys, versija, autorius ir nuoroda į pagrindinį metodikos puslapį. Tyrimai apie generatyvinių sistemų citavimą rodo, kad aiški struktūra, apibrėžimai, palyginimai, procedūros ir faktiniai duomenys padeda ištraukiamumui, tačiau perdėtas generinis „GEO perrašymas“ gali pabloginti retrieval rezultatą; optimizavimą reikia tikrinti realiomis užklausomis. citeturn11academia36turn11academia38turn11search12

### Citavimo ir nuorodų kabliukų architektūra

**Statusas: 🟡 [WARN]**

**Diagnozė.** Ekosistema turi originalių ir potencialiai cituojamų terminų: „Six-Block Method“, „Prism Test“, „Quick Send Check“, „Prompt Registry“, „Context Architecture“ bei „Experience → Check → Practice“. `.pro` „Prism Test“ ir viešos metodikos drobės suteikia vardinius, pakartojamus konstruktus, kurie yra geresni citavimo objektai nei bendriniai straipsniai „10 promptų patarimų“. citeturn0search15turn0search12turn5search5

Tačiau citavimo kabliukas turi turėti ne tik pavadinimą. Jam reikia vieno kanoninio apibrėžimo, autoriaus, datos, versijos, taikymo ribų, pavyzdžių ir, idealiu atveju, empirinio pagrindimo. Dabartiniai skaičiai — daugiau nei 500 šablonų, daugiau nei 600 praktikų ar pažadai sukurti didelį turinio kiekį per trumpą laiką — nėra lydimi viešos metodologijos, imties ar audituojamų rezultatų. fileciteturn9file0L2-L2 citeturn12search0

**Strateginis taisymas.** Vietoj didesnio straipsnių kiekio reikia sukurti **AEO citation engine** iš šešių aukšto autoriteto resursų:

1. „The Six-Block AI Workflow Method“ — kanoninė metodikos specifikacija.
2. „Prompt Anatomy Benchmark“ — 20–50 realių užduočių palyginimas tarp nestruktūruoto ir struktūruoto prompto.
3. „Prompt Registry Standard“ — schema, laukų aprašymas ir pavyzdinis JSON.
4. „Prism Test“ — apibrėžimas, vertinimo matrica ir ribos.
5. „AI Workflow Failure Taxonomy“ — dažniausių nesėkmių klasifikacija.
6. „Model Compatibility Report“ — periodinis vienodų workflow testas skirtingose modelių šeimose.

Kiekvienam resursui reikia citavimo bloko su autoriumi, versija, publikavimo data ir pageidaujamu pavadinimu. GEO rezultatą reikia matuoti ne vienu rankiniu bandymu, o kartotinėmis užklausomis, nes generatyvinių atsakymų matomumas yra stochastinis. citeturn11academia37turn11academia39

## Techninis SEO, informacijos architektūra ir našumas

### Domenų ir ekosistemos architektūra

**Statusas: 🔴 [FAIL]**

**Diagnozė.** Dabartinė architektūra yra sąmoningas hub-and-spoke modelis: pagrindinis `.app` domenas skirtas konversijai ir prieigai, `/anatomy/` — mokymui, `.site` — atradimui, `.cloud` — onboardingui, o kiti domenai atskiriems vaidmenims ir darbo scenarijams. fileciteturn3file0L2-L2

Strategija konceptualiai įdomi, bet jos mastas per didelis. Kiekvienas root domenas atskirai turi kaupti:

- nuorodų autoritetą;
- brandines užklausas;
- crawlerio pasitikėjimą;
- schema signalus;
- vartotojų įsimenamumą;
- analitikos istoriją;
- consent ir teisinių dokumentų nuoseklumą.

Jeigu skirtingi domenai turi skirtingą turinį, cross-domain canonical jų praktiškai nesujungs į vieną autoriteto objektą. Jei jie atlieka panašias funkcijas, kyla dubliavimo ir kanibalizacijos rizika. Jei jie labai skirtingi, vartotojui nebeaišku, kas yra pagrindinis produktas.

Šis auditas neturėjo „Ahrefs“, „Semrush“ ar „Moz“ backlinkų duomenų, todėl neteigia konkretaus DR ar DA nuostolio. Kritinis statusas pagrįstas architektūros fragmentacija, o ne išgalvotu autoriteto skaičiumi.

**Strateginis taisymas.** Rekomenduojama tikslinė architektūra:

| Dabartinis vienetas | Tikslinė vieta |
|---|---|
| Pagrindinė svetainė | `promptanatomy.app` |
| Mokymas | `promptanatomy.app/anatomy/` |
| Metodika ir žodynas | `promptanatomy.app/methodology/` |
| Nemokami įrankiai | `promptanatomy.app/tools/` |
| Promptų biblioteka | `promptanatomy.app/library/` |
| Komandų ir enterprise pasiūlymas | `promptanatomy.app/teams/` |
| Blogas | `promptanatomy.app/blog/` arba vienas nuosekliai valdomas blogo subdomenas |
| Atskiri vaidmenų įrankiai | `/tools/create`, `/tools/hire`, `/tools/manage`, `/tools/decide` |

Dabartinius domenus galima palikti kaip apsauginius arba kampanijų adresus, tačiau jie turėtų daryti 301 į atitinkamus pagrindinio domeno kelius. Išimtis galima tik tam satelitui, kuris turi įrodomą atskirą paklausą, backlinkų profilį ar produkto naudojimą.

Svarbiausia taisyklė: **nestatyti nė vieno naujo root domeno**, kol nėra išmatuota, kad esami domenai generuoja atskirą organinį ar komercinį rezultatą.

### Informacijos architektūra, schema ir crawlability

**Statusas: 🟡 [WARN]**

**Diagnozė.** Pagrindinės svetainės SEO komponentas valdo canonical URL, `hreflang`, dokumento kalbą, robots direktyvas, Open Graph, Twitter korteles ir JSON-LD. Pradiniame puslapyje generuojami `WebPage`, `Course`, `Offer` ir ekosistemos `ItemList` objektai. Tai yra tvirtas techninis pagrindas. fileciteturn5file0L2-L2

EN ir LT puslapiai turi stabilius atskirus URL, o `/en` kanonizuojamas į pagrindinį anglišką URL. Toks sprendimas iš esmės atitinka daugiakalbių svetainių canonical ir hreflang principus. fileciteturn3file0L2-L2 citeturn9search10

Tačiau yra penkios spragos:

- Route lygmens kode matyti nuorodos į `#organization`, tačiau šiame komponente pats `Organization` ar `Person` objektas nesukuriamas; reikia patikrinti ir testu užtikrinti, kad jis tikrai pateikiamas pradiniame HTML.
- Nėra pilno viešo `SoftwareApplication` arba `Product` aprašo, kuris atskirtų mokymo aplikaciją nuo kurso.
- FAQ turinys yra, bet jo schema viešame route komponente nepateikiama. Vis dėlto tai nėra didelė „rich result“ galimybė: Google FAQ rezultatus daugiausia riboja autoritetingoms sveikatos ir valdžios svetainėms. citeturn9search4
- `/anatomy/` visiškai blokuojamas `robots.txt`; tai logiška uždaram kursui, tačiau reiškia, kad kiekvienam svarbiam moduliui reikia atskiro viešo, indeksuojamo preview arba rezultatų puslapio. fileciteturn7file0L2-L2
- Pagrindinė svetainė optimizuota daugiausia brandiniam terminui. Trūksta atskirų puslapių nebrandinėms intencijoms, pavyzdžiui, „prompt engineering framework for teams“, „AI workflow templates“, „prompt registry“, „context engineering course“ ir „AI training for operations teams“.

Google gali apdoroti dinamiškai įterptą JSON-LD, tačiau struktūriniai duomenys turi tiksliai atitikti matomą puslapio turinį, o svarbi informacija turi būti pateikta ir kaip indeksuojamas tekstas. citeturn9search2turn9search5turn9search11

**Strateginis taisymas.**

Artimiausias techninis paketas:

- Vienas `@graph`, kuriame būtų `Organization`, `Person`, `WebSite`, `WebPage`, `Course`, `SoftwareApplication`, `Offer`, `BreadcrumbList` ir, kur tinka, `Article`.
- Stabilūs `@id`, bendri visuose puslapiuose ir domenuose.
- Viešas `/anatomy/overview/` puslapis su modulių žemėlapiu, rezultatais, preview ir indeksuojama tekstine informacija.
- `/methodology/` puslapis su šešių blokų schema.
- `/templates/` kategorijų puslapiai su realiais, matomais pavyzdžiais.
- `/teams/` puslapis su organizacijų use case, kainodaros logika ir procurement informacija.
- Automatiniai schema testai CI procese.
- Savaitinis GSC indeksavimo ir canonical klaidų patikrinimas.

### Puslapio greitis, mobilus veikimas ir Core Web Vitals

**Statusas: 🟡 [WARN]**

**Diagnozė.** Kodo lygmenyje matyti keli geri sprendimai. Projektas naudoja „Vite“, kritiniai papildomi puslapiai ir žemiau hero esantys komponentai kraunami per `React.lazy`, o esamos prieigos atkūrimas atidedamas iki idle momento. Tai sumažina pradinio renderio apkrovą. fileciteturn4file0L2-L2 fileciteturn13file0L2-L2 fileciteturn14file0L2-L2

Kartu naudojami „Vercel Analytics“, pasirenkamas „PostHog“ ir pasirenkamas X konversijų pixelis. Kiekvienas atskirai gali būti pagrįstas, tačiau be griežtos consent ir loading strategijos keli analitikos sluoksniai didina JavaScript, tinklo ir privatumo sudėtingumą. fileciteturn3file0L2-L2

Audito metu nebuvo gautas patikimas viešas „CrUX“ lauko duomenų rinkinys ar pakartotas pilnas mobilus „Lighthouse“ testas, todėl 🟢 statusas nebūtų pagrįstas. Vertinti reikia pagal lauko rodiklius, o ne vien lokalią build kokybę. Rekomenduojami Core Web Vitals slenksčiai yra LCP iki 2,5 s, INP iki 200 ms ir CLS iki 0,1 ties 75-uoju procentiliu. citeturn10search5turn10search9turn10search14

**Strateginis taisymas.**

Per pirmą savaitę reikia įrašyti bazinius duomenis:

- mobilus ir desktop „PageSpeed Insights“;
- „CrUX“ lauko duomenys, jei pakanka srauto;
- Vercel Real Experience Score;
- JavaScript bundle dydis;
- trečiųjų šalių užklausų kiekis;
- hero LCP elemento dydis;
- CTA paspaudimo INP;
- layout shift per kainodaros ir prieigos būsenų pasikeitimus.

Techniniai prioritetai:

- kritinį hero tekstą ir CTA pateikti serverio arba statiniame HTML;
- peržiūrėti fontų ir hero vaizdų preload;
- atidėti „PostHog“ ir reklamos pixelį iki sutikimo;
- nenaudoti dviejų analitikos sistemų tam pačiam tikslui be aiškios priežasties;
- rezervuoti vietą dinamiškai prieigos ir kainodaros būsenai;
- įdiegti bundle biudžetą CI, pavyzdžiui, perspėjimą padidėjus pagrindiniam bundle daugiau nei 10 %.

## Produkto UX, onboarding ir konversijų architektūra

### Magic-link prieigos patirtis

**Statusas: 🟡 [WARN]**

**Diagnozė.** Slaptažodžio neturintis modelis yra racionalus mažam mokymo produktui. Vartotojas įveda pirkimui naudotą el. paštą, paspaudžia „Check“ ir tada „Go to training“. El. paštas gali būti išsaugomas tik naršyklėje, pateikiama galimybė jį pašalinti, o magic-link atidaromas tame pačiame lange dėl geresnio iOS ir Safari patikimumo. citeturn2search0 fileciteturn14file0L2-L2

Tačiau tai nėra visiškai „instant access“. Grįžtantis vartotojas gali turėti:

1. rasti kainodaros sekciją;
2. prisiminti pirkimo el. paštą;
3. įvesti el. paštą;
4. atlikti prieigos patikrą;
5. generuoti nuorodą;
6. pereiti į mokymą.

Tai daugiau veiksmų nei įprastas išsaugotas autentifikacijos seansas. Vartotojas taip pat gali nesuprasti, ar magic-link siunčiamas į paštą, ar sugeneruojamas naršyklėje, ir kodėl prieigos forma yra kainodaros, o ne atskiro prisijungimo puslapio dalis.

Iš saugumo pusės prieigos tikrinimo endpointas turi vengti detalaus el. pašto egzistavimo atskleidimo, turėti rate limiting ir neutralius atsakymus. Viešas kodas rodo prieigos tikrinimo bei tokenų architektūrą, tačiau pilno produkcijos saugumo konfigūracijos iš išorės patikrinti negalima. fileciteturn3file0L2-L2

**Strateginis taisymas.**

- Navigacijoje naudoti atskirą **„Sign in / Continue training“** kelią.
- Sukurti `/access` puslapį, atskirtą nuo kainodaros.
- Po pirmo magic-link nustatyti saugų, riboto galiojimo HttpOnly sesijos cookie.
- Leisti magic-link išsiųsti el. paštu kaip atsarginį variantą.
- Po pirkimo vartotoją iškart nukreipti į konkretų pirmą modulį.
- Rodyti „Your plan“, „Continue from module X“, progreso procentą ir paskutinę veiklą.
- Prie klaidų naudoti neutralų tekstą: „Jeigu šiam adresui yra suteikta prieiga, pateiksime tęstinumo veiksmą.“
- Rate limit, tokenų rotacija, vienkartinis naudojimas ir audito logai turi būti produkcijos priėmimo kriterijai.

### Interaktyvus mokymasis ir praktikos variklis

**Statusas: 🟢 [OK]**

**Diagnozė.** Tai geriausiai išpildyta produkto dalis. Mokymo sistema turi pilnai įgyvendintus pagrindinius modulius, produkcinį M1–M9 build, aukštesnių organizacinių kelių build profilius, testus, praktiką, sertifikatus, vietinį progreso saugojimą, PDF atmintines, vaidmenų kelius ir atskirus duomenų analizės, agentų bei turinio inžinerijos etapus. fileciteturn11file0L2-L2

Produkto logika „Experience → Check → Practice“ gerai atitinka realų įgūdžio formavimą. Vėlesniuose atnaujinimuose atsirado gated checks, pasiekiami handoutai ir trumpesni vaidmenimis grįsti copy-run-check keliai. Tai suteikia aiškų naudojimo veiksmą, o ne vien pasyvų turinį. citeturn0search10turn5search9turn5search11

Vieši įrankiai taip pat rodo tinkamą „local-first“ principą: dalis įvedamo teksto lieka vartotojo įrenginyje, o sugeneruoti promptai gali būti perkeliami į pasirinktą modelį. `.pro` pateikia sprendimo taisykles, rizikas, output struktūras ir daugiau nei paprastą vieno sakinio promptą. citeturn1view4

Likusi rizika: sertifikatas rodo kurso atlikimą, bet ne automatiškai įrodo gebėjimą saugiai diegti enterprise AI workflows. Produkto komunikacijoje šių dviejų teiginių nereikia maišyti.

**Strateginis taisymas.** Praktikos variklį paversti pagrindiniu pardavimo demonstravimu:

- viešas dviejų minučių mini modulis be registracijos;
- vienas pilnas workflow nuo problemos iki įvertinto rezultato;
- anoniminis pavyzdinis „before/after“;
- vertinimo rubrika;
- galimybė išsisaugoti darbą po el. pašto įvedimo;
- komandos vadovo režimas su užduoties priskyrimu;
- bendras komandos rezultatų dashboardas;
- artefakto eksportas į promptų registrą.

Būtent šis komponentas turėtų būti pirmas vartotojo patyrimas, o ne ekosistemos žemėlapio skaitymas.

### CTA ir konversijų piltuvas

**Statusas: 🟡 [WARN]**

**Diagnozė.** Hero, navigacijoje ir kainodaroje CTA yra matomi. Naudojami „Choose a plan“, „See plans and pricing“, „Get access“ ir „Go to training“. Pagrindinio puslapio kodas nuosekliai scrollina į kainodarą, o prieigą turintiems vartotojams pateikia tiesioginį mokymo veiksmą. fileciteturn14file0L2-L2

Problema yra ne CTA trūkumas, o jų funkcija. Naujam vartotojui pirmas siūlomas didesnis veiksmas yra pirkti, nors produktą sunku suprasti be patyrimo. „Choose a plan“ yra transakcinis, o ne rezultato CTA. Kartu puslapyje siūloma daugybė ekosistemos krypčių, todėl dėmesys išskaidomas tarp pirkimo, nemokamų įrankių, blogo, bibliotekos, „Cloud“, „Pro“ ir kitų domenų. fileciteturn9file0L2-L2

Konversijos vietoje taip pat trūksta įrodymo sluoksnio: vardinio atsiliepimo, rezultato, trumpo produkto vaizdo, modulio preview, refund sąlygų vienu sakiniu ir aiškios „kam netinka“ kvalifikacijos.

**Strateginis taisymas.** Vienas pagrindinis piltuvas:

> Search / content → two-minute workflow → result preview → email save → Starter/Core or Team path.

Hero CTA hierarchija:

- **Pirminis:** „Build your first workflow“
- **Antrinis:** „View plans“
- **Tekstinė nuoroda:** „For teams“

Prie kainodaros turi būti:

- trumpa 60–90 sekundžių demonstracija;
- trys patikrinti rezultatai;
- „Starter vs Core“ palyginimas pagal rezultatą, ne vien modulių skaičių;
- aiški refund sąlyga;
- „Secure payment by Stripe“;
- paaiškinimas, kaip veikia prieiga;
- komandos alternatyva;
- FAQ iškart po kainodaros, ne po plataus ekosistemos bloko.

Mobiliajame variante rekomenduojamas sticky CTA, bet tik vienas — ne keli konkuruojantys mygtukai.

## Šešių blokų metodikos ir šablonų architektūros integralumas

### Šešių blokų metodikos techninis vertinimas

**Statusas: 🟡 [WARN]**

**Diagnozė.** Kanoniniai blokai — `Meta`, `Input`, `Output`, `Reasoning`, `Quality`, `Advanced` — sudaro logišką edukacinę seką:

- kas atlieka užduotį ir koks tikslas;
- kokie faktai ir apribojimai pateikiami;
- kokia turi būti išvestis;
- kaip užduotis išskaidoma;
- kaip tikrinama kokybė;
- kokie papildomi nustatymai ar kontrolės taikomi.

Viešas „Six-Block Canvas“ papildo metodą prompto ID, savininku, workflow ID, vertinimo atvejais ir registro nuoroda. Promptų registro medžiaga akcentuoja versijavimą, savininkystę, modelių ir aplinkos fiksavimą, changelog bei eval nuorodas. Tai yra ženkliai brandžiau už paprastą ROLE–TASK–FORMAT formulę. citeturn0search9turn0search12turn5search5

Tačiau šeši blokai dar nėra pilna enterprise vykdymo specifikacija. Produkciniam AI workflow papildomai reikia:

- modelio ir providerio versijos;
- system, developer ir user instrukcijų atskyrimo;
- tool ir API kontraktų;
- struktūruotos output schemos;
- retrieval ir šaltinių politikos;
- duomenų klasifikacijos;
- prompt injection apsaugos;
- refusal ir fallback būsenų;
- timeout, retry ir kaštų ribų;
- testų rinkinio;
- stebėsenos;
- rollback;
- žmogaus eskalacijos;
- audito žurnalo.

Pačios „Prompt Anatomy“ publikacijos dalį šių elementų jau aptaria: registro schema, konteksto sluoksniai, duomenų klasifikacija, injekcijų testai, least privilege, žmogaus eskalacija ir rollback. Vadinasi, spraga yra ne žinių trūkumas, o šių elementų nepakankamas integravimas į pagrindinį šešių blokų produkto pažadą. citeturn0search11turn5search3turn5search13

`Reasoning` blokas taip pat yra per daug priklausomas nuo „Chain of Thought“ terminijos. Metodika neturėtų mokyti reikalauti paslėpto modelio samprotavimo teksto. Patikimiau mokyti **sprendimo procedūros, išskaidymo, patikrinamų tarpinių artefaktų ir trumpo pagrindimo**. Dabartinės providerio rekomendacijos akcentuoja aiškias instrukcijas, ribas, nuoseklius delimiterius, output schemas, grounding ir reprezentatyvius evals, o ne maksimaliai ilgus universalius promptus. citeturn10search0turn10search10turn4search35

Userio paminėti GPT-4o, Claude 3.5 Sonnet ir Gemini 1.5 Pro yra 2024 metų modelių kartos orientyrai. Metodika turi būti kuriama ne konkretiems jų elgesio ypatumams, o modelių šeimų kaitai.

**Strateginis taisymas.** Šešių blokų metodiką reikia padalyti į du sluoksnius.

**Mokymosi drobė:**

1. Meta
2. Input
3. Output
4. Decision Process
5. Quality
6. Controls

**Produkcijos manifestas:**

```yaml
workflow:
  id:
  owner:
  version:
  business_goal:
  risk_class:

model:
  provider:
  model_id:
  temperature:
  max_output:
  fallback_model:

context:
  permitted_sources:
  prohibited_data:
  retrieval_policy:
  freshness_requirement:

interaction:
  system_instructions:
  user_template:
  variables:
  tools:
  output_schema:

controls:
  injection_policy:
  pii_policy:
  refusal_conditions:
  human_review:
  timeout:
  retry_policy:

evaluation:
  dataset:
  pass_threshold:
  factuality_checks:
  schema_checks:
  regression_suite:

operations:
  logging:
  monitoring:
  cost_limit:
  rollback_version:
```

„Advanced“ neturėtų likti neapibrėžtas likutinis blokas. Jį reikia pervadinti į „Controls“ ir aiškiai apriboti: įrankiai, modelio parametrai, sauga, fallback ir operacinės taisyklės.

### Šablonų kokybė, guardrails ir produkcinė parengtis

**Statusas: 🟡 [WARN]**

**Diagnozė.** Vieši pavyzdžiai rodo, kad dalis šablonų yra pakankamai struktūruoti: turi kintamuosius, įvesties laukus, output sekcijas, rizikų ir sprendimų reikalavimus. `.pro` vadovų promptai reikalauja nekurti faktų, vengti generinių rekomendacijų ir pateikti sprendimui tinkamą rezultatą. Šešių blokų drobė bei registras numato savininkus, versijas ir eval atvejus. citeturn1view4turn0search12turn5search5

Tačiau nebuvo suteikta prieiga audituoti visą „500+“ korpusą, todėl negalima patvirtinti, kad visi šablonai yra production-grade. Vieša medžiaga rodo nevienodą brandą: vieni promptai turi aiškius kintamuosius ir struktūrą, kiti labiau primena mokomąsias instrukcijas. Trūksta viešai įrodyto bendro standarto, pagal kurį kiekvienas šablonas privalomai turėtų:

- šaltinių politiką;
- struktūruotą schemą;
- trūkstamų duomenų elgesį;
- „nežinau“ arba abstention taisyklę;
- PII ir konfidencialumo kontrolę;
- prompt injection atsparumą;
- įrankių leidimus;
- modelio versiją;
- testų rinkinį;
- išmatuotą pass rate;
- klaidų ir fallback logiką.

Kita svarbi rizika — kiekio signalas. „500+ templates“ gali didinti suvokiamą vertę, tačiau enterprise pirkėjui 500 neklasifikuotų šablonų yra labiau valdymo našta nei pranašumas.

**Strateginis taisymas.** Visą biblioteką reikia klasifikuoti:

| Lygis | Apibrėžimas |
|---|---|
| Bronze | Mokymosi pavyzdys; ne produkcijai |
| Silver | Patikrintas rankiniu būdu keliuose modeliuose; turi kintamuosius ir struktūrą |
| Gold | Turi JSON schemą, saugos taisykles, šaltinių politiką, eval datasetą, pass threshold, versiją ir savininką |
| Enterprise | Gold + rizikos klasė, approval, audit log, duomenų klasifikacija ir organizacijos adaptacija |

Pirmas komercinis tikslas turėtų būti ne „500 Gold šablonų“, o **20 aukštos vertės, audituotų workflow paketų**:

- savaitinės vadovų ataskaitos;
- klientų tyrimo santrauka;
- marketingo kampanijos briefas;
- darbo skelbimo ir kandidatų vertinimo workflow;
- susitikimų sprendimų registras;
- pardavimų pasiūlymo parengimas;
- duomenų analizės workflow;
- rizikų peržiūra;
- politikos dokumento analizė;
- klientų aptarnavimo eskalacija.

Kiekvienam paketui reikia testavimo ataskaitos per bent tris aktualias modelių šeimas, nurodant schemos validumą, faktinių klaidų dažnį, output variaciją, žmogaus vertinimą ir kaštus.

## Devyniasdešimties dienų vykdymo planas

Pagrindinis prioritetas nėra sukurti dar vieną metodikos sluoksnį ar papildomą domeną. Reikia **sukoncentruoti autoritetą, įrodyti rezultatą ir sukurti pasikartojančių pajamų produktą**.

| Laikotarpis | Prioritetas | Konkretūs darbai | Atsakinga funkcija | Priėmimo kriterijai |
|---|---|---|---|---|
| Dienos 1–30 | Momentiniai pataisymai ir baziniai matavimai | Sustabdyti naujus domenus; perrašyti hero; sukurti vieną produkto apibrėžimą; atskirti „Try“ ir „Buy“ CTA; sukurti `/access`; pridėti vardinius įrodymus; sutvarkyti refund ir B2B supportą; papildyti entiteto schema; paleisti PSI, GSC ir GEO baseline | Founder/CPO, frontend, SEO/GEO | Vienas kanoninis apibrėžimas; trys patikrinti testimonials; du vieši atvejų rezultatai; schema be kritinių klaidų; užfiksuoti CWV ir GEO baseline |
| Dienos 31–60 | Sisteminis konsolidavimas ir autoriteto kūrimas | Parengti domenų migracijos žemėlapį; sukurti metodikos hubą; paleisti 15–25 intencinius puslapius; publikuoti Six-Block specifikaciją ir Prompt Registry Standard; suklasifikuoti 500+ biblioteką; sukurti 20 Gold workflow paketų | CPO, content/GEO, engineering | Visos pagrindinės sąvokos turi vieną canonical; 20 Gold paketų; nėra naujų root domenų; pradėti 301 arba konsolidavimo darbai |
| Dienos 61–90 | Monetizacija ir B2B mastelis | Paleisti Team metinį planą; pakelti pilotų kainą; pridėti admin, assignments ir reporting MVP; sukurti DPA/security paketą; parduoti penkis pilotus; periodiškai testuoti modelių suderinamumą | CEO/sales, product, engineering | Penki mokami pilotai; bent du perėjimai į metinę sutartį; pirmos recurring pajamos; vienas modelių suderinamumo reportas |

### Dienos 1–30: neatidėliotini darbai

**Svarbiausi produkto pakeitimai:**

- Pakeisti hero į aiškią team workflow kategoriją.
- Pirminiu CTA padaryti nemokamą dviejų minučių praktinį workflow.
- Pašalinti arba paaiškinti penkių ir šešių blokų prieštaravimą.
- Kainodaros zonoje pateikti produkto demonstraciją, proof ir refund sąlygą.
- Sukurti atskirą prisijungimo bei tęstinio mokymosi puslapį.
- Aiškiai atskirti individualų kursą ir organizacijų pasiūlymą.

**Svarbiausi SEO ir GEO darbai:**

- Vienas `Organization` ir `Person` grafas.
- Vienas kanoninis metodikos puslapis.
- Vieši crawlable `/methodology`, `/templates`, `/teams` ir `/anatomy/overview` puslapiai.
- 50 tikslinių AEO/GEO užklausų baseline per ChatGPT, Perplexity ir Gemini, kiekvieną kartojant kelis kartus.
- Matuoti ne tik produkto paminėjimą, bet ir citatą, teisingą šešių blokų išvardijimą, kūrėjo identifikavimą ir pagrindinio domeno pasirinkimą.

**Svarbiausi komerciniai darbai:**

- Penki pokalbiai su realiais B2B pirkėjais apie vieną workflow problemą.
- Parduoti pilotą prieš kuriant pilną komandos platformą.
- Nenaudoti €399 kaip numatytos enterprise kainos; šią kainą galima palikti tik trumpam diagnostiniam workshopui be individualaus diegimo.

### Dienos 31–60: sisteminiai atnaujinimai

Konsolidavimo seka:

1. Inventorizuoti kiekvieno domeno srautą, backlinks, indeksuotus puslapius, konversijas ir realų naudojimą.
2. Kiekvienam domenui priskirti: **keep**, **merge**, **redirect** arba **retire**.
3. Pagrindinį autoritetą nukreipti į `.app`.
4. Perkelti aukštos vertės turinį, išsaugant URL redirectus.
5. Atnaujinti canonical, sitemap, schema, vidines nuorodas ir analitiką.
6. Stebėti indeksavimo bei pozicijų pokyčius bent aštuonias–dvylika savaičių.

Programatiniai puslapiai turi būti kuriami tik ten, kur egzistuoja reali intencija ir skirtinga naudotojo problema. Vengti šimtų beveik identiškų „AI prompt for X“ puslapių. Geresnis pradinis rinkinys:

- prompt engineering framework for teams;
- AI workflow templates;
- context engineering framework;
- prompt registry template;
- AI prompt governance;
- AI training for operations;
- AI training for HR;
- AI training for marketing;
- AI workflow evaluation;
- reusable prompts for teams;
- prompt versioning;
- enterprise AI workflow pilot.

Kiekvienas puslapis turi turėti realų pavyzdį, workflow schemą, downloadą, FAQ, autoriaus bloką ir nuorodą į susijusį praktinį modulį.

### Dienos 61–90: monetizacija ir mastelis

Team MVP turi būti mažas. Nereikia iškart kurti SAML, sudėtingo RBAC ar plataus enterprise control plane. Pirmas mokamas B2B sluoksnis turėtų turėti:

- organizacijos sukūrimą;
- vietų pakvietimą;
- mokymosi kelio priskyrimą;
- progreso ataskaitą;
- bendrą workflow biblioteką;
- workflow savininką ir versiją;
- paprastą approval būseną;
- CSV arba PDF eksportą;
- vieną administratoriaus dashboardą.

Recurring vertės paketas:

- ketvirtiniai modelių suderinamumo testai;
- nauji Gold workflow paketai;
- governance ir reguliavimo atnaujinimai;
- mėnesinė ekspertų sesija;
- prioritetinis supportas;
- organizacijos šablonų peržiūra;
- eval ir regresijos ataskaitos.

Pagrindiniai devyniasdešimties dienų KPI:

| KPI | Tikslas |
|---|---:|
| Nemokamo praktinio workflow pradėjimo rodiklis | Bent 15 % kvalifikuoto landing srauto |
| Workflow užbaigimo rodiklis | Bent 50 % pradėjusių |
| Preview → el. paštas | Bent 20 % |
| Individualaus produkto pirkimo konversija iš kvalifikuoto srauto | Pradinis tikslas 2–5 % |
| Mokami B2B pilotai | 5 |
| Pilotų perėjimas į metinį planą | Bent 2 iš 5 |
| Vardiniai klientų įrodymai | Bent 5 |
| Gold workflow paketai | 20 |
| Teisingas šešių blokų atkartojimas GEO teste | Daugiau nei 80 % testinių atsakymų |
| Pagrindinio domeno citavimo dalis | Nuosekliai didėjanti per mėnesinius testus |
| Mobilus LCP | Iki 2,5 s ties 75 procentiliu |
| Mobilus INP | Iki 200 ms ties 75 procentiliu |
| CLS | Iki 0,1 ties 75 procentiliu |

**Vadovų sprendimas:** artimiausią ketvirtį nereikia plėsti turinio ekosistemos horizontaliai. Reikia paversti jau stiprų mokymo ir metodikos branduolį į vieną aiškiai suprantamą produktą, vieną autoritetingą entitetą ir vieną monetizuojamą organizacijų workflow sistemą. Didžiausia grąža bus ne iš dar 500 promptų ar dar vieno domeno, o iš 20 patikrintų workflow, penkių mokamų pilotų, realių rezultatų įrodymų ir metinio Team pasiūlymo.