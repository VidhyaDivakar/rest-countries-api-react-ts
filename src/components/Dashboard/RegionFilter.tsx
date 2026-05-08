import { useState } from 'react';

interface RegionFilterProps {
    handleSearchFilter: (region: string) => void;
    favRegion: string;
}

function RegionFilter({ handleSearchFilter, favRegion }: RegionFilterProps) {

    const regions = ["All", "Americas", "Asia", "Europe", "Oceania"];

    const [selected, setSelected] = useState<string>(favRegion);

    const handleFilter = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const value = e.currentTarget.value;
        setSelected(value);
        handleSearchFilter(value);
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-600 font-medium text-md">Filter By Region</span>
            <div className="flex flex-wrap gap-1">
                {regions.map(region => (
                    <button
                        className={`rounded-md px-3 py-2 text-sm cursor-pointer transition-colors
                            ${selected === region
                                ? "bg-gray-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        key={region}
                        type="button"
                        value={region}
                        onClick={handleFilter}
                    >
                        {region}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default RegionFilter;