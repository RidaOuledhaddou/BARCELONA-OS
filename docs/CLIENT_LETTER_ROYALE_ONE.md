# Letter to the project sponsor (plain language)

**How to use this:** Copy the block below into an email, add the recipient’s name, sign with yours, and attach or link the technical **cahier des charges** when you ask agencies for prices.

---

**Subject:** What we’re building with Royale One — in simple terms

Dear [Name],

Thank you for trusting this direction. I want to explain **what the app really is**, **why it’s different**, and **what we’re aiming for**—without technical jargon. Think of it as the story you can share with friends or investors over coffee.

---

### The idea in one sentence

We are **not** building “another taxi app” or “another TripAdvisor.”

We are building a **city advisor** that answers a harder question:

> **“Given where I am, where I want to go, and what matters to me (time, money, safety, authenticity)—what should I actually do?”**

Maps show you lines on a screen. Many apps lock you into one company. **Royale One** is meant to sit **between you and the chaos of the city** and **recommend a decision**: take the metro, walk, combine options, or choose a safer route even if it’s a few minutes longer.

---

### A simple picture: three lenses

Imagine you wear **three pairs of glasses**. Each one highlights something different:

1. **Moving around (mobility)**  
   *Lens:* “What’s the smartest way to get there?”  
   The system compares **public transport** (using official schedules and delays when available), **road/traffic conditions**, and **rough estimates** for taxi-style options (wait and price **without** needing every company’s API on day one).  
   **Output example:** “Metro + short walk: about 18 minutes and €2.40. Taxi in traffic: about 32 minutes and €18. **Recommendation:** metro—you save time and money.”

2. **Feeling safe (trust & safety)**  
   *Lens:* “Where should I be extra careful, and can I walk a safer way?”  
   It combines **official open data** (e.g. city statistics by area), **optional reports from users** (with rules and privacy), and later **smarter signals** (crowds, events).  
   The map should feel **calm and honest**—relative risk and confidence, not panic headlines.  
   **Output example:** “This route is **about 3 minutes longer** but avoids a higher-risk stretch—your choice.”

3. **Avoiding tourist traps (authenticity)**  
   *Lens:* “Is this place genuinely good for locals, or mostly a trap?”  
   We **do not** want to depend mainly on **star ratings** (they’re easy to fake). We look at **patterns**: do locals come back? Are prices normal for the neighborhood? Are crowds weirdly spiky?  
   **Output example:** “Looks like a **highly local** spot—stable prices, fewer trap signals.”

Together, these three lenses are what we call the **Intelligent Layer** of Royale One.

---

### How this differs from Google Maps or TripAdvisor (in plain words)

| Usual apps often… | What we want… |
|-------------------|----------------|
| Show one route or one rating | **Compare** options and explain **tradeoffs** (time, cost, risk) |
| Rely heavily on reviews | Rely more on **harder-to-game signals** (behavior, price vs area, repeat visits) |
| Treat transport as separate from “places” | Treat **movement + safety + authenticity** as one **decision** |

---

### The wider Royale One story (suite, not only routes)

The **full vision** also includes **curated stays** and **foresight** (insights for members or partners). Those are **separate chapters** of the product.  
The **first technical heart** is the **Intelligent Layer** above: **orchestration, safety-aware routing, authenticity**—built in clear phases so we don’t boil the ocean.

---

### What “success” looks like for real people

We’re especially interested in **locals** who might say:

> **“I check this before I go out.”**

If the app **saves a few minutes of thinking**, **saves money**, or **helps someone feel safer**, we’re on the right path.

---

### Honest boundaries (so nobody is surprised)

- **v1 does not require** perfect deals with every taxi company or every official API. We use **standard public data** (e.g. transit feeds) and **clear messaging** when something is estimated.
- **Safety and privacy** must follow **EU rules (GDPR)** and **careful legal wording**—the app gives **guidance**, not guarantees.
- **Money model (strategy):** prefer **subscriptions**, **verified local partners**, and **B2B insights**—not “we take a cut of every ride” as the only plan, to reduce legal and political risk.

---

### What happens next on your side

If you want **quotes from developers or agencies**, use the companion document **`CAHIER_DES_CHARGES_ROYALE_ONE.md`** in the `docs` folder. It describes **what to build**, **in what order**, and **how vendors should bid**—so you can compare apples to apples.

If anything here doesn’t match what you had in mind, tell me **in your own words** what you want to feel when you open the app—we’ll align the product to that.

Warm regards,

[Your name]  
[Your role / company]  
[Contact]

---

*Internal reference: [INTELLIGENT_LAYER.md](./INTELLIGENT_LAYER.md), [PRODUCT_ROADMAP.md](./PRODUCT_ROADMAP.md).*
