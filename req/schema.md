# SCHEMA.md

# STOCK ANALYSIS PLATFORM
## Database Schema & Data Model Instructions

---

# 1. PURPOSE

This document defines the database structure required for the Stock Analysis Platform.

This file provides **instructions for what the developer must create**.

It does **not** provide SQL queries.

The database must store only information required by the approved:

- `Stock_Analysis.md`
- `YOUTUBE MASTERCOURSE PDF.pdf`

Do not create database structures for features that are not present in the approved source material.

---

# 2. DATABASE PRINCIPLES

## 2.1 Database Type

Use a relational database.

The final database technology must follow `TECHSPEC.md`.

---

## 2.2 Design Principles

The database must:

- Avoid unnecessary duplication.
- Keep company information separate from financial information.
- Keep annual and quarterly data distinguishable.
- Support historical data.
- Support business analysis.
- Support sector analysis.
- Support fundamental analysis.
- Support business-model analysis.
- Support economic-moat analysis.
- Support valuation calculations.
- Support portfolio-related reference information where required.
- Preserve sufficient historical information for trend analysis.
- Allow missing financial information without breaking the application.
- Use appropriate primary keys.
- Use appropriate foreign keys.
- Apply appropriate uniqueness constraints.
- Apply appropriate validation constraints.
- Avoid storing calculated values when they can safely be calculated from source data unless historical calculated results need to be preserved.

---

# 3. IMPORTANT SOURCE RULE

Only create tables, columns, relationships, procedures, functions, views, or other database objects when they are required by the approved source framework.

Do not add unrelated modules.

Do not create tables for:

- AI
- AI recommendations
- AI chatbot
- News sentiment
- Alerts
- Candlestick analysis
- Trading orders
- Brokerage integration
- Mobile application

These are not part of the current source-defined database scope.

---

# 4. COMPANY MASTER

## Table: Company

Create a master table for companies being analyzed.

## Required Information

Store:

- Company identifier.
- Company name.
- Stock symbol.
- Business description.
- Market capitalization.
- Business type.
- Sector reference.
- Company status where required.

## Business Type

The database must support the source-defined business types:

- Product Based
- Service Based
- Asset Based

## Requirements

- Company name must be required.
- Stock symbol should be uniquely identifiable.
- Company must be linked to its sector.
- Business type must use controlled values.
- Market capitalization must support appropriate financial precision.
- Business description must support sufficiently long text.

---

# 5. SECTOR MASTER

## Table: Sector

Create a sector master table.

## Required Information

Store:

- Sector identifier.
- Sector name.
- Sector description where required.

## Sector Classification

The system must support the source-defined cycle classifications:

- Cyclical
- Defensive
- Growth

---

# 6. COMPANY SECTOR INFORMATION

If the implementation requires historical sector classification, create a separate company-sector history structure.

## Table: CompanySectorHistory

Store:

- Company reference.
- Sector reference.
- Cycle classification.
- Effective period/date.
- End period/date where required.

The structure must allow the system to identify the applicable sector classification for a company during a given period.

---

# 7. PEER COMPARISON

## Table: CompanyPeer

Create a relationship table for companies used for peer comparison.

Store:

- Company reference.
- Peer company reference.

## Requirements

- A company must not be its own peer.
- The same peer relationship must not be duplicated.
- Both companies must reference valid Company records.

The peer comparison must be based on companies from the relevant sector/industry context.

---

# 8. ANNUAL FINANCIAL DATA

Create a structure for annual financial information required by the framework.

## Table: AnnualFinancialData

Store the annual financial values required for analysis.

The structure must support the metrics used by the source framework, including:

- Sales.
- Profit.
- Operating Profit Margin.
- Net Profit.
- Reserves.
- Borrowings.
- Cash Flow.
- Cash Flow from Operations where required.
- Debtor Days where required.
- ROE.
- ROCE.
- ROA.
- Debt / Equity.
- Current Ratio.
- Interest Coverage.
- P/E.
- EPS where required for valuation.

## Period Information

Store:

- Company reference.
- Financial year.
- Financial period.
- Data availability/status where required.

## Requirements

The design must allow comparison between:

- 1-year values.
- 5-year values.
- Longer historical periods where required by the source framework.

---

# 9. QUARTERLY FINANCIAL DATA

## Table: QuarterlyFinancialData

Create a separate structure for quarterly financial information.

The source framework requires quarterly trend analysis.

Store:

- Company reference.
- Financial year.
- Quarter.
- Sales.
- Operating Profit Margin.
- Net Profit where required.
- Other quarterly values explicitly required by the approved framework.

