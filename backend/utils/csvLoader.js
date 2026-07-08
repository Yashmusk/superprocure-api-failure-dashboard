const fs = require("fs");
const csv = require("csv-parser");

let apiData = [];

function loadCSV(filePath) {
    return new Promise((resolve, reject) => {

        const results = [];

        fs.createReadStream(filePath)
            .pipe(csv())

           .on("data", (row) => {

    row.api_total_count = Number(row.api_total_count);
    row.api_success_count = Number(row.api_success_count);
    row.api_failure_count = Number(row.api_failure_count);

    results.push(row);

})

            .on("end", () => {
                apiData = results;
                console.log(`Loaded ${apiData.length} rows from CSV`);
                resolve();
            })

            .on("error", (err) => {
                reject(err);
            });

    });
}

function getData() {
    return apiData;
}

module.exports = {
    loadCSV,
    getData
};