import { useEffect, useState } from "react";

import API from "./services/api";
import FilterBar from "./components/FilterBar";
import Header from "./components/Header";
import Legend from "./components/Legend";
import DashboardTable from "./components/DashboardTable";

function App() {

   const [dashboardData, setDashboardData] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedApi, setSelectedApi] = useState("ALL");
   const [period, setPeriod] = useState("week");
   const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
    useEffect(() => {

        async function fetchDashboard() {

            try {

const response = await API.get(

    `/dashboard?api=${selectedApi}&period=${period}&startDate=${startDate}&endDate=${endDate}`

);

                setDashboardData(response.data);

            } catch (error) {

                console.error(error);

            }

        }

        fetchDashboard();

    }, [selectedApi, period, startDate, endDate]);

    return(

<div className="container">

<Header/>
<FilterBar
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}

    selectedApi={selectedApi}
    setSelectedApi={setSelectedApi}

    period={period}
    setPeriod={setPeriod}

    startDate={startDate}
    setStartDate={setStartDate}

    endDate={endDate}
    setEndDate={setEndDate}
/>
<Legend/>

{
    dashboardData.length > 0 &&
    <DashboardTable data={dashboardData}  searchTerm={searchTerm}/>
}

</div>

)
}

export default App;