# Royale One — Product Roadmap & Strategy Brief

**Purpose:** Single reference for product strategy, phased delivery, and the **platform architecture** required to run a distributed, real-time, multi-domain urban system—not a single CRUD application.  
**Last aligned with experience:** marketing site, story pages, legal/trust pages, auth UI (no backend fulfillment surfaced in-product).  
**Load assumptions (design targets):** Barcelona-scale event spikes (~50k concurrent users), real-time bidding bursts, **financial correctness under failure**.

---

## 1. Executive snapshot

| Dimension | Today (as positioned) | North star |
|-----------|------------------------|------------|
| **Identity** | Barcelona-rooted, ultra-high-touch concierge “suite”: mobility + stays + clarity | Trusted default for bespoke urban movement and habitation in Barcelona |
| **Proof** | Strong narrative, demos, illustrative metrics | Verifiable outcomes, real supply, measurable SLAs |
| **Conversion** | Sign-up / login surfaces; recruitment story | Clear paths: book, join fleet, partner, press |

---

## 2. What — Core value proposition

- **One vantage** over the city: human discretion + orchestrated services (not a generic ride-hail or OTA).
- **Three pillars:** Orchestrated Mobility · Curated Habitation · Executive Foresight.
- **Differentiators in copy:** local mastery, silence/discretion, synchrony, heritage of Barcelona, “guild” vs gig-economy for partners.

**Reality check:** The experience is primarily **brand, trust, and acquisition**. Transactional depth (real booking, live inventory, authenticated dashboards) is **promised in language** but not yet the product.

---

## 3. Who — Target audiences

| Segment | Needs | How the site speaks today |
|---------|--------|---------------------------|
| **Private members / guests** | Reliability, discretion, seamless rides/stays | Hero, testimonials, member mobile mock, “Begin Inquiry” → login |
| **Fleet & hospitality operators** | Fair economics, protocol, dignity | Join the Fleet, operator signup copy, ethics charter |
| **Press & brand** | Assets, narrative, third-party validation | Press page, dossier affordance |
| **Compliance-minded buyer** | GDPR, sovereignty, terms | Legal suite, ethics, cookie framing |

**Gap:** Member vs operator journeys **intermix** (same nav, overlapping CTAs). Clarifying **two funnels** reduces confusion and improves conversion.

---

## 4. Current capabilities inventory

### Live in the experience

- Landing: hero, illustrative dispatch cards, provenance, animated stats strip, three pillars, spatial search **demo**, signature steps, testimonials, mobile mock.
- Navigation: section anchors (City Atlas / Mobility / Residences / Foresight), theme toggle, EN/ES routing.
- Company: Our Story (interactive manuscript), Join the Fleet (recruitment chapters), Press (narrative + dossier UI).
- Auth: login and signup **UI** (email/password, Google buttons — implementation depth not asserted here).
- Legal & trust: Terms, Privacy, Cookies, Data Sovereignty, Ethics Charter (substantive copy).
- Footer: Suite labels; links to story, fleet, press; **Partner Program** listed without destination.

### Not yet product truth (treat as roadmap drivers)

- Real-time or audited **metrics** on the home ticker.
- Functional **spatial search** (inventory, availability, ranking).
- **Post-login** command center, dashboards, workflows.
- **Press kit** file delivery and real **media repository**.
- **Transactional** booking, payment, cancellation enforcement.

---

## 5. User journeys (as designed today)

1. **Discovery:** Land → scroll pillars, demo, stats, proof → anchor navigation.
2. **Member intent:** “Begin Inquiry” / Member Access → login (no in-product continuation described).
3. **Operator intent:** Join the Fleet → qualification narrative → signup.
4. **Trust:** Footer → legal/ethics/sovereignty.
5. **Press:** Press → narrative → download affordance.

**Primary gap:** No closed loop from **interest → confirmed service** inside the product.

---

## 6. Strategic pillars for improvement (cross-cutting)

These apply across every phase:

1. **Proof over poetry** — Every claim either becomes verifiable or is labeled as vision.
2. **Funnel clarity** — Separate “Guest / Member” vs “Operator / Partner” paths in IA and CTAs.
3. **Minimum lovable transaction** — Smallest end-to-end value (e.g. concierge request form with human follow-up) before full automation.
4. **Trust stack** — Contacts, insurance/safety, dispute flow, and operational policy alongside legal pages.
5. **Locale parity** — EN/ES (and Catalan if strategically required) consistent across all routes.

---

## 7. Roadmap by phase

### Phase 0 — Foundation (weeks 0–2)

**Goal:** Remove dead ends; align story with what exists.

