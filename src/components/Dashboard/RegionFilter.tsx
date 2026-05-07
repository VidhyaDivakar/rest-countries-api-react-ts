import {useState} from 'react';

function RegionFilter({handleSearchFilter}){

    const regions = ["All", "Americas", "Asia", "Europe", "Oceania"];
    
    const [selected, setSelected] = useState("All");

    const handleFilter=(e)=>{
        console.log(e.target.value)
        setSelected(e.target.value)
        handleSearchFilter(e.target.value);
    }

    return (<div>
        <span>Filter By Region</span>
        <div>
            {regions.map(region=><button className={`m-2 rounded-md p-3 hover:bg-blue-300 cursor-pointer
            ${selected===region? "bg-blue-500" : "bg-blue-100"}`}
             key={region} type="button" value={region} onClick={handleFilter}>{region}</button>)}
        </div>
    </div>)
}

export default RegionFilter;