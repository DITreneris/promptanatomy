# Executive ataskaita: „Promptų anatomijos“ programa (Moduliai 1–15)

> **Paskirtis:** Pilna programos apžvalga klientams ir partneriams – temos nuodugniai ir konkrečiai, visi 15 modulių.  
> **Šaltiniai:** DOCUMENTATION_INDEX, CONTENT_MODULIU_ATPAZINIMAS, turinio_pletra*.md, modules.json, KURSO_1_IKI_15_ANALIZE_APIBENDRINIMAS.  
> **Data:** 2026-03-08

---

## 1. Programos esmė ir struktūra

**„Promptų anatomija“** – programa, kur mokomasi dirbti su **dirbtiniu intelektu (DI)**:
kaip formuluoti užklausas (promptus) taip, kad atsakymas būtų aiškus, nuspėjamas ir patikrinamas.

**Pagrindinis principas:** Viena sistema – **6 blokų modelis** (META, INPUT, OUTPUT, REASONING, QUALITY, ADVANCED) – taikoma visoje programoje. Kiekviena dalis (teorija → testas → praktika) seka tą pačią logiką: **Mokymasis → Žinių patikrinimas → Praktinis pritaikymas**.

**Struktūra pagal dalis:**

| Dalis | Moduliai | Turinys | Auditorija |
|-------|----------|---------|------------|
| **Bazinė triada** | 1, 2, 3 | 6 blokų sistema → Testas → 6 verslo scenarijai | Visi |
| **Pažangusis blokas** | 4, 5, 6 | Konteksto inžinerija → Sprintas + testas → Projektas | Po 1–3 |
| **Kelias: Duomenų analizė** | 7, 8, 9 | Pipeline, MASTER PROMPT → Testas → Finalinis projektas | Analitikai |
| **Kelias: Agentų inžinerija** | 10, 11, 12 | Agentai, įrankiai, integracijos → Testas → Projektas | Softo inžinieriai |
| **Kelias: Turinio inžinerija** | 13, 14, 15 | Vaizdai, video, muzika → Testas → Projektas | Rinkodara, komunikacija |

**Įėjimo logika:** Moduliai 1→2→3 privalomi. Modulis 4 atrakintas po 3; 5 po 4; 6 po 5 (rekomenduojama ≥70 % M5 teste). Keliai 7–9, 10–12, 13–15 – vienas kelias privalomas arba atrakinti po ankstesnio užbaigimo (hybrid modelis).

**Programos apimtis (skaičiais):**

| Metrika | Skaičius |
|--------|----------|
| Žodyno terminai | 97 |
| DI įrankiai (su nuorodomis ir aprašymais) | 57 |
| Paruošti promptų šablonai (promptų bibliotekoje) | 15 |
| Kopijuojami promptai moduliuose (CopyButton) | 100 |
| **Iš viso paruoštų promptų** | **~115** |

---

## 2. Moduliai 1–3: Bazinė triada

### Modulis 1: 6 Blokų Sistema  
*Meta, Input, Output, Reasoning, Quality, Advanced • ~25 min*

**Ką išmoksti:** Vieną nuoseklią sistemą – nuo chaotiško klausimo iki profesionalaus rezultato. 6 promptų struktūros blokai veikia bet kuriame DI įrankyje.

**Temos nuodugniai:**

