import RegionFilter from "../components/Dashboard/RegionFilter";
import SearchBar from "../components/Dashboard/SearchBar";
import CountryList from "../components/country/CountryList";

function Dashboard (){
    return <>
    <SearchBar/>
    <RegionFilter/>
    <CountryList/>
    </>
}

export default Dashboard;