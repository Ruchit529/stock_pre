# PRD.md

# Stock Analysis Platform
## Product Requirements Document

---

# 1. Product Overview

The Stock Analysis Platform is a structured stock research application designed around a systematic framework for analyzing Indian listed companies.

The platform should help a user move through a consistent research process instead of making decisions based only on stock price, short-term movements, or isolated financial metrics.

The core research flow is:

Business Analysis
        ↓
Sector Analysis
        ↓
Fundamental Analysis — Stage 1
        ↓
Deep Fundamental Analysis — Stage 2
        ↓
Valuation
        ↓
Entry / Exit Strategy
        ↓
Portfolio Construction
        ↓
Psychology & Risk Management

The application should present the framework in a structured and understandable way.

---

# 2. Problem Statement

Stock analysis can become difficult when information is scattered across different financial metrics and when investors focus on only one part of a company.

The platform should provide a structured method for answering questions such as:

- What does the company do?
- What type of business is it?
- What sector does it operate in?
- What is the sector cycle?
- Is the company's sales growth healthy?
- Is profit growing?
- Are operating margins improving?
- Is the company generating reasonable returns?
- Is debt under control?
- Is the company financially healthy?
- Are financial trends consistent over time?
- Does the business have a competitive advantage or MOAT?
- Is the stock reasonably valued?
- What entry methods are discussed in the framework?
- What situations should make an investor reconsider an investment?
- How should a portfolio be diversified?
- How should an investor manage psychological and risk-related mistakes?

The platform should bring these parts together into one consistent research workflow.

---

# 3. Product Goal

The primary goal is to create a structured stock-research platform that applies the supplied stock-analysis framework consistently.

The platform should allow users to:

1. Understand the business.
2. Understand its sector and cycle.
3. Perform a quick fundamental screening.
4. Perform deeper fundamental trend analysis.
5. Understand the business model and MOAT.
6. Evaluate valuation.
7. Understand entry and exit approaches.
8. Understand portfolio construction principles.
9. Understand investor psychology and risk management.

The platform should make the analysis systematic and easier to follow.

---

# 4. Target Users

## 4.1 Long-Term Investors

Users interested in analyzing companies for long-term investing.

They need to understand:

- Business quality
- Sector conditions
- Financial performance
- Long-term trends
- Valuation
- Risk

---

## 4.2 Beginner Investors

Users who are learning how to analyze stocks.

The platform should help them follow the framework step-by-step instead of jumping directly to valuation or price movement.

The source material emphasizes avoiding:

- FOMO
- Herd mentality
- Emotional decisions
- Over-diversification
- Ignoring valuation
- Ignoring risk management
- Recency bias
- Emotional attachment

---

## 4.3 Experienced / Semi-Professional Investors

Users who already understand financial metrics but want a consistent framework for evaluating companies.

They should be able to use:

- Stage 1 scoring
- Stage 2 trend analysis
- Peer comparison
- Valuation methods
- Portfolio construction principles

---

# 5. Core Product Principles

## 5.1 Structured Analysis

The platform must follow a structured research sequence.

The user should not be required to jump randomly between unrelated metrics.

---

## 5.2 Business Before Numbers

The user should first understand:

- Company
- Business
- Market Cap
- Peer Comparison
- Business Type

before moving deeper into financial analysis.

---

## 5.3 Sector Context

Companies should be understood within their sector.

The framework identifies:

- Cyclical
- Defensive
- Growth

sector classifications.

It also considers:

- Tailwinds
- Risks
- Economic conditions

---

## 5.4 Fundamental Gatekeeping

Stage 1 Fundamental Analysis is a quick screening mechanism.

The framework scores the stock out of 10 points, with a separate note for Banks/NBFCs.

The score uses the specified financial metrics and rules from the source framework.

The platform must not replace the source scoring methodology with a different scoring system.

---

## 5.5 Deep Trend Analysis

Stage 2 should analyze whether the company's performance is consistent over time.

The framework includes:

