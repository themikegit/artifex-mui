import React, { useCallback, useEffect, useMemo, useState } from 'react';
import bbox from '@turf/bbox';
import { Helmet } from 'react-helmet-async';
import Map, { FullscreenControl, Layer, Marker, NavigationControl, ScaleControl, Source } from 'react-map-gl';

import { config } from '@/config';

import DrawControl from './draw-control';

const metadata = { title: `Crypto | Dashboard | ${config.site.name}` };

export function Page() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch(
      'http://127.0.0.1:8000/geodata/get-geojson/?min_lat=41.620202743089294&min_lon=-70.51879547119142&max_lat=41.67978348076019&max_lon=-70.44120452880827'
    )
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const fetchProperties = (drawnPolygon) => {
    if (drawnPolygon) {
      const [west, south, east, north] = bbox(drawnPolygon);
      const apiUrl = `http://127.0.0.1:8000/geodata/properties/?north=${north}&south=${south}&east=${east}&west=${west}`;
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
      <Map
        initialViewState={{
          latitude: 41.65,
          longitude: -70.48,
          zoom: 14,
        }}
        style={{ width: 1400, height: 850 }}
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
    </React.Fragment>
  );
}
