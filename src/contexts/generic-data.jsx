'use client';

import * as React from 'react';

export const GenDataContext = React.createContext({
  genericData: '',
  setgenericDataContext: () => {},
  mapCoor: '',
  setmapCoorContext: () => {},
});

export function GenDataProvider({ children }) {
  const [genericData, setgenericData] = React.useState();
  const [mapCoor, setmapCoor] = React.useState();

  return (
    <GenDataContext.Provider
      value={{
        genericData: genericData,
        setgenericDataContext: (data) => {
          setgenericData(data);
        },
        mapCoor: mapCoor,
        setmapCoorContext: (data) => {
          setmapCoor(data);
        },
      }}
    >
      {children}
    </GenDataContext.Provider>
  );
}

export const GenDataConsumer = GenDataContext.Consumer;
