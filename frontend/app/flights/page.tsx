// FlightBooking.js
"use client";
// FlightBooking.js

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FlightBooking = () => {
  const [tripType, setTripType] = useState("oneWay");
  const [cabinClass, setCabinClass] = useState("economy");
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

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
    setDepartureDate(date);
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
  };

  const handleSearchFlight = () => {
    const searchData = {
      tripType,
      cabinClass,
      numAdults,
      numChildren,
      originCity,
      destinationCity,
      departureDate,
      returnDate,
    };
    console.log("Search Flight:", searchData);
    // In a real application, you would perform the actual search or trigger an action here.
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Flight Booking</h2>
      <div className="flex space-x-4">
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
            selected={departureDate}
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
            selected={returnDate}
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
      <label
        className="itinerary-card"
        for="travel-items-toggle-off_0000AdBgie6kU5uz7chOPv_0-arp_jfk_us"
      >
        <input
          className="itinerary-card__hidden-toggle"
          type="checkbox"
          id="travel-items-toggle-off_0000AdBgie6kU5uz7chOPv_0-arp_jfk_us"
        />
        <div className="itinerary-card__header">
          <div className="itinerary-card__header-info">
            <div className="itinerary-card__carrier-info">
              <img
                className="airline-logo"
                src="https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/IB.svg"
                alt="Logo for airline"
                onerror="handleAirlineLogoError(this, 'IB')"
                id="travel-items-toggle-off_0000AdBgie6kU5uz7chOPv_0-arp_jfk_us-IB-logo"
                phx-update="ignore"
              />

              <span className="itinerary-card__carriers">
                <span className="itinerary-card__marketing_carriers">
                  Iberia
                </span>
                <span className="itinerary-card__operating_carriers--mobile"></span>
              </span>
            </div>

            <div className="itinerary-card__baggage">
              <span className="itinerary-card__toggle-icon"></span>
            </div>
          </div>
          <div className="flight-path">
            <div className="flight-path__origin">
              <p className="flight-path__info-time">20:54</p>
              <p className="flight-path__info-place">JFK</p>
            </div>
            <div className="flight-path__line-wrapper">
              <div className="flight-path__flight-path-representation">
                <p className="flight-path__info-duration">5h 52m</p>
                <div>
                  <div className="flight-path__flight-line"></div>
                </div>

                <p className="flight-path__info-stops">Non-stop</p>
              </div>
              <div className="flight-path__plane-symbol">
                <span className="material-symbols-outlined">flight</span>
              </div>
            </div>
            <div className="flight-path__flight-destination">
              <p className="flight-path__info-time">
                23:46
                <sup></sup>
              </p>
              <p className="flight-path__info-place">LAX</p>
            </div>
          </div>
        </div>
        <div className="itinerary-card__travel-items itinerary-card__travel-items--with-footer">
          <div className="itinerary-card__travel-item itinerary-card__travel-item--departure">
            <div></div>
            <span className="material-symbols-outlined">calendar_month</span>
            <p>Thursday, 28 December 2023</p>
          </div>

          <div className="itinerary-card__travel-item itinerary-card__travel-item--origin">
            <p>20:54</p>
            <span className="material-symbols-outlined">flight_takeoff</span>
            <p>Depart from John F. Kennedy International Airport (JFK)</p>
          </div>

          <div className="itinerary-card__travel-item itinerary-card__travel-item--segment-info">
            <div></div>
            <div></div>
            <p>
              5h 52m
              <span>•</span>
              <img
                className="airline-logo--small"
                src="https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/IB.svg"
                alt="Logo for Iberia"
                onerror="handleAirlineLogoError(this, 'IB')"
                id="logo-John F. Kennedy International Airport (JFK)-Iberia-off_0000AdBgie6kU5uz7chOPv_0-arp_jfk_us"
                phx-update="ignore"
              />
              Iberia
              <span>•</span>
              Airbus A330-200
              <span>•</span>
              IB3179
              <span>•</span>
              Economy
            </p>
          </div>

          <div className="itinerary-card__travel-item itinerary-card__travel-item--destination">
            <p>23:46</p>
            <span className="material-symbols-outlined">flight_land</span>
            <p>Arrive at Los Angeles International Airport (LAX)</p>
          </div>

          <div className="itinerary-card__travel-item itinerary-card__travel-item--arrival">
            <div></div>
            <span className="material-symbols-outlined">calendar_month</span>
            <p>Thursday, 28 December 2023</p>
          </div>
        </div>

        <div className="itinerary-card__footer">
          <div>
            <p className="itinerary-card__price">
              <span>From</span>
              US$392
            </p>
          </div>
          <a
            href="/results?adults=1&amp;cabin_class=economy&amp;checksum=1578122832&amp;departure_date[]=2023-12-28&amp;departure_date[]=2023-12-31&amp;destination[]=LAX&amp;destination[]=JFK&amp;origin[]=JFK&amp;origin[]=LAX&amp;partial_offer_request_id=prq_0000AdBgidvPAGqOYROKjQ&amp;selected_offer_id[]=off_0000AdBgie6kU5uz7chOPv_0"
            data-phx-link="redirect"
            data-phx-link-state="push"
            className="button button--primary"
          >
            Select
          </a>
        </div>
      </label>
    </div>
  );
};

export default FlightBooking;
