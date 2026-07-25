# APPFLOW.md

# Stock Analysis Platform - Application Flow

---

# Application Goal

The application guides users through a complete stock analysis workflow, from searching a company to receiving a final investment verdict.

The experience should feel like reading a professional equity research report rather than using a traditional dashboard.

---

# Current Project Scope

Current Version

- React Frontend
- Static / Mock Data
- No Authentication
- No Backend
- No Database

Future versions will integrate with Python APIs and AI services.

---

# Primary User Journey

```
Landing Page
      │
      ▼
Search Company
      │
      ▼
Company Overview
      │
      ▼
Business Analysis
      │
      ▼
Industry Analysis
      │
      ▼
Fundamental Analysis
      │
      ▼
Deep Fundamental Analysis
      │
      ▼
Business Model & MOAT
      │
      ▼
Valuation
      │
      ▼
Technical Analysis
      │
      ▼
Portfolio Recommendation
      │
      ▼
Risk Management
      │
      ▼
Final Investment Verdict
```

---

# Navigation Structure

```
Home

├── Company Search
│
├── Company Overview
│
├── Business Analysis
│
├── Industry Analysis
│
├── Fundamental Analysis
│
├── Deep Fundamental Analysis
│
├── Business Model
│
├── Economic Moat
│
├── Valuation
│
├── Technical Analysis
│
├── Portfolio Construction
│
├── Risk Management
│
├── Glossary
│
└── Settings
```

---

# Screen 1

## Landing Page

Purpose

Introduce the application.

Components

- Hero Section
- Search Company
- Featured Companies
- Popular Sectors
- Quick Navigation
- Recently Viewed (Placeholder)
- CTA

Actions

Search Company

↓

Company Overview

---

# Screen 2

## Company Search

Purpose

Search companies.

Components

- Search Bar
- Search Suggestions
- Popular Searches
- Recent Searches

Action

Select Company

↓

Company Overview

---

# Screen 3

## Company Overview

Purpose

Give users a quick understanding of the company.

Components

- Company Logo
- Company Name
- Stock Symbol
- Current Price
- Daily Change
- Market Cap
- Sector
- Industry
- Exchange
- Company Description
- Quick Financial Snapshot

Navigation

Business Analysis

Industry Analysis

Fundamental Analysis

---

# Screen 4

## Business Analysis

Purpose

Understand how the company works.

Sections

- Business Overview
- Products
- Services
- Revenue Sources
- Customer Segments
- Business Model
- Competitive Position

Next

Industry Analysis

---

# Screen 5

## Industry Analysis

Purpose

Evaluate the industry.

Sections

- Industry Overview
- Industry Type
- Growth
- Competition
- Tailwinds
- Headwinds
- Industry Health

Next

Fundamental Analysis

---

# Screen 6

## Fundamental Analysis

Purpose

Quick financial screening.

Sections

- Sales Growth
- Profit Growth
- OPM
- ROE
- ROCE
- Debt
- Current Ratio
- Interest Coverage
- ROA
- PE
- PB

Show

- Individual Scores
- Overall Score
- Final Stage 1 Result

Next

Deep Fundamental Analysis

---

# Screen 7

## Deep Fundamental Analysis

Purpose

Analyze long-term financial trends.

Sections

- Quarterly Results
- Profit & Loss
- Balance Sheet
- Cash Flow
- Financial Ratios
- Shareholding Pattern

Next

Business Model

---

# Screen 8

## Business Model Analysis

Purpose

Understand how the company creates value.

Sections

- Business Model
- Revenue Model
- Scalability
- Asset Light / Heavy
- Competitive Position

Next

Economic Moat

---

# Screen 9

## Economic Moat

Purpose

Evaluate long-term competitive advantage.

Sections

- Brand
- Network Effect
- Switching Cost
- Cost Advantage
- Regulatory Advantage

Next

Valuation

---

# Screen 10

## Valuation

Purpose

Determine whether the stock is fairly priced.

Sections

- PE
- PEG
- PB
- DCF
- Margin of Safety

Show

- Fair Value
- Current Value
- Valuation Verdict

Next

Technical Analysis

---

# Screen 11

## Technical Analysis

Purpose

Study price action.

Sections

- Price Chart
- Trend
- Support
- Resistance
- Momentum
- Entry Zone
- Exit Zone
- Risk Reward

Next

Portfolio Construction

---

# Screen 12

## Portfolio Construction

Purpose

Show how the stock fits inside a portfolio.

Sections

- Position Size
- Sector Allocation
- Core vs Satellite
- Diversification
- Allocation Suggestion

Next

Risk Management

---

# Screen 13

## Risk Management

Purpose

Help investors manage risk.

Sections

- Emergency Fund
- Position Sizing
- Debt Allocation
- Stop Loss
- Behaviour Rules
- Common Mistakes

Next

Final Verdict

---

# Screen 14

## Final Investment Verdict

Purpose

Summarize complete analysis.

Display

- Business Score
- Industry Score
- Financial Score
- Valuation Score
- Technical Score
- Risk Score
- Overall Rating

Final Recommendation

- Exceptional
- Excellent
- Good
- Avoid

Actions

Analyze Another Company

Return Home

---

# Screen 15

## Glossary

Purpose

Explain financial terms.

Examples

- ROE
- ROCE
- OPM
- EPS
- PE
- PB
- DCF
- CAGR
- Debt Equity
- Margin of Safety

---

# Screen 16

## Settings

Current Version

- Theme Toggle
- Appearance
- About

Future

- Profile
- Saved Analysis
- Notifications
- API Settings

---

# Common Components

Available on multiple screens

- Navbar
- Sidebar
- Search
- Breadcrumb
- Metric Cards
- Charts
- Tables
- Accordions
- Progress Bars
- Score Cards
- Badges
- Loading Skeletons
- Empty States
- Error States

---

# Current Request Flow

```
User

↓

React UI

↓

Mock / Static JSON

↓

Display Analysis
```

---

# Future Request Flow

```
User

↓

React Frontend

↓

Python REST API

↓

Financial Data Sources

↓

Database

↓

AI Analysis Engine

↓

JSON Response

↓

React UI
```

---

# Future Modules

The UI should reserve placeholders for:

- Python Backend Integration
- AI Company Summary
- AI Stock Analysis
- AI Investment Insights
- Portfolio Tracking
- Watchlist
- User Accounts
- Notifications
- Live Market Data

These modules are planned but are **not part of the current implementation**.

---

# Total Screens

Current Application

1. Landing Page
2. Company Search
3. Company Overview
4. Business Analysis
5. Industry Analysis
6. Fundamental Analysis
7. Deep Fundamental Analysis
8. Business Model
9. Economic Moat
10. Valuation
11. Technical Analysis
12. Portfolio Construction
13. Risk Management
14. Final Investment Verdict
15. Glossary
16. Settings