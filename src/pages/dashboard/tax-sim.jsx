import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { CounterWidget } from '@/components/dashboard/overview/counter-widget';

export function TaxSim({ onClose }) {
  const baseUrl = import.meta.env.VITE_SERVER_HOST;
  const [selectedTown, setselectedTown] = useState('watertown');
  const [selectedFeature, setselectedFeature] = useState('over_65');
  const [selectedTax, setselectedTax] = useState();
  const [tax, setTax] = useState({
    totalAssessment: 0,
    totAssAfterTaxImpact: 0,
    taxesFromFeature: 0,
    taxFeatAfterTaxImpact: 0,
    taxImpact: 0,
  });
  const calculateTax = () => {
    fetch(`${baseUrl}tax-sim-tool/?city=${selectedTown}&feature=${selectedFeature}`)
      .then((response) => response.json())
      .then((data) => {
        let taxImpactNum = data.total_assessment * (selectedTax / 100);

        setTax({
          totalAssessment: data.total_assessment,
          totAssAfterTaxImpact: tax.totalAssessment + taxImpactNum,
          taxesFromFeature: data.total_assessment_over_65,
          taxFeatAfterTaxImpact: data.total_assessment_over_65 + taxImpactNum,
          taxImpact: taxImpactNum,
        });
      })
      .catch((err) => console.error('Error fetching GeoJSON data: ', err));
  };
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', display: 'flex' }}>
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography variant="h6">Tax sim tool</Typography>
        </Box>

        <IconButton onClick={onClose}>
          <XIcon />
        </IconButton>
      </Stack>

      <Grid container sx={{ p: 2 }} spacing={2}>
        <Grid item xs={4}>
          <InputLabel id="town">Town</InputLabel>
          <Select
            sx={{ width: '100%' }}
            labelId="town"
            id="demo-simple-select"
            value={'watertown'}
            label="Age"
            onChange={() => {}}
          >
            <MenuItem value={'watertown'}>Watertown</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel id="feature">Feature</InputLabel>
          <Select
            sx={{ width: '100%' }}
            labelId="feature"
            id="demo-simple-select"
            value={'65s'}
            label="Age"
            onChange={() => {}}
          >
            <MenuItem value={'65s'}>Over 65s</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel id="tax">Tax Change Amount</InputLabel>
          <OutlinedInput
            fullWidth={true}
            onChange={(event) => setselectedTax(event.target.value)}
            id="tax"
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        </Grid>
      </Grid>

      <Grid sx={{ p: 2 }} container spacing={2}>
        <Grid item md={4} xs={12}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                <div>
                  <Typography sx={{ pb: 1 }} color="text.secondary" variant="body1">
                    Total Assessment
                  </Typography>

                  <Typography variant="h5">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tax.totalAssessment)}
                    {/* {currency
                ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
                : new Intl.NumberFormat('en-US').format(amount)} */}
                  </Typography>
                </div>
              </Stack>
            </CardContent>
            <Divider />
            <Box sx={{ p: '16px' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography color="text.secondary" variant="body2">
                  After tax impact:{' '}
                </Typography>

                <Box
                  sx={{
                    alignItems: 'center',
                    color:
                      tax.totAssAfterTaxImpact > 0
                        ? 'var(--mui-palette-success-main)'
                        : 'var(--mui-palette-error-main)',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {/* {tax.totAssAfterTaxImpact > 0 ? (
                    <TrendUpIcon fontSize="var(--icon-fontSize-md)" />
                  ) : (
                    <TrendDownIcon fontSize="var(--icon-fontSize-md)" />
                  )} */}
                </Box>
                <Typography color="text.secondary" variant="body2">
                  <Typography
                    color={tax.totAssAfterTaxImpact > 0 ? 'success.main' : 'error.main'}
                    component="span"
                    variant="subtitle2"
                  >
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                      tax.totAssAfterTaxImpact
                    )}
                  </Typography>{' '}
                </Typography>
              </Stack>
            </Box>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                <div>
                  <Typography sx={{ pb: 1 }} color="text.secondary" variant="body1">
                    Taxes from over 65s
                  </Typography>

                  <Typography variant="h5">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                      tax.taxesFromFeature
                    )}
                    {/* {currency
                ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
                : new Intl.NumberFormat('en-US').format(amount)} */}
                  </Typography>
                </div>
              </Stack>
            </CardContent>
            <Divider />
            <Box sx={{ p: '16px' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography color="text.secondary" variant="body2">
                  After tax impact:{' '}
                </Typography>

                <Box
                  sx={{
                    alignItems: 'center',
                    color:
                      tax.taxFeatAfterTaxImpact > 0
                        ? 'var(--mui-palette-success-main)'
                        : 'var(--mui-palette-error-main)',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {/* {tax.taxFeatAfterTaxImpact > 0 ? (
                    <TrendUpIcon fontSize="var(--icon-fontSize-md)" />
                  ) : (
                    <TrendDownIcon fontSize="var(--icon-fontSize-md)" />
                  )} */}
                </Box>
                <Typography color="text.secondary" variant="body2">
                  <Typography
                    color={tax.taxFeatAfterTaxImpact > 0 ? 'success.main' : 'error.main'}
                    component="span"
                    variant="subtitle2"
                  >
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                      tax.taxFeatAfterTaxImpact
                    )}
                  </Typography>{' '}
                </Typography>
              </Stack>
            </Box>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                <div>
                  <Typography sx={{ pb: 1 }} color="text.secondary" variant="body1">
                    Tax Impact
                  </Typography>

                  <Typography variant="h5">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tax.taxImpact)}
                    {/* {currency
                ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
                : new Intl.NumberFormat('en-US').format(amount)} */}
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Button onClick={calculateTax} fullWidth={true} type="submit" variant="contained">
        Calculate
      </Button>
    </>
  );
}
