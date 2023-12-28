import React, { useState } from "react";

const flightCard = ({ offer }) => {
  const [undercard, setUndercard] = useState(false);
  console.log(offer);
  console.log(offer.slices[0].duration);

  const convertTo12HourFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const extractDay = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 as months are zero-indexed
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const extractHoursMinutes = (durationString) => {
    let hours = 0;
    let minutes = 0;

    // Check if the duration format is 'PT#H#M'
    const iso8601Regex = /PT(\d+)H(\d+)M/;
    const isoMatch = durationString.match(iso8601Regex);

    // Check if the duration format is 'P#DT#H#M'
    const iso8601DayRegex = /P(\d+)DT(\d+)H(\d+)M/;
    const isoDayMatch = durationString.match(iso8601DayRegex);

    // Check if the duration format is 'P#DT#H'
    const isoDayHoursRegex = /P(\d+)DT(\d+)H/;
    const isoDayHoursMatch = durationString.match(isoDayHoursRegex);

    // Check if the duration format is 'PT#H'
    const isoHoursRegex = /PT(\d+)H/;
    const isoHoursMatch = durationString.match(isoHoursRegex);

    if (isoMatch) {
      hours = parseInt(isoMatch[1]);
      minutes = parseInt(isoMatch[2]);
    } else if (isoDayMatch) {
      const days = parseInt(isoDayMatch[1]);
      hours = parseInt(isoDayMatch[2]);
      minutes = parseInt(isoDayMatch[3]);

      // Convert days to hours
      hours += days * 24;
    } else if (isoDayHoursMatch) {
      const days = parseInt(isoDayHoursMatch[1]);
      hours = parseInt(isoDayHoursMatch[2]);

      // Convert days to hours
      hours += days * 24;
    } else if (isoHoursMatch) {
      hours = parseInt(isoHoursMatch[1]);
    }

    return `${hours}h ${minutes}m`;
  };

  const layoverCalculator = (
    totalDuration,
    durationToFirstStop,
    durationToDestination
  ) => {
    const extractHoursMinutes = (durationString) => {
      let hours = 0;
      let minutes = 0;

      // Check if the duration format is 'PT#H#M'
      const iso8601Regex = /PT(\d+)H(\d+)M/;
      const isoMatch = durationString.match(iso8601Regex);

      // Check if the duration format is 'P#DT#H#M'
      const iso8601DayRegex = /P(\d+)DT(\d+)H(\d+)M/;
      const isoDayMatch = durationString.match(iso8601DayRegex);

      // Check if the duration format is 'P#DT#H'
      const isoDayHoursRegex = /P(\d+)DT(\d+)H/;
      const isoDayHoursMatch = durationString.match(isoDayHoursRegex);

      // Check if the duration format is 'PT#H'
      const isoHoursRegex = /PT(\d+)H/;
      const isoHoursMatch = durationString.match(isoHoursRegex);

      if (isoMatch) {
        hours = parseInt(isoMatch[1]);
        minutes = parseInt(isoMatch[2]);
      } else if (isoDayMatch) {
        const days = parseInt(isoDayMatch[1]);
        hours = parseInt(isoDayMatch[2]);
        minutes = parseInt(isoDayMatch[3]);

        // Convert days to hours
        hours += days * 24;
      } else if (isoDayHoursMatch) {
        const days = parseInt(isoDayHoursMatch[1]);
        hours = parseInt(isoDayHoursMatch[2]);

        // Convert days to hours
        hours += days * 24;
      } else if (isoHoursMatch) {
        hours = parseInt(isoHoursMatch[1]);
      }

      return { hours, minutes };
    };

    const total = extractHoursMinutes(totalDuration);
    const toFirstStop = extractHoursMinutes(durationToFirstStop);
    const toDestination = extractHoursMinutes(durationToDestination);

    // Calculate remaining time after deducting durations to stops
    let remainingHours = total.hours - toFirstStop.hours - toDestination.hours;
    let remainingMinutes =
      total.minutes - toFirstStop.minutes - toDestination.minutes;

    // Adjust for negative minutes
    if (remainingMinutes < 0) {
      remainingHours--;
      remainingMinutes += 60;
    }

    return `${remainingHours}h ${remainingMinutes}m`;
  };
  return (
    <div>
      <label
        className="itinerary-card"
        for="travel-items-toggle-off_0000AdBgie6kU5uz7chOPv_0-arp_jfk_us"
      >
        <input
          className="itinerary-card__hidden-toggle"
          type="checkbox"
          id="travel-items-toggle-off_0000AdBgie6kU5uz7chOPv_0-arp_jfk_us"
        />
        <div
          className="itinerary-card__header"
          onClick={() => setUndercard(!undercard)}
        >
          <div className="itinerary-card__header-info">
            <div className="itinerary-card__carrier-info">
              <img
                className="airline-logo"
                src={
                  offer.slices[0].segments[0].operating_carrier.logo_symbol_url
                }
                alt="Logo for airline"
                onerror="handleAirlineLogoError(this, 'IB')"
                id="travel-items-toggle-off_0000AdBgie6kU5uz7chOPv_0-arp_jfk_us-IB-logo"
                phx-update="ignore"
              />

              <span className="itinerary-card__carriers">
                <span className="itinerary-card__marketing_carriers">
                  {offer.slices[0].segments[0].operating_carrier.name}
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
              <p className="flight-path__info-time">
                {convertTo12HourFormat(
                  offer.slices[0].segments[0].departing_at
                )}
              </p>
              <p className="flight-path__info-place">
                {" "}
                {offer.slices[0].origin.iata_code}
              </p>
            </div>
            <div className="flight-path__line-wrapper">
              <div className="flight-path__flight-path-representation">
                <p className="flight-path__info-duration">
                  {extractHoursMinutes(offer.slices[0].duration)}
                </p>
                <div>
                  <div className="flight-path__flight-line"></div>
                </div>

                <p className="flight-path__info-stops">
                  {offer.slices[0].segments.length === 1 ? (
                    <div>non-stop</div>
                  ) : (
                    <div>
                      {offer.slices[0].segments.length - 1} stop,{" "}
                      {offer.slices[0].segments[0].destination.iata_code}
                    </div>
                  )}
                </p>
              </div>
              <div className="flight-path__plane-symbol">
                <span className="material-symbols-outlined">flight</span>
              </div>
            </div>
            <div className="flight-path__flight-destination">
              <p className="flight-path__info-time">
                {offer.slices[0].segments.length === 1
                  ? convertTo12HourFormat(
                      offer.slices[0].segments[0].arriving_at
                    )
                  : convertTo12HourFormat(
                      offer.slices[0].segments[1].arriving_at
                    )}
                <sup></sup>
              </p>
              <p className="flight-path__info-place">
                {offer.slices[0].destination.iata_code}
              </p>
            </div>
          </div>
        </div>
        <div className={undercard ? "max-h-[1500px]" : "max-h-0"}>
          {offer.slices[0].segments.length === 1 ? (
            <div>
              <div className="itinerary-card__travel-item itinerary-card__travel-item--departure">
                <div></div>
                <span className="material-symbols-outlined">
                  calendar_month
                </span>
                <p>{extractDay(offer.slices[0].segments[0].departing_at)}</p>
              </div>

              <div className="itinerary-card__travel-item itinerary-card__travel-item--origin">
                <p>
                  {convertTo12HourFormat(
                    offer.slices[0].segments[0].departing_at
                  )}
                </p>
                <span className="material-symbols-outlined">
                  flight_takeoff
                </span>
                <p>Depart from {offer.slices[0].origin.name}</p>
              </div>

              <div className="itinerary-card__travel-item itinerary-card__travel-item--segment-info">
                <div></div>
                <div></div>
                <p>
                  {extractHoursMinutes(offer.slices[0].duration)}
                  <span>•</span>
                  <img
                    className="airline-logo--small"
                    src="https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/IB.svg"
                    alt="Logo for Iberia"
                    onerror="handleAirlineLogoError(this, 'IB')"
                    id="logo-John F. Kennedy International Airport (JFK)-Iberia-off_0000AdBgie6kU5uz7chOPv_0-arp_jfk_us"
                    phx-update="ignore"
                  />
                  {offer.slices[0].segments[0].operating_carrier.name}
                  <span>•</span>
                  Airbus A330-200
                  <span>•</span>
                  IB3179
                  <span>•</span>
                  {offer.slices[0].fare_brand_name}
                </p>
              </div>
              <div>
                {" "}
                <div className="itinerary-card__travel-item itinerary-card__travel-item--destination">
                  <p>
                    {convertTo12HourFormat(
                      offer.slices[0].segments[0].arriving_at
                    )}
                  </p>
                  <span className="material-symbols-outlined">flight_land</span>
                  <p>Arrive at {offer.slices[0].destination.name}</p>
                </div>
                <div className="itinerary-card__travel-item itinerary-card__travel-item--arrival">
                  <div></div>
                  <span className="material-symbols-outlined">
                    calendar_month
                  </span>
                  <p>{extractDay(offer.slices[0].segments[0].arriving_at)}</p>
                </div>{" "}
              </div>
            </div>
          ) : (
            <div>
              <div className="itinerary-card__travel-item itinerary-card__travel-item--departure">
                <div></div>
                <span className="material-symbols-outlined">
                  calendar_month
                </span>
                <p>{extractDay(offer.slices[0].segments[0].departing_at)}</p>
              </div>

              <div className="itinerary-card__travel-item itinerary-card__travel-item--origin">
                <p>
                  {convertTo12HourFormat(
                    offer.slices[0].segments[0].departing_at
                  )}
                </p>
                <span className="material-symbols-outlined">
                  flight_takeoff
                </span>
                <p>Depart from {offer.slices[0].origin.name}</p>
              </div>

              <div className="itinerary-card__travel-item itinerary-card__travel-item--segment-info">
                <div></div>
                <div></div>
                <p>
                  {extractHoursMinutes(offer.slices[0].segments[0].duration)}
                  <span>•</span>
                  <img
                    className="airline-logo--small"
                    src="https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/IB.svg"
                    alt="Logo for Iberia"
                    onerror="handleAirlineLogoError(this, 'IB')"
                    id="logo-John F. Kennedy International Airport (JFK)-Iberia-off_0000AdBgie6kU5uz7chOPv_0-arp_jfk_us"
                    phx-update="ignore"
                  />
                  {offer.slices[0].segments[0].operating_carrier.name}
                  <span>•</span>
                  Airbus A330-200
                  <span>•</span>
                  IB3179
                  <span>•</span>
                  {offer.slices[0].fare_brand_name}
                </p>
              </div>
              <div className="itinerary-card__travel-item itinerary-card__travel-item--destination">
                <p>
                  {convertTo12HourFormat(
                    offer.slices[0].segments[0].arriving_at
                  )}
                </p>
                <span className="material-symbols-outlined">flight_land</span>
                <p>Arrive at {offer.slices[0].segments[0].destination.name}</p>
              </div>
              <div className="itinerary-card__travel-item itinerary-card__travel-item--departure">
                <p>
                  hours at layover + city
                  {layoverCalculator(
                    offer.slices[0].duration,
                    offer.slices[0].segments[0].duration,
                    offer.slices[0].segments[1].duration
                  )}
                </p>
              </div>

              <div className="itinerary-card__travel-item itinerary-card__travel-item--origin">
                <p>
                  {convertTo12HourFormat(
                    offer.slices[0].segments[1].departing_at
                  )}
                </p>
                <span className="material-symbols-outlined">
                  flight_takeoff
                </span>
                <p>
                  Depart from {offer.slices[0].segments[0].destination.name}
                </p>
              </div>

              <div className="itinerary-card__travel-item itinerary-card__travel-item--segment-info">
                <div></div>
                <div></div>
                <p>
                  {extractHoursMinutes(offer.slices[0].segments[1].duration)}
                  <span>•</span>
                  <img
                    className="airline-logo--small"
                    src="https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/IB.svg"
                    alt="Logo for Iberia"
                    onerror="handleAirlineLogoError(this, 'IB')"
                    id="logo-John F. Kennedy International Airport (JFK)-Iberia-off_0000AdBgie6kU5uz7chOPv_0-arp_jfk_us"
                    phx-update="ignore"
                  />
                  {offer.slices[0].segments[0].operating_carrier.name}
                  <span>•</span>
                  Airbus A330-200
                  <span>•</span>
                  IB3179
                  <span>•</span>
                  {offer.slices[0].fare_brand_name}
                </p>
              </div>

              <div className="itinerary-card__travel-item itinerary-card__travel-item--destination">
                <p>
                  {convertTo12HourFormat(
                    offer.slices[0].segments[1].arriving_at
                  )}
                </p>
                <span className="material-symbols-outlined">flight_land</span>
                <p>Arrive at {offer.slices[0].destination.name}</p>
              </div>

              <div className="itinerary-card__travel-item itinerary-card__travel-item--arrival">
                <div></div>
                <span className="material-symbols-outlined">
                  calendar_month
                </span>
                <p>{extractDay(offer.slices[0].segments[0].arriving_at)}</p>
              </div>
            </div>
          )}
        </div>

        <div className="itinerary-card__footer">
          <div>
            <p className="itinerary-card__price">
              <span>From</span>${offer.total_amount}
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

export default flightCard;
