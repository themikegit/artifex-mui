'use client';

import * as React from 'react';
import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Info as InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { Cell, Pie, PieChart } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export function PropertyDistributionChart({ data, title, currency = false, tooltip }) {
  const chartSize = 200;
  const chartTickness = 30;

  return (
    <Card>
      <CardHeader
        avatar={
          <Tooltip title={tooltip}>
            <InfoIcon fontSize="var(--Icon-fontSize)" />
          </Tooltip>
        }
        title={title}
      />
      <CardContent>
        <Stack divider={<Divider />} spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <NoSsr fallback={<Box sx={{ height: `${chartSize}px`, width: `${chartSize}px` }} />}>
              <PieChart height={chartSize} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} width={chartSize}>
                <Pie
                  animationDuration={300}
                  cx={chartSize / 2}
                  cy={chartSize / 2}
                  data={data}
                  dataKey="value"
                  innerRadius={chartSize / 2 - chartTickness}
                  nameKey="name"
                  outerRadius={chartSize / 2}
                  strokeWidth={0}
                >
                  {data.map((entry) => (
                    <Cell fill={entry.color} key={entry.name} />
                  ))}
                </Pie>
                <Tooltip animationDuration={50} content={<TooltipContent />} />
              </PieChart>
            </NoSsr>
          </Box>
          <Legend payload={{ data, currency }} />
        </Stack>
      </CardContent>
    </Card>
  );
}

function Legend({ payload, currency }) {
  console.log(payload);
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        height: '60px',
        overflow: 'scroll',
      }}
    >
      {payload?.data.map((entry) => (
        <div key={entry.name}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Box sx={{ bgcolor: entry.color, borderRadius: '2px', height: '4px', width: '16px' }} />
            <Typography variant="body2">{entry.name}</Typography>
          </Stack>
          <Typography variant="h5">{entry.value}</Typography>
        </div>
      ))}
    </Box>
  );
}

function TooltipContent({ active, payload }) {
  if (!active) {
    return null;
  }

  return (
    <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)', p: 1 }}>
      <Stack spacing={2}>
        {payload?.map((entry) => (
          <Stack direction="row" key={entry.name} spacing={3} sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
              <Box sx={{ bgcolor: entry.payload.fill, borderRadius: '2px', height: '8px', width: '8px' }} />
              <Typography sx={{ whiteSpace: 'nowrap' }}>{entry.name}</Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(entry.value / 100)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
