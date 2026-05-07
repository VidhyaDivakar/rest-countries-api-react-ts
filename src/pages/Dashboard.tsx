import { useState } from "react";
import RegionFilter from "../components/Dashboard/RegionFilter";
import SearchBar from "../components/Dashboard/SearchBar";
import CountryList from "../components/country/CountryList";
import useCountry from "../hooks/useCountry";

function Dashboard (){
    //use custom hook to get the countryList
    const {countryList} = useCountry();
  
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const searchCountry= (searchValue:string)=>{
       setSearch(searchValue);   
    }

    const filterCountry = (filterValue:string)=>{
        setFilter(filterValue);
    }

    const filteredList = countryList.filter((country) => (country.name.toLowerCase().includes(search.toLowerCase())&& 
    (filter==="All" || country.region.toLowerCase().includes(filter.toLowerCase()))))


    return <div className="m-5">
        <div className="flex  justify-between">
    <SearchBar handleSearch={searchCountry}/>
    
    <RegionFilter handleSearchFilter={filterCountry}/>
    </div>
    <CountryList filteredList={filteredList}/>
    </div>
}

export default Dashboard;