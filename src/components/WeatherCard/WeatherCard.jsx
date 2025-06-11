import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOption } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOption[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {" "}
        {weatherData.temperature[currentTemperatureUnit].toFixed(1)} &deg;{" "}
        {currentTemperatureUnit}
      </p>
      <img
        className="weather-card__image"
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night "}time ${
          weatherOption?.condition
        } weather`}
      ></img>
    </section>
  );
}
export default WeatherCard;
