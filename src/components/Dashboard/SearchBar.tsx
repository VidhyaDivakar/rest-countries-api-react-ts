
function SearchBar({handleSearch}){

    
    const handleChange = (e)=>{
        handleSearch(e.target.value);
    }


    return<div className="self-center">
        <input type="text" className="rounded-md border-black p-2 border" placeholder="Search for a Country" onKeyUp={handleChange}/>
    </div>
}

export default SearchBar;