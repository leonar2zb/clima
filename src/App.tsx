import styles from "./App.module.css"
import Form from "./components/Form/Form"
import useWeather from "./hooks/useWeather"
import WeatherDetail from "./components/WeatherDetail/WeatherDetail"
import Spinner from "./components/Spinner/Spinner"
function App() {

  const { weather, fetchWeather, hasWeatherData, Loading } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador Clima</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {Loading && <Spinner />}
        {hasWeatherData &&
          <WeatherDetail weather={weather} />
        }
      </div>
    </>
  )
}

export default App