- Quarterly Results
- Profit & Loss
- Balance Sheet
- Cash Flow
- Ratios
- Shareholding Pattern

The framework also separately examines:

- Business Model
- Scalability
- Economic MOAT

---

## 5.6 Valuation Matters

A good company does not automatically mean a good investment at every price.

The source framework explains:

- Good company + expensive price → loss or long wait
- Good company + fair price → good returns
- Good company + cheap price → excellent returns

The platform should therefore include valuation as part of the overall research workflow.

---

# 6. Core Features

---

## 6.1 Business Analysis

The Business Analysis module must contain:

### Overview

Understand what the company does.

### Market Cap

Understand the company's market-cap category/context.

### Peer Comparison

Compare the company with relevant peers.

### Business Type

Classify the business as:

- Product Based
- Service Based
- Asset Based

The source framework defines these as the core Business Analysis areas. :contentReference[oaicite:1]{index=1}

---

# 7. Sector Analysis

The platform should allow the user to understand the company's sector and its current cycle.

The framework identifies:

- Cyclical
- Defensive
- Growth

It also covers:

- Tailwinds
- Risks
- Sector allocation according to market conditions

The framework provides different reference allocations for:

### Bull Market

- Cyclical: 40%
- Growth: 30%
- Defensive: 30%

### Bear Market

- Defensive: 60%
- Growth: 30%
- Cyclical: 10%

### Normal Market

- Cyclical: 30%
- Growth: 30%
- Defensive: 40%

The framework also recommends that beginners default to assuming a bear market.

The platform should present these as framework reference information.

---

# 8. Fundamental Analysis — Stage 1

Stage 1 is the quick screening / gatekeeping stage.

The source specifies a score out of 10 points, with a Banks/NBFC exception.

The analysis includes:

1. Sales Growth
2. Profit Growth
3. Operating Profit Margin (OPM)
4. Return on Equity (ROE)
5. Return on Capital Employed (ROCE)
6. Debt to Equity
7. Current Ratio
8. Interest Coverage
9. P/E Ratio
10. ROA

The platform should show:

- Actual metric
- Relevant benchmark
- Score contribution
- Red flags
- Total score
- Maximum score
- Interpretation

All scoring must follow the source framework exactly.

---

# 9. Stage 1 Financial Benchmarks

The platform should use the benchmarks supplied in the source framework.

Examples include:

### Sales Growth

- >10% — Excellent
- 5–10% — Good
- 0–5% — Slow Growth
- Negative — Red Flag

### Profit Growth

- >15% — Excellent
- 10–15% — Good
- 5–10% — Acceptable
- 0–5% — Slow
- Negative — Red Flag

### OPM

The source provides industry-specific benchmark ranges including:

- IT Services
- Pharma
- FMCG
- Paints / Wires
- Automobiles
- Retail
- Steel / Metals

The application should use only the benchmark ranges supplied by the source material.

---

# 10. Deep Fundamental Analysis — Stage 2

Stage 2 evaluates longer-term financial trends.

The source specifies:

### Quarterly Results

- Sales YoY trend
- OPM YoY trend

### Profit & Loss

- Sales trend
- OPM trend
- Net Profit trend

### Balance Sheet

- Reserves
- Borrowings

### Cash Flow

- Cash Flow from Operations
- Net Profit
- Debtor Days

### Ratios

- ROE
- ROCE

### Shareholding Pattern

Track:

- Promoter
- Public
- FII
- DII

The source also identifies red flags such as decreasing promoter, FII or DII holdings. :contentReference[oaicite:2]{index=2}

---

# 11. Business Model Analysis

The platform should explain how a company creates and captures value.

The framework asks:

### How does the company create value?

- Product / service
- Customer
- Problem solved

### How does the company capture value?

- Pricing model
- Revenue streams

### Is it scalable?

Determine whether the company can grow without proportional cost increases.

The framework identifies business-model examples such as:

- Subscription
- Marketplace
- Manufacturing
- Branded vs Commodity
- Asset-Light
- Asset-Heavy
- Freemium

