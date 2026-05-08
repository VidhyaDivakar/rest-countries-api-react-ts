import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";

interface Props {
    capital: string;
    coords: [number, number];
    country: string;
}

export function CountryMap({ capital, coords, country }: Props) {
    const [satellite, setSatellite] = useState(false);

    return (
        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-lg">

            {/* Toggle button */}
            <button
                onClick={() => setSatellite(!satellite)}
                className="absolute top-3 right-3 z-[1000] bg-white px-3 py-1 rounded-full shadow text-sm"
            >
                {satellite ? "Street View" : "Satellite"}
            </button>

            <MapContainer
                center={coords}
                zoom={5}
                className="h-full w-full"
            >
                {/* Base Map Layer */}
                <TileLayer
                    url={
                        satellite
                            ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png light mode"
                            /*
                        https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png*/
                            /*https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}*/

                    }
                />

                {/* Capital Marker */}
                <Marker position={coords}>
                    <Popup>
                        <div className="w-[200px]">
                            <p className="font-bold text-lg">{capital}</p>
                            <p className="text-sm text-gray-600">{country}</p>

                            <div className="mt-2 text-xs text-gray-500">
                                Clicked location marker for capital city
                            </div>
                        </div>
                    </Popup>
                </Marker>

            </MapContainer>
        </div>
    );
}