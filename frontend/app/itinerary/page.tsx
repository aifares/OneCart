"use client";
import { useState } from "react";
import Selector from "./Selector";

const Itinerary = () => {
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectionChange = async (selectedValues: {
    selectedCountryCode: string | null;
    selectedStateCode: string | null;
    selectedCity: string | null;
  }) => {
    const { selectedCountryCode, selectedStateCode, selectedCity } =
      selectedValues;

    const url = "https://chatgpt-gpt5.p.rapidapi.com/ask";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "69ce68da09mshc304cda2ce66aecp17b655jsncc9317c11fb1",
        "X-RapidAPI-Host": "chatgpt-gpt5.p.rapidapi.com",
      },
      body: JSON.stringify({
        query: `What are some fun/exciting activities you can suggest i do during my visit in ${
          !selectedCity
            ? "state code: " + selectedStateCode + ", " + selectedCountryCode
            : selectedCity +
              ", state code: " +
              selectedStateCode +
              ", " +
              selectedCountryCode
        }`,
      }),
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.response);

      setLoading(false);
      setRecommendations(result.response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col gap-7 text-center">
      <Selector onSelectionChange={handleSelectionChange} loading={loading} />
      {loading ? (
        "Getting recommendations..."
      ) : recommendations ? (
        <div className="bg-slate-700 rounded-md p-5">
          <div
            className="bg-white rounded-md p-3 "
            dangerouslySetInnerHTML={{ __html: recommendations }}
          ></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Itinerary;
