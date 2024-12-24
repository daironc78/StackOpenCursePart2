import axios from "axios";
import { BASE_URL_COUNTRIES } from "../config/Constants";

const getAll = () => {
  const request = axios.get(`${BASE_URL_COUNTRIES}/all`);
  return request.then((response) => response.data);
};

const getName = (name) => {
  const request = axios.get(`${BASE_URL_COUNTRIES}name/${name}`);
  return request.then((response) => response.data);
};

export default { getAll, getName };
