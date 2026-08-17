import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: API_KEY,
    units: "metric",
    lang: "ar",
  },
});

export default weatherApi;
