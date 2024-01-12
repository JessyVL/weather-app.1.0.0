import { useState } from "react"
import './WeatherCard.css'

const WeatherCard = ({weather,temp}) => {

  const [isCelsius, setIsCelsius] = useState(true) //si es true nos mostrarà celsius sino sera Fahrenheit

  const handleChangeTemperature = () => {
    setIsCelsius(!isCelsius)
  }

  return (
    <article className="weather">
      <h1 className="weather_title">Weather App</h1>
       <h2 className="weather_subtitle">{weather?.name}, {weather?.sys.country}</h2>  {/* → Esto es un encadenamiento opcional */}
      <section className="weather_body">
        <header className="weather_img">
          {/* hacemos un cortocircuito dado que en un 1er renderizado la imagen no tiene la info (undefined) , lo cual indica que si weather existe escribe lo que tiene por siguiente */}
          <img className="weather_icon"
            src={weather && `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} 
            alt="" />
        </header>
        
        <article className="weather_info">
          <h3 className="weather_info_title">"{weather?.weather[0].description}"</h3>
          <ul className="weather_list">
            <li className="weather_item">
              <span className="weather_label">Wind Speed </span><span className="weather_value">{weather?.wind.speed} m/s</span>
              </li>
            <li className="weather_item">
              <span className="weather_label">Clouds </span><span className="weather_value">{weather?.clouds.all} %</span>
              </li>
            <li className="weather_item">
              <span className="weather_label">Pressure </span><span className="weather_value">{weather?.main.pressure} hPa</span>
              </li>
          </ul>
        </article>
      </section>

      <footer className="weather_footer">
        <h2 className="weather_temp">{isCelsius ? `${temp?.celsius} ºC`: `${temp?.fahrenheit} ºF` }</h2> {/* renderizado condicional */}
        <button className="weather_btn" onClick={handleChangeTemperature}>Change Temperature</button>
      </footer>
    </article>
  )
}

export default WeatherCard