1. **Įvadas** – kodėl ta pati užduotis duoda skirtingus atsakymus; DI produktyvumo statistika (tyrimai: MIT, Microsoft, NBER).
2. **Promptas ir promptų inžinerija** – apibrėžimai, 3 aspektai (žmogus–mašina, kalba, psichologija); specifikacija + struktūra + iteracija.
3. **Workflow samprata** – skirtumas tarp pokalbio ir darbo eigos (įvestis → LLM → išvestis); kada reikia struktūros.
4. **Promptų tipai** – sisteminiai, kontekstiniai, vaidmens; praktinis derinys.
5. **Prompting'o technikos** – zero-shot, few-shot, minčių grandinė (CoT), promptų seka, instruktavimas, ko vengti (manipuliacija).
6. **Gero prompto šablonas** – META (vaidmuo, tikslas, auditorija) + INPUT (duomenys, apribojimai) + OUTPUT (formatas, struktūra, tonas).
7. **Nuo 3 iki 6 blokų** – kodėl pridedami REASONING, QUALITY, ADVANCED.
8. **Hierarchinė struktūra** – 6 blokų eilė ir paskirtis.
9. **1–6 blokai išsamiai:**  
   - **Meta** – rolė, kontekstas, tikslas.  
   - **Input** – faktai, duomenys, apribojimai.  
   - **Output** – formatas, struktūra, reikalavimai.  
   - **Mąstymo modeliai** – CoT (grandinė) vs ToT (medis); kada ką rinktis.  
   - **Reasoning** – mąstymo seka, logika, verslo pavyzdžiai.  
   - **Quality Control** – kokybės kriterijai, patikrinimas.  
   - **Advanced Parameters** – temperature, atsakymo ilgis, fokusas, pasikartojimai.
10. **Pilnas pavyzdys ir „Prieš vs Po“** – visi 6 blokai kartu; palyginimas.
11. **Modulio santrauka** – pagrindinės idėjos, refleksija, kiti žingsniai.

**Rezultatas:** Gebėjimas rašyti promptus, kurie duoda nuspėjamą rezultatą; naudoti 6 blokų struktūrą bet kuriame DI įrankyje; sutaupyti laiką (mažiau iteracijų, daugiau tikslumo).

---

### Modulis 2: Žinių Patikrinimas  
*15 atsitiktinių klausimų iš nuolat atnaujinamo banko • ~10 min*

**Ką tikrini:** Įsisavinimą 6 blokų sistemos, workflow ir technikų.

**Temos nuodugniai:**

- **Testo įvadas** – 15 klausimų, 5 skirtingi formatai.
- **Meta ir Input** – rolė, kontekstas, duomenys.
- **Output ir Reasoning** – formatas, mąstymo seka.
- **6 blokų suporojimas** – blokas ↔ funkcija.
- **Prioritetų rikiavimas** – blokų eilė pagal svarbą.
- **Advanced ir kokybė** – parametrai, kokybės kontrolė.
- **Verslo scenarijus** – pritaikymas realioje situacijoje.
- **Workflow ir technikos** – darbo seka ir technikos.
- **Testo rezultatai** – įvertinimas ir rekomendacijos.
- **Bonusas:** Stilių naudojimas promptuose (tonas, stilius, auditorija, kalba).
- **Bonusas:** Praktinės užduotys (stilių tekstai, atsakymai į el. laiškus).

**Rezultatas:** Aiškumas, ar esi pasiruošęs praktikai (Modulis 3) ir tolesniam pažangiam blokui (4–6).

---

### Modulis 3: Praktinis Pritaikymas  
*6 verslo scenarijai su 6 blokais • ~20 min*

**Ką darai:** Pritaikai 6 blokų sistemą realiems verslo užduočių tipams.

**Temos nuodugniai:**

1. **Praktikos įvadas** – kaip atlikti užduotis.
2. **Scenarijus 1:** Vadovo strateginė ataskaita (ketvirčio/pusmečio rezultatų apžvalga valdybai).
3. **Scenarijus 2:** Pardavimų analizė ir veiksmų planas (skaičiai → įžvalgos → veiksmai).
4. **Scenarijus 3:** Marketingo kampanijos planas (auditorija, kanalai, KPI).
5. **Scenarijus 4:** Vidaus komunikacijos dokumentas (pokyčių pranešimas darbuotojams).
6. **Scenarijus 5:** Personalo sprendimų analizė (apklausos analizė ir veiksmų planas).
7. **Scenarijus 6:** Kliento skundo valdymas (atsakymas klientui ir vidinis veiksmų planas).
8. **Praktikos santrauka** – ką išmokote, kiti žingsniai.
9. **1 dalies santrauka** – apibendrinimas 3 moduliams: 6 blokai, testas, 6 scenarijai; refleksija; CTA į Modulį 4.

