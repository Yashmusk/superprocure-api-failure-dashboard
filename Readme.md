# API Failure Trends Dashboard

A full-stack web application built as part of the **SuperProcure Vibe Engineering Assignment**.

The application transforms raw daily API statistics into an interactive dashboard that helps monitor API failure trends across customers. It aggregates failure percentages over weekly or daily periods, highlights improving or worsening trends using color-coded indicators, and provides filtering capabilities for customers, APIs, and date ranges.

---

## Tech Stack

### Frontend
- React (Vite)
- CSS

### Backend
- Node.js
- Express.js

### Data Source
- CSV (provided dataset)

### Version Control
- Git & GitHub

---

## Features

- Weekly and Daily trend aggregation
- Volume-weighted failure percentage calculation
- API filter (All APIs or individual API)
- Customer search (Customer ID / Customer Name)
- Date range filtering
- Color-coded trend indicators
  - 🟢 Green – Improved
  - 🔴 Red – Worsened
  - 🟡 Yellow – No change
  - ⚪ Neutral – First period / No data
- Graceful handling of missing data (shows "–")
- Responsive table with horizontal scrolling

---

## Project Structure

```text
SUPERPROCURE ASSIGNMENT
│
├── backend
│   ├── data
│   ├── routes
│   ├── services
│   ├── utils
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── AI_PROMPTS.md
```

---

# Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/Yashmusk/superprocure-api-failure-dashboard.git
cd "SUPERPROCURE ASSIGNMENT"
```

---

## 2. Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Start the backend server.

```bash
node server.js
```

The backend runs on:

```
http://localhost:5000
```

---

## 3. Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

The frontend runs on:

```
http://localhost:5173
```

Open the application in your browser:

```
http://localhost:5173
```

---

## API Endpoint

### Get Dashboard Data

```
GET /api/dashboard
```

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| api | API ID or `ALL` |
| period | `week` or `day` |
| startDate | Optional start date (`YYYY-MM-DD`) |
| endDate | Optional end date (`YYYY-MM-DD`) |

Example:

```
/api/dashboard?api=ALL&period=week&startDate=2026-04-01&endDate=2026-05-15
```

---

## Failure Percentage Calculation

The dashboard computes the **volume-weighted API failure percentage** using:

```
Failure % = (SUM(api_failure_count) / SUM(api_total_count)) × 100
```

This follows the assignment requirement of aggregating totals before computing the percentage instead of averaging individual row percentages.

If the total API calls for a period are zero, the application displays **"–"** instead of calculating a percentage.

---

## Assumptions

- Weeks are grouped from **Sunday to Saturday**.
- Missing customer data for a period is displayed as **"–"**.
- The CSV dataset is treated as the source of truth.
- Date filtering is applied before aggregation.

---

## Future Improvements

- Dynamic API list generated from the dataset.
- Charts for trend visualization.
- Pagination for large datasets.
- Export dashboard data to CSV/Excel.
- Authentication and role-based access.

---

## AI Usage

This project was developed with AI assistance as part of the Vibe Engineering Assignment.

The prompts, AI-generated suggestions, and implementation notes are documented in **AI_PROMPTS.md**.

---
## Live Demo

Frontend: https://YOUR-VERCEL-URL.vercel.app

Backend API: https://superprocure-api-failure-dashboard.onrender.com

GitHub Repository:
https://github.com/Yashmusk/superprocure-api-failure-dashboard
---

## Author

**Yash Agarwal**
