import RegionFilter from "./RegionFilter";
import SearchBar from "./SearchBar";
import CountryList from "../country/CountryList";

function Dashboard (){
    return <>
    <SearchBar/>
    <RegionFilter/>
    <CountryList/>
    </>
}

export default Dashboard;