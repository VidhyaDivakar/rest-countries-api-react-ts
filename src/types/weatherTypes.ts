// weatherTypes.ts

export interface WeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  current: CurrentWeather;
  daily?: DailyWeather[];
  hourly?: HourlyWeather[];
}

export interface CurrentWeather {
  temp: number;
  humidity: number;
  wind_speed: number;
  weather: WeatherCondition[];
}

export interface DailyWeather {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: WeatherCondition[];
}

export interface HourlyWeather {
  dt: number;
  temp: number;
  weather: WeatherCondition[];
}

export interface WeatherCondition {
  main: string;
  description: string;
  icon: string;
}