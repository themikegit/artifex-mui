'use client';

import * as React from 'react';

export const CityContext = React.createContext({
  selectedCity: '',
  setSelectedCityContext: () => {},
});

export function CityProvider({ children, selectedCity: initialCity }) {
  const [selectedCity, setSelectedCity] = React.useState(initialCity);

  React.useEffect(() => {
    setSelectedCity(initialCity);
    console.log('na');
  }, [initialCity]);

  return (
    <CityContext.Provider
      value={{
        selectedCity: selectedCity,
        setSelectedCityContext: (city) => {
          setSelectedCity(city);
        },
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export const CityConsumer = CityContext.Consumer;
