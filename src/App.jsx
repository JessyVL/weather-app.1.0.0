import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState() // creamos el estado para poder guardar la info de la latitud/longitud que tenemos gracias al pos

  const [weather, setWeather] = useState() // este será el estado donde guardaremos la informacion de la API para el 2do renderizado

  const [temp, setTemp] = useState() // aqui guardaremos la Tº Celsius y Farenheit

  const [isLoading, setisLoading] = useState(true) // estado para la pantalla de cambio , esta en true dado que no tenemos la info al 1er renderizado

  // el parametro pos es quien recibirá toda la informacion
  const success = pos => {
    const obj = {
      lat: pos.coords.latitude ,
      lon: pos.coords.longitude
    }
    setCoords(obj) // le pasamos la info a coords por medio de su funcion que cambia el estado
  }

  // Al ser una peticion que pediremos 1 vez usamos este hook para no tener un bucle infinito / Esto es la 1era peticion para obtener las coordenadas
  useEffect(() => {
    setisLoading(true) 
    navigator.geolocation.getCurrentPosition(success)
  }, [] )
  
  // Creamos un segundo useEffect porque para el 1er renderizado no tendriamos los valores de coords , cuando cambie el estado de coords es que se ejecutará el useEffect / Esta 2da peticion nos da la informacion de todo el clima segun las coordenadas
  useEffect(() => {
    if (coords){
      const APPI_KEY= '91dcb01677d1f69137f39c73e74e3858'
      const {lat,lon} = coords // desestrucuramos para poder obtener 'lat' y 'lon' 

      const url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APPI_KEY}`
      
      axios.get(url) // manejamos la peticion porque estas se trabajan como promesas
       // empaquetamos en la propiedad 'data' dado que lo guarda en json y lo guardamos en el estado de weather
       .then(res => {
        setWeather(res.data)

        const obj ={
          celsius : (res.data.main.temp - 273.15).toFixed(1),
          fahrenheit: ((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(1)
        } 

        setTemp(obj)
       })
       .catch(err => console.log(err))
       .finally(() =>setisLoading(false)) //indicamos que siempre se ejecute un codigo cuando termina la peticion usamos el metodo finally
    }
  },[coords])

  // En la prop weather tenemos la informacion del clima de donde nos encontramos (datos que saca la API)

  return (
    <div className='app'>
      {
        isLoading
        ? <h2>Loading ...</h2>
        : (
          <WeatherCard 
          weather={weather}
          temp ={temp}
          /> 
          )
      }
    </div>
  )
}

export default App