## Requirements

The database must preserve enough quarterly history to evaluate the required trend period.

Quarterly records must be uniquely identifiable by:

- Company.
- Financial year.
- Quarter.

---

# 10. BALANCE SHEET DATA

If balance-sheet information is stored separately from the main financial record, create a balance-sheet table.

## Table: BalanceSheetData

Store source-required values including:

- Assets.
- Liabilities.
- Net worth / reserves.
- Borrowings.
- Other balance-sheet values only when required by the approved framework.

## Requirements

Support historical annual periods.

Do not add unsupported balance-sheet metrics merely because they are common financial metrics.

---

# 11. PROFIT & LOSS DATA

## Table: ProfitLossData

Create a structure for P&L information.

Store:

- Company reference.
- Financial period.
- Revenue / Sales.
- Expenses where required.
- Operating Profit.
- Operating Profit Margin.
- Net Profit.

The structure must support historical trend analysis.

---

# 12. CASH FLOW DATA

## Table: CashFlowData

Create a structure for cash-flow information.

Store:

- Company reference.
- Financial period.
- Cash flow information required by the framework.
- Cash Flow from Operations where required.
- Net cash information where required.

The structure must allow comparison between cash flow and profit.

---

# 13. FINANCIAL RATIOS

## Table: FinancialRatios

Create a structure for financial ratios required by the framework.

Store only ratios required by the source, including:

- Sales Growth.
- Profit Growth.
- Operating Profit Margin.
- ROE.
- ROCE.
- Debt / Equity.
- Current Ratio.
- Interest Coverage.
- P/E.
- ROA.
- PEG where required by valuation.
- P/B where required by valuation.

## Requirements

Ratios must be associated with:

- Company.
- Financial period.
- Annual or quarterly period where applicable.

Do not store unrelated ratios.

---

# 14. SHAREHOLDING DATA

## Table: ShareholdingPattern

Create a structure for historical shareholding information.

Store:

- Company reference.
- Financial period.
- Promoter holding.
- FII holding.
- DII holding.
- Public holding.

## Requirements

The structure must support historical comparison.

The data must be sufficient for the Stage 2 shareholding analysis.

---

# 15. FUNDAMENTAL STAGE 1 SCORE

## Table: FundamentalStage1Score

Create a structure to store the Stage 1 screening result.

The source framework uses a 10-point scorecard, with Banks/NBFCs treated separately.

Store:

- Company reference.
- Analysis period.
- Sales Growth score.
- Profit Growth score.
- OPM score.
- ROE score.
- ROCE score.
- Debt / Equity score.
- Current Ratio score.
- Interest Coverage score.
- P/E score.
- ROA score.
- Total score.
- Applicable company type/category.
- Final result/verdict.

## Requirements

The score must be traceable back to the underlying financial data.

Do not hard-code the final score without retaining the component scores.

---

# 16. FUNDAMENTAL STAGE 2 SCORE

## Table: FundamentalStage2Score

Create a structure to store the Stage 2 deep trend-analysis result.

Store section-level scores for:

- Quarterly Results.
- P&L Statement.
- Balance Sheet.
- Cash Flow.
- Ratios.
- Shareholding.

Store:

- Company reference.
- Analysis period.
- Quarterly Results score.
- P&L score.
- Balance Sheet score.
- Cash Flow score.
- Ratios score.
- Shareholding score.
- Total score.

The maximum score must reflect the source-defined Stage 2 scoring structure.

---

# 17. FUNDAMENTAL TREND ANALYSIS

## Table: FundamentalTrendAnalysis

Create a structure for storing the underlying trend evaluation where required.

The structure must support the source-defined trends for:

### Quarterly Results

- Sales trend.
- OPM trend.

### P&L

- Sales trend.
- OPM trend.
- Net Profit trend.

### Balance Sheet

- Reserves trend.
- Borrowings trend.

### Cash Flow

- Cash-flow trend.
- CFO versus Net Profit.
- Debtor Days trend where required.

### Ratios

- ROE trend.
- ROCE trend.

### Shareholding

- Promoter trend.
- FII trend.
- DII trend.
- Public trend.

Store the analysis period and company reference.

---

# 18. BUSINESS MODEL

## Table: BusinessModelAnalysis

Create a structure for qualitative business-model analysis.

Store:

- Company reference.
- How the company creates value.
- Customer.
- Problem solved.
- How the company captures value.
- Pricing model.
- Revenue streams.
- Scalability assessment.
- Asset-light / asset-heavy classification.

