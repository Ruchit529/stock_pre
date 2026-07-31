# APPFLOW.md

# Stock Analysis Platform
## Application Flow & User Journey

---

# 1. Purpose

This document defines:

- User journey
- Application screens
- Screen-to-screen navigation
- Analysis sequence
- Request flow
- Data flow
- Stage progression
- User states
- Error and fallback flow

The application must follow the research sequence defined by the source framework:

Business Analysis
→ Sector Analysis
→ Stage 1 Quick Screening
→ Stage 2 Deep Fundamental Analysis
→ Valuation & Investment Strategy

The source framework defines this as a sequential research process, with Stage 1 acting as the gate before deeper analysis.

---

# 2. High-Level Application Flow

```text
                    LANDING / HOME
                          │
                          ▼
                       SEARCH
                          │
                          ▼
                  COMPANY OVERVIEW
                          │
                          ▼
                  BUSINESS ANALYSIS
                          │
                          ▼
                   SECTOR ANALYSIS
                          │
                          ▼
              STAGE 1 FUNDAMENTAL
                  QUICK SCREENING
                          │
                    Score >= 6.5?
                     /          \
                   YES           NO
                    │             │
                    ▼             ▼
               STAGE 2       Show Gate
              DEEP ANALYSIS   Result / Warning
                    │
                    ▼
             BUSINESS MODEL
                & MOAT
                    │
                    ▼
               VALUATION &
           INVESTMENT STRATEGY
                    │
          ┌─────────┼──────────┐
          ▼         ▼          ▼
       Financial  Historical  Compare
       Explorer    Trends     Companies
          │         │          │
          └─────────┼──────────┘
                    │
                    ▼
                 WATCHLIST

Stage 2 remains accessible when Stage 1 does not pass, but the application must clearly indicate that the Stage 2 gate has not been passed.

3. Main Screens

The application should contain the following major screens/modules.

Core Research Screens
Home / Dashboard
Search
Company Overview
Business Analysis
Sector Analysis
Fundamental Analysis — Stage 1
Deep Fundamental Analysis — Stage 2
Business Model & MOAT
Valuation
Entry & Exit Strategy
Portfolio Construction
Psychology & Risk Management
Financial Statements Explorer
Historical Financial Trends
Consolidated Score Engine
Company Comparison
Watchlist
Operational Screens
Login / Registration
Admin Dashboard
Data Refresh Monitoring
Data Conflict / Failed Job Management
Reference Data Management

The core research content follows the stock-analysis framework. Supporting screens such as Search, Dashboard, Watchlist and Admin exist as application infrastructure required to make the research platform usable.

4. Screen 1 — Home / Dashboard
Purpose

Provide the starting point for the application.

Main Actions

User can:

Search for a company
Open a previously viewed company
Open a company from discovery content
Open Watchlist
Navigate to analysis
Flow
Home
  │
  ├── Search Company → Search
  │
  ├── Recently Viewed → Company Overview
  │
  ├── Company → Company Overview
  │
  └── Watchlist → Watchlist
5. Screen 2 — Search
Purpose

Allow the user to find a company before beginning analysis.

Flow
Search
   │
   ├── User enters company name / symbol
   │
   ▼
Search Request
   │
   ├── Results Found
   │       ↓
   │   Select Company
   │       ↓
   │   Company Overview
   │
   └── No Results
           ↓
       Empty State
Search States

The screen must handle:

Empty search
Loading
Results
No results
Invalid input
Search failure
6. Screen 3 — Company Overview
Purpose

Give the user a factual introduction to the selected company.

The source framework begins its Business Analysis with Overview.

Flow
Company Overview
       │
       ├── Add to Watchlist
       │
       └── Continue
              ↓
       Business Analysis

The user should not be forced to start financial scoring directly from this screen.

7. Screen 4 — Business Analysis
Purpose

Understand what the company actually does before evaluating financial performance.

Sections
Overview
Market Cap
Peer Comparison
Business Type

Business Type:

Product Based
Service Based
Asset Based
Flow
Company Overview
       ↓
Business Analysis
       ↓
Sector Analysis
8. Screen 5 — Sector Analysis
Purpose

Understand the sector and its economic cycle before evaluating the company.

Sections
Sector
Cycle
Tailwinds
Risks
Sector Allocation Reference
Common Sector Analysis Mistakes
Cycle

The platform supports:

Cyclical
Defensive
Growth
Flow
Business Analysis
       ↓
Sector Analysis
       ↓
Stage 1 Fundamental Analysis
9. Screen 6 — Stage 1 Fundamental Analysis
Purpose

Perform the quick fundamental screening / gatekeeping analysis.

Metrics

The Stage 1 scorecard contains:

Sales Growth
Profit Growth
OPM
ROE
ROCE
Debt to Equity
Current Ratio
Interest Coverage
P/E
ROA

Banks/NBFCs use the source-defined exception where Debt-to-Equity is removed and the score is out of 9.

10. Stage 1 Screen Flow
Stage 1
   │
   ├── Load Financial Data
   │
   ├── Calculate Metrics
   │
   ├── Apply Source Rules
   │
   ├── Calculate Score
   │
   ▼
Final Score
   │
   ├── >= 6.5
   │      ↓
   │   Stage 1 Passed
   │      ↓
   │   Recommend Stage 2
   │
   └── < 6.5
          ↓
      Stage 1 Not Passed
          ↓
      Show Warning
          │
          └── User may review Stage 2
11. Stage 1 Verdict

The source-defined bands are:

Score	Result
8.5+	Exceptional
7.5–8.5	Excellent
6.5–7.5	Good
<6.5	Avoid

The platform should display the result according to the source framework.

12. Stage 1 Limited Data Flow

If required historical data is incomplete:

Stage 1
   ↓
Check Required Data
   ↓
Complete?
 ┌──┴──┐
Yes    No
 │      │
 ▼      ▼
Score  Limited History
        │
        ▼
Calculate Using
Available Permitted Data
        │
        ▼
Show X / Y Possible

The system must not silently treat missing information as zero.

13. Screen 7 — Stage 2 Deep Fundamental Analysis
Purpose

Analyze longer-term financial trends after the Stage 1 screening.

Sections
Quarterly Results Trend
Profit & Loss Trend
Balance Sheet Trend
Cash Flow Trend
Ratios Trend
Shareholding Trend
Flow
Stage 1 Passed
       ↓
Stage 2
       ↓
Trend Analysis
       ↓
Business Model & MOAT
14. Screen 8 — Business Model & MOAT
Purpose

Evaluate how the company creates value and whether it has durable competitive advantages.

Flow
Stage 2
   ↓
Business Model
   ↓
How does company create value?
   ↓
How does company capture value?
   ↓
Is it scalable?
   ↓
MOAT Analysis

The MOAT section is qualitative and should not be automatically converted into an additional numeric score.

15. MOAT Flow
Business Model
      ↓
MOAT Type
      │
      ├── Brand
      ├── Network Effect
      ├── Cost Advantage
      ├── Switching Cost
      └── Regulatory / Patent
             ↓
        MOAT Questions
             ↓
        User Assessment

The five tests should be presented as:

Yes
No
Unclear

They should remain analyst judgment questions.

16. Screen 9 — Valuation
Purpose

Evaluate valuation using the methods defined in the source framework.

Methods
P/E
PEG
P/B
DCF
Margin of Safety
17. Valuation Flow
Stage 2
   ↓
Valuation
   │
   ├── P/E
   │
   ├── PEG
   │
   ├── P/B
   │
   ├── DCF
   │
   └── Margin of Safety
           ↓
      Valuation Reference

The platform should show calculated values and source-defined interpretation.

It must not turn the result into an automatic buy/sell instruction.

18. Screen 10 — Entry & Exit Strategy
Entry Methods

The platform should show:

Lump Sum
SIP
Tranched Buying
Exit Review Conditions

The user can review:

Fundamentals deteriorating
Stock becoming overvalued
Better opportunity
Portfolio rebalancing
Investment goal achieved
Investment mistake
Personal emergency

These are reference conditions from the source framework.

19. Screen 11 — Portfolio Construction
Purpose

Present the source framework's portfolio construction principles.

Sections
Number of Stocks
Sector Diversification
Position Sizing
Core-Satellite Strategy
Portfolio Rebalancing
Common Mistakes

This is a reference/calculator experience, not a brokerage portfolio management system.

20. Screen 12 — Psychology & Risk Management
Sections
Fear
Greed
FOMO
Panic
Overconfidence
Regret
Loss Aversion
Herd Mentality
Anchoring
Catastrophizing
Emergency Fund
Debt / Equity Allocation
Position Sizing
Stop Loss
News-related decision making

The platform should present these as educational framework content.

21. Screen 13 — Financial Statements Explorer
Purpose

Allow the user to inspect the financial information underlying the analysis.

Sections
Profit & Loss
Balance Sheet
Cash Flow
Quarterly Results
Annual Results
Shareholding
Corporate Actions
Flow
Company
  ↓
Financial Statements
  │
  ├── Annual
  ├── Quarterly
  ├── P&L
  ├── Balance Sheet
  ├── Cash Flow
  └── Shareholding

This screen can be accessed from the company analysis area without breaking the main research sequence.

22. Screen 14 — Historical Financial Trends
Purpose

Provide the historical trends required for Stage 2 analysis.

Flow
Company
   ↓
Historical Trends
   │
   ├── Sales
   ├── OPM
   ├── Net Profit
   ├── ROE
   ├── ROCE
   ├── Reserves
   ├── Borrowings
   ├── CFO
   ├── Debtor Days
   └── Shareholding

The user can inspect the underlying trends and then return to Stage 2.

23. Screen 15 — Consolidated Score Engine
Purpose

Provide a single place to see the result of the structured analysis.

Flow
Stage 1 Score
      +
Stage 2 Score
      ↓
Consolidated View
      ↓
Category Breakdown
      ↓
Supporting Data

The system must keep Stage 1 and Stage 2 scores clearly separated.

MOAT must remain qualitative.

Do not invent a new scoring methodology.

24. Screen 16 — Company Comparison
Purpose

Allow the user to compare companies using the same framework.

Flow
Search / Company Page
       ↓
Add Company
       ↓
Select Companies
       ↓
Comparison
       ↓
Side-by-Side Analysis

The comparison can show supported information such as:

Business Type
Sector
Stage 1 Score
Stage 2 Score
Financial Metrics
Valuation Metrics

The application should support comparison of up to four companies where defined by the requirements.

25. Screen 17 — Watchlist
Purpose

Allow users to save companies they are researching.

Flow
Company Overview
       ↓
Add to Watchlist
       ↓
Watchlist
       ↓
Select Company
       ↓
Company Overview

The watchlist must handle:

Empty state
Duplicate entry
Remove
Company no longer available
26. Login / Registration Flow

Future authenticated flow:

Landing
   ↓
Register / Login
   ↓
Authentication
   ↓
Dashboard

Registration must include acceptance of the platform's educational/non-advisory disclaimer.

The platform does not provide investment advice or buy/sell recommendations.

27. Guest User Flow

A guest should be able to enter the research experience according to the access rules implemented by the application.

General journey:

Home
 ↓
Search
 ↓
Company
 ↓
Research Framework

Authentication should only be required where user-specific functionality needs it.

28. Registered User Flow
Login
 ↓
Dashboard
 ├── Search
 ├── Watchlist
 ├── Recently Viewed
 └── Company Analysis
29. Admin Flow
Admin Login
     ↓
Admin Dashboard
     │
     ├── Company Data
     ├── Sector / Cycle Classification
     ├── Benchmark Reference Data
     ├── Data Refresh
     ├── Failed Jobs
     ├── Data Conflicts
     └── Audit Information

Admin functions are operational functions and must not alter the source-defined investment methodology without an explicitly approved rule change.

30. Request Flow — Normal Company Page

The frontend must not directly request data from Yahoo Finance or Screener.in.

Future request flow:

User
 ↓
React
 ↓
FastAPI
 ↓
Redis Cache
 ↓
Cache Hit?
 ├── YES → Return Cached Data
 │
 └── NO
       ↓
   PostgreSQL
       ↓
   Return Data

External providers are not part of this request flow.

31. Data Collection Flow

External data collection happens separately.

Scheduler
   ↓
Background Job
   ↓
Yahoo Finance
   ↓
Validate
   ↓
Complete?
 ├── YES
 │    ↓
 │  Normalize
 │    ↓
 │  PostgreSQL
 │
 └── NO
      ↓
 Screener.in
      ↓
 Validate
      ↓
 Normalize
      ↓
 PostgreSQL

This keeps external provider failures away from normal user page requests.

32. Data Refresh Flow
Scheduled Job
      ↓
Identify Due Data
      ↓
Fetch Data
      ↓
Validate
      ↓
Compare With Existing Data
      ↓
Abnormal Change?
   ┌────┴────┐
  No        Yes
   │          │
   ▼          ▼
Update     Flag Conflict
Database      │
   │          ▼
   │        Admin Review
   │
   ▼
Recalculate Affected Scores
   ↓
Invalidate Affected Cache

The refresh strategy differs by data type.

33. Score Calculation Flow
Financial Data
      ↓
Validation
      ↓
Normalized Database Data
      ↓
Stage 1 Engine
      ↓
Stage 1 Score
      ↓
Gate Check
      ↓
Stage 2 Engine
      ↓
Stage 2 Score
      ↓
Valuation Engine
      ↓
Valuation Outputs
      ↓
Frontend

The score engine must calculate from stable database data rather than directly from live external sources so that results remain deterministic and reproducible.

34. Error Flow

Every request should support:

Request
  ↓
Processing
  ↓
Success?
 ┌────┴────┐
Yes        No
 │          │
 ▼          ▼
Data      Error State
            │
            ├── Retry
            ├── Last Valid Data
            └── Data Unavailable

The frontend must not crash because:

API failed
Data is missing
Data is incomplete
Provider is unavailable
Company has limited history
35. Limited History Flow
Company
  ↓
Check History
  ↓
Enough Data?
 ┌────┴────┐
Yes        No
 │          │
 ▼          ▼
Normal    Limited History
Score        │
             ▼
       Available Data
             ↓
        X / Y Possible

This is especially important for newly listed companies or companies with insufficient historical data.

36. Provider Failure State

The user-facing application should not expose raw provider errors.

Instead:

Provider Failure
      ↓
Use Last Valid Data?
   ┌────┴────┐
  YES       NO
   │          │
   ▼          ▼
Show       Data
Last       Unavailable
Valid
Data

The admin system should separately record the underlying provider failure.

37. Data Conflict Flow

When multiple providers disagree:

Provider A
    +
Provider B
    ↓
Compare
    ↓
Conflict?
 ┌──┴──┐
No    Yes
 │      │
 ▼      ▼
Store  Flag
       Conflict
          ↓
      Admin Review

The system must not silently overwrite a valid value with conflicting data.

38. User's Complete Research Journey

The intended end-to-end journey is:

1. Open Platform
       ↓
2. Search Company
       ↓
3. Company Overview
       ↓
4. Understand Business
       ↓
5. Understand Sector
       ↓
6. Run Stage 1 Screening
       ↓
7. Check Gatekeeping Result
       ↓
8. Perform Stage 2 Deep Analysis
       ↓
9. Analyze Business Model
       ↓
10. Analyze MOAT
       ↓
11. Evaluate Valuation
       ↓
12. Review Entry / Exit Framework
       ↓
13. Review Portfolio Construction
       ↓
14. Review Psychology / Risk Management
       ↓
15. Review Supporting Financial Trends
       ↓
16. Compare With Other Companies if required
       ↓
17. Add Company to Watchlist if required
39. Navigation Rules

The primary research navigation should follow:

Overview
   ↓
Business
   ↓
Sector
   ↓
Stage 1
   ↓
Stage 2
   ↓
Valuation

Secondary supporting modules should be accessible without disrupting this sequence:

Financial Statements
Historical Trends
Comparison
Watchlist
40. Back Navigation

The user must be able to return to the previous analysis stage.

Example:

Stage 2
 ↓
Back
 ↓
Stage 1

The application should preserve the selected company.

41. Refresh / Reload Behavior

When the user refreshes the browser:

Selected route should remain valid.
Company identifier should remain available from the URL/route.
The application should reload data through the normal API layer in the future.
No financial calculation should depend on temporary in-memory component state alone.
42. No-Data State

When no data exists:

Company
 ↓
Requested Module
 ↓
No Data
 ↓
Display:
"Data not yet available"

Do not display:

0
NaN
Undefined
Fake values

unless zero is genuinely the stored financial value.

43. Partial Data State

When some information exists:

Available Data
      +
Missing Data
      ↓
Partial Data State
      ↓
Display Available Information
      +
Identify Missing Information

Scoring must follow the source-defined limited-history handling.

44. Current Frontend Flow

During the current React-only development phase:

React
 ↓
Mock / Static Data
 ↓
Screens
 ↓
Manual Testing
 ↓
Manual Approval

Do not build fake external integrations during this phase.

45. Future Full System Flow
User
 ↓
React
 ↓
FastAPI
 ↓
Redis / PostgreSQL
 ↓
Deterministic Score Engine
 ↓
Stored / Calculated Result
 ↓
React

Separate:

Scheduler
 ↓
Collector Worker
 ↓
Yahoo Finance / Screener.in
 ↓
Validation
 ↓
Normalization
 ↓
PostgreSQL
 ↓
Score Recalculation
 ↓
Cache Invalidation

These two flows should remain separate.

46. Screen Count Summary
Primary User Screens
#	Screen
1	Home / Dashboard
2	Search
3	Company Overview
4	Business Analysis
5	Sector Analysis
6	Stage 1 Fundamental Analysis
7	Stage 2 Deep Fundamental Analysis
8	Business Model & MOAT
9	Valuation
10	Entry & Exit Strategy
11	Portfolio Construction
12	Psychology & Risk Management
13	Financial Statements Explorer
14	Historical Financial Trends
15	Consolidated Score Engine
16	Company Comparison
17	Watchlist
Supporting Screens
#	Screen
18	Login
19	Registration
20	Admin Dashboard
21	Data Refresh Monitoring
22	Data Conflict / Failed Jobs
23	Reference Data Management

Total planned screen/module destinations:

23

Some of these may be implemented as tabs, drawers, sub-sections or nested routes rather than 23 completely independent physical pages. The final UI structure should follow DESIGN.md.

47. Application Flow Completion Criteria

APPFLOW.md is considered implemented correctly when:

Every major module has a defined entry point.
Every major module has a defined next step.
The primary research sequence is preserved.
Stage 1 gatekeeping is represented.
Stage 2 remains accessible with an appropriate warning when the gate is not passed.
Supporting financial data can be reached without breaking the research flow.
Search leads to the correct company.
Watchlist leads back to the correct company.
Comparison can return to individual company analysis.
API and background-data flows are clearly separated.
Missing data has a defined flow.
Provider failure has a defined flow.
Limited-history companies have a defined flow.
No flow depends on unsupported AI or trading functionality.