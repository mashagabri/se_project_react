import { createContext, useState, useEffect } from "react";

export const CurrentTemperatureUnitContext = createContext();
export const CurrentTemperatureProvider = ({ children }) => {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState(() => {
    const saved = sessionStorage.getItem("currentTemperature") ?? "F";
    return saved;
  });

  function changeCurrentTemperatureUnit() {
    if (currentTemperatureUnit === "C") {
      setCurrentTemperatureUnit("F");
    } else if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    }
  }

  useEffect(() => {
    if (currentTemperatureUnit !== null) {
      sessionStorage.setItem("currentTemperature", currentTemperatureUnit);
    }
  }, [currentTemperatureUnit]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        setCurrentTemperatureUnit,
        changeCurrentTemperatureUnit,
      }}
    >
      {children}
    </CurrentTemperatureUnitContext.Provider>
  );
};
