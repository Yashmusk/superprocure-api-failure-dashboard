function FilterBar({
    searchTerm,
    setSearchTerm,

    selectedApi,
    setSelectedApi,

    period,
    setPeriod,

    startDate,
    setStartDate,

    endDate,
    setEndDate
}) {

    return (

        <div className="card filter-bar">

            <input
                type="text"
                placeholder="Search Customer by Id/Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
                value={selectedApi}
                onChange={(e) => setSelectedApi(e.target.value)}
            >

                <option value="ALL">All APIs</option>

                <option value="IN_API_001">Gate In</option>

                <option value="IN_API_002">Gate Out</option>

                <option value="IN_API_005">Tare/Gross Weight</option>

                <option value="IN_API_030">Delete Document</option>

                <option value="IN_API_050">Shipment Details</option>

                <option value="OUT_API_028">Vehicle Gate In</option>

                <option value="OUT_API_156">Requisition Response</option>

                <option value="OUT_API_004">Customer Master Fetch</option>

            </select>

            <div className="period-toggle">

                <button
                    className={period === "week" ? "active" : ""}
                    onClick={() => setPeriod("week")}
                >
                    Week
                </button>

                <button
                    className={period === "day" ? "active" : ""}
                    onClick={() => setPeriod("day")}
                >
                    Day
                </button>

            </div>

            <input
                className="date-filter"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />

            <input
                className="date-filter"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />

        </div>

    );

}

export default FilterBar;