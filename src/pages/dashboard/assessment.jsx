import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LinearProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { Helmet } from 'react-helmet-async';
import Map, { FullscreenControl, Layer, Marker, NavigationControl, ScaleControl, Source } from 'react-map-gl';
import { useNavigate } from 'react-router-dom';

import { config } from '@/config';
import { GenDataContext } from '@/contexts/generic-data';
import { CityContext } from '@/contexts/selected-city';

import { BoundaryAnalytics } from './analytics';
import DrawControl from './draw-control';

const metadata = { title: `Crypto | Dashboard | ${config.site.name}` };

export function Page() {
  const mapRef = useRef();
  const navigate = useNavigate();
  const [locations, setLocations] = useState(null);
  const [boundary, setBoundary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialMapView, setInitialmapView] = useState(null);
  const [open, setOpen] = useState(false);
  const baseUrl = import.meta.env.VITE_SERVER_HOST;

  const { selectedCity } = React.useContext(CityContext);
  const { setmapCoorContext, mapCoor } = React.useContext(GenDataContext);

  const onMapLoad = useCallback(() => {
    const storedProperties = JSON.parse(localStorage.getItem('properties'));
    const storedBounds = JSON.parse(localStorage.getItem('bounds'));

    if (storedProperties && storedBounds) {
      setLocations(storedProperties.locations);
      setBoundary(storedBounds);
      setLoading(false);
    } else {
      const bounds = mapRef.current.getBounds();

      const propertiesPromise = fetch(
        `${baseUrl}properties/?north=${bounds._ne.lat}&south=${bounds._sw.lat}&east=${bounds._ne.lng}&west=${bounds._sw.lng}`
      ).then((res) => res.json());

      const boundsPromise = fetch(
        `${baseUrl}get-geojson/?min_lat=${bounds._sw.lat}&min_lon=${bounds._sw.lng}&max_lat=${bounds._ne.lat}&max_lon=${bounds._ne.lng}`
      ).then((res) => res.json());

      Promise.all([propertiesPromise, boundsPromise])
        .then(([propertiesData, boundsData]) => {
          let geojsonFeatures = {
            type: 'FeatureCollection',
            features: propertiesData.results.map((property) => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [property.longitude, property.latitude],
              },
              properties: {
                title: property.street_address,
                totalAssessment: property.total_assessment,
              },
            })),
          };
          setLocations(geojsonFeatures);
          setBoundary(boundsData);
          setLoading(false);

          localStorage.setItem('properties', JSON.stringify({ locations: geojsonFeatures }));
          localStorage.setItem('bounds', JSON.stringify(boundsData));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, []);

  const onClick = useCallback((event) => {
    const feature = event.features && event.features[0];

    if (feature) {
      window.alert(`Clicked layer ${feature.layer.id}`); // eslint-disable-line no-alert
    }
  }, []);

  useEffect(() => {
    setInitialmapView({
      latitude: selectedCity.ini_lat,
      longitude: selectedCity.ini_lon,
      zoom: 12,
    });

    mapRef.current?.flyTo({ center: [selectedCity.ini_lon, selectedCity.ini_lat], duration: 5000 });
  }, [selectedCity]);

  const onUpdate = useCallback(({ features }) => {
    console.log('update');
    if (features && features.length > 0) {
      const drawnPolygonGeometry = features[0].geometry;
      setmapCoorContext(drawnPolygonGeometry);
      setOpen(true);
      // navigate('/assessment/details');
    }
  }, []);

  const onDelete = useCallback((e) => {
    setmapCoorContext(null);
    // setFeatures((currFeatures) => {
    //   const newFeatures = { ...currFeatures };
    //   for (const f of e.features) {
    //     delete newFeatures[f.id];
    //   }
    //   return newFeatures;
    // });
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <div>
        <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
          <BoundaryAnalytics />
        </Drawer>
      </div>
      <div style={{ width: '85vw', height: '95vh' }}>
        {loading && <LinearProgress />}
        {initialMapView && (
          <Map
            onClick={onClick}
            ref={mapRef}
            initialViewState={initialMapView}
            mapStyle="mapbox://styles/mapbox/navigation-day-v1"
            onLoad={onMapLoad}
            mapboxAccessToken={config.mapbox.apiKey}
          >
            {boundary && (
              <Source type="geojson" data={boundary}>
                <Layer id="boundaryOutline" type="line" paint={{ 'line-color': '#000000', 'line-width': 0.5 }} />
              </Source>
            )}
            {locations && (
              <Source type="geojson" data={locations}>
                <Layer
                  id="propertyDots"
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

            {/* {mapCoor && (
              <Source
                type="geojson"
                data={{ type: 'Feature', geometry: { type: 'Polygon', coordinates: [...mapCoor.coordinates] } }}
              >
                <Layer id="drawnPolygon" type="fill" paint={{ 'fill-color': '#ff0000', 'fill-opacity': 0.5 }} />
              </Source>
            )} */}

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