---

# 19. BUSINESS MODEL TYPE

## Table: BusinessModelType

Create a controlled reference structure for the business-model types covered by the source.

Support:

- Subscription Model.
- Marketplace Model.
- Manufacturing Model.
- Asset Light.
- Asset Heavy.
- Freemium Model.

The database must allow a company to have the applicable business-model classification.

---

# 20. COMPANY BUSINESS MODEL MAPPING

## Table: CompanyBusinessModel

Create a mapping table between Company and BusinessModelType.

Store:

- Company reference.
- Business model reference.
- Description/notes where required.
- Applicable period where required.

A company must be able to have more than one applicable business-model classification if supported by the actual analysis.

---

# 21. BUSINESS MODEL METRICS

Only store business-model metrics when they are explicitly required by the source.

Where applicable, support:

### Subscription

- MRR.
- CAC.
- Churn Rate.
- CAC Payback Period.

### Marketplace

- GMV.
- Take Rate.
- Active Users.
- Order Frequency.

Do not create additional business-model metrics.

---

# 22. ECONOMIC MOAT

## Table: EconomicMoatAnalysis

Create a qualitative moat-analysis structure.

Support the source-defined moat types:

1. Brand Moat
2. Network Effect Moat
3. Cost Advantage Moat
4. Switching Cost Moat
5. Regulatory / Patent Moat

Store:

- Company reference.
- Moat type.
- Description.
- Analysis period where required.

---

# 23. MOAT IDENTIFICATION TESTS

## Table: MoatAssessment

Create a structure to record the five source-defined moat tests.

Store the result/assessment for:

1. Can competitors easily copy the business?
2. Will the advantage last 10 years?
3. Has ROE been high and consistent for 10 years?
4. Can the company raise prices without losing customers?
5. Is market share stable or growing in 5 years?

## Important

Do not create an invented numerical MOAT score.

The source framework treats MOAT identification qualitatively.

---

# 24. VALUATION DATA

## Table: ValuationAnalysis

Create a structure for valuation analysis.

Store the source-defined valuation methods:

- P/E Ratio.
- PEG Ratio.
- P/B Ratio.
- DCF.
- Margin of Safety.

Store:

- Company reference.
- Analysis date/period.
- Current price where required.
- Relevant valuation inputs.
- Calculated result.
- Valuation interpretation where required.

---

# 25. P/E VALUATION

The database must support the source-defined P/E valuation calculation.

Store inputs required for:

- Company P/E.
- Industry P/E.
- EPS.
- Fair Price.
- Future EPS where required.
- Target Price where required.

Do not create additional P/E valuation rules.

---

# 26. PEG VALUATION

The database must support:

> PEG = P/E Ratio / Earnings Growth Rate

Store:

- P/E.
- Earnings growth rate.
- PEG result.
- Valuation classification.

The source-defined classification must be supported:

- Undervalued.
- Fair Valued.
- Getting Expensive.
- Overvalued.

---

# 27. P/B VALUATION

The database must support:

- Market Price Per Share.
- Book Value Per Share.
- Shareholders' Equity.
- Total Assets.
- Total Liabilities.
- P/B Ratio.

Support the source-defined use cases for:

- Banks.
- Real Estate.
- Manufacturing.
- Insurance where applicable.

Do not create unsupported valuation rules.

---

# 28. DCF DATA

## Table: DCFAnalysis

Create a structure only for DCF information required by the source framework.

Store the inputs necessary to perform the source-defined DCF calculation.

Store:

- Company reference.
- Relevant cash-flow inputs.
- Relevant rate/assumption inputs.
- Forecast period where required.
- Present-value result.
- Fair-value result where required.

Do not build additional DCF assumptions that are not specified in the source.

---

# 29. MARGIN OF SAFETY

The database must support the source-defined Margin of Safety calculation.

Store:

- Fair Value.
- Current Value / Current Price.
- Margin of Safety percentage.
- Analysis date.

The calculation is:

> Margin of Safety = (Fair Value - Current Price) / Fair Value

The system must support identification of the source-defined 20% margin-of-safety principle.

---

# 30. ENTRY STRATEGY REFERENCE

## Table: EntryStrategy

Create a reference table for the entry strategies covered by the source.

Support:

1. Lump Sum
2. SIP
3. Tranched Buying

Store:

- Strategy name.
- Description.
- Advantages.
- Disadvantages.
- When to use.

This is educational/reference data.

