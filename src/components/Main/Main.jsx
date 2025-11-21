import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  clothingItems,
  weatherData,
  handleCardClick,
  handleLikeClick,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

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
                  handleLikeClick={handleLikeClick}
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
//               imageUrl={item.imageUrl}
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
