
interface SearchBarProps {
    handleSearch: (value: string) => void;
}

function SearchBar({ handleSearch }: SearchBarProps) {

    const handleChange = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        handleSearch(e.currentTarget.value);
    }


    return (
        <div className="self-center">
            <input
                type="text"
                className="rounded-md border border-gray-300 p-2 text-gray-700 placeholder-gray-400 w-full md:w-64 focus:outline-none focus:border-gray-500"
                placeholder="Search for a Country"
                onKeyUp={handleChange}
            />
        </div>
    );
}

export default SearchBar;