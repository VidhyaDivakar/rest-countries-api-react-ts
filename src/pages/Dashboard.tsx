import { useState } from "react";
import RegionFilter from "../components/Dashboard/RegionFilter";
import SearchBar from "../components/Dashboard/SearchBar";
import CountryList from "../components/country/CountryList";
import useCountry from "../hooks/useCountry";

function Dashboard (){
    //use custom hook to get the countryList
    const {countryList} = useCountry();
  
    const [search, setSearch] = useState("");

    const searchCountry= (searchValue:string)=>{
       setSearch(searchValue);   
    }

    const filteredList = countryList.filter((country) => country.name.toLowerCase().includes(search.toLowerCase()))
    return <>
    <SearchBar handleSearch={searchCountry}/>
    <RegionFilter/>
    <CountryList filteredList={filteredList}/>
    </>
}

export default Dashboard;