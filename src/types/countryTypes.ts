// API data format raw country data returned by REST Countries API
export interface CountryApiData {
    name: {
        common: string;
    };
    population: number;
    region: string;
    capital?: string[];
    flags: {
        png: string;
    };
}

//simplified country data used in the application UI
export interface Country {
    name: string;
    population: number;
    region: string;
    capital: string;
    flag: string;
}

//representing raw country data returned by REST Countries API
export interface CountryDetailsApiData {
    name: {
        common: string;
        nativeName?: {
            [key: string]: {
                common: string;
                official: string;
            };
        };
    };
    flags: {
        png: string;
    };
    population: number;
    region: string;
    subregion: string;
    capital?: string[];
    tld?: string[];
    currencies?: {
        [key: string]: {
            name: string;
            symbol?: string;
        };
    };
    languages?: {
        [key: string]: string;
    };
    borders?: string[];
}

//simplified country data used in the application UI
export interface CountryDetails {
    name: string;
    nativeName: string;
    flag: string;
    population: number;
    region: string;
    subregion: string;
    capital: string;
    tld: string;
    currencies: string;
    languages: string;
    borders: string[];
}