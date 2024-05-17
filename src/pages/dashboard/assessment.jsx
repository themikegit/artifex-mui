import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Fab,
  LinearProgress,
  Modal,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { Box, width } from '@mui/system';
import { Calculator as CalculatorIcon } from '@phosphor-icons/react/dist/ssr/Calculator';
import { HouseSimple as HouseSimpleIcon } from '@phosphor-icons/react/dist/ssr/HouseSimple';
import { PaperPlaneTilt as PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr/PaperPlaneTilt';
import { StackSimple as StackSimpleIcon } from '@phosphor-icons/react/dist/ssr/StackSimple';
import { TreeEvergreen as TreeEvergreenIcon } from '@phosphor-icons/react/dist/ssr/TreeEvergreen';
import { Helmet } from 'react-helmet-async';
import Map, {
  FullscreenControl,
  Layer,
  Marker,
  NavigationControl,
  ScaleControl,
  Source,
  useControl,
} from 'react-map-gl';
import { useNavigate } from 'react-router-dom';

import { config } from '@/config';
import { GenDataContext } from '@/contexts/generic-data';
import { CityContext } from '@/contexts/selected-city';

import { BoundaryAnalytics } from './analytics';
import DrawControl from './draw-control';
import Pin from './pin';
import { TaxSim } from './tax-sim';
import { WellsData } from './wells-data';

const metadata = { title: `Crypto | Dashboard | ${config.site.name}` };

// @todo set layer icon to env or properties. this is for speed dial, so user knows what soruce is used

export function Page() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };
  const mapRef = useRef();
  const navigate = useNavigate();
  const [locations, setLocations] = useState(null);
  const [boundary, setBoundary] = useState(null);
  const [wells, setwells] = useState(null);
  const [wellsData, setwellsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialMapView, setInitialmapView] = useState(null);
  const [sourceType, setsourceType] = useState('Properties');
  const [mapContext, setmapContext] = useState();
  const [open, setOpen] = useState(false);
  const [taxOpen, settaxOpen] = useState(false);
  const baseUrl = import.meta.env.VITE_SERVER_HOST;

  const { selectedCity } = React.useContext(CityContext);
  const { setmapCoorContext, mapCoor } = React.useContext(GenDataContext);

  const getPropertiesMapSource = () => {
    setLoading(true);
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
  };

  const getEnvironmentalMapSource = () => {
    setLoading(true);
    const bounds = mapRef.current.getBounds();
    fetch(
      `${baseUrl}get-well-data/?min_lat=${bounds._sw.lat}&min_lon=${bounds._sw.lng}&max_lat=${bounds._ne.lat}&max_lon=${bounds._ne.lng}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setwells(JSON.parse(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const handleViewportChange = (e) => {
    console.log(e);
    console.log(mapContext);
    if (e.type === 'moveend') {
      switch (mapContext) {
        case 'Properties':
          getPropertiesMapSource();
          break;

        case 'Environmental':
          getEnvironmentalMapSource();
          break;
      }
    }
  };

  useEffect(() => {
    setInitialmapView({
      latitude: selectedCity.ini_lat,
      longitude: selectedCity.ini_lon,
      zoom: 13,
    });
  }, []);

  const getMapSource = (action) => {
    setmapContext(action);
    switch (action) {
      case 'Properties':
        mapRef.current?.flyTo({ center: [selectedCity.ini_lon, selectedCity.ini_lat], duration: 3000, zoom: 13 });
        setInitialmapView({
          latitude: selectedCity.ini_lat,
          longitude: selectedCity.ini_lon,
          zoom: 13,
        });
        break;
      case 'Environmental':
        mapRef.current?.flyTo({ center: [-71.37861397956105, 42.251256798606114], duration: 3000, zoom: 13 });
        setInitialmapView({
          latitude: 42.251256798606114,
          longitude: -71.37861397956105,
          zoom: 13,
        });
        // getEnvironmentalMapSource();
        break;
      default:
        break;
    }
  };

  const actions = [
    { icon: <HouseSimpleIcon />, name: 'Properties' },
    { icon: <TreeEvergreenIcon />, name: 'Environmental' },
  ];

  const wellInfo = (wells, well) => {
    setOpen(true);
    console.log(well);
    const wellsData = wells.filter((w) => w.fields.address_id === well.fields.address_id);
    setwellsData(wellsData);
  };

  const onMapLoad = useCallback(() => {
    getPropertiesMapSource();
  }, []);

  const onClick = useCallback((event) => {
    const feature = event.features && event.features[0];

    if (feature) {
      window.alert(`Clicked layer ${feature.layer.id}`); // eslint-disable-line no-alert
    }
  }, []);

  const openTaxCalc = () => {
    settaxOpen(true);
  };

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
        <Modal
          open={taxOpen}
          onClose={() => settaxOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TaxSim />
          </Box>
        </Modal>
        <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
          {mapContext === 'Properties' && <BoundaryAnalytics />}
          {mapContext === 'Environmental' && <WellsData data={wellsData} />}
        </Drawer>
      </div>
      <div style={{ width: '100vw', height: '95vh' }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', top: 140, right: 16 }}
          direction="down"
          icon={<StackSimpleIcon fontSize="var(--icon-fontSize-lg)" />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              onClick={() => getMapSource(action.name)}
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
        <Fab sx={{ position: 'absolute', top: 70, right: 16 }} color="primary" aria-label="add">
          <CalculatorIcon onClick={openTaxCalc} fontSize="var(--icon-fontSize-lg)" />
        </Fab>
        {loading && <LinearProgress />}
        {initialMapView && (
          <Map
            onClick={onClick}
            onMoveEnd={(e) => handleViewportChange(e)}
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

            {wells &&
              wells.map((well, i) => (
                <Marker
                  key={`marker-${i}`}
                  longitude={well.fields.longitude}
                  latitude={well.fields.latitude}
                  anchor="bottom"
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    wellInfo(wells, well);
                  }}
                >
                  <Pin size={10} />
                </Marker>
              ))}

            {mapContext === 'Properties' && (
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
            )}
          </Map>
        )}
      </div>
    </React.Fragment>
  );
}