| Initiative | Outcome |
|--------------|---------|
| Fix **Partner Program** | Real `/partner-program` (or equivalent) with basics: who qualifies, how to apply, contact — **or** remove/rename until ready |
| **CTA audit** | Map every button to a real next step (mailto, form, calendar, app) |
| **Disclaimers** | Where stats/quotes/dispatch are illustrative, add subtle “representative” language if still using placeholders |
| **Contact surfaces** | At minimum: concierge@, fleet@, press@ (or one inbox with routing copy) |

**Exit criteria:** No major footer/nav items lead nowhere; a visitor can always reach a human or a form.

---

### Phase 1 — Credibility & conversion (weeks 2–8)

**Goal:** Convert attention into qualified leads.

| Workstream | Deliverables |
|------------|----------------|
| **Guest path** | Landing CTA → **concierge intake form** (dates, zones, preferences, consent) + confirmation + SLA for response |
| **Operator path** | Structured **fleet application** (vehicle, license, insurance attestation) tied to signup or separate pipeline |
| **Proof** | Replace or annotate demo stats; add **2–3 real case blurbs** or anonymized scenarios |
| **Press** | Working **press kit** download; **press@**; optional **logo pack** |
| **SEO / sharing** | Title/description per main page; OG image for key URLs |

**Exit criteria:** Measurable **lead volume** and **response workflow** (even if manual).

---

### Phase 2 — Product depth (months 2–4)

**Goal:** Authenticated users see real value.

| Workstream | Deliverables |
|------------|----------------|
| **Identity** | Real auth (session, recovery, roles: member vs operator vs staff) |
| **Member area** | Trip/stay **status**, history, preferences — even if operations are semi-manual behind the scenes |
| **Operator area** | Earnings view, assignment flow, **protocol** acknowledgments |
| **Spatial search v1** | Search that hits **real or curated** inventory API; clarify “premium inventory” scope |

**Exit criteria:** Login is not decorative; **retention** can be measured (return visits, repeat requests).

---

### Phase 3 — Scale & differentiation (months 4–12)

**Goal:** Defend premium positioning with operations and intelligence.

| Workstream | Deliverables |
|------------|----------------|
| **Foresight product** | Defined artifact: **reporting**, **alerts**, or **analyst touch** — not only metaphor |
| **Commercial clarity** | Published pricing models for members; **commission/fee** schedule for partners |
| **Quality bar** | SLAs, insurance summary, incident process **on site** |
| **Partnerships** | Named hotel/venue **where allowed**; API or portal for partner inventory |
| **Compliance** | Cookie/consent behavior matches **actual** tracking; privacy notices aligned with backend |

**Exit criteria:** Revenue and partner growth can be tied to **product surfaces**, not only sales.

---

## 8. Risk register (short)

| Risk | Mitigation |
|------|------------|
| Over-promising “AI / intelligence / synchrony” | Tie language to shipped features; use roadmap page for vision |
| Legal copy vs actual data flows | Single owner for privacy/terms when backend ships |
| Two-brand confusion (repo “city-os” vs “Royale One”) | Decide public brand hierarchy and domain strategy |
| Press/regulatory scrutiny on labor claims | “Guaranteed commissions” etc. backed by contracts |

---

## 9. Suggested metrics (leading indicators)

| Metric | Why it matters |
|--------|----------------|
| Qualified leads / week (guest + operator) | Validates Phase 1 |
| Form completion rate | Friction signal |
| Time to first human response | Trust for premium |
| Login → repeat session (30-day) | Phase 2 health |
| Partner active count / utilization | Phase 3 supply |

---

## 10. Summary

The current experience is a **strong brand and trust scaffold** with **recruitment and legal depth**. The roadmap prioritizes **(1) honesty and contactability**, **(2) lead capture and proof**, **(3) real accounts and fulfillment**, **(4) scaled operations and foresight as a defined product**. Use phases as planning buckets; dates should be adjusted to team size and compliance needs.

**North-star platform framing:** If executed end-to-end, the backend is not “a ride app + a booking site” in isolation—it is a **distributed urban operating system** coordinating movement, space, and money in real time, with **conflicting consistency requirements** per domain (geo near-real-time vs ledger-grade bookings vs payments).

---

## 11. Platform blueprint — from clean schema to battle-ready system

This section defines the **technical shape** that supports Sections 7–9 at scale. Technology names (e.g. Kafka, Redis) are **architectural intent**; validate against your actual stack, region, and team skills.

### 11.1 Architectural pattern (hybrid services)

| Approach | Verdict |
|----------|---------|
| Pure microservices (day one) | Too much operational overhead early |
| Single monolith forever | Hard ceiling on independent scaling and team autonomy |
| **Recommended** | **Domain-driven macro-services**: modular monolith first, **extract services** when a boundary proves stable (Identity, Payments, Transport, etc.) |