**Rezultatas:** Šeši paruošti scenarijai ir įgūdžiai juos pritaikyti savo darbui.

---

## 3. Moduliai 4–6: Pažangusis blokas (Konteksto inžinerija)

**Prielaida:** Baigti Modulius 1–3. Fokusas – šaltiniai, kontekstas, atsakymų patikimumas.

---

### Modulis 4: Konteksto inžinerija  
*Šaltiniai, tokenai, manipuliacijos, haliucinacijos • ~30–35 min*

**Ką išmoksti:** Kaip „valdyti“ DI per kontekstą; RAG, gilusis tyrimas, tokenų ekonomika, manipuliacijų atpažinimas, haliucinacijų mažinimas.

**Temos nuodugniai:**

1. **Įvadas** – „Jau moki kurti promptus. Dabar – kontekstas ir patikimumas.“; nauda, outcomes, įrankiai.
2. **DI ir visata** – hierarchija (nuo Dantės metaforos iki DI lygmenų); praktika: atpažinti sluoksnius (neprivaloma).
3. **Konteksto inžinerija: kaip valdyti DI** – apibrėžimas, InstructGPT įrodymai, kas sudaro kontekstą (tikslas, vaidmuo, ribos).
4. **4 gero prompto dedamosios** – inžinerija, kalbos filosofija, psichologija, komunikacija; pipeline schema.
5. **DI įrankiai pagal formą** – tekstas, vaizdas, video; kam ką naudoti.
6. **Kam naudoji DI** – palyginimas su 2026 m. duomenimis.
7. **Darbas su DI: struktūruotas procesas** – 3 žingsniai (įvestis → apdorojimas → rezultatas); 8 žingsnių workflow; proceso promptas (bonusas).
8. **Metodinis vs agentinis promptas** – metodika vs agentas su įrankiais.
9. **Custom GPT kūrimo procesas** – 8 žingsniai (tikslas → rolė → konfigūracija → testavimas → tobulinimas).
10. **Paskatinamasis mokymas (RL/RLHF)** – kaip žmonių atsiliepimai formuoja modelį.
11. **5 principai, kurie pagerina bet kurį promptą** – outcome-driven; vertintojo promptas.
12. **Parametrų laukas** – 6 grupės (sisteminiai, metodiniai, turinio, manipuliacijų, kokybiniai, techniniai).
13. **Svarbiausi DI įrankiai** – pasirinkimas pagal užduoties tipą.
14. **RAG: kas tai ir pabandyk** – Retrieval-Augmented Generation; šaltiniai, citavimas, „Nežinau“ taisyklė.
15. **Atviros duomenų bazės ir RAG** – Eurostat, data.europa.eu, nacionaliniai portalai; oficialūs šaltiniai.
16. **Darbas su RAG** – atmintis, išoriniai šaltiniai, duomenų paruošimas.
17. **DI įrankiai informacijos paieškai** – Perplexity, PaperGuide, Scite, Elicit (papildoma).
18. **Duomenų paruošimas RAG patikimumui** – valymas, santraukos, metaduomenys.
19. **4 strategijos** – žingsnis po žingsnio, CoT, palyginimai, ToT; COMBO praktika.
20. **Deep research (gilusis tyrimas)** – daugiapakopis tyrimas, sub-klausimai, sintezė; Perplexity, ChatGPT, Claude, Gemini.
21. **Promptų sekos** – seka, grandinė (CoT), idėjų medis (ToT).
22. **Tokenų ekonomika** – tokenai, konteksto langas, max_tokens, kainos; konteksto degradacija (Lost in the Middle).
23. **Žodynėlis** – RAG, Deep research, tokenas, konteksto langas, haliucinacija, Quality blokas, CoT, ToT, RLHF, Master prompt, System prompt ir kt.
24. **Užbaigimas** – konteksto inžinerijos atspaudas, 3 klausimai sau, pasirinkimas: M5 testas / RAG pakartojimas / M6 projektas / M4 PDF.

