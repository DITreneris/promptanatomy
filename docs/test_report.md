# Test report

Trumpi patikrinimų ir atsiliepimų įrašai (produkcija, SSL, UX ir kt.).

---

## 2026-03-18: SSL/TLS sertifikatas (www.promptanatomy.app)

### Kontekstas
- **Atsiliepimai:** Vartotojai matė klaidą „Jūsų ryšys nėra privatus“ (`NET::ERR_CERT_AUTHORITY_INVALID`). Nuoroda į svetainę siųsta per Teams; dalyviai/klientas naudojo savo tinklą (galimas įmonės proxy ar TLS inspekcija).
- **Svetainė:** https://www.promptanatomy.app (hostinuojama Vercel).

### Patikrinimas
- **Įrankis:** [SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=www.promptanatomy.app)
- **Rezultatai:**

| IP            | Būsena | Data (UTC)              | Trukmė   | Įvertinimas |
|---------------|--------|--------------------------|----------|-------------|
| 76.76.21.61   | Ready  | Wed, 18 Mar 2026 12:54:02 | 49.55 s  | **A+**      |
| 66.33.60.130  | Ready  | Wed, 18 Mar 2026 12:54:51 | 48.487 s | **A+**      |

### Išvada
- Sertifikatas ir konfigūracija **mūsų pusėje (Vercel) teisingi** – pilna grandinė, A+ abu IP.
- Matoma vartotojų klaida greičiausiai dėl **kliento tinklo** (proxy, corporate TLS inspekcija, įrenginyje neįdiegta įmonės CA).

### Rekomendacijos vartotojams
- Bandyti kitą tinklą (pvz. mobilus internetas) arba namų Wi‑Fi.
- Jei problema kartosis – IT administratoriui tikrinti SSL inspekcijos/proxy konfigūraciją.

### Follow-up
Jei skundai vėl pasikartos – dar kartą paleisti SSL Labs ir pasiūlyti vartotojams patikrinti iš kito tinklo.
