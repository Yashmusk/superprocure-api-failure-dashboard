const express = require("express");

const router = express.Router();

const { getData } = require("../utils/csvLoader");

const {
    calculateCustomerDashboard
} = require("../services/dashboardService");

router.get("/dashboard", (req, res) => {

   const selectedApi = req.query.api || "ALL";
const period = req.query.period || "week";
const startDate = req.query.startDate;
const endDate = req.query.endDate;

let rows = getData();
if (startDate) {

    const start = new Date(startDate);

    rows = rows.filter(row => new Date(row.report_date) >= start);

}

if (endDate) {

    const end = new Date(endDate);

    rows = rows.filter(row => new Date(row.report_date) <= end);

}
if (selectedApi !== "ALL") {
    rows = rows.filter(row => row.api_id === selectedApi);
}

const dashboard = calculateCustomerDashboard(rows, period);

res.json(dashboard);

});

module.exports = router;