**Rezultatas:** Mažiau klaidų ir haliucinacijų; gebėjimas kontroliuoti šaltinius ir patikrinimą; paruošimas Modulio 6 projektui.

---

### Modulis 5: Prezentacijos sprintas  
*15 min prezentacijos draftas + mini suvokimo testas*

**Ką darai:** Per 15 min su DI sukuri 8 skaidrių prezentacijos draftą; tada mini testas (3–5 klausimai) – Brief, struktūra, įrankis, kokybė.

**Temos nuodugniai:**

- **Sprintas** – Brief, struktūra, skaidrės (Gamma, SlidesAI, Prezent.ai, Canva ir kt.).
- **Pagalbos kortelės** – RAG, tokenai, manipuliacijos, haliucinacijos – kai prireikia.
- **Pasiruošimo savitikra** – bandomosios užduotys prieš mini testą.
- **Mini testas** – klausimai apie Brief, struktūrą, įrankį, kokybės patikrą.
- **Sprinto žinių patikrinimas** – ar supratai sprinto logiką.
- **Testo rezultatai** – toliau: modulio užbaigimas ir praktika (Modulis 6); rekomenduojama ≥70 % prieš M6.

**Rezultatas:** Greitas prezentacijos draftas + aiškumas, ar pasiruošęs Modulio 6 projektui.

---

### Modulis 6: Projekto kūrimas  
*Praktika: tyrimo ataskaita arba Custom GPT projektas*

**Ką darai:** Vienas pilnas projektas – tyrimo ataskaita su DI arba Custom GPT asistentas.

**Temos nuodugniai:**

- **Vienas projektas ir papildomos technikos** – 6 praktiniai žingsniai.
- **Projektas: Tyrimo ataskaita su DI** – META → INPUT → OUTPUT → REASONING → QUALITY → ADVANCED.
- **COMBO pritaikymas** – sujungti kelis metodus viename projekte.
- **Praktika: Vieno puslapio tinklalapio kūrimas (HTML)** – papildoma praktika.
- **SUPER PROMPTAI** – MOKYTIS, EKSPERIMENTUOTI, PERŽIŪRĖTI – 3 universalūs šablonai.
- **Duomenų tvarkymas** – kaip tvarkyti promptus ir duomenis kasdieniniame darbe (praktinė atmintinė).
- **Modulio 6 refleksija** – kas sunkiausia, ką naudosi pirmiausia.
- **Schema: Custom GPT kūrimo procesas** – vizualizacija.
- **Projektas: Custom GPT asistentas** – tikslas, ribos, testavimas, iteracija.

**Rezultatas:** Vienas paruoštas artefaktas (ataskaita arba Custom GPT) ir šablonai tolesniam darbui.

---

## 4. Moduliai 7–9: Kelias „Duomenų analizė su DI“

**Auditorija:** Analitikai, verslo duomenų vartotojai. **Prielaida:** Bent Moduliai 1–3; pageidautina 4–6 (RAG, šaltiniai).

---

### Modulis 7: Duomenų analizė su DI  
*Pipeline, promptų architektūra, MASTER PROMPTAS*

**Ką išmoksti:** DI kaip verslo analitiką – nuo duomenų struktūros iki MASTER PROMPT ir vizualizacijų.

**Temos nuodugniai:**

