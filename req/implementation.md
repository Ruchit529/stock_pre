# IMPLEMENTATION.md

# STOCK ANALYSIS PLATFORM
## PHASE-BY-PHASE IMPLEMENTATION PLAN

---

# 1. IMPLEMENTATION RULES

## 1.1 Source of Truth

The implementation must follow only:

1. `Stock_Analysis.md`
2. `YOUTUBE MASTERCOURSE PDF.pdf`
3. `PRD.md`
4. `TECHSPEC.md`
5. `APPFLOW.md`
6. `DESIGN.md`

If a feature, metric, calculation, score, benchmark, screen, or business rule is not present in the approved source documents:

- Do not invent it.
- Do not implement it.
- Do not assume it.
- Do not add it because it is common in another stock-analysis application.

---

# 2. CURRENT DEVELOPMENT STATUS

The project is currently being developed as:

> React Frontend First

The backend will be developed later using:

> Python

Future Python APIs will provide data integration for the frontend.

AI is a future possibility but is:

> NOT part of the current implementation.

Do not implement AI now.

---

# 3. DEVELOPMENT APPROACH

The application must be developed incrementally.

Each phase must be completed and manually checked before moving to the next phase.

## Mandatory Process

```text
Read Phase
↓
Implement Phase
↓
Run Application
↓
Check UI
↓
Check Responsive Layout
↓
Check Validation
↓
Check Edge Cases
↓
Fix Issues
↓
Manual User Verification
↓
Mark Phase COMPLETE
↓
Wait for Approval
↓
Start Next Phase

Do NOT automatically continue to the next phase after completing a phase.

4. PHASE 0 — PROJECT FOUNDATION
Objective

Prepare the React project for the Stock Analysis Platform.

Tasks
Verify React project structure.
Establish reusable component structure.
Establish page structure.
Establish routing structure if required by the approved APPFLOW.
Establish shared layout.
Establish reusable UI components.
Establish common typography.
Establish common spacing.
Establish common cards.
Establish common tables.
Establish common status indicators.
Establish common score displays.
Establish common loading states.
Establish common error states.
Establish common empty states.
Follow DESIGN.md.
Important

Do not implement backend integration.

Use frontend mock/static data where necessary.

Manual Check

Verify:

Application starts successfully.
No console errors.
Navigation works.
Layout works on desktop.
Layout works on smaller screens.
Shared components render correctly.
Completion

Only mark Phase 0 COMPLETE after manual verification.

5. PHASE 1 — APPLICATION SHELL & NAVIGATION
Objective

Build the common application structure and navigation.

Tasks

Implement:

Application header.
Main navigation.
Company context area.
Page content area.
Footer where required.
Responsive navigation.
Common page container.
Consistent section structure.

Navigation must follow the sequence defined in APPFLOW.md.

The user must always understand:

Which company is being analyzed.
Which analysis section is open.
Where they are in the research process.
What the next analysis step is.
Manual Check

Verify:

Navigation between pages.
Back/forward flow.
Responsive behavior.
Company context remains clear.
No broken routes.
No unnecessary screens are added.
6. PHASE 2 — COMPANY OVERVIEW
Objective

Create the initial company context screen.

Tasks

Implement only information supported by the approved requirements.

The screen should establish the company context before detailed analysis.

Where supported, display:

Company name.
Company description.
Business context.
Market capitalization.
Other approved company overview information.

Include a clear transition to:

Business Analysis

Manual Check

Verify:

Company information is clearly readable.
Missing information does not break the UI.
Layout works on desktop and mobile.
Next-step navigation works.
7. PHASE 3 — BUSINESS ANALYSIS
Objective

Implement the Business Analysis section.

The source framework contains:

Overview
Business Market Cap
Peer Comparison
Business Type

Business Type contains:

Product Based
Service Based
Asset Based
Tasks

Create the required UI sections.

Business Type must clearly distinguish the three source-defined categories.

Do not create additional business categories.

Manual Check

Verify:

Business information is easy to understand.
Peer comparison layout is readable.
Business types are clearly separated.
No unsupported business metrics have been added.
8. PHASE 4 — SECTOR ANALYSIS
Objective

Implement Sector Analysis.

Tasks

Implement:

Sector
Cycle classification
Cyclical
Defensive
Growth
Sector allocation by market condition
Tailwinds
Risks
Common sector-analysis mistakes
Market Conditions

Use the source-defined allocations:

Bull Market
Cyclical — 40%
Growth — 30%
Defensive — 30%
Bear Market
Defensive — 60%
Growth — 30%
Cyclical — 10%
Normal Market
Cyclical — 30%
Growth — 30%
Defensive — 40%

Do not change these values.

Manual Check

Verify:

Sector classification works.
Market-condition allocation is readable.
Cyclical/Defensive/Growth sections are clearly separated.
No unsupported sectors or rules are introduced.
9. PHASE 5 — FUNDAMENTAL ANALYSIS: STAGE 1
Objective

Implement:

Quick Screening / Gatekeeping

This is the first major scoring module.

The source score is:

10 points

For Banks/NBFCs:

9 points

Tasks

Implement the source-defined metrics:

Sales Growth
Profit Growth
OPM
ROE
ROCE
Debt / Equity
Current Ratio
Interest Coverage
P/E
ROA

For Banks/NBFCs, follow the source-defined exception for Debt / Equity.

UI Requirements

Create:

Metric cards/table.
Current value.
Benchmark where supplied.
Score.
Status.
Red-flag indication where applicable.
Total score.
Final verdict.
Final Verdict

Use the source-defined categories:

8.5+ — Exceptional
7.5–8.5 — Excellent
6.5–7.5 — Good
<6.5 — Avoid
Stage Gate

Display:

Proceed to Stage 2 only if Score ≥ 6.5

Manual Check

Verify:

All metrics render.
Score calculation is consistent with source requirements.
Banks/NBFC exception works.
Verdict is correct.
Red flags are visible.
Missing data does not create fake scores.
Responsive table/card layout works.
10. PHASE 6 — FUNDAMENTAL ANALYSIS: STAGE 2
Objective

Implement:

Deep Trend Analysis

The source defines six scoring categories:

Quarterly Results — 2 points
P&L Statement — 3 points
Balance Sheet — 1 point
Cash Flow — 1 point
Ratios — 2 points
Shareholding — 1 point

Total:

10 points

Tasks

Implement the source-defined trend analysis.

Quarterly Results

Show:

Sales YoY
OPM YoY
P&L

Show:

Sales
OPM
Net Profit
Balance Sheet

Show:

Reserves
Borrowings
Cash Flow

Show:

CFO
Net Profit
Debtor Days
Ratios

Show:

ROE
ROCE
Shareholding

Show:

Promoter
Public
FII
DII
Manual Check

Verify:

Historical trends render correctly.
Trend states are understandable.
Score breakdown is visible.
Total score is visible.
Missing historical periods are handled safely.
No unsupported trend metric is added.
11. PHASE 7 — BUSINESS MODEL ANALYSIS
Objective

Implement the qualitative Business Model framework.

Tasks

Implement the three source-defined questions:

1. How does the company create value?

Show:

Product / Service
Customer
Problem Solved
2. How does the company capture value?

Show:

How they charge
Pricing Model
Revenue Streams
3. Is it scalable?

Show:

Ability to grow without proportional cost increase.
Asset Light
Asset Heavy
Business Models

Implement only the models covered in the source:

Subscription Model
Marketplace Model
Manufacturing Model
Asset Light vs Asset Heavy
Freemium Model
Manual Check

Verify:

All sections are understandable.
No invented business-model metrics.
Asset Light and Asset Heavy are clearly distinguishable.
Responsive layout works.
12. PHASE 8 — ECONOMIC MOAT
Objective

Implement the source-defined MOAT framework.

MOAT Types

Implement:

Brand Moat
Network Effect Moat
Cost Advantage Moat
Switching Cost Moat
Regulatory / Patent Moat
MOAT Identification

Implement the five source-defined questions:

Can competitors easily copy the business?
Will this advantage last 10+ years?
Has ROE been high and consistent for 10 years?
Can the company raise prices without losing customers?
Is market share stable or growing in 5 years?

Do not invent a MOAT score unless explicitly defined by the source.

Manual Check

Verify:

Five MOAT categories appear.
Five identification questions appear.
No additional scoring system has been invented.
13. PHASE 9 — VALUATION
Objective

Implement the source-defined valuation section.

Valuation Methods

Implement:

P/E Ratio
PEG Ratio
P/B Ratio
DCF
Margin of Safety
P/E

Show:

Company P/E
Industry P/E
Comparison
Fair Price concept

Source rule:

If company P/E is approximately 2x industry P/E, the stock is considered highly overvalued / generally avoided.

PEG

Show:

PEG = P/E Ratio ÷ Earnings Growth Rate

Source categories:

<1 — Undervalued
1–1.5 — Fair Valued
1.5–2 — Getting Expensive

2 — Overvalued

P/B

Show the source-defined usage and ranges for:

Banks
Manufacturing
DCF

Show the source-level DCF concept.

Do not build an advanced DCF system beyond the supplied methodology.

Margin of Safety

Show:

Margin of Safety = (Fair Value − Current Price) ÷ Fair Value

Source rule:

Invest only when price is at least 20% below fair value.

Manual Check

Verify:

Formulas are correct.
Values are readable.
Source-defined ranges are correct.
No unsupported valuation method exists.
DCF does not exceed source scope.
14. PHASE 10 — ENTRY & EXIT STRATEGIES
Objective

Implement the educational/reference content from the source.

Entry Strategies

Implement:

Lump Sum
SIP
Tranched Buying

Show source-defined:

Advantages
Disadvantages
When to use
Exit Strategies

Implement the seven source-defined scenarios:

Fundamentals Deteriorating
Overvalued
Better Opportunities Available
Portfolio Rebalancing
Goal Achieved
Mistake Realized
Emergency
Manual Check

Verify:

All three entry strategies appear.
All seven exit scenarios appear.
No trading execution functionality exists.
No personalized buy/sell recommendation is generated.
15. PHASE 11 — PORTFOLIO CONSTRUCTION
Objective

Implement the source-defined portfolio construction reference.

Tasks

Implement:

How many stocks
Sector Diversification
Position Sizing
Core-Satellite Strategy
Portfolio Rebalancing
Common Mistakes
Stock Count

Display source-defined approaches:

Concentrated — Max 5
Focused — 6–10
Balanced — Up to 25
Sector Diversification

Show:

No single sector >20%
Minimum 4–5 sectors
Up to 8 sectors
Avoid highly correlated sectors
Position Sizing

Show source-defined methods:

Equal Weightage
Conviction Based Weightage

Do not silently resolve any source inconsistency.

If a source value cannot be reconciled with another source value, flag it rather than inventing a conversion.

Core-Satellite

Show:

Core — 70–80%
Satellite — 20–30%
Manual Check

Verify:

All source-defined portfolio concepts appear.
No holdings ledger is created unless explicitly approved.
No broker integration exists.
No order execution exists.
16. PHASE 12 — INVESTOR PSYCHOLOGY & RISK MANAGEMENT
Objective

Implement the source-defined educational content.

Psychology

Show:

Fear
Greed
FOMO
Panic
Overconfidence
Regret
Risk Management

Show source-defined concepts including:

Emergency Fund
Debt Allocation
Position Sizing
Mental / Technical Stop Loss
Avoid acting on news
Discipline Framework

Implement the source-defined Investment Policy Statement structure where required:

Goals
Risk Profile
Investment Strategy
Entry / Exit Rules
Behavioural Rules
Market Crash Protocol
Continuous Learning
Manual Check

Verify:

Content is informational.
No personalized financial advice is generated.
No unsupported psychological rules are added.
17. PHASE 13 — STOCK MARKET MATHEMATICS
Objective

Implement the source-defined educational mathematics section where included in the approved application flow.

Source Concepts

Show:

Capital
Time
Rate
Psychology
Tax
Mistake Cost
Time in the Market
Compounding
Inflation
Nominal Returns
Real Returns

Do not add unrelated calculators.

Manual Check

Verify:

Calculations, if implemented, match the source.
No unsupported financial-planning functionality is added.
18. PHASE 14 — COMMON COMPONENT REFINEMENT
Objective

After major screens are implemented, consolidate reusable UI components.

Tasks

Review and standardize:

Cards
Tables
Metric rows
Score cards
Status indicators
Trend indicators
Section headers
Navigation
Empty states
Error states
Loading states
Responsive tables
Tooltips/explanations where supported

Remove duplicate implementations.

Manual Check

Verify that changing a shared component does not break other screens.

19. PHASE 15 — VALIDATION & EDGE CASES
Objective

Ensure the application does not break when data is incomplete or invalid.

Required Cases

Test:

No company selected.
Invalid company.
Company not found.
Missing company information.
Missing financial data.
Missing annual data.
Missing quarterly data.
Missing valuation data.
Limited historical data.
Bank/NBFC.
Non-bank company.
Empty results.
Invalid values.
Loading state.
API-unavailable placeholder state.
Error state.
Very large numbers.
Negative values.
Long company names.
Long business descriptions.
Mobile screen width.
Tablet screen width.
Rules

Never use fake financial values to hide missing data.

Never let missing data crash the application.

Use a clear unavailable-data state.

20. PHASE 16 — RESPONSIVE & CROSS-SCREEN TESTING
Objective

Perform a complete frontend UI check.

Test
Desktop
Navigation
Tables
Charts/trends
Scorecards
Cards
Long content
Tablet
Navigation
Tables
Cards
Spacing
Horizontal scrolling
Mobile
Navigation
Tables
Cards
Scorecards
Long text
Company context
Buttons
Manual Check

Every screen must be manually reviewed at all supported responsive sizes.

21. PHASE 17 — FRONTEND QUALITY CHECK
Objective

Complete frontend quality verification before backend integration.

Check
No console errors.
No broken routes.
No broken components.
No unnecessary duplicated code.
No unused major components.
No hardcoded fake financial information presented as real data.
No unsupported features.
No AI functionality.
No brokerage functionality.
No order execution.
No unsupported technical indicators.
No source-rule modifications.
22. PHASE 18 — PYTHON BACKEND PREPARATION
IMPORTANT

This phase is future work.

Do not implement the Python backend during the current frontend-only development stage unless explicitly instructed.

When backend development begins, it will use:

Python

The React frontend should be structured so that mock/static data can later be replaced with API responses without redesigning the UI.

Future integration should follow:

Python Backend
↓
API
↓
React Frontend

The frontend should not be tightly coupled to mock data.

23. PHASE 19 — DATA INTEGRATION
FUTURE PHASE

When Python backend development starts, integrate the approved data sources through the backend.

The frontend should consume APIs rather than directly depending on external data providers.

Do not implement this phase during the current frontend-only build unless explicitly instructed.

24. PHASE 20 — FUTURE AI
FUTURE ONLY

AI may be considered later.

AI is NOT part of the current build.

Do not implement:

AI chatbot
AI stock analysis
AI scoring
AI recommendations
AI explanations
AI sentiment analysis
25. PHASE COMPLETION RULE

A phase is considered COMPLETE only when:

Implementation is finished.
Application runs.
Manual UI verification is completed.
Responsive behavior is checked.
Validation is checked.
Edge cases are checked.
No critical errors remain.
The user confirms the phase.

Only after user confirmation may the next phase begin.

26. STOP RULE

After completing every phase:

STOP.

Do not automatically start the next phase.

Wait for the user to manually check the implementation and explicitly instruct:

NEXT

Only then proceed to the next phase.

27. IMPLEMENTATION TRACKING

Update TRACKER.md after each completed phase.

Use:

TODO
IN PROGRESS
COMPLETE
BLOCKED

Track both:

Phase progress
Individual implementation tasks

Do not mark a task COMPLETE merely because code was written.

It must also pass manual verification.

28. FINAL IMPLEMENTATION PRINCIPLE

The developer must continuously ask:

"Is this requirement actually present in the approved source material?"

If YES:

Implement it.

If NO:

Do not implement it.

If unclear:

Stop and flag it for review rather than inventing functionality.

The goal is not to build a generic stock-analysis application.

The goal is to build the Stock Analysis Platform according to the supplied source framework, while keeping the current implementation focused on the React frontend and leaving Python backend/API integration for the future.