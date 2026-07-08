const {
    getWeekRange,
    formatDate,
    formatWeekLabel
} = require("../utils/weekHelper");

function groupRowsByWeek(rows) {

    const groupedData = {};

    for (const row of rows) {

        const { weekStart } = getWeekRange(row.report_date);

       const year = weekStart.getFullYear();
const month = String(weekStart.getMonth() + 1).padStart(2, "0");
const day = String(weekStart.getDate()).padStart(2, "0");

const key = `${year}-${month}-${day}`;

        if (!groupedData[key]) {
            groupedData[key] = [];
        }

        groupedData[key].push(row);

    }

    return groupedData;
}

function groupRowsByDay(rows) {

    const groupedData = {};

    for (const row of rows) {

        const [year, month, day] = row.report_date.split("-").map(Number);

        const date = new Date(year, month - 1, day);

        const key = formatDate(date);

        if (!groupedData[key]) {
            groupedData[key] = [];
        }

        groupedData[key].push(row);

    }

    return groupedData;
}

function calculateWeeklySummary(groupedData, period = "week") {

    const summary = [];

    for (const week in groupedData) {

        const rows = groupedData[week];

        let totalCalls = 0;
        let totalFailures = 0;

        for (const row of rows) {

            totalCalls += row.api_total_count;
            totalFailures += row.api_failure_count;

        }

        const failurePct =
            totalCalls === 0
                ? null
                : Number(((totalFailures / totalCalls) * 100).toFixed(2));

        const weekStart = new Date(week);

        const weekEnd = new Date(weekStart);

        if (period === "week") {
            weekEnd.setDate(weekStart.getDate() + 6);
        }

        let label;

        if (period === "week") {

            label =
                weekStart.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short"
                })
                +
                " - "
                +
                weekEnd.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short"
                });

        } else {

            label = weekStart.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short"
            });

        }

        summary.push({

            weekStart: formatDate(weekStart),

            weekEnd: formatDate(weekEnd),

            label,

            totalCalls,

            totalFailures,

            failurePct

        });

    }

    summary.sort((a, b) => {
        return new Date(a.weekStart) - new Date(b.weekStart);
    });

    return summary;

}

function addTrendStatus(summary) {

    if (summary.length === 0) return summary;

    summary[0].trend = "neutral";

    for (let i = 1; i < summary.length; i++) {

        const previous = summary[i - 1].failurePct;
        const current = summary[i].failurePct;

        if (current > previous) {
            summary[i].trend = "worse";
        }
        else if (current < previous) {
            summary[i].trend = "better";
        }
        else {
            summary[i].trend = "same";
        }

    }

    return summary;
}
function calculateCustomerDashboard(rows,period="week") {

    const customerMap = {};
   let allPeriods;

if (period === "week") {

    allPeriods = Object.keys(groupRowsByWeek(rows)).sort();

} else {

    allPeriods = Object.keys(groupRowsByDay(rows)).sort();

}
    // Group rows by customer
    for (const row of rows) {

        const customerId = row.customer_id;

        if (!customerMap[customerId]) {
            customerMap[customerId] = [];
        }

        customerMap[customerId].push(row);
    }

    const dashboard = [];

    // Process each customer
   for (const customerId in customerMap) {

    const customerRows = customerMap[customerId];

  let groupedPeriods;

if (period === "week") {

    groupedPeriods = groupRowsByWeek(customerRows);

} else {

    groupedPeriods = groupRowsByDay(customerRows);

}

let summary = calculateWeeklySummary(groupedPeriods, period);

summary = addTrendStatus(summary);

    const summaryMap = {};

    summary.forEach(item => {
        summaryMap[item.weekStart] = item;
    });

    const completedSummary = [];

    for (const periodKey of allPeriods) {

        if (summaryMap[periodKey]) {

            completedSummary.push(summaryMap[periodKey]);

        } else {

            const weekStart = new Date(periodKey);

           const weekEnd = new Date(weekStart);

if (period === "week") {
    weekEnd.setDate(weekStart.getDate() + 6);
}

           let label;

if (period === "week") {

    label =
        weekStart.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short"
        })
        +
        " - "
        +
        weekEnd.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short"
        });

} else {

    label = weekStart.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short"
    });

}

completedSummary.push({

    weekStart: periodKey,

    weekEnd: formatDate(weekEnd),

    label,

    totalCalls: 0,

    totalFailures: 0,

    failurePct: null,

    trend: "neutral"

});
        }

    }

    completedSummary.sort((a, b) => {
        return new Date(a.weekStart) - new Date(b.weekStart);
    });

    dashboard.push({

        customerId,

        customerName: customerRows[0].customer_name,

        trends: completedSummary

    });

}

    return dashboard;

}
module.exports = {
    groupRowsByWeek,
    groupRowsByDay,
    calculateWeeklySummary,
    addTrendStatus,
    calculateCustomerDashboard
};