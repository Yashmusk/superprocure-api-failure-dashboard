function getWeekRange(dateString) {

    const [year, month, day] = dateString.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return {
        weekStart,
        weekEnd
    };
}

// Returns YYYY-MM-DD
function formatDate(date) {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function formatWeekLabel(startDate, endDate) {

    const options = {
        day: "2-digit",
        month: "short",
        year: "numeric"
    };

    const start = startDate.toLocaleDateString("en-GB", options);
    const end = endDate.toLocaleDateString("en-GB", options);

    return `${start} to ${end}`;
}

module.exports = {
    getWeekRange,
    formatDate,
    formatWeekLabel
};