---

# 12. Economic MOAT

The platform should provide qualitative MOAT analysis.

The source identifies five types:

1. Brand Moat
2. Network Effect Moat
3. Cost Advantage Moat
4. Switching Cost Moat
5. Regulatory / Patent Moat

The framework provides five tests:

1. Can competitors easily copy the business?
2. Will the advantage last 10+ years?
3. Has ROE been consistently high for 10+ years?
4. Can the company raise prices without losing customers?
5. Is market share stable or growing over 5 years?

MOAT should be treated as a qualitative framework and should not receive an invented numerical score.

---

# 13. Valuation

The platform should provide the valuation methods included in the source material.

These include:

1. P/E Ratio
2. PEG Ratio
3. Price to Book (P/B)
4. Discounted Cash Flow (DCF)

The platform should also calculate/display Margin of Safety where the source framework provides the required information.

---

# 14. P/E Valuation

The framework compares:

Company P/E

against

Industry P/E

The platform should support:

- Current P/E
- Industry P/E
- Comparison
- Fair Price concept
- Target Price concept where the source methodology supports the calculation

---

# 15. PEG Ratio

The platform should support:

PEG = P/E Ratio / Earnings Growth Rate

The framework provides interpretation bands including:

- PEG < 1 — Undervalued
- PEG 1–1.5 — Fair Valued
- PEG 1.5–2 — Getting Expensive
- PEG > 2 — Overvalued

These classifications should follow the source framework.

---

# 16. Price to Book Ratio

P/B should be used in the contexts specified by the source framework, including:

- Banks
- Real Estate
- Manufacturing
- Insurance
- Asset-heavy businesses

The platform should show:

- Market Price per Share
- Book Value per Share
- P/B Ratio

---

# 17. Discounted Cash Flow

The platform should provide the DCF concept described in the source material.

The purpose is to understand the present value of future cash flows.

Do not introduce additional DCF assumptions or methodology that are not defined in the source material.

---

# 18. Margin of Safety

The platform should calculate Margin of Safety using the source framework.

Concept:

Fair Value
vs
Current Value

The framework identifies Margin of Safety as an important valuation principle.

The source also presents a reference rule that investment should be considered only when price is at least 20% below fair price.

---

# 19. Entry Strategies

The platform should present the entry strategies included in the source material.

### Lump Sum

One-time investment.

### SIP

Regular investment.

### Tranched Buying

Hybrid approach.

The platform should explain the advantages, disadvantages and situations described in the source material.

---

# 20. Exit Strategy

The platform should provide the source's exit-scenario checklist.

The framework identifies situations including:

- Fundamentals deteriorating
- Stock becoming overvalued
- Better opportunities available
- Portfolio rebalancing
- Investment goal achieved
- Investment mistake realized
- Emergency

Fundamental deterioration indicators include:

- Management issues
- Outdated business model
- Market-share loss
- Falling ROE / ROCE
- Rising debt
- Shrinking profit margins

These should be presented as framework guidance, not automated personalized trade instructions.

---

# 21. Portfolio Construction

The platform should present the portfolio construction principles from the source.

The framework discusses:

- Number of stocks
- Sector diversification
- Position sizing
- Core-Satellite strategy
- Portfolio rebalancing
- Common mistakes

### Stock Count Reference

The source describes:

- Concentrated: Maximum 5 stocks
- Focused: 6–10 stocks
- Balanced: Up to 25 stocks

The balanced example includes:

- 17 large cap
- 5 mid cap
- 3 small cap

---

# 22. Sector Diversification

The framework specifies:

- No single sector above 20%
- Minimum 4–5 sectors
- Up to 8 sectors
- Avoid highly correlated sectors
- Sector selection based on economic conditions

These should be shown as reference rules.

---

# 23. Position Sizing

The source presents:

### Method 1

Equal Weightage

### Method 2

Conviction-Based Weightage

The platform should present the position-sizing framework supplied in the source material.

---

# 24. Core-Satellite Strategy

