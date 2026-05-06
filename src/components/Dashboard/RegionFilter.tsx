function RegionFilter({handleSearchFilter}){

    const regions = ["All", "Americas", "Asia", "Europe", "Oceania"]
    const handleFilter=(e)=>{
        console.log(e.target.value)
        handleSearchFilter(e.target.value);
    }

    return (<div>
        <span>Filter By Region</span>
        <div>
            {regions.map(region=><button key={region} type="button" value={region} onClick={handleFilter}>{region}</button>)}
        </div>
    </div>)
}

export default RegionFilter;