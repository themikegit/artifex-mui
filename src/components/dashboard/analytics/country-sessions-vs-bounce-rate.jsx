'use client';

import * as React from 'react';
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
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

// const bars = [
//   { name: 'Primary', dataKey: 'name', color: 'var(--mui-palette-primary-main)' },
//   { name: 'Non-Primary', dataKey: 'name', color: 'var(--mui-palette-primary-100)' },
// ];

export function CountrySessionsVsBounce({ data }) {
  const chartHeight = 90;
  console.log(data);

  return (
    <Card>
      <CardHeader
        action={
          <IconButton>
            <DotsThreeIcon weight="bold" />
          </IconButton>
        }
        avatar={
          <Avatar>
            <ChartPieIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Residence Breakdown"
      />
      <CardContent>
        <Stack>
          <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
            <ResponsiveContainer height={chartHeight}>
              <BarChart barGap={10} data={data} layout="vertical">
                <CartesianGrid horizontal={false} strokeDasharray="2 4" syncWithTicks />
                <XAxis axisLine={false} tickLine={false} type="number" />
                <YAxis axisLine={false} dataKey="name" tickLine={false} type="category" />
                <Bar
                  animationDuration={300}
                  barSize={12}
                  dataKey="value"
                  fill="var(--mui-palette-primary-main)"
                  key="name"
                  name="name"
                  radius={[5, 5, 5, 5]}
                />
                {/* {data.map((bar) => (
                  <Bar
                    animationDuration={300}
                    barSize={12}
                    dataKey="value"
                    fill="var(--mui-palette-primary-main)"
                    key={bar.name}
                    name={bar.name}
                    radius={[5, 5, 5, 5]}
                  />
                ))} */}
                <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
              </BarChart>
            </ResponsiveContainer>
          </NoSsr>
          <Legend />
        </Stack>
      </CardContent>
    </Card>
  );
}

// function Tick({ height, payload, width, x, y }) {
//   const { name, flag } = countries[payload?.value] ?? { name: 'Unknown', flag: '' };

//   return (
//     <foreignObject height={width} width={height} x={(x ?? 0) - 150} y={(y ?? 0) - 16}>
//       <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
//         <Box sx={{ height: '1rem', width: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <Box alt={name} component="img" src={flag} sx={{ height: 'auto', width: '100%' }} />
//         </Box>
//         <Typography noWrap variant="body2">
//           {name}
//         </Typography>
//       </Stack>
//     </foreignObject>
//   );
// }

function Legend() {
  return (
    <Stack direction="row" spacing={2}>
      {/* {bars.map((bar) => (
        <Stack direction="row" key={bar.name} spacing={1} sx={{ alignItems: 'center' }}>
          <Box sx={{ bgcolor: bar.color, borderRadius: '2px', height: '4px', width: '16px' }} />
          <Typography color="text.secondary" variant="caption">
            {bar.name}
          </Typography>
        </Stack>
      ))} */}
    </Stack>
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
              <Box sx={{ bgcolor: entry.fill, borderRadius: '2px', height: '8px', width: '8px' }} />
              <Typography sx={{ whiteSpace: 'nowrap' }}>{entry.name}</Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {new Intl.NumberFormat('en-US').format(entry.value)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
