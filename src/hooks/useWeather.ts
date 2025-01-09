import axios from "axios"
import { z } from 'zod'
import { SearchType } from "../types"
import { useMemo, useState } from "react"

//definir plantilla de datos para las coordenadas
const Coord = z.object({
    lat: z.number(),
    lon: z.number()
})
// inferir el tipo para autocompletado a partir de la plantilla
type Coord = z.infer<typeof Coord>

//definir plantilla de datos para nombre y temperaturas
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})
// inferir el tipo para autocompletado a partir de la plantilla
export type Weather = z.infer<typeof Weather>

export default function useWeather() {

    const initialState: Weather = {
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    }

    const [weather, setWeather] = useState(initialState)

    const [Loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const fetchWeather = async (search: SearchType) => {
        // obteniendo el valor de la variable de entorno manejado por Vite
        //de su fichero de configuración como por ejemplo ".env.local"
        const APIkey = import.meta.env.VITE_API_KEY
        setWeather(initialState)
        setNotFound(false)
        try {
            setLoading(true)
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${APIkey}`
            const { data } = await axios<Coord[]>(geoUrl)
            const resultCoord = Coord.safeParse(data[0])
            if (resultCoord.success) {
                const { lat, lon } = resultCoord.data
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
                const { data: WeatherResult } = await axios(weatherUrl)

                const result = Weather.safeParse(WeatherResult)
                if (result.success) {
                    setWeather(result.data)
                }
                else {
                    setWeather(initialState)
                    setNotFound(true)
                }
            }
            else {
                setWeather(initialState)
                setNotFound(true)
            }

        } catch (error) {
            console.log(error)
            setWeather(initialState)
            setNotFound(true)
        } finally {
            setLoading(false)
        }

    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        weather,
        fetchWeather,
        Loading,
        notFound,
        hasWeatherData
    }
}