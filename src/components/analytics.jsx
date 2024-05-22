import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LinearProgress, Skeleton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { CalendarBlank as CalendarIcon } from '@phosphor-icons/react/dist/ssr/CalendarBlank';
import { House as HouseIcon } from '@phosphor-icons/react/dist/ssr/House';
import { Tag as TagIcon } from '@phosphor-icons/react/dist/ssr/Tag';
import bbox from '@turf/bbox';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { paths } from '@/paths';
import { GenDataContext } from '@/contexts/generic-data';
import { RouterLink } from '@/components/core/link';
import { CounterWidget } from '@/components/counter-widget';
import { DonutChart } from '@/components/devices';
import { Summary } from '@/components/summary';
import { TaxesChart } from '@/components/taxes-chart';
import { VoterBreakdownChart } from '@/components/voter-breakdown-chart';

import { PropertiesTable } from './properties-table';
import { PropertyDistributionChart } from './property-distribution-chart';
import { ZoningCasesTable } from './zoning-cases-table';

const metadata = { title: `Analytics | Dashboard | ${config.site.name}` };

export function BoundaryAnalytics() {
  const baseUrl = import.meta.env.VITE_SERVER_HOST;
  const { mapCoor } = React.useContext(GenDataContext);
  const [properties, setProperties] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [taxes, setTaxes] = useState(null);
  const [yearsBuilt, setYearsBuilt] = useState(null);
  const [avgAssessment, setAvgAssessment] = useState(null);
  const [avgAge, setAvgAge] = useState(null);
  const [voterBreakdown, setvoterBreakdown] = useState();
  const [avgAssessmentComparasion, setavgAssessmentComparasion] = useState(null);
  const [cumulativeAssessmentBreakDown, setcumulativeAssessmentBreakDown] = useState(null);
  const [lotRatio, setlotRatio] = useState(null);
  const [propertiesType, setpropertiesType] = useState(null);
  const [zoningCases, setzoningCases] = useState(null);

  const [type, setType] = useState('analytics');

  useEffect(() => {
    const [west, south, east, north] = bbox(mapCoor);
    const fetchData = async () => {
      try {
        const [boundProperties, boundTaxes, boundYearBuilt] = await Promise.all([
          fetch(`${baseUrl}properties/?north=${north}&south=${south}&east=${east}&west=${west}`),
          fetch(`${baseUrl}tax-within-bounds/?north=${north}&south=${south}&east=${east}&west=${west}`),
          fetch(`${baseUrl}year-built-boundaries/?north=${north}&south=${south}&east=${east}&west=${west}`),
        ]);
        const propertiesData = await boundProperties.json();
        const taxesData = await boundTaxes.json();
        const yearsBuiltData = await boundYearBuilt.json();

        setProperties(propertiesData);
        setTaxes(taxesData);
        setYearsBuilt(yearsBuiltData);

        resolveAvgAssessment(propertiesData);
        resolveVoterBreakDown(propertiesData);
        calculateAverageAge(propertiesData);

        resolveAvgAssessmentComparasion();
        resolveLotRatio(propertiesData.results);
        resolvePropertyTypes(propertiesData.results);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const resolveAvgAssessment = (propertiesData) => {
    const totalVal = propertiesData.results.reduce((total, property) => {
      return total + (Number(property.total_assessment) || 0);
    }, 0);

    const avg = totalVal / propertiesData.results.length;
    setAvgAssessment(avg);
  };

  const voterProperties = [];
  const nonVoterProperties = [];
  const resolveVoterBreakDown = (propertiesData) => {
    propertiesData.results.forEach((property) => {
      if (property.voter_residence_flag === 'True') {
        voterProperties.push(property);
      }
      if (property.voter_residence_flag === 'False') {
        nonVoterProperties.push(property);
      }
    });
    setvoterBreakdown([
      { name: 'Primary', value: voterProperties.length },
      { name: 'Non-Primary', value: nonVoterProperties.length },
    ]);
  };

  const handleChange = (event, type) => {
    setType(type);
    getZoningCases();
  };

  const calculateAverageAge = (propertiesData) => {
    const filteredData = propertiesData.results.filter((obj) => obj.year_built !== 0);
    const currentYear = new Date().getFullYear();
    const sumOfAges = filteredData.reduce((acc, obj) => acc + (currentYear - obj.year_built), 0);
    const averageAge = sumOfAges / filteredData.length;
    setAvgAge(averageAge);
  };

  const resolveAvgAssessmentComparasion = () => {
    let cumulativeNonVoterAssessment = nonVoterProperties.reduce((total, property) => {
      return total + (Number(property.total_assessment) || 0);
    }, 0);

    let cumulativeVoterAssessment = voterProperties.reduce((total, property) => {
      return total + (Number(property.total_assessment) || 0);
    }, 0);

    let cumulativeAssessment = cumulativeVoterAssessment + cumulativeNonVoterAssessment;

    let averageNonVoterAssessment =
      nonVoterProperties.length > 0 ? cumulativeNonVoterAssessment / nonVoterProperties.length : 0;

    let averageVoterAssessment = voterProperties.length > 0 ? cumulativeVoterAssessment / voterProperties.length : 0;
    let percentageVoter = (cumulativeVoterAssessment / cumulativeAssessment) * 100;
    let percentageNonVoter = (cumulativeNonVoterAssessment / cumulativeAssessment) * 100;

    setavgAssessmentComparasion([
      { name: 'Primary', value: averageVoterAssessment, color: 'var(--mui-palette-secondary-main)' },
      { name: 'Non-Primary', value: averageNonVoterAssessment, color: 'var(--mui-palette-primary-dark)' },
    ]);

    setcumulativeAssessmentBreakDown([
      { name: 'Primary', value: percentageVoter, color: 'var(--mui-palette-primary-main)' },
      { name: 'Non-Primary', value: percentageNonVoter, color: 'var(--mui-palette-warning-main)' },
    ]);
  };

  const resolveLotRatio = (propertiesArray) => {
    // Sum of all lot_sqfts
    let totalLotSqft = propertiesArray.reduce((total, property) => {
      return total + (Number(property.lot_sqft) || 0);
    }, 0);

    // Sum of lot_sqfts for non-voter properties
    let nonVoterLotSqft = propertiesArray
      .filter((property) => property.voter_residence_flag === 'False')
      .reduce((total, property) => {
        return total + (Number(property.lot_sqft) || 0);
      }, 0);

    // Sum of lot_sqfts for voter properties
    let voterLotSqft = propertiesArray
      .filter((property) => property.voter_residence_flag === 'True')
      .reduce((total, property) => {
        return total + (Number(property.lot_sqft) || 0);
      }, 0);

    // Calculating the ratio of lot_sqft for voters and non-voters to the total
    let voterLotRatio = totalLotSqft > 0 ? voterLotSqft / totalLotSqft : 0;
    let nonvoterLotRatio = totalLotSqft > 0 ? nonVoterLotSqft / totalLotSqft : 0;

    let voterLotRatioPercent = voterLotRatio * 100;
    let nonvoterLotRatioPercent = nonvoterLotRatio * 100;
    setlotRatio([
      { name: 'Primary', value: voterLotRatioPercent, color: 'var(--mui-palette-primary-main)' },
      { name: 'Non-Primary', value: nonvoterLotRatioPercent, color: 'var(--mui-palette-warning-main)' },
    ]);
  };

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const resolvePropertyTypes = (propertiesArray) => {
    const propertyTypeCounts = {};

    propertiesArray.forEach((obj) => {
      const { property_type } = obj;
      propertyTypeCounts[property_type] = (propertyTypeCounts[property_type] || 0) + 1;
    });

    const propertyTypeArray = Object.entries(propertyTypeCounts).map(([name, value]) => {
      return { name, value, color: generateRandomColor() };
    });

    setpropertiesType(propertyTypeArray);
  };

  const getZoningCases = () => {
    console.log(properties);
    let propertyIds = properties.results.map((p) => p.property_id);
    console.log(propertyIds);
    let postData = {
      property_ids: propertyIds,
    };

    fetch(`${baseUrl}zoning-cases-bounds/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        setzoningCases(data.zoning_cases);
      })
      .catch((err) => console.error('Error fetching property zoning cases:', err));
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
        }}
        style={{ width: '75vw', padding: '25px' }}
      >
        <Stack sx={{ marginTop: '40px' }}>
          <Skeleton variant="rounded" width={200} height={30} />
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          sx={{ justifyContent: 'space-between', marginTop: '15px' }}
        >
          <Skeleton variant="rounded" width={430} height={120} />
          <Skeleton variant="rounded" width={430} height={120} />
          <Skeleton variant="rounded" width={430} height={120} />
        </Stack>

        <Stack sx={{ marginTop: '25px' }} spacing={3}>
          <Skeleton variant="text" sx={{ fontSize: '8rem' }} />
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          sx={{ justifyContent: 'space-between', marginTop: '35px' }}
        >
          <Skeleton variant="rounded" width={430} height={120} />
          <Skeleton variant="rounded" width={430} height={120} />
          <Skeleton variant="rounded" width={430} height={120} />
          <Skeleton variant="rounded" width={430} height={120} />
        </Stack>

        <Stack sx={{ marginTop: '25px' }} spacing={3}>
          <Skeleton variant="text" sx={{ fontSize: '10rem' }} />
        </Stack>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box
        style={{ width: '75vw', padding: '25px', marginTop: '20px' }}
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
        }}
      >
        <Stack spacing={2}>
          {/* <div>
            <Link
              color="text.primary"
              component={RouterLink}
              href={paths.dashboard.assessment.main}
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              Map
            </Link>
          </div> */}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto', marginBottom: '25px' }}>
              <Typography variant="h4">Boundary Analytics</Typography>
            </Box>
            <ToggleButtonGroup color="primary" value={type} exclusive onChange={handleChange} aria-label="Platform">
              <ToggleButton value="analytics">
                {' '}
                <Typography variant="subtitle2">Analytics</Typography>
              </ToggleButton>
              <ToggleButton value="zoning">
                {' '}
                <Typography variant="subtitle2">Zoning Cases</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
            {/* <div>
              <Button startIcon={<PlusIcon />} variant="contained">
                Save Boundary
              </Button>
            </div> */}
          </Stack>
          {type === 'analytics' && (
            <Grid container spacing={4}>
              {properties && (
                <Grid md={4} xs={12}>
                  {properties && (
                    <CounterWidget
                      amount={properties.count}
                      diff={15}
                      icon={HouseIcon}
                      title="Total properties"
                      trend="down"
                    />
                  )}
                </Grid>
              )}

              <Grid md={4} xs={12}>
                {avgAssessment && (
                  <CounterWidget
                    amount={avgAssessment}
                    currency={true}
                    diff={5}
                    icon={TagIcon}
                    title="Average Assessment"
                    trend="down"
                  />
                )}
              </Grid>
              <Grid md={4} xs={12}>
                {avgAge && (
                  <CounterWidget
                    amount={Math.floor(avgAge)}
                    diff={5}
                    icon={CalendarIcon}
                    title="Average Age"
                    trend="down"
                  />
                )}
              </Grid>
              <Grid xs={12}>{yearsBuilt && <Summary data={yearsBuilt} />}</Grid>
              <Grid lg={3} xs={6}>
                {avgAssessmentComparasion && (
                  <DonutChart currency={true} title="Average Assessment Comparasion" data={avgAssessmentComparasion} />
                )}
              </Grid>
              <Grid lg={3} xs={6}>
                {cumulativeAssessmentBreakDown && (
                  <DonutChart title="Cumulative Assessment Breakdown" data={cumulativeAssessmentBreakDown} />
                )}
              </Grid>
              <Grid lg={3} xs={6}>
                {lotRatio && <DonutChart title="Residence Type Land Utilization" data={lotRatio} />}
              </Grid>
              <Grid lg={3} xs={6}>
                {propertiesType && (
                  <PropertyDistributionChart title="Property Type Distribution" data={propertiesType} />
                )}
              </Grid>
              <Grid lg={6} xs={12}>
                <TaxesChart data={taxes} />
              </Grid>
              <Grid lg={6} xs={12}>
                {voterBreakdown && <VoterBreakdownChart data={voterBreakdown} />}
              </Grid>

              <Grid lg={12} xs={12}>
                {properties && <PropertiesTable rows={properties.results} />}
              </Grid>
            </Grid>
          )}

          {type === 'zoning' && zoningCases && <ZoningCasesTable rows={zoningCases}></ZoningCasesTable>}
        </Stack>
      </Box>
    </React.Fragment>
  );
}