The platform should explain:

### Core

70–80%

Stable / safer / boring investments.

### Satellite

20–30%

Growth-oriented / higher-risk investments.

This should be presented as the source framework's portfolio construction reference.

---

# 25. Portfolio Rebalancing

The framework identifies rebalancing situations such as:

- Government rules / regulations
- After quarterly results
- After reaching target

The platform should explain these reference conditions.

---

# 26. Investor Psychology

The platform should include the psychological issues described in the source material.

Key emotions:

- Fear
- Greed
- FOMO
- Panic
- Overconfidence
- Regret

Key psychological problems:

- Loss Aversion
- Herd Mentality
- Anchoring
- Catastrophizing

---

# 27. FOMO Framework

The source provides a 48-hour rule.

The user should be encouraged to:

- Wait two days
- Allow excitement to settle
- Consider whether missing the stock would actually cause a major loss

The platform should present this as educational framework content.

---

# 28. Risk Management

The platform should cover:

### Emergency Fund

The source recommends:

6–12 months of expenses.

### Debt / Equity Allocation

The source provides age-based allocation references.

### Position Sizing

Avoid over-concentration.

### Stop Loss

The source discusses using a mental / technical stop loss.

### News

The framework advises against making decisions solely because of news.

---

# 29. Common Mistakes

The platform should educate users about mistakes identified in the source material.

These include:

- Over-diversification
- Blind equal weighting
- Home Bias
- Incorrect sector timing
- Ignoring valuations
- Copying others / herd mentality
- Ignoring risk management
- Recency bias
- Emotional attachment
- Ignoring taxes

---

# 30. Product Boundaries

The platform is for structured stock research and analysis.

It should not become a trading execution platform.

The source material does not define:

- Brokerage execution
- Order placement
- Intraday trading system
- AI stock analysis
- Chatbot
- News sentiment system
- Mobile application
- Alerts system

These should not be added as core product requirements based on assumptions.

---

# 31. Success Criteria

The product should be considered successful when the platform allows a user to follow the supplied framework in a clear sequence.

### Success Criterion 1

User can understand the company's:

- Overview
- Market Cap
- Peer Comparison
- Business Type

---

### Success Criterion 2

User can understand:

- Sector
- Cycle
- Tailwinds
- Risks

---

### Success Criterion 3

User can run the Stage 1 Fundamental Analysis and receive a score based on the source's rules.

The score must be reproducible from the underlying financial data.

---

### Success Criterion 4

User can perform Stage 2 analysis using:

- Quarterly Results
- P&L
- Balance Sheet
- Cash Flow
- Ratios
- Shareholding Pattern

---

### Success Criterion 5

User can understand:

- Business Model
- Scalability
- MOAT

---

### Success Criterion 6

User can evaluate valuation using:

- P/E
- PEG
- P/B
- DCF
- Margin of Safety

---

### Success Criterion 7

User can understand the source framework's:

- Entry strategies
- Exit scenarios
- Portfolio construction
- Position sizing
- Core-Satellite strategy
- Rebalancing
- Psychology
- Risk management

---

### Success Criterion 8

The platform should make the complete framework easier to follow without changing the underlying methodology.

---

# 32. Product Success Definition

The product succeeds when a user can take an Indian listed company and systematically move through:

Business

→ Sector

→ Fundamental Screening

→ Deep Fundamental Analysis

→ Business Model / MOAT

→ Valuation

→ Entry / Exit Reference

→ Portfolio Construction

→ Psychology & Risk Management

while keeping the analysis based on the supplied framework rather than arbitrary metrics or unsupported scoring.

---

# 33. Source Fidelity Rule

This is a mandatory product requirement.

The platform must remain faithful to:

1. Stock_Analysis.md
2. YOUTUBE_MASTERCOURSE_PDF.pdf

Do not add a metric, scoring rule, benchmark, category, feature, or investment methodology simply because it appears useful or is common in another stock-analysis platform.

If the source does not define it, it should not be presented as part of the framework.