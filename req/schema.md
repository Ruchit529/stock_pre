# SCHEMA.md

# Database Schema Specification

---

# Purpose

This document defines the database structure required for the future backend implementation.

It is **not** intended to contain SQL queries.

Instead, it provides clear instructions about what tables, relationships, views, procedures, and indexes should be created when the Python backend is developed.

---

# Current Status

Current Version

- React Frontend
- Static / Mock Data
- No Database

Future Version

- Python Backend
- Database Integration
- REST APIs
- AI Integration

---

# Database Requirements

The database should support

- Company Information
- Business Details
- Industry Information
- Financial Statements
- Financial Ratios
- Technical Analysis
- Portfolio
- Watchlists
- Saved Analysis
- User Accounts
- AI Generated Results

---

# Tables to Create

---

## Users

Purpose

Store registered users.

Fields should include

- User ID
- Full Name
- Email
- Password (Encrypted)
- Profile Image
- Account Status
- Created Date
- Updated Date

---

## Companies

Purpose

Store company master information.

Fields should include

- Company ID
- Company Name
- Stock Symbol
- NSE/BSE Symbol
- Sector
- Industry
- Market Cap
- Description
- Business Type
- Logo
- Website
- Headquarters
- Founded Year

---

## Company Business

Purpose

Store detailed business information.

Fields should include

- Company ID
- Business Summary
- Products
- Services
- Revenue Sources
- Customer Segments
- Business Model

---

## Industries

Purpose

Store industry information.

Fields should include

- Industry ID
- Industry Name
- Industry Type
- Growth Rate
- Tailwinds
- Headwinds
- Industry Health Score

---

## Financial Statements

Purpose

Store yearly and quarterly financial statements.

Fields should include

- Company ID
- Financial Year
- Quarter
- Revenue
- Expenses
- Operating Profit
- Net Profit
- EPS

---

## Balance Sheet

Purpose

Store balance sheet information.

Fields should include

- Company ID
- Assets
- Liabilities
- Equity
- Debt
- Cash
- Investments

---

## Cash Flow

Purpose

Store cash flow statements.

Fields should include

- Company ID
- Operating Cash Flow
- Investing Cash Flow
- Financing Cash Flow
- Free Cash Flow

---

## Financial Ratios

Purpose

Store calculated financial ratios.

Fields should include

- Company ID
- ROE
- ROCE
- ROA
- OPM
- NPM
- Current Ratio
- Debt to Equity
- Interest Coverage
- PE
- PB
- PEG

---

## Shareholding Pattern

Purpose

Store shareholding information.

Fields should include

- Company ID
- Promoters
- FIIs
- DIIs
- Public
- Others

---

## Technical Analysis

Purpose

Store technical analysis information.

Fields should include

- Company ID
- Support
- Resistance
- Trend
- Moving Averages
- RSI
- MACD
- Volume

---

## Portfolio

Purpose

Store user portfolios.

Fields should include

- Portfolio ID
- User ID
- Company ID
- Quantity
- Buy Price
- Current Price
- Allocation
- Notes

---

## Watchlist

Purpose

Store companies bookmarked by users.

Fields should include

- Watchlist ID
- User ID
- Company ID
- Added Date

---

## Saved Analysis

Purpose

Allow users to save completed stock analyses.

Fields should include

- Analysis ID
- User ID
- Company ID
- Overall Score
- Verdict
- Notes
- Created Date

---

## AI Analysis (Future)

Purpose

Store AI generated outputs.

Fields should include

- Analysis ID
- Company ID
- AI Summary
- AI Insights
- AI Recommendation
- Generated Date

---

# Relationships

The database should establish relationships between

- User → Portfolio
- User → Watchlist
- User → Saved Analysis

- Company → Business
- Company → Industry
- Company → Financial Statements
- Company → Balance Sheet
- Company → Cash Flow
- Company → Financial Ratios
- Company → Shareholding
- Company → Technical Analysis

- Company → AI Analysis

---

# Views to Create

The backend developer should create database views for

- Company Overview
- Financial Summary
- Latest Ratios
- Quarterly Performance
- Annual Performance
- Portfolio Summary
- Watchlist Summary
- Industry Summary

---

# Stored Procedures

Create procedures for

- Create User
- Update User
- Search Company
- Get Company Overview
- Get Business Details
- Get Industry Details
- Get Financial Statements
- Get Financial Ratios
- Get Shareholding
- Get Technical Analysis
- Save User Analysis
- Load Saved Analysis
- Add to Watchlist
- Remove from Watchlist
- Create Portfolio
- Update Portfolio
- Delete Portfolio

---

# Database Functions

Create reusable database functions for

- Calculate ROE
- Calculate ROCE
- Calculate ROA
- Calculate OPM
- Calculate NPM
- Calculate CAGR
- Calculate PEG
- Calculate Margin of Safety
- Calculate Portfolio Allocation
- Calculate Overall Fundamental Score

---

# Indexes

Indexes should be created on

- Company Name
- Stock Symbol
- Sector
- Industry
- User Email
- User ID
- Company ID
- Financial Year
- Quarter
- Portfolio ID
- Watchlist ID

to improve search and query performance.

---

# API Integration

The future Python backend should expose REST APIs that interact with these database tables.

Examples include

- Company APIs
- Financial APIs
- Industry APIs
- Portfolio APIs
- Watchlist APIs
- User APIs
- AI APIs

The React frontend will consume these APIs for all dynamic data.

---

# Future Enhancements

The schema should be flexible enough to support

- Live Market Data
- News Integration
- AI Insights
- AI Company Summaries
- Portfolio Tracking
- Alerts & Notifications
- User Preferences
- Additional Financial Metrics

without requiring major schema redesign.