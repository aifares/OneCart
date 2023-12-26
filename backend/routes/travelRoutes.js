import express from "express";
const router = express.Router();
import { Duffel } from "@duffel/api";

const duffel = new Duffel({
  token: "duffel_test_PTGHpqlDC118HrhOMGnPDNRU-DVCwLZFuqriClIn1i9",
});

// Route for Save a new Book
router.get("/", async (request, response) => {
  const res = [];
  const apiRes = await duffel.offerRequests.create({
    slices: [
      {
        origin: "JFK",
        destination: "SDQ",
        departure_date: "2023-12-28",
      },
      {
        origin: "SDQ",
        destination: "JFK",
        departure_date: "2023-12-31",
      },
    ],
    passengers: [{ type: "adult" }, { type: "adult" }, { age: 1 }],
    cabin_class: "business",
  });

  let results = [];

  apiRes.data.offers.forEach((item) => {
    const totalEmissionsKg = item.total_emissions_kg;
    const totalAmount = item.total_amount;
    const currency = item.total_currency;

    item.slices.forEach((slice) => {
      slice.segments.forEach((segment) => {
        let details = {
          total_emissions_kg: totalEmissionsKg,
          total_amount: totalAmount,
          currency: currency,
          arriving_at: segment.arriving_at,
          flight_duration: segment.duration,
          destination: segment.destination,
          origin: segment.origin,
          operating_carrier: {
            name: segment.operating_carrier.name,
            logo_symbol_url: segment.operating_carrier.logo_symbol_url,
          },
          operating_carrier_flight_number:
            segment.operating_carrier_flight_number,
          cabin_class_marketing_name:
            segment.passengers && segment.passengers.length > 0
              ? segment.passengers[0].cabin_class_marketing_name
              : "",
        };
        results.push(details);
      });
    });
  });

  response.send(apiRes.data.offers);
});

export default router;
