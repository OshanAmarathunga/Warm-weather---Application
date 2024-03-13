import React, {useState} from "react";
import './WeatherApp.css'
import search_icon from '../Assests/search.png'
import clear_icon from '../Assests/clear.png'
import cloud_icon from '../Assests/cloud.png'
import drizzle_icon from '../Assests/drizzle.png'
import rain_icon from '../Assests/rain.png'
import snow_icon from '../Assests/snow.png'
import wind_icon from '../Assests/wind.png'
import humidity_icon from '../Assests/humidity.png'
import Swal from 'sweetalert2'

const WeatherApp = () => {
    let api_key = "6764a6c69186e1b9a217b393a454698f";
    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {

        const element = document.getElementById("cityInput").value;

        if (element === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please Enter the City!',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        } else {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${element}&units=Metric&appid=${api_key}`
            let response = await fetch(url);
            let data = await response.json();
            if (data.cod && data.cod === 200) {
                const humidity = document.getElementsByClassName("humidity-percent");
                const wind = document.getElementsByClassName("wind-rate");
                const temperature = document.getElementsByClassName("weather-temp");
                const location = document.getElementById("weather-location");
                const description=document.getElementById("discription");
                const tempMax=document.getElementById("temp-max");
                const tempMin=document.getElementById("temp-min");
                humidity[0].innerHTML = data.main.humidity + " %";
                wind[0].innerHTML = data.wind.speed + " km/h";
                temperature[0].innerHTML = data.main.temp + " °c";
                location.innerHTML = data.name;
                description.innerHTML="~~ "+data.weather[0].description+" ~~";
                tempMax.innerHTML=data.main.temp_max+ " °c";
                tempMin.innerHTML=data.main.temp_min+ " °c";


                if (data.weather[0].icon == "01d" || data.weather[0].icon == "01n") {
                    setWicon(clear_icon);
                } else if (data.weather[0].icon == "02d" || data.weather[0].icon == "02n") {
                    setWicon(cloud_icon);
                } else if (data.weather[0].icon == "03d" || data.weather[0].icon == "03n") {
                    setWicon(drizzle_icon);
                } else if (data.weather[0].icon == "04d" || data.weather[0].icon == "04n") {
                    setWicon(drizzle_icon);
                } else if (data.weather[0].icon == "09d" || data.weather[0].icon == "09n") {
                    setWicon(rain_icon);
                } else if (data.weather[0].icon == "10d" || data.weather[0].icon == "10n") {
                    setWicon(rain_icon);
                } else if (data.weather[0].icon == "13d" || data.weather[0].icon == "13n") {
                    setWicon();
                } else {
                    setWicon(clear_icon);
                }
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Can not identify the city',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            }
        }


    };

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" id="cityInput" placeholder="search"/>
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt=""/>
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt=""/>
            </div>
            <div className="weather-temp"></div>
            <div className="weather-location" id="weather-location"></div>
            <div id="discription">hi</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon"/>
                    <div className="data">
                        <div className="humidity-percent"></div>
                        <div className="text">Humidity</div>
                    </div>
                </div>

                <div className="element">
                    <img src={wind_icon} alt="" className="icon"/>
                    <div className="data">
                        <div className="wind-rate"></div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>

            </div>
            <div className="other-data">
                <div>
                    <div>Temp-max</div>
                    <div id="temp-max">56</div>
                </div>
                <div>
                    <div >Temp-min</div>
                    <div id="temp-min">67</div>
                </div>
            </div>

        </div>
    )
}
export default WeatherApp