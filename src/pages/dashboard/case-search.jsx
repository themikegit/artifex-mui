import React, { useState } from 'react';
import { Button, Card, FormControl, InputLabel, OutlinedInput, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { Option } from '@/components/core/option';
import { CourseCard } from '@/components/dashboard/academy/course-card';
import { CoursesFilters } from '@/components/dashboard/academy/courses-filters';
import { DailyProgress } from '@/components/dashboard/academy/daily-progress';
import { Help } from '@/components/dashboard/academy/help';

const metadata = { title: `Case Search  | ${config.site.name}` };

export function Page() {
  const baseUrl = import.meta.env.VITE_SERVER_HOST;
  const [documents, setDocuments] = useState(null);
  const [selectedTown, setselectedTown] = useState(null);
  const [serchKeywords, setserchKeywords] = useState(null);

  const cities = [{ city: 'boston', state: 'ma', country: 'usa', label: 'Boston, MA' }];

  const handleSelect = (event) => {
    const st = locations.find((l) => l.city === event.target.value);
    setselectedTown(st);
  };
  const handleSearchKeywords = ($event) => {
    setserchKeywords($event.target.value);
  };

  const getDocuments = () => {
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
                <Typography variant="h3">Search for town cases</Typography>
                <Typography>Learn from the large database of town assets</Typography>
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
                    />
                  </FormControl>
                  <FormControl sx={{ maxWidth: '100%', width: '240px' }}>
                    <InputLabel>Town</InputLabel>
                    <Select onChange={($event) => handleSelect($event)} defaultValue="" fullWidth name="category">
                      {cities.map((l, index) => (
                        <Option key={index} value={`${l.city}`}>
                          {l.label}
                        </Option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ maxWidth: '100%', width: '240px' }}>
                    <InputLabel>Type</InputLabel>
                    <Select defaultValue="" fullWidth name="category">
                      <Option value="all">All Available Meetings</Option>
                      <Option value="zoning">Zoning Board of Approvals</Option>
                    </Select>
                  </FormControl>

                  <Button onClick={getDocuments} startIcon={<MagnifyingGlassIcon />} variant="contained">
                    Search
                  </Button>
                </Stack>
              </Card>
            </Stack>
          </Box>
          {/* <Stack spacing={1}>
            <Typography variant="h6">Welcome back, Sofia</Typography>
            <Typography color="text.secondary" variant="body2">
              Nice progress so far, keep it up!
            </Typography>
          </Stack> */}
          {/* <Grid container spacing={4}>
            <Grid md={8} xs={12}>
              <DailyProgress timeCurrent={20} timeGoal={35} />
            </Grid>
            <Grid md={4} xs={12}>
              <Help />
            </Grid>
          </Grid> */}
          <Stack spacing={4}>
            <Typography variant="h6">Results</Typography>
            <Grid container spacing={4}>
              {documents &&
                documents.map((doc) => (
                  <Grid key={doc.fileName} md={4} xs={12}>
                    <CourseCard document={doc} />
                  </Grid>
                ))}
            </Grid>
          </Stack>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
