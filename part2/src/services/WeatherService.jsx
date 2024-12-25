import axios from "axios";
import { BASE_URL_WEATHER, API_KEY_WEATHER } from "../config/Constants";

const getWeatherByCity = (latitud, longitud) => {
  const url = `${BASE_URL_WEATHER}lat=${latitud}&lon=${longitud}&appid=${API_KEY_WEATHER}`;
  return axios.get(url).then((response) => response.data);
};

export default { getWeatherByCity };