1. **Duomenų analizės kelias** – asmeninis fokusas modulyje.
2. **DI kaip analitikas** – ne „paprašyk ir pažiūrėk“, o valdymas; duomenys > nuomonė.
3. **Strateginis pamatas** – duomenys = sprendimų sistema; variacija; tobulinti sistemą, ne kaltinti žmones.
4. **DI paradoksas** – investicijos vs pelnas (MIT 2025); kodėl DI nesukuria vertės organizacijoje; 4 žingsniai verslui.
5. **Problematika** – investicijų kryptis, pilotų spąstai, duomenų kultūra.
6. **Pipeline** – rinkimas → paruošimas → EDA → modeliai → vizualizacija → publikavimas; operacinės sąvokos.
7. **Verslo duomenų plotis** – 6 domenai: klientų elgsena, tiekimo grandinė, pardavimų dinamika, CRM/marketingas, procesų efektyvumas, konkurencija.
8. **Duomenų tipai** – kiekybiniai, kokybiniai, struktūruoti, nestruktūruoti, pusiau struktūruoti; DI promptai.
9. **Rinkimo strategija** – pirminiai, antriniai, automatiniai; data scraping (paprasčiausi būdai, etika, teisė).
10. **Kaip DI keičia analizę** – automatizacija, kompleksiniai metodai, duomenimis grįsti sprendimai.
11. **Ką DI gali verslo analitiko vaidmenyje** – paaiškinimai, statistika, vizualizacijos, prognozės, scenarijai.
12. **Sisteminė promptų architektūra** – rolės, DB struktūra, ryšių analizė, vizualizacijos, prognozės; CopyButton šablonai.
13. **Tyrimų ir EDA promptai** – 5 žingsnių algoritmas, EDA (statistika, koreliacija, anomalijos), lentelių kūrimas.
14. **Tikslinė paieška ir MASTER PROMPTAS** – BI schema (Surink → Analizuok → Ataskaita → Prognozė); 8 žingsnių pilna analizė.
15. **Ekrano nuotraukos ir schemų analizė** – DI ekrano nuotraukoms ir duomenų schemoms (entitetai, ryšiai, normalizavimas).
16. **DI agentų koncepcija** – Data Research, EDA, Insight agentai; kada taikyti.
17. **Duomenimis grįsta kultūra** – Deming principas; promptai vadovybei; KPI, elgesio gairės.
18. **Vizualizacija ir data storytelling** – duomenų ciklas, psichologija (10/20/80), Geštalto principai; verslo lygio promptai; Power BI, Python viz; super promptas.

**Rezultatas:** Gebėjimas naudoti DI kaip verslo analitiką – nuo duomenų struktūros iki MASTER PROMPT ir vizualizacijų.

---

### Modulis 8: Žinių patikrinimas (DA kelias)  
*Testas: pipeline, promptai, vizualizacija*

**Ką tikrini:** Įsisavinimą Duomenų analizės kelio temų – pipeline, promptų architektūra, vizualizacija, MASTER PROMPT.

**Rezultatas:** Aiškumas, ar pasiruošęs finaliniam Duomenų analizės kelio projektui (Modulis 9).

---

### Modulis 9: Finalinis projektas (DA kelias)  
*Vienas pilnas projektas – Duomenų analizės kelias*

**Ką darai:** Vienas pilnas verslo analizės ar duomenimis pagrįsto sprendimo projektas – 6 blokų sistema, šio kelio promptų architektūra, MASTER PROMPT; 16 praktinių scenarijų (įskaitant vizualizaciją ir data storytelling).

**Rezultatas:** Vienas paruoštas verslo analizės artefaktas ir šablonai kasdieniam darbui su DI.

---

## 5. Moduliai 10–12: Kelias „Agentų inžinerija su DI“

**Auditorija:** Softo inžinieriai, automatizatoriai. **Prielaida:** Moduliai 4–6 (konteksto inžinerija, RAG).

---

### Modulis 10: Agentų inžinerija su DI  
*Įrankiai, promptai, sistemos – projektavimas ir vykdymas*

**Ką išmoksti:** Kaip projektuoti DI agentus – nuo ciklo ir įrankių iki integracijų ir promptų architektūros.

**Temos nuodugniai:**

