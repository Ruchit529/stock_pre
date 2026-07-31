# TECHSPEC.md

# Stock Analysis Platform
## Technical Specification

---

# 1. Document Purpose

This document defines the technical architecture and technology requirements for the Stock Analysis Platform.

The technical implementation must support the stock-analysis framework defined in:

- Stock_Analysis.md
- YOUTUBE_MASTERCOURSE_PDF.pdf

The technical architecture must not introduce additional investment-analysis methodology, scoring rules, metrics, or benchmarks that are not present in the source framework.

---

# 2. Product Type

Application Type:

- Responsive Web Application
- Stock Research & Analysis Platform
- Indian Equity Market Focus
- NSE/BSE Listed Companies

The platform is a research and structured-analysis application.

It is NOT:

- A broker
- A trading execution platform
- An intraday trading platform
- An order-placement platform

The platform must not execute trades.

---

# 3. Current Development Stage

## Current

The project is currently being developed as a React frontend.

The frontend may use:

- Mock data
- Static data
- Local development data

until the backend is implemented.

## Future

The backend will be developed using Python and FastAPI.

The future architecture will connect:

React
↓
FastAPI
↓
Database
↓
Background Data Collection
↓
External Financial Data Sources

AI is NOT part of the current implementation.

AI-generated analysis, AI scoring, AI recommendations, chatbot functionality, and AI investment assistants must not be added.

---

# 4. Technology Stack

## Frontend

Use:

- React
- JavaScript / TypeScript according to the existing project setup
- React Router for application navigation
- Reusable React components
- Responsive web layout

The frontend should remain modular and API-ready.

---

# 5. Backend — Future

The backend will be implemented using:

- Python
- FastAPI
- Uvicorn / Gunicorn for application serving

The backend will expose REST APIs to the React frontend.

The backend will be responsible for:

- Data retrieval from the database
- Company information
- Financial information
- Financial ratios
- Stage 1 calculations
- Stage 2 calculations
- Valuation calculations
- Search
- Comparison
- Watchlist
- Dashboard
- Admin functionality

---

# 6. Database — Future

Use a relational database.

Recommended database:

- PostgreSQL

The database will act as the normalized source of truth for application data.

It should store:

- Company information
- Sector information
- Business information
- Financial statements
- Quarterly results
- Annual results
- Balance Sheet
- Cash Flow
- Financial ratios
- Shareholding
- Historical data
- Valuation inputs
- Calculated scores
- Watchlists
- User information
- Data-source metadata
- Refresh information
- Validation / conflict information
- Audit information

Detailed database instructions will be defined separately in `SCHEMA.md`.

---

# 7. Cache — Future

Use:

- Redis

Redis should be used as a cache layer for frequently requested data.

The cache should not become the primary source of truth.

Primary source:

PostgreSQL

Cache:

Redis

---

# 8. Authentication — Future

The future backend should use:

- JWT-based authentication
- Role-based access control

User types:

- Guest / Anonymous User
- Registered Investor User
- Admin User

Authentication is a future backend feature.

Do not build fake authentication logic in the current frontend-only phase.

The frontend should nevertheless be structured so authentication can be integrated later without major architectural changes.

---

# 9. Authorization

The backend should enforce authorization.

At minimum:

## Guest

Can access publicly available research functionality permitted by the application.

## Registered Investor

Can use user-specific functionality such as Watchlist.

## Admin

Can access administrative functionality such as:

- Data refresh
- Failed jobs
- Data conflicts
- Reference data
- Sector classification
- Benchmark reference information
- Audit information
- User administration

Authorization must be enforced on the backend.

Frontend route protection alone must never be considered sufficient security.

---

# 10. System Architecture

The future architecture should follow:

```text
                    External Data Sources
                           │
                 ┌─────────┴─────────┐
                 │                   │
           Yahoo Finance        Screener.in
                 │                   │
                 └─────────┬─────────┘
                           │
                           ▼
                 Background Collector
                           │
                   Validation / Merge
                           │
                           ▼
                     PostgreSQL
                           │
                           ▼
                 Deterministic Engine
                           │
                           ▼
                    Redis Cache
                           │
                           ▼
                       FastAPI
                           │
                           ▼
                    React Frontend