Do not create order or transaction tables.

---

# 31. EXIT STRATEGY REFERENCE

## Table: ExitStrategy

Create a reference table for the source-defined exit scenarios.

Support:

1. Fundamentals Deteriorating
2. Overvalued
3. Better Opportunities Available
4. Portfolio Rebalancing
5. Goal Achieved
6. Mistake Realized
7. Emergency

Store:

- Scenario name.
- Description.
- Relevant source-defined conditions.

Do not create sell-order functionality.

---

# 32. PORTFOLIO CONSTRUCTION REFERENCE

## Table: PortfolioConstructionRule

Create a structure for the source-defined portfolio-construction guidance.

Support:

- Number of stocks.
- Sector diversification.
- Position sizing.
- Core-Satellite strategy.
- Portfolio rebalancing.
- Common mistakes.

Store the applicable source-defined rule or reference content.

Do not create a brokerage holdings ledger.

---

# 33. POSITION SIZING

Where a position-sizing calculator is required by the approved application, store only the data required for the calculation.

The source defines:

- Equal Weightage.
- Conviction Based Weightage.

The source also provides score-based weightage guidance.

Do not create additional position-sizing algorithms.

---

# 34. CORE-SATELLITE STRATEGY

Store the source-defined Core-Satellite allocation reference.

Support:

- Core allocation.
- Satellite allocation.
- Description.

The source-defined range must be preserved rather than replaced with an invented allocation.

---

# 35. INVESTOR PSYCHOLOGY

## Table: InvestorPsychologyTopic

Create a reference table for the psychology topics covered by the source.

Support topics including:

- Fear.
- Greed.
- FOMO.
- Panic.
- Overconfidence.
- Regret.
- Loss Aversion.
- Herd Mentality.
- Anchoring.
- Catastrophizing.

Store:

- Topic.
- Description.
- Practical guidance where explicitly provided.

---

# 36. RISK MANAGEMENT

## Table: RiskManagementRule

Create a structure for source-defined risk-management information.

Support:

- Emergency Fund.
- Debt Allocation.
- Position Sizing.
- Stop Loss guidance.
- News-related caution.

Where the source provides age-based debt/equity allocation information, preserve those source-defined values.

Do not create additional risk-scoring logic.

---

# 37. DISCIPLINE FRAMEWORK

If the approved UI requires the source's discipline framework to be stored, create a reference structure containing:

1. Goals
2. Risk Profile
3. Investment Strategy
4. Entry / Exit Rules
5. Behavioural Rules
6. Market Crash Protocol
7. Continuous Learning

Do not add additional framework sections.

---

# 38. STOCK MARKET MATHEMATICS

Create calculation-support structures only where the source explicitly requires persistent data.

Calculations that can be safely generated from stored financial data should not be unnecessarily duplicated.

The system must support source-defined concepts involving:

- Capital.
- Investment amount.
- Holding period.
- Returns.
- CAGR.
- Compounding.
- Inflation.
- Nominal Returns.
- Real Returns.
- SIP calculations.

Do not add unrelated financial calculators.

---

# 39. FINANCIAL PERIOD REFERENCE

## Table: FinancialPeriod

Create a reusable period structure if required by the implementation.

Support:

- Annual.
- Quarterly.

Store:

- Period identifier.
- Period type.
- Financial year.
- Quarter where applicable.
- Start date.
- End date.

The structure must allow historical data to be ordered chronologically.

---

# 40. DATA SOURCE / DATA AVAILABILITY

The database must distinguish between:

- Available data.
- Missing data.
- Partial data.

Where required, store:

- Data availability status.
- Period.
- Company.
- Source reference if the implementation requires traceability.

Do not replace missing data with zero.

---

# 41. DATA VALIDATION REQUIREMENTS

Database constraints must prevent invalid data where practical.

Validate:

- Required company identifiers.
- Required financial periods.
- Duplicate annual records.
- Duplicate quarterly records.
- Invalid quarter values.
- Invalid percentage values where applicable.
- Invalid negative values where the metric cannot logically be negative.
- Division-by-zero scenarios at calculation level.
- Invalid relationships.
- Duplicate peer relationships.
- Duplicate business-model mappings.
- Duplicate moat mappings.

---

# 42. HISTORICAL DATA REQUIREMENT

The schema must support historical data because the framework requires trend analysis.

The database must preserve sufficient history for:

- 1-year comparison.
- 5-year comparison.
- Quarterly trend analysis.
- Long-term ROE analysis where required.
- Long-term MOAT assessment where required.
- Historical shareholding analysis.
- Historical valuation analysis where required.

