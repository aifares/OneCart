import { City, Country, ICity, IState, State } from "country-state-city";
import { FC, useEffect, useMemo, useState } from "react";

interface SelectorProps {
  onSelectionChange: (selectedValues: {
    selectedCountryCode: string | null;
    selectedStateCode: string | null;
    selectedCity: string | null;
  }) => void;
  loading: boolean;
}

const Selector: FC<SelectorProps> = ({ onSelectionChange, loading }) => {
  const country = Country.getAllCountries();

  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [selectedStateCode, setSelectedStateCode] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [displayButton, setDisplayButton] = useState(false);

  const handleCountryChange = (e: any) => {
    setSelectedCountryCode(e.target.value);
  };

  const handleStateChange = (e: any) => {
    setSelectedStateCode(e.target.value);
  };

  const handleCityChange = (e: any) => {
    setSelectedCity(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSelectionChange({
      selectedCountryCode,
      selectedStateCode,
      selectedCity,
    });
  };

  useEffect(() => {
    if (selectedCountryCode) {
      const fetchedStates = State.getStatesOfCountry(selectedCountryCode);
      setStates(fetchedStates);
    }
  }, [selectedCountryCode]);

  useEffect(() => {
    if (selectedStateCode && selectedCountryCode) {
      const fetchedCities = City.getCitiesOfState(
        selectedCountryCode,
        selectedStateCode
      );
      setCities(fetchedCities);
    }
  }, [selectedStateCode, selectedCountryCode]);

  useEffect(() => {
    setSelectedCity(null);
  }, [selectedCountryCode]);

  useEffect(() => {
    const isCountryValid = selectedCountryCode !== null;
    const isStateValid =
      states.length === 0 || (selectedStateCode !== null && states.length > 0);
    const isCityValid =
      cities.length === 0 || (selectedCity !== null && cities.length > 0);

    setDisplayButton(isCountryValid && isStateValid && isCityValid);
  }, [selectedCountryCode, selectedStateCode, selectedCity, states, cities]);

  return (
    <div>
      <form
        className="bg-slate-700 p-5 flex flex-col rounded-md gap-3"
        onSubmit={handleSubmit}
      >
        <select onChange={handleCountryChange} className="rounded-md h-7">
          <option value="" disabled selected>
            Select a country
          </option>
          ;
          {country.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
        {selectedCountryCode && states.length > 0 && (
          <select onChange={handleStateChange} className="rounded-md h-7">
            <option value="" disabled selected>
              Select a state
            </option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        )}
        {selectedStateCode && selectedCountryCode && cities.length > 0 && (
          <select onChange={handleCityChange} className="rounded-md h-7">
            <option value="" disabled selected>
              Select a city
            </option>
            {cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        )}

        <button
          className={`${
            !displayButton || loading ? "opacity-60" : "opacity-100"
          } bg-sky-400 rounded-md h-8 text-white`}
          disabled={!displayButton || loading}
        >
          Enter
        </button>
      </form>
    </div>
  );
};
export default Selector;
