import { useState } from "react";
import RegionFilter from "../components/Dashboard/RegionFilter";
import SearchBar from "../components/Dashboard/SearchBar";
import CountryList from "../components/country/CountryList";
import useCountry from "../hooks/useCountry";

function Dashboard (){
    //use custom hook to get the countryList
    const {countryList} = useCountry();
    
    const[favRegion] = useState(()=>{
         const loggedInUser = localStorage.getItem("user");
      const userDetails = loggedInUser? JSON.parse(loggedInUser) : undefined; 
        console.log(userDetails);
        const featuredRegion = userDetails? userDetails["region"] : "All";
       return featuredRegion;
    });
      
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState(favRegion);
   
    const searchCountry= (searchValue:string)=>{
       setSearch(searchValue);   
    }


    const filterCountry = (filterValue:string)=>{
        setFilter(filterValue);
    }

    const filteredList = countryList.filter((country) => (country.name.toLowerCase().includes(search.toLowerCase())&& 
    (filter==="All" || country.region.toLowerCase().includes(filter.toLowerCase()))))


    return (
        <div>
            <div className=" px-4 flex justify-between md:px-8 py-6 border-b border-gray-200">
               <div>
                {/* <h1 className="text-3xl font-semibold text-gray-800">Explore Countries</h1> */}
                <p className="text-gray-600 mt-1">Search and filter through 250 nations worldwide</p>
            </div>
            <div className="self-end">

               <p className="text-gray-600"> Your Favourite Region: 
                🌍 <span className="text-gray-700 font-medium">{favRegion} </span></p>
            </div>
            </div>
            
            <div className="px-4 md:px-8 py-5">
                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                    <SearchBar handleSearch={searchCountry} />
                    <RegionFilter handleSearchFilter={filterCountry} favRegion={favRegion}/>
                </div>
                <CountryList filteredList={filteredList} />
            </div>
        </div>
    );
}

export default Dashboard;