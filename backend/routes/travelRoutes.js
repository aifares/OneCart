import express from "express";
const router = express.Router();
import { Duffel } from "@duffel/api";

const duffel = new Duffel({
  token: "duffel_test_PTGHpqlDC118HrhOMGnPDNRU-DVCwLZFuqriClIn1i9",
});

const convertDateFormat = (inputDate) => {
  // Split the input date into components
  const [month, day, year] = inputDate.split("/");

  // Format the date in the desired output format
  const outputDate = `${year}-${month}-${day}`;

  return outputDate;
};

// Route for Save a new Book
router.get("/", async (request, response) => {
  const { originCity, destinationCity, departureDate, returnDate } =
    request.query;

  const apiRes = await duffel.offerRequests.create({
    slices: [
      {
        origin: originCity,
        destination: destinationCity,
        departure_date: convertDateFormat(departureDate),
      },
      {
        origin: destinationCity,
        destination: originCity,
        departure_date: convertDateFormat(returnDate),
      },
    ],
    passengers: [{ type: "adult" }, { type: "adult" }, { age: 1 }],
    cabin_class: "business",
  });

  if (!Array.isArray(apiRes.data.offers) || apiRes.data.offers.length === 0) {
    return [];
  }

  // Extract relevant information from each booking
  const extractedInfo = apiRes.data.offers.map((booking) => {
    const { total_amount, total_currency, slices } = booking;

    // Return the entire slice object
    return {
      total_amount,
      total_currency,
      slices,
    };
  });

  response.send(extractedInfo);
});

export default router;