1. **Kelio apžvalga (10.1)** – workflow, trigger, action, condition, webhook; įrankiai; promptai; agentų ciklas; projektavimas; vykdymas; integracijos.
2. **Agentų ciklas ir architektūra (10.2)** – ReAct-style: suprasti užduotį → pasirinkti įrankį → vykdyti → stebėjimas → kartoti arba grąžinti atsakymą; kada naudoti agentą vs paprastą promptą.
3. **Workflow, trigger, action, condition, webhook** – sąvokos, pavyzdžiai (forma → CRM; PayPal → webhook).
4. **3A strategija (10.25)** – AUTOMATIZE 80 %, AUGMENT 15 %, AUTONOMIZE 5 %; 80/15/5 taisyklė.
5. **Verslo automatizavimo įrankiai (10.35)** – Zapier, Make.com, n8n, Power Automate; stiprybės, silpnybės, pavyzdžiai.
6. **Rolės ir sisteminio prompto šablonas (10.4)** – asistentas žingsnis po žingsnio; įrankiai; „Nežinau“ taisyklė.
7. **Įrankių pasirinkimas ir apribojimai (10.5)** – ChatGPT, Claude, Gemini – ką turi; nurodymai vartotojui.
8. **Workflow specifikacija, testavimas, saugumas** – 1 puslapio spec (trigger, input schema, condition, actions, output, SLA, error handling, audit); edge-case testavimas; PII, access control, incident playbook; human-in-the-loop.
9. **Įrankių pasirinkimo medis** – Office 365 → Power Automate; non-tech + greitai → Zapier; sudėtinga logika + kaina → Make; pilna kontrolė → n8n; enterprise → Workato.

**Rezultatas:** Supratimas, kaip projektuoti DI agentus – ciklas, įrankiai, promptai, integracijos; paruošimas Modulio 12 projektui.

---

### Modulis 11: Žinių patikrinimas (Agentų kelias)  
*Testas: agentų ciklas, promptai, įrankiai*

**Ką tikrini:** Įsisavinimą Agentų inžinerijos temų – ciklas, promptai, įrankiai, projektavimas.

**Rezultatas:** Aiškumas, ar pasiruošęs finaliniam Agentų inžinerijos projektui (Modulis 12).

---

### Modulis 12: Finalinis projektas (Agentų kelias)  
*Vienas pilnas agentų arba automatizacijos scenarijus*

**Ką darai:** Vienas paruoštas agentų arba automatizacijos artefaktas/scenarijus – pvz. workflow su įrankiais, integracijos eskizas; 3 lab'ai + 4 scenarijai.

**Rezultatas:** Vienas paruoštas agentų/automatizacijos scenarijus ir šablonai tolesniam darbui.

---

## 6. Moduliai 13–15: Kelias „Turinio inžinerija su DI“

**Auditorija:** Rinkodaros ir komunikacijos specialistai. **Prielaida:** Gali pradėti po Modulio 6 arba lygiagrečiai keliems keliams.

---

### Modulis 13: Turinio inžinerija su DI  
*Vaizdai, video, muzika – įrankiai ir promptai*

**Ką išmoksti:** Kurti vaizdus, trumpus vaizdo įrašus ir muziką su DI – nuo promptų iki įrankių ir kokybės patikros.

**Temos nuodugniai:**

1. **Kelio apžvalga (13.1)** – vaizdai, video, muzika; kampanijos tikslai: **Awareness** (atpažįstamumas), **Engagement** (įsitraukimas), **Conversion** (konversija); kada emocija, kada aiškumas.
2. **Vaizdų generavimas (13.2)** – vaizdo prompto pagrindai: objektas + kontekstas + estetika; minimalūs reikalavimai; CopyButton šablonas.
3. **Stilius ir proporcijos (13.3)** – fotorealizmas, akrilas, 3D, piešinys; aspect ratio (1:1, 16:9, 9:16); **brand consistency** – spalvos, tipografija, tonas, vizualinis identitetas; įrankiai (DALL·E, Midjourney, Ideogram, Leonardo.ai, Canva AI, Stable Diffusion, Adobe Firefly).
4. **Kompozicija ir kadras (neprivaloma)** – trečdalių taisyklė, pirmas/antras planas, kameros kampas; kadro tipai (ELS, MLS, CU, ECU); naratyviniai šablonai.
5. **DI vaizdų workflow (5 žingsniai)** – koncepcija, prompt formulavimas, optimizavimas, generavimas + iteracijos, post-processing.
6. **Vaizdo generatorius (13.37)** – interaktyvus įrankis: kampanijos kontekstas, vizualo esmė, tekstų integracija; sugeneruotas promptas CopyButton.
7. **MASTER prompt ir ready prompts** – universalus šablonas; 8 verslo scenarijai (logotipas, produkto maketas, social post, reklaminė kampanija, naujienlaiškio hero, brošiūra, plakatas, blogo vizualas).
8. **Video generavimas (13.4, 13.5)** – scenarijus trumpam vaizdo įrašui; kadrai, trukmė, tonas; įrankiai (Sora, Runway, Pika, Luma, Synthesia, InVideo, Veo 3); formatas ir naudojimo teisės.
9. **Muzikos ir garsų generavimas (13.6, 13.7)** – nuotaika, stilius, tempo, instrumentai; TOP 5 generatoriai (Suno, Boomy, Soundraw, Udio, Beatoven.ai); MASTER muzikos promptas; garsų efektai; naudojimo teisės.
10. **Verslas ir rizikos (13.10)** – KPI (CTR, CVR, CPM); A/B testavimo sistema; Legal/Risk (autorinių teisių, deepfake, prekės ženklai, GDPR); QA checklist; versijavimas; top 3 pitfalls.
11. **Workflow: nuo brief iki publikacijos (13.11)** – pilnas ciklas (7 žingsnių schema).

