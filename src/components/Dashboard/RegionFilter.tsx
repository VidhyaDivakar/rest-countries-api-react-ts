function RegionFilter(){

    const regions = ["All", "Americas", "Asia", "Europe", "Oceania"]

    return (<div>
        <span>Filter By Region</span>
        <div>
            {regions.map(region=><button key={region} type="button">{region}</button>)}
        </div>
    </div>)
}

export default RegionFilter;