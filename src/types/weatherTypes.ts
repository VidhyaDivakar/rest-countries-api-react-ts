// weatherTypes.ts — matches OpenWeatherMap data/2.5/weather (current weather) endpoint

export interface WeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: WeatherCondition[];
  name: string;
  coord?: {
    lat: number;
    lon: number;
  };
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
  id: number;
  main: string;
  description: string;
  icon: string;
}