### 11.2 Core services (bounded contexts)

| Service | Responsibility | Isolation / scale profile |
|---------|----------------|---------------------------|
| **Identity** | Users, RBAC, KYC (as required) | Strong isolation; security boundary |
| **Wallet / Payments** | Money movement, escrow, invoices, reconciliation | Strong isolation; audit-heavy |
| **Transport** | Trips, drivers, dispatch, lifecycle | High scale; event-driven; geo-heavy |
| **Stay** | Listings, bookings, availability | Strong consistency for schedules and inventory |
| **Bidding** | Real-time negotiation (per trip or slot) | Ephemeral state; ultra-low latency |
| **Search / Geo** | Nearby drivers, stays, discovery | Eventually consistent; read-optimized |
| **Notification** | Push, email, SMS | Async-only; at-least-once acceptable with idempotency |
| **Foresight / Data** | Analytics, BI, aggregates | Read-heavy; offline or near-line OK |

### 11.3 Critical separation: geo vs transactional

| Concern | Pattern | Data characteristics |
|---------|---------|----------------------|
| **Geospatial (ride-adjacent)** | Dedicated path (service + datastore tuned for location) | Latency-sensitive; high write throughput; **stale reads often acceptable** |
| **Stays / bookings (lodging-adjacent)** | Dedicated path with **strict DB constraints** | **Consistency-critical**; financial and calendar correctness |

Do not force both into one consistency model; that is where double-bookings and deadlocks appear under load.

---

## 12. Event-driven backbone

### 12.1 Why a commit log / stream (e.g. Kafka)

- High throughput under fan-out
- **Replay** for recovery, new consumers, and audit
- Foundation for stream processing and future ML features

(Alternatives exist; the requirement is **durable, ordered streams** with replay—not only a task queue.)

### 12.2 Core topics (illustrative)

```txt
user.created
wallet.updated

trip.requested
trip.bid.created
trip.bid.accepted
trip.started
trip.completed

booking.created
booking.confirmed
booking.cancelled

payment.initiated
payment.completed
payment.failed
```

### 12.3 Example flow — trip with bidding

1. User creates trip → emit `trip.requested`
2. Bidding service consumes → opens **ephemeral session** (e.g. Redis)
3. Drivers submit bids → `trip.bid.created`
4. User accepts → `trip.bid.accepted`
5. Transport commits assignment → `trip.started` (driver locked for that trip)

**Outcomes:** loose coupling between UI/API and workers; replayable history; async scale-out of consumers.

---

## 13. High-performance data layer

### 13.1 Polyglot persistence (directional)

| Use case | Store (typical) |
|----------|------------------|
| Users, bookings, payments (OLTP) | **PostgreSQL** (ACID) |
| Geo queries | **PostGIS** (or dedicated geo store if volume demands) |
| Real-time bidding, hot trip state | **Redis** |
| High-volume trip history / logs | **Cassandra / ScyllaDB** (wide events) |
| Full-text / discovery (optional) | **OpenSearch / Elasticsearch** |

### 13.2 Sharding strategy (when single-DB limits bite)

| Domain | Shard key | Rationale |
|--------|-----------|-----------|
| Transport / geo | `region_id` (e.g. Barcelona zones) | Locality of drivers and queries |
| Users / wallets | `user_id` (hash) | Even spread; wallet colocation with user |
| Bookings (stays) | `listing_id` | Reduces cross-shard contention on hot listings |

### 13.3 CAP trade-offs (be explicit)

| Surface | Preference | Acceptable failure mode |
|---------|------------|-------------------------|
| Nearby drivers | **AP** (availability > strict consistency) | Driver list stale by hundreds of ms |
| Room / stay booking | **CP** (consistency > availability under conflict) | **No double booking**; fail closed or queue |
| Payments | **Strong consistency** | ACID + **idempotency keys** on all writes |

---

## 14. Real-time, API, and caching

### 14.1 Communication stack (layered)

| Layer | Role |
|-------|------|
| External (web/app → backend) | REST and/or GraphQL **BFF** |
| Service-to-service | gRPC or equivalent (binary, contracts) |
| Live updates (bids, ETAs) | **WebSockets** (or SSE where sufficient) |

### 14.2 Bidding subsystem

- **Primary state:** Redis (not the primary RDBMS), e.g. `trip:{id}:bids`, `trip:{id}:status`, `trip:{id}:drivers`
- **Fan-out:** Redis pub/sub and/or stream to WebSocket gateways
- **Ordering / audit:** Redis Streams or Kafka Streams for ordered bid events and replay

