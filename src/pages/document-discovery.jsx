import React, { useState } from 'react';
import { Button, Card, FormControl, InputLabel, LinearProgress, OutlinedInput, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { Option } from '@/components/core/option';
import { DocumentCard } from '@/components/document-card';

const metadata = { title: `Document Discovery  | ${config.site.name}` };

export function Page() {
  const baseUrl = import.meta.env.VITE_SERVER_HOST;
  const [documents, setDocuments] = useState(null);
  const [selectedTown, setselectedTown] = useState({
    city: 'greenfield',
    state: 'ma',
    country: 'usa',
    label: 'Greenfield, MA',
  });
  const [serchKeywords, setserchKeywords] = useState(null);
  const [isLoading, setisLoading] = useState(null);

  const locations = [
    { city: 'tulsa', state: 'ok', country: 'usa', label: 'Tulsa, OK' },
    { city: 'manchester', state: 'nh', country: 'usa', label: 'Manchester, NH' },
    { city: 'mashpee', state: 'ma', country: 'usa', label: 'Mashpee, MA' },
    { city: 'somerville', state: 'ma', country: 'usa', label: 'Somerville, MA' },
    { city: 'waltham', state: 'ma', country: 'usa', label: 'Waltham, MA' },
    { city: 'watertown', state: 'ma', country: 'usa', label: 'Watertown, MA' },
    { city: 'national', state: 'national', country: 'kenya', label: 'Kenya - Federal' },
    { city: 'national', state: 'national', country: 'georgia', label: 'Georgia - Federal' },
    { city: 'national', state: 'national', country: 'nigeria', label: 'Nigeria - Federal' },
    { city: 'national', state: 'national', country: 'south africa', label: 'South Africa - Federal' },
    { city: 'drammen', state: 'national', country: 'norway', label: 'Drammen, Norway' },
    { city: 'oslo', state: 'national', country: 'norway', label: 'Oslo, Norway' },
    { city: 'stortinget', state: 'national', country: 'norway', label: 'Norway - Stortinget' },
    { city: 'pittsfield', state: 'ma', country: 'usa', label: 'Pittsfield, MA' },
    { city: 'dalton', state: 'ma', country: 'usa', label: 'Dalton, MA' },
    { city: 'greenfield', state: 'ma', country: 'usa', label: 'Greenfield, MA' },
  ];

  const handleSelect = (event) => {
    const st = locations.find((l) => l.city === event.target.value);
    setselectedTown(st);
  };
  const handleSearchKeywords = ($event) => {
    setserchKeywords($event.target.value);
  };

  const getDocuments = () => {
    setisLoading(true);
    fetch(
      `${baseUrl}get-town-website/?city=${selectedTown.city}&state=${selectedTown.state}&country=${selectedTown.country}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const requestBody = {
          context_term: serchKeywords,
          file_type: 'pdf',
          application_id: '1',
          site_url: data.website,
        };
        return fetch(`${baseUrl}municipal_file_discovery/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setisLoading(false);
        setDocuments(data.file_info);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      {isLoading && <LinearProgress />}
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={4}>
          <Box
            sx={{
              bgcolor: 'var(--mui-palette-neutral-900)',
              borderRadius: '20px',
              color: 'var(--mui-palette-common-white)',
              overflow: 'hidden',
              position: 'relative',
              p: { xs: '32px 24px', md: '64px 56px', lg: '120px 80px' },
            }}
          >
            <Box
              alt="Pulse"
              component="img"
              src="/assets/pulse.svg"
              sx={{
                top: 0,
                height: 'auto',
                right: 0,
                position: 'absolute',
                width: '900px',
                zIndex: 0,
                transform: 'scaleX(-1)',
              }}
            />
            <Stack spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
              <Stack spacing={1}>
                <Typography variant="h3">Document Discovery Platform</Typography>
                <Typography>Navigate the Information: Discover, Access, and Utilize Documents with Ease</Typography>
              </Stack>
              <Card>
                <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-end', flexWrap: 'wrap', p: 3 }}>
                  <FormControl sx={{ maxWidth: '100%', width: '240px' }}>
                    <InputLabel>Search</InputLabel>
                    <OutlinedInput
                      onChange={($event) => handleSearchKeywords($event)}
                      fullWidth
                      name="query"
                      placeholder="Keywords"
                      required
                    />
                  </FormControl>
                  <FormControl sx={{ maxWidth: '100%', width: '240px' }}>
                    <InputLabel>Town</InputLabel>
                    <Select
                      required={true}
                      value={selectedTown.city}
                      onChange={($event) => handleSelect($event)}
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

                  <Button
                    disabled={isLoading}
                    onClick={getDocuments}
                    startIcon={<MagnifyingGlassIcon />}
                    variant="contained"
                    color="primary"
                  >
                    Search
                  </Button>
                </Stack>
              </Card>
            </Stack>
          </Box>

          <Stack spacing={4}>
            {documents && <Typography variant="h6">Results ({documents.length}) </Typography>}
            <Grid container spacing={4}>
              {documents &&
                documents.map((doc) => (
                  <Grid key={doc.fileName} md={4} xs={12}>
                    <DocumentCard document={doc} />
                  </Grid>
                ))}
            </Grid>
          </Stack>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
