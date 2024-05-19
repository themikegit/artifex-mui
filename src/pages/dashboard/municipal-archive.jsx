import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Paper,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { Option } from '@/components/core/option';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { Events } from '@/components/dashboard/overview/events';

import { MunicipalArchiveTable } from './municipal-archive-table';
import { SepticTable } from './septic-table';

const metadata = { title: `List | Customers | Dashboard | ${config.site.name}` };

export function Page() {
  const locations = [
    { city: 'Tulsa', state: 'ok', country: 'usa', label: 'Tulsa, OK' },
    { city: 'Bristow', state: 'ok', country: 'usa', label: 'Bristow, OK' },
    { city: 'Creek Count', state: 'ok', country: 'usa', label: 'Creek Count, OK' },
    { city: 'Sapulpa', state: 'ok', country: 'usa', label: 'Sapulpa, OK' },
  ];
  // const { email, phone, sortDir, status } = useExtractSearchParams();
  // const sortedCustomers = applySort(customers, sortDir);
  // const filteredCustomers = applyFilters(sortedCustomers, { email, phone, status });
  const [recentDoc, setrecentDoc] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_SERVER_HOST;
  const [septicLead, setsepticLeads] = useState(null);
  const [type, setType] = useState('document');
  const [documentsResults, setdocumentsResults] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTown, setselectedTown] = useState('Tulsa');

  const handleChange = (event, type) => {
    setType(type);
  };

  const getDocuments = () => {
    setisLoading(true);
    fetch(`${baseUrl}municipal-search/?search_query=${searchTerm}&city=${selectedTown}&state=OK&item_type=${type}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setdocumentsResults(data);
        setisLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const handleSelect = (event) => {
    setselectedTown(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      getDocuments();
    }
  };

  useEffect(() => {
    fetch(`${baseUrl}recent-records/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setrecentDoc(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <React.Fragment>
      {isLoading && <LinearProgress />}
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Grid container spacing={4}>
          <Grid item md={8} xs={12}>
            <Stack spacing={2}>
              <Box>
                <ToggleButtonGroup color="primary" value={type} exclusive onChange={handleChange} aria-label="Platform">
                  <ToggleButton value="document">
                    {' '}
                    <Typography variant="subtitle2">Documents</Typography>
                  </ToggleButton>
                  <ToggleButton value="meeting">
                    {' '}
                    <Typography variant="subtitle2">Meetings</Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
                  <UserIcon />
                </IconButton> */}

                <FormControl sx={{ maxWidth: '100%', width: '180px' }}>
                  <Select
                    required={true}
                    value={selectedTown}
                    onChange={($event) => handleSelect($event)}
                    defaultValue=""
                    fullWidth
                    name="category"
                  >
                    {locations.map((l, index) => (
                      <Option key={index} value={`${l.city}`}>
                        {l.label}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <OutlinedInput
                  onChange={handleSearchChange}
                  // onFocus={handleSearchFocus}
                  onKeyDown={handleSearchKeyPress}
                  placeholder="Search documents"
                  // ref={searchRef}
                  startAdornment={
                    <InputAdornment position="start">
                      <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
                    </InputAdornment>
                  }
                  sx={{ m: 1, flex: 1 }}
                  // value={searchQuery}
                />
                <Button onClick={getDocuments} disabled={false} variant="contained">
                  Search
                </Button>

                {/* <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <MagnifyingGlassIcon onClick={getDocuments} />
                </IconButton> */}
              </Paper>

              {documentsResults && <MunicipalArchiveTable rows={documentsResults}></MunicipalArchiveTable>}
            </Stack>
          </Grid>
          <Grid item md={4} xs={12}>
            {recentDoc && <Events events={recentDoc}></Events>}
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

function useExtractSearchParams() {
  const [searchParams] = useSearchParams();

  return {
    email: searchParams.get('email') || undefined,
    phone: searchParams.get('phone') || undefined,
    sortDir: searchParams.get('sortDir') || undefined,
    status: searchParams.get('status') || undefined,
  };
}

// Sorting and filtering has to be done on the server.

function applySort(row, sortDir) {
  return row.sort((a, b) => {
    if (sortDir === 'asc') {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }

    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

function applyFilters(row, { email, phone, status }) {
  return row.filter((item) => {
    if (email) {
      if (!item.email?.toLowerCase().includes(email.toLowerCase())) {
        return false;
      }
    }

    if (phone) {
      if (!item.phone?.toLowerCase().includes(phone.toLowerCase())) {
        return false;
      }
    }

    if (status) {
      if (item.status !== status) {
        return false;
      }
    }

    return true;
  });
}
