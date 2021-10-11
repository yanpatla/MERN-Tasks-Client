import axios from "axios";

const clienteAxios = axios.create({
  //TODO Esta Funcion Sirve para que cada vez que llame a clienteAxios tenga una URL Como Base
  baseURL: process.env.REACT_APP_BACKEND_URL,
});


export default clienteAxios