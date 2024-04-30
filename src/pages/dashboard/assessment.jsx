import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import bbox from '@turf/bbox';
import { Helmet } from 'react-helmet-async';
import Map, { FullscreenControl, Layer, Marker, NavigationControl, ScaleControl, Source } from 'react-map-gl';

import { config } from '@/config';
import { CityContext } from '@/contexts/selected-city';

import DrawControl from './draw-control';

const metadata = { title: `Crypto | Dashboard | ${config.site.name}` };

export function Page() {
  const mapRef = useRef();
  const [locations, setLocations] = useState([]);
  const [initialMapView, setInitialmapView] = useState(null);
  const baseUrl = import.meta.env.VITE_SERVER_HOST;

  const { selectedCity } = React.useContext(CityContext);

  useEffect(() => {
    setInitialmapView({
      latitude: selectedCity.ini_lat,
      longitude: selectedCity.ini_lon,
      zoom: 14,
    });

    fetch(
      `${baseUrl}get-geojson/?min_lat=${selectedCity.min_lat}&min_lon=${selectedCity.min_lon}&max_lat=${selectedCity.max_lat}&max_lon=${selectedCity.max_lon}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    mapRef.current?.flyTo({ center: [selectedCity.ini_lon, selectedCity.ini_lat], duration: 5000 });
  }, [selectedCity]);

  const fetchProperties = (drawnPolygon) => {
    if (drawnPolygon) {
      const [west, south, east, north] = bbox(drawnPolygon);
      const apiUrl = `${baseUrl}properties/?north=${north}&south=${south}&east=${east}&west=${west}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched properties:', data);
          // Handle the fetched data as needed
        })
        .catch((error) => console.error('Error fetching properties:', error));
    }
  };

  const onUpdate = useCallback(({ features }) => {
    if (features && features.length > 0) {
      const drawnPolygonGeometry = features[0].geometry;
      fetchProperties(drawnPolygonGeometry);
    }
  }, []);

  const onDelete = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <div style={{ width: '100vw', height: '95vh' }}>
        {initialMapView && (
          <Map
            ref={mapRef}
            initialViewState={initialMapView}
            mapStyle="mapbox://styles/mapbox/navigation-day-v1"
            mapboxAccessToken={config.mapbox.apiKey}
          >
            {locations && (
              <Source type="geojson" data={locations}>
                <Layer
                  id="point-layer"
                  type="circle"
                  paint={{
                    'circle-radius': {
                      base: 1.75,
                      stops: [
                        [12, 3],
                        [22, 10],
                      ],
                    },
                    'circle-color': '#007cbf', // A static modern blue color
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ffffff',
                    'circle-opacity': 0.75, // Slightly transparent
                  }}
                />
              </Source>
            )}

            <FullscreenControl />
            <NavigationControl />
            <ScaleControl />

            <DrawControl
              position="top-left"
              displayControlsDefault={false}
              controls={{
                polygon: true,
                trash: true,
              }}
              defaultMode="draw_polygon"
              onCreate={onUpdate}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </Map>
        )}
      </div>
    </React.Fragment>
  );
}
