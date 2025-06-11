import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ clothingItems, weatherData, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(clothingItems);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temperature[currentTemperatureUnit].toFixed(1)}{" "}
          &deg; {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  handleCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

// function Main(props) {
//   const filteredClothes = defaultClothingItems.filter((item) => {
//     return item.weather === "cold";
//   });
//   return (
//     <main>
//       <WeatherCard temperature={props.temperature} />
//       <section className="cards">
//         <p className="cards__text">
//           Today is {props.temperature} &deg; F / You may want to wear:
//         </p>
//         <div className="cards__items">
//           {filteredClothes.map((item) => (
//             <ItemCard
//               key={item._id}
//               name={item.name}
//               link={item.link}
//               weather={item.weather}
//               handleCardClick={props.handleCardClick}
//             />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

export default Main;
