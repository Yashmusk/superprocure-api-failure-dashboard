function DashboardTable({ data, searchTerm }) {

    if (!data || data.length === 0) {
        return <h3>Loading...</h3>;
    }

    const filteredCustomers = data.filter((customer) => {

        const search = searchTerm.toLowerCase();

        return (
            customer.customerName.toLowerCase().includes(search) ||
            customer.customerId.includes(search)
        );

    });

    return (

        <div className="card">

            <h2 style={{ marginBottom: "20px" }}>
                Customer API Failure Trends
            </h2>

            <div className="table-wrapper">

                <table className="dashboard-table">

                    <thead>

                        <tr>

                            <th>Client ID</th>

                            <th>Client Name</th>

                            {data[0].trends.map((week) => (

                                <th key={week.weekStart}>
                                    {week.label}
                                </th>

                            ))}

                        </tr>

                    </thead>

                    <tbody>

                        {filteredCustomers.map((customer) => (

                            <tr key={customer.customerId}>

                                <td>{customer.customerId}</td>

                                <td>{customer.customerName}</td>

                                {customer.trends.map((week) => (

                                    <td
                                        key={week.weekStart}
                                        className={
                                            week.failurePct === null
                                                ? "no-data"
                                                : week.trend
                                        }
                                    >

                                        {
                                            week.failurePct === null
                                                ? "–"
                                                : `${week.failurePct}%`
                                        }

                                    </td>

                                ))}

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default DashboardTable;