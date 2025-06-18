import { checkResponse } from "./api";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  )
    .then(checkResponse)
    .then((data) => {
      const city = data.name;
      const tempF = data.main.temp;
      const tempC = ((tempF - 32) * 5) / 9;
      const type = getWeatherType(tempF);
      const condition = data.weather[0].main.toLowerCase();
      const day = isDay(data.sys, Date.now());
      return {
        city: city,
        temperature: { F: tempF, C: tempC },
        type: type,
        condition: condition,
        isDay: day,
      };
    });
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

function getWeatherType(tempF) {
  if (tempF > 86) {
    return "hot";
  } else if (tempF >= 66 && tempF < 86) {
    return "warm";
  } else {
    return "cold";
  }
}
