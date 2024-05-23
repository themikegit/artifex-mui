'use client';

import React, { useContext, useState } from 'react';

export const GenDataContext = React.createContext({});

export const GenDataProvider = ({ children }) => {
  const [searchResults, setsearchResults] = useState();
  const [articles, setArticles] = useState(['initial']);
  const [mapCoor, setmapCoor] = useState();

  return (
    <GenDataContext.Provider
      value={{
        articles,
        setArticles,
        mapCoor,
        setmapCoor,
        searchResults,
        setsearchResults,
      }}
    >
      {children}
    </GenDataContext.Provider>
  );
};

export const GenDataConsumer = GenDataContext.Consumer;
