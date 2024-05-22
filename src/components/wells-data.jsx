import React, { useEffect, useState } from 'react';
import {
  Alert,
  Autocomplete,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { Drop as DropIcon } from '@phosphor-icons/react/dist/ssr/Drop';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { MapPinLine as MapPinLineIcon } from '@phosphor-icons/react/dist/ssr/MapPinLine';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { ShieldWarning as ShieldWarningIcon } from '@phosphor-icons/react/dist/ssr/ShieldWarning';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { RouterLink } from '@/components/core/link';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';
import { Notifications } from '@/components/dashboard/customer/notifications';
import { Payments } from '@/components/dashboard/customer/payments';
import { ShippingAddress } from '@/components/dashboard/customer/shipping-address';

const metadata = { title: `Details | Customers | Dashboard | ${config.site.name}` };

export function WellsData({ data: initialData }) {
  const baseUrl = import.meta.env.VITE_SERVER_HOST;
  const [data, setData] = useState(initialData);
  const [resultsAddress, setresultAddress] = useState(false);
  const [isResults, setisResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchKeyPress = (e) => {
    console.log(e);
    if (e.code === 'Enter') {
      e.preventDefault();
      getWellsSerchResults();
    }
  };
  const resultItemClick = (element) => {
    console.log(element);
    fetch(`${baseUrl}well-data/${element.address_id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        let res = JSON.parse(data);
        res[0].fields.address = element.address;
        console.log(res);

        setData(res);
        // map.flyTo({
        //   center: [res[0].fields.longitude, res[0].fields.latitude],
        //   zoom: 18,
        // });
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const getWellsSerchResults = () => {
    fetch(`${baseUrl}wellsearch/?address=${searchTerm}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setresultAddress(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
        style={{ width: '40vw', padding: '25px' }}
      >
        <Card>
          <CardHeader
            // action={
            //   <Button color="secondary" startIcon={<PencilSimpleIcon />}>
            //     Edit
            //   </Button>
            // }
            avatar={
              <Avatar>
                <MapPinLineIcon fontSize="var(--Icon-fontSize)" />
              </Avatar>
            }
            title={data[0].fields.address}
          />

          <CardContent>
            <Card sx={{ borderRadius: 1 }} variant="outlined">
              <Box sx={{ p: 3 }}></Box>
              <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
                  <UserIcon />
                </IconButton> */}
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search wells"
                  inputProps={{ 'aria-label': 'search wells' }}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyPress}
                  variant="outlined"
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <MagnifyingGlassIcon onClick={getWellsSerchResults} />
                </IconButton>

                {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                  <UserIcon />
                </IconButton> */}
              </Paper>
              {resultsAddress.length === 0 && <Alert severity="info">No results.</Alert>}
              {/* <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)', p: 3 }}> */}
              {resultsAddress &&
                resultsAddress.map((r) => (
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <MapPinLineIcon />
                        </ListItemIcon>
                        <ListItemText onClick={() => resultItemClick(r)} primary={r.address} />
                      </ListItemButton>
                    </ListItem>
                  </List>
                ))}
              {/* </Paper> */}

              {data.map((w, i) => (
                <>
                  <CardHeader
                    avatar={
                      <Avatar>
                        <DropIcon fontSize="var(--Icon-fontSize)" />
                      </Avatar>
                    }
                    title={`Well ${i + 1}`}
                  />
                  <PropertyList divider={<Divider />} sx={{ '--PropertyItem-padding': '16px' }}>
                    <PropertyItem key={i} value={w.fields.well_type} name={'Well Type'} />
                    <PropertyItem key={i} value={w.fields.work_performed} name={'Work Performed'} />
                    <PropertyItem key={i} value={w.fields.total_depth} name={'Total Depth'} />
                    <PropertyItem key={i} value={w.fields.depth_to_bedrock} name={'Depth to Bedrock'} />
                    <PropertyItem key={i} value={w.fields.water_level} name={'Water Level'} />
                    <PropertyItem key={i} value={w.fields.work_performed} name={'Work Performed'} />
                  </PropertyList>
                </>
              ))}
            </Card>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  );
}
