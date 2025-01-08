import type { Weather } from "../../hooks/useWeather"
type WeatherDetailProps = {
    weather: Weather
}

export default function WeatherDetail({ weather }: WeatherDetailProps) {
    return (<div>Detalles{weather.name}</div>)
}