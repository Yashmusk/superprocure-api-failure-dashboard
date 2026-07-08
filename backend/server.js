const express = require("express");
const cors = require("cors");
const path = require("path");
const { loadCSV, getData } = require("./utils/csvLoader");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", dashboardRoutes);
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running successfully."
  });
});



app.get("/api/data", (req, res) => {

    const data = getData();

    res.json(data);

});

const PORT = 5000;

async function startServer() {
    try {

        const csvPath = path.join(__dirname, "data", "api_stats.csv");

        await loadCSV(csvPath);

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (err) {

        console.error("Failed to load CSV");
        console.error(err);

    }
}

startServer();