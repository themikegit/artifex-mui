import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';

export function Summary({ data }) {
  console.log(data);
  const friendlyNameMapping = {
    last_3_years: 'Last 3 Years',
    '3_to_9_years': '3 to 9 Years',
    '9_to_24_years': '9 to 24 Years',
    '24_to_60_years': '24 to 60 Years',
    more_than_60_years: 'More than 60 Years',
  };
  const transformed = Object.keys(data).map((key) => {
    return {
      value: data[key],
      key: key,
      label: friendlyNameMapping[key],
    };
  });
  return (
    <Card>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' },
          p: 3,
        }}
      >
        {/* start one */}

        {transformed.map((t) => (
          <Stack
            spacing={1}
            sx={{
              borderRight: { xs: 'none', md: '1px solid var(--mui-palette-divider)' },
              borderBottom: { xs: '1px solid var(--mui-palette-divider)', md: 'none' },
              pb: { xs: 2, md: 0 },
            }}
          >
            <Typography color="text.secondary"> {t.label} </Typography>
            <Typography variant="h3"> {t.value} </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              {/* <TrendUpIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
              <Typography color="text.secondary" variant="body2">
                <Typography color="success.main" component="span" variant="subtitle2">
                  {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(15 / 100)}
                </Typography>{' '}
                increase vs last month
              </Typography> */}
            </Stack>
          </Stack>
        ))}

        {/* end one */}
      </Box>
    </Card>
  );
}