**Rezultatas:** Gebėjimas kurti vaizdus, trumpus vaizdo įrašus ir muziką su DI; promptų šablonai ir kokybės patikra.

---

### Modulis 14: Žinių patikrinimas (Turinio kelias)  
*Testas: vaizdai, video, muzika*

**Ką tikrini:** Įsisavinimą Turinio inžinerijos temų – vaizdai, video, muzika, įrankiai, verslas.

**Rezultatas:** Aiškumas, ar pasiruošęs finaliniam Turinio inžinerijos projektui (Modulis 15).

---

### Modulis 15: Finalinis projektas (Turinio kelias)  
*Vaizdas, video arba muzika – vienas artefaktas*

**Ką darai:** Bent vienas paruoštas vizualų ar garso artefaktas – vaizdas, trumpas vaizdo įrašas arba muzikos fragmentas – su naudotu promptu; 3 scenarijai.

**Rezultatas:** Vienas paruoštas vizualų/garso artefaktas ir promptų šablonai tolesniam darbui.

---

## 7. Santrauka: ką gauna klientas / partneris

| Blokas | Moduliai | Trukmė (orientacinė) | Pagrindinis rezultatas |
|--------|----------|----------------------|-------------------------|
| **Bazinė triada** | 1, 2, 3 | ~55 min | 6 blokų sistema + testas + 6 verslo scenarijai |
| **Pažangusis** | 4, 5, 6 | ~50–60 min | Kontekstas, RAG, haliucinacijos, sprintas, vienas projektas |
| **Duomenų analizė** | 7, 8, 9 | ~60+ min | Pipeline, MASTER PROMPT, testas, finalinis DA projektas |
| **Agentų inžinerija** | 10, 11, 12 | ~45–60 min | Agentų ciklas, įrankiai, testas, finalinis agentų projektas |
| **Turinio inžinerija** | 13, 14, 15 | ~45–60 min | Vaizdai, video, muzika, testas, finalinis turinio projektas |

**Bendras pobūdis:** Kiekvienas kelias (7–9, 10–12, 13–15) gali būti naudojamas atskirai arba kartu; po bazinės triadės ir pažangaus bloko dalyvis renkasi vieną ar daugiau kelių pagal rolę (analitikas, inžinierius, rinkodara). Visur – kopijuojami promptai (CopyButton), refleksija, santraukos 5 blokų modelis ir aiški seka: **Mokymasis → Žinių patikrinimas → Praktika**. Programoje: **97** žodyno terminai, **57** DI įrankiai, **~115** paruoštų promptų (100 moduliuose + 15 promptų bibliotekoje).

---

*Dokumentas parengtas pagal projekto SOT: DOCUMENTATION_INDEX.md, CONTENT_MODULIU_ATPAZINIMAS.md, turinio_pletra*.md, src/data/modules.json.*
