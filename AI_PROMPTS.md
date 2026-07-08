# AI_PROMPTS.md

## AI Tool Used

- AI Tool: Antigravity
- Purpose: AI-assisted development for the SuperProcure API Failure Trends Dashboard.

---

## Prompt 1

Create a full-stack project structure for the API Failure Trends Dashboard. Use React (Vite) for the frontend and Node.js with Express for the backend. Organize the backend into routes, services, utilities, and data folders, and keep the frontend component-based.

---

## Prompt 2

Read the provided CSV file in the backend and create a reusable utility that parses the CSV into JavaScript objects. The API should always use the CSV as the source of truth instead of a database.

---

## Prompt 3

Create an Express API endpoint `/api/dashboard` that loads the CSV data and returns it as JSON. Keep the route clean by moving business logic into service functions.

---

## Prompt 4

Group the API statistics by customer and aggregate the total API calls and total failures for each customer. The aggregation logic should be separated into reusable service functions.

---

## Prompt 5

Implement weekly grouping where every week starts on Sunday and ends on Saturday. Also create helper functions that return the week's start date, end date, and a formatted label such as `24 May - 30 May`.

---

## Prompt 6

Calculate the aggregated failure percentage using the assignment's formula:

Failure % = SUM(api_failure_count) / SUM(api_total_count) × 100

Do not average the row-level percentages. Handle divide-by-zero safely.

---

## Prompt 7

Compare each week's aggregated failure percentage with the previous week and assign one of the following trend values:
- better
- worse
- same
- neutral

The first period should always be marked as neutral.

---

## Prompt 8

If a customer does not have data for a particular week, automatically generate an empty period so that every customer has the same timeline. Missing periods should return failurePct as null.

---

## Prompt 9

Create the React frontend using reusable components. Create separate components for:
- Header
- FilterBar
- Legend
- DashboardTable

Keep the layout simple and easy to extend.

---

## Prompt 10

Build the dashboard table where each row represents a customer and each column represents a reporting period. Populate the table using the backend API instead of hardcoded data.

---

## Prompt 11

Apply conditional styling to every period cell. Display red when the failure percentage increases compared to the previous period, green when it decreases, yellow when it remains the same, and neutral styling when there is no previous period or no data.

---

## Prompt 12

Create a legend explaining the meaning of each color used in the dashboard so users can quickly understand the trend indicators.

---

## Prompt 13

Implement customer search that filters the table using either customer name or customer ID without making additional API calls.

---

## Prompt 14

Add an API filter dropdown that allows selecting either all APIs or a single API. Update the backend endpoint so that filtering happens before aggregation.

---

## Prompt 15

Implement support for both weekly and daily views. Reuse as much of the aggregation logic as possible instead of creating separate implementations for week and day calculations.

---

## Prompt 16

Create a reusable summary calculation function that works for both weekly and daily grouping. The only difference between the two views should be how the data is grouped.

---

## Prompt 17

Add a period toggle to the React interface so users can switch between Week and Day views without refreshing the page.

---

## Prompt 18

Implement optional start date and end date filters. The backend should filter the raw dataset first and then perform aggregation on the filtered data.

---

## Prompt 19

Update the frontend so that changing the selected API, reporting period, or date range automatically fetches fresh data from the backend.

---

## Prompt 20

Improve the dashboard UI by making the table horizontally scrollable for large datasets. Ensure the layout remains responsive on smaller screens.

---

## Prompt 21

Review the application against the assignment requirements. Verify the correctness of the aggregation logic, failure percentage calculation, trend coloring, filters, week/day toggle, and empty-state handling. Suggest improvements if any requirement is missing before deployment.