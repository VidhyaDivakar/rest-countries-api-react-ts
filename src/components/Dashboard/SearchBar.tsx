
function SearchBar({handleSearch}){

    
    const handleChange = (e)=>{
        handleSearch(e.target.value);
    }


    return<>
        <input type="text" placeholder="Search for a Country" onKeyUp={handleChange}/>
    </>
}

export default SearchBar;