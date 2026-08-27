import React, { useState } from "react";

import BookingActionWindow from "./BookingActionWindow";

const GeneralContext = React.createContext({
  openBookingWindow: (service) => {},
  closeBookingWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBookingWindowOpen, setIsBookingWindowOpen] = useState(false);

  // Stores the service selected by the user
  const [selectedService, setSelectedService] = useState(null);

  // Open booking window with selected service
  const handleOpenBookingWindow = (service) => {
    setSelectedService(service);
    setIsBookingWindowOpen(true);
  };

  // Close booking window
  const handleCloseBookingWindow = () => {
    setIsBookingWindowOpen(false);
    setSelectedService(null);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBookingWindow: handleOpenBookingWindow,
        closeBookingWindow: handleCloseBookingWindow,
      }}
    >
      {props.children}

      {isBookingWindowOpen && selectedService && (
        <BookingActionWindow service={selectedService} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;

