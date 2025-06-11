import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function ToggleSwitch({ valueLeft, valueRight }) {
  const temperatureContext = useContext(CurrentTemperatureUnitContext);
  return (
    <div
      className={`toggle-switch ${
        temperatureContext.currentTemperatureUnit === "C"
          ? "toggle-switch_c-active"
          : ""
      }`}
      onClick={temperatureContext.changeCurrentTemperatureUnit}
    >
      <div
        className={`toggle-switch__element ${
          temperatureContext.currentTemperatureUnit === valueLeft
            ? "toggle-switch__element_active"
            : ""
        }`}
      >
        {valueLeft}
      </div>
      <div
        className={`toggle-switch__element ${
          temperatureContext.currentTemperatureUnit === valueRight
            ? "toggle-switch__element_active"
            : ""
        }`}
      >
        {valueRight}
      </div>
    </div>
  );
}

export default ToggleSwitch;
