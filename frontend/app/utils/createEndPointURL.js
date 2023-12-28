const createEndPointURL = ({
  originCity,
  destinationCity,
  departureDate,
  returnDate,
}) => {
  const baseUrl = "http://localhost:9000/api/v1/";

  // Constructing the URL with query parameters
  const apiUrl = `${baseUrl}?originCity=${originCity}&destinationCity=${destinationCity}&departureDate=${departureDate}&returnDate=${returnDate}`;

  return apiUrl;
};

export default createEndPointURL;