**WebSocket scaling:** gateway layer (e.g. Nginx, Envoy), **sticky sessions** or **shared session store** so any node can honor a connection policy.

### 14.3 Multi-layer cache

| Tier | Holds |
|------|--------|
| L1 (in-process) | Hot config, feature flags |
| L2 (Redis) | Active trips, driver locations, availability snapshots |
| L3 (CDN) | Static assets, public listing pages |

| Pattern | Example |
|---------|---------|
| Cache-aside | User profile |
| Write-through | Listing metadata when correctness matters |
| Write-heavy + TTL | Driver locations |

**Invalidation (event-driven):** e.g. `booking.confirmed` → invalidate availability cache; `trip.started` → refresh driver availability cache.

---

## 15. Reliability, traffic control, and observability

### 15.1 Rate limiting and abuse controls

- **Token bucket** (or leaky bucket) per principal and per route
- Illustrative tiers: user ~10 req/s; driver bidding ~3 bids/s; global API adaptive limits
- Bidding: max bids per trip, per-driver cooldown, future anomaly scoring

### 15.2 Resilience

- **Circuit breakers** on cross-service calls (library equivalents exist per language)
- **Retries** with exponential backoff; **idempotency keys** everywhere money or inventory moves
- **DLQ** for Kafka (or equivalent) for failed payments and booking commits—never silent loss

### 15.3 Observability (minimum viable “battle-ready”)

| Signal | Tools (examples) | Must-watch KPIs |
|--------|-------------------|-----------------|
| Tracing | OpenTelemetry → Jaeger | End-to-end trip and payment latency |
| Metrics | Prometheus + Grafana | Booking conflict rate, bid latency, payment failure % |
| Logs | Structured JSON → ELK / Loki | Correlation IDs across services |

---

## 16. Deployment and scale

| Concern | Direction |
|---------|-----------|
| Orchestration | Kubernetes: **separate deployments per domain** when extracted |
| Autoscaling | CPU thresholds; **Kafka consumer lag**; Redis hot nodes |
| Multi-region | EU-primary with DR (e.g. active-active or hot standby)—**payments and bookings need explicit consistency story** |
| Routing | Geo DNS / Anycast as traffic grows |

**DR targets** (aspirational—must match RPO/RTO for payments provider and data stores): document agreed RPO/RTO; sub-minute RTO is hard without rehearsal.

### 16.1 Reference topology (text diagram)

```txt
[Client (web)]
     |
     v
[API Gateway / BFF]
     |
     +----------------------+
     |                      |
     v                      v
[Transport Service]   [Stay Service]
     |                      |
     v                      v
 [Redis / geo]         [PostgreSQL]
     |
     v
[Kafka / event bus]
     |
     +-----------------------------+
     |             |               |
     v             v               v
[Payments]   [Notification]   [Analytics / Foresight]
     |
     v
[External PSP + ledger tools]
```

---

## 17. Failure modes developers should expect

| Failure | Symptom | Mitigation |
|---------|---------|------------|
| **Thundering herd** (major event) | Queue collapse, timeouts | Request **queue + backpressure**; tiered prioritization (e.g. premium); rate limits |
| **Double booking** | Race at last commit | Reservation **TTL hold**; commit only after payment/lock; DB constraints |
| **Redis memory blow-up** | Bidding + tracking growth | Aggressive **TTL**; archive cold trip data to column/Wide store |
| **Kafka lag** | Stale downstream state | Partitioning discipline; **lag dashboards**; autoscaled consumers |
| **Over-sync design** | High p99 latency | Push everything async that **does not** need to be synchronous for the user’s critical path |

---

## 18. Product phases ↔ platform work (alignment)

| Product phase (§7) | Platform emphasis |
|-------------------|-------------------|
| Phase 0–1 | BFF + forms + CRM hooks; **no** need for full Kafka mesh yet; keep schemas event-ready |
| Phase 2 | Identity service boundaries; PostgreSQL source of truth; **idempotent** APIs; basic metrics |
| Phase 3 | Extract Transport / Stay / Payments as needed; bidding if marketplace dynamics are real; geo + observability at SLO |

---

## 19. Optional next technical design passes

Pick based on immediate risk:

1. **Service boundaries + repo layout** (fits monorepo packages, CI, and ownership)
2. **Dispatch / matching algorithm** (constraints, scoring, fairness, surge)
3. **Redis keyspace + TTL policy** for bidding and driver presence
4. **Payment saga** (compensations, outbox, double-spend prevention)

---

*This document ties qualitative product goals to phased delivery and a scalable platform model. Update when positioning, legal posture, or infrastructure choices change.*
