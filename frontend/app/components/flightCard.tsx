import React from "react";

const flightCard = ({ offer }) => {
  console.log(offer);

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
              <p className="flight-path__info-time">
                {offer.slices[0].segments[0].departing_at}
              </p>
              <p className="flight-path__info-place">
                {" "}
                {offer.slices[0].origin.iata_code}
              </p>
            </div>
            <div className="flight-path__line-wrapper">
              <div className="flight-path__flight-path-representation">
                <p className="flight-path__info-duration">5h 52m</p>
                <div>
                  <div className="flight-path__flight-line"></div>
                </div>

                <p className="flight-path__info-stops">
                  {offer.slices[0].segments.length === 1 ? (
                    <div>non-stop</div>
                  ) : (
                    <div>
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
                {offer.slices[1].segments.length === 1
                  ? offer.slices[1].segments[0].arriving_at
                  : offer.slices[1].segments[1].arriving_at}
                <sup></sup>
              </p>
              <p className="flight-path__info-place">
                {offer.slices[1].origin.iata_code}
              </p>
            </div>
          </div>
        </div>
        <div className="itinerary-card__travel-items itinerary-card__travel-items--with-footer">
          <div className="itinerary-card__travel-item itinerary-card__travel-item--departure">
            <div></div>
            <span className="material-symbols-outlined">calendar_month</span>
            <p>{offer.slices[0].segments[0].departing_at}</p>
          </div>

          <div className="itinerary-card__travel-item itinerary-card__travel-item--origin">
            <p>{offer.slices[0].segments[0].departing_at}</p>
            <span className="material-symbols-outlined">flight_takeoff</span>
            <p>origin date</p>
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
            <p>{offer.slices[1]?.segments[1]?.arriving_at}</p>
            <span className="material-symbols-outlined">flight_land</span>
            <p>destination city</p>
          </div>

          <div className="itinerary-card__travel-item itinerary-card__travel-item--arrival">
            <div></div>
            <span className="material-symbols-outlined">calendar_month</span>
            <p>{offer.slices[1]?.segments[1]?.arriving_at}</p>
          </div>
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
