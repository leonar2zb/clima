import axios from "axios"
import { SearchType } from "../types"

export default function useWeather() {

    const fetchWeather = async (search: SearchType) => {
        const APIkey = '2739e5a3b5dd4b35c183cd484f3659b4'
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