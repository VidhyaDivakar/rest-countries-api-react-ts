// src/types/flightTypes.ts

export interface FlightApiResponse {
  data: Flight[];
}

export interface Flight {
  flight_status: string;

  departure: {
    airport: string;
    scheduled: string;
  };

  arrival: {
    airport: string;
    scheduled: string;
  };

  airline: {
    name: string;
  };

  flight: {
    iata: string;
  };
}