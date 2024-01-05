"use client";
// FlightBooking.js
import useSWRMutation from "swr/mutation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FlightCard from "../components/flightCard";
import createEndPointURL from "../utils/createEndPointURL";
import fetcher from "../utils/fetcher";
import Select from "react-select";

const FlightBooking = () => {
  const [tripType, setTripType] = useState("oneWay");
  const [cabinClass, setCabinClass] = useState("economy");
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const endpointURL = createEndPointURL({
    originCity,
    destinationCity,
    departureDate,
    returnDate,
  });
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);
  const { data, trigger } = useSWRMutation(endpointURL, fetcher);
  const {
    data: searchData,
    trigger: tr,
    isMutating: isLoading,
  } = useSWRMutation(
    `http://localhost:9000/api/v1/searchAirport?input=${input}`,
    fetcher
  );

  const handleTripTypeChange = (e) => {
    setTripType(e.target.value);
  };

  const handleCabinClassChange = (e) => {
    setCabinClass(e.target.value);
  };

  const handleNumAdultsChange = (e) => {
    setNumAdults(e.target.value);
  };

  const handleNumChildrenChange = (e) => {
    setNumChildren(e.target.value);
  };

  const handleOriginCityChange = (e) => {
    setOriginCity(e.target.value);
  };

  const handleDestinationCityChange = (e) => {
    setDestinationCity(e.target.value);
  };

  const handleDepartureDateChange = (date) => {
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    setDepartureDate(formattedDate);
  };

  const handleReturnDateChange = (date) => {
    // Format the selected date as "MM/dd/yyyy"
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    setReturnDate(formattedDate);
  };

  useEffect(() => {
    input && tr();
    setOptions(searchData);
  }, [input]);

  useEffect(() => {
    setOptions(searchData);
  }, [searchData]);

  const handleInputChange = (newValue) => {
    setInput(newValue);
    console.log("Input value:", newValue);
  };

  const noOptionsMessage = () => "No options found";

  const handleSearchFlight = () => {
    trigger();
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Flight Booking</h2>
      <div className="flex space-x-4">
        <Select
          filterOption={() => true} // Let the local options handle filtering
          noOptionsMessage={noOptionsMessage}
          options={options}
          onInputChange={handleInputChange}
        />
        <div className="w-1/4">
          <label
            htmlFor="tripType"
            className="block text-sm font-medium text-gray-600"
          >
            Trip Type
          </label>
          <select
            id="tripType"
            name="tripType"
            value={tripType}
            onChange={handleTripTypeChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="oneWay">One Way</option>
            <option value="roundTrip">Round Trip</option>
          </select>
        </div>
        <div className="w-1/4">
          <label
            htmlFor="cabinClass"
            className="block text-sm font-medium text-gray-600"
          >
            Cabin className
          </label>
          <select
            id="cabinClass"
            name="cabinClass"
            value={cabinClass}
            onChange={handleCabinClassChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="firstClass">First className</option>
          </select>
        </div>
        <div className="w-1/4">
          <label
            htmlFor="numAdults"
            className="block text-sm font-medium text-gray-600"
          >
            Adults
          </label>
          <input
            type="number"
            id="numAdults"
            name="numAdults"
            value={numAdults}
            onChange={handleNumAdultsChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="w-1/4">
          <label
            htmlFor="numChildren"
            className="block text-sm font-medium text-gray-600"
          >
            Children
          </label>
          <input
            type="number"
            id="numChildren"
            name="numChildren"
            value={numChildren}
            onChange={handleNumChildrenChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div className="flex space-x-4 mt-4">
        <div className="w-1/4">
          <label
            htmlFor="originCity"
            className="block text-sm font-medium text-gray-600"
          >
            Origin City
          </label>
          <input
            type="text"
            id="originCity"
            name="originCity"
            value={originCity}
            onChange={handleOriginCityChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="w-1/4">
          <label
            htmlFor="destinationCity"
            className="block text-sm font-medium text-gray-600"
          >
            Destination City
          </label>
          <input
            type="text"
            id="destinationCity"
            name="destinationCity"
            value={destinationCity}
            onChange={handleDestinationCityChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="w-1/4">
          <label
            htmlFor="departureDate"
            className="block text-sm font-medium text-gray-600"
          >
            Departure Date
          </label>
          <DatePicker
            selected={departureDate ? new Date(departureDate) : null}
            onChange={handleDepartureDateChange}
            dateFormat="MM/dd/yyyy"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="w-1/4">
          <label
            htmlFor="returnDate"
            className="block text-sm font-medium text-gray-600"
          >
            Return Date
          </label>
          <DatePicker
            selected={returnDate ? new Date(returnDate) : null}
            onChange={handleReturnDateChange}
            dateFormat="MM/dd/yyyy"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div className="flex space-x-4 mt-4">
        <div className="w-full">
          <button
            type="button"
            onClick={handleSearchFlight}
            className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            Search Flight
          </button>
        </div>
      </div>
      {data ? (
        data.map((item) => <FlightCard offer={item} />)
      ) : (
        <div>sdfsdf</div>
      )}
    </div>
  );
};

export default FlightBooking;
