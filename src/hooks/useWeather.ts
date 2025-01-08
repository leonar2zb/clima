import axios from "axios"
import { SearchType } from "../types"

export default function useWeather() {

    const fetchWeather = async (search: SearchType) => {
        // obteniendo el valor de la variable de entorno manejado por Vite
        //de su fichero de configuración como por ejemplo ".env.local"
        const APIkey = import.meta.env.VITE_API_KEY
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${APIkey}`
            const { data } = await axios(geoUrl)
            console.log(data)

        } catch (error) {
            console.log(error)
        }

    }

    return {
        fetchWeather
    }
}