Do not overwrite historical financial records with the latest value.

---

# 43. CALCULATED DATA RULE

Where a value can reliably be calculated from stored source data, prefer calculation over unnecessary duplication.

Examples include:

- PEG.
- P/B.
- Margin of Safety.
- Growth calculations.
- Valuation comparisons.
- Stage scores.

However, if the application needs historical snapshots of a calculated analysis, a result table may store the calculated result together with:

- Company.
- Analysis period.
- Calculation date.
- Input/reference period.

---

# 44. SCORE TRACEABILITY

Every stored score must be traceable to:

```text
Company
   ↓
Financial Period
   ↓
Underlying Financial Data
   ↓
Metric
   ↓
Metric Evaluation
   ↓
Score
   ↓
Section Score
   ↓
Final Score

The database must not store only a final score without enough information to understand how it was produced.

45. BANK / NBFC HANDLING

The schema must allow a company to be identified as a Bank/NBFC where required by the source-defined scoring methodology.

This is necessary because the Stage 1 scoring framework has special handling for Banks/NBFCs.

Do not create separate duplicated financial tables for Banks/NBFCs unless technically necessary.

Prefer a company classification that allows the scoring engine to apply the correct source-defined rules.

46. DATABASE FUNCTIONS

Create database functions only when required by the approved implementation.

Potential calculation functions may include source-defined calculations such as:

Growth calculation.
PEG calculation.
P/B calculation.
Margin of Safety calculation.
Other explicitly defined mathematical calculations.

Do not create functions for unsupported calculations.

47. DATABASE PROCEDURES

Create stored procedures only where they are required by the final backend architecture.

Procedures may be used for operations such as:

Persisting company analysis results.
Persisting financial-period data.
Persisting score results.
Retrieving structured analysis data.

Do not create unnecessary stored procedures.

Do not place business rules into procedures if those rules are required to remain in the Python application/service layer according to TECHSPEC.md.

48. DATABASE VIEWS

Create views only where they improve retrieval of source-defined analysis data.

Possible view categories include:

Company overview.
Company financial summary.
Peer comparison.
Fundamental Stage 1 summary.
Fundamental Stage 2 summary.
Valuation summary.
Historical financial trend summary.

Views must not introduce new metrics or business rules.

49. INDEXING REQUIREMENTS

Create indexes for fields commonly used to retrieve:

Company by stock symbol.
Company by name.
Company by sector.
Financial data by company and period.
Quarterly data by company and period.
Shareholding by company and period.
Fundamental scores by company and period.
Valuation analysis by company and date.

Do not create excessive indexes without a retrieval requirement.

50. FOREIGN KEY REQUIREMENTS

Use foreign-key relationships wherever one database entity depends on another.

Examples:

Company
   ↓
AnnualFinancialData

Company
   ↓
QuarterlyFinancialData

Company
   ↓
ShareholdingPattern

Company
   ↓
FundamentalStage1Score

Company
   ↓
FundamentalStage2Score

Company
   ↓
BusinessModelAnalysis

Company
   ↓
EconomicMoatAnalysis

Company
   ↓
ValuationAnalysis

Invalid references must not be allowed.

51. DELETE / UPDATE RULES

Do not allow deletion of a company to accidentally leave orphaned financial records.

Define appropriate foreign-key behavior.

Historical financial information should not be silently deleted because a company record is updated.

Prefer controlled archival/deactivation where appropriate.

52. NO TRANSACTION DATABASE

The current platform is not a trading or brokerage platform.

Therefore, do not create tables for:

Buy orders.
Sell orders.
Broker accounts.
Trading transactions.
Brokerage integration.
Order execution.
Trade execution history.
53. NO AI DATABASE

Do not create tables for:

AI prompts.
AI recommendations.
AI-generated analysis.
AI chat.
AI sentiment.
AI models.

AI is future scope and is not part of the current implementation.

54. NO NEWS DATABASE

Do not create tables for:

News articles.
News sentiment.
News alerts.
News scoring.

These are not part of the source-defined implementation.

55. NO CANDLESTICK DATABASE

Chart patterns and candlestick analysis are not part of the current source-defined implementation.

Do not create tables for:

Candlestick patterns.
Chart patterns.
Technical indicators.
56. DATA INTEGRATION PREPARATION

The current project is being developed as a React frontend.

The future backend will be Python.

The database schema should therefore remain independent from the React frontend.

Future architecture:

React Frontend
       ↓
Python API
       ↓
Database
       ↓
Financial / Company Data

Do not implement the Python backend as part of the current frontend phase.

57. DATA INTEGRITY RULE

The database must never allow incomplete or invalid data to silently appear as valid financial data.

Examples:

Missing value ≠ 0

Unavailable value ≠ Negative value

Unknown value ≠ Not Applicable

The application must be able to distinguish these cases where necessary.

58. EDGE CASES

The schema and constraints must consider:

Company with missing financial data.
Company with partial historical data.
Company with missing quarterly data.
Company with missing shareholding data.
Company with missing valuation data.
Bank/NBFC.
Non-bank company.
Negative growth.
Negative profit.
Zero profit.
Zero denominator.
Negative debt/equity values where applicable.
Missing sector.
Missing peer data.
Company with multiple applicable business models.
Company with multiple moat characteristics.
Newly listed company with insufficient history.

The system must not break because historical data is incomplete.

59. SCHEMA DEVELOPMENT ORDER

Create the database structures in the following logical order:

1. Financial Period Reference
        ↓
2. Sector
        ↓
3. Company
        ↓
4. Company Sector
        ↓
5. Company Peer
        ↓
6. Annual Financial Data
        ↓
7. Quarterly Financial Data
        ↓
8. Balance Sheet Data
        ↓
9. Profit & Loss Data
        ↓
10. Cash Flow Data
        ↓
11. Financial Ratios
        ↓
12. Shareholding Pattern
        ↓
13. Fundamental Stage 1
        ↓
14. Fundamental Stage 2
        ↓
15. Fundamental Trend Analysis
        ↓
16. Business Model
        ↓
17. Economic Moat
        ↓
18. Valuation
        ↓
19. Entry Strategy Reference
        ↓
20. Exit Strategy Reference
        ↓
21. Portfolio Construction Reference
        ↓
22. Psychology
        ↓
23. Risk Management
        ↓
24. Discipline Framework

Only create structures that are actually required by the final implementation.

60. SCHEMA VALIDATION CHECKLIST

Before marking the schema implementation complete, verify:

Company
 Company can be uniquely identified.
 Business type is supported.
 Sector relationship works.
 Peer relationships work.
Financial Data
 Annual data can be stored.
 Quarterly data can be stored.
 Historical data is preserved.
 P&L data can be stored.
 Balance-sheet data can be stored.
 Cash-flow data can be stored.
 Ratio data can be stored.
 Shareholding data can be stored.
Fundamental Analysis
 Stage 1 score can be stored.
 Stage 2 score can be stored.
 Individual scoring components are traceable.
 Historical trend analysis can be stored.
Business Analysis
 Business model can be stored.
 Business-model type can be stored.
 MOAT information can be stored.
 MOAT tests can be stored.
Valuation
 P/E information can be stored.
 PEG information can be stored.
 P/B information can be stored.
 DCF information can be stored.
 Margin of Safety can be stored.
Investment Framework
 Entry strategies can be represented.
 Exit strategies can be represented.
 Portfolio construction rules can be represented.
 Psychology topics can be represented.
 Risk-management information can be represented.
61. DATABASE IMPLEMENTATION RULE

Do not generate SQL automatically from this document without reviewing the requirements.

The developer must first:

Review this schema specification.
Compare it against Stock_Analysis.md.
Compare it against YOUTUBE MASTERCOURSE PDF.pdf.
Compare it against TECHSPEC.md.
Identify missing or conflicting requirements.
Resolve only approved requirements.
Create the database objects.
Validate relationships.
Test constraints.
Test missing-data scenarios.
Test historical data.
Test calculation inputs.
Update TRACKER.md.
62. FINAL RULE

The database is a storage layer for the Stock Analysis Platform.

It must support the source-defined research process:

Business Analysis
       ↓
Sector Analysis
       ↓
Fundamental Stage 1
       ↓
Fundamental Stage 2
       ↓
Business Model
       ↓
Economic MOAT
       ↓
Valuation
       ↓
Entry / Exit Strategies
       ↓
Portfolio Construction
       ↓
Investor Psychology
       ↓
Risk Management
       ↓
Stock Market Mathematics

Do not add database structures outside this source-defined scope.

If a requirement is not present in the approved source documents:

DO NOT CREATE IT.

If a requirement is unclear:

STOP AND ASK FOR CLARIFICATION.

The database must be designed with validation, historical-data support, missing-data handling, referential integrity, and edge cases in mind so that incomplete or unexpected financial data cannot break the application.