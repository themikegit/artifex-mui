'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';
import { Chart2 } from '@/components/widgets/charts/chart-2';

const data = [
  { name: 'Jan', value: 10 },
  { name: 'Feb', value: 5 },
  { name: 'Mar', value: 11 },
  { name: 'Apr', value: 20 },
  { name: 'May', value: 13 },
  { name: 'Jun', value: 28 },
  { name: 'Jul', value: 18 },
  { name: 'Aug', value: 4 },
  { name: 'Sep', value: 13 },
  { name: 'Oct', value: 12 },
  { name: 'Nov', value: 13 },
  { name: 'Dec', value: 5 },
  { name: 'Jan', value: 10 },
];

const bars = [
  { name: 'This year', dataKey: 'v1', color: 'var(--mui-palette-primary-400)' },
  { name: 'Last year', dataKey: 'v2', color: 'var(--mui-palette-primary-600)' },
];

export function SalesPriceAanalysis() {
  const color = 'var(--mui-palette-primary-main)';
  const chartHeight = 240;

  return (
    <Card>
      <CardHeader title="Sales Price Analysis" />
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <Stack spacing={3} sx={{ flex: '0 0 auto', justifyContent: 'space-between', width: '240px' }}>
            <Stack spacing={2}>
              <Typography color="success.main" variant="h2">
                +28%
              </Typography>
              <Typography color="text.secondary">increase in sales price comaparing to state average</Typography>
            </Stack>
            <div>
              <Typography color="text.secondary" variant="body2">
                {/* <Typography color="primary.main" component="span" variant="subtitle2">
                  This year
                </Typography>{' '}
                is forecasted to increase in your traffic by the end of the current month */}
              </Typography>
            </div>
          </Stack>
          <Stack divider={<Divider />} spacing={2} sx={{ flex: '1 1 auto' }}>
            <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
              <ResponsiveContainer height={chartHeight} width="100%">
                <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="area-performance" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor={color} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" vertical={false} />
                  <XAxis axisLine={false} dataKey="name" tickLine={false} type="category" />
                  <YAxis axisLine={false} domain={[0, 30]} tickLine={false} type="number" />
                  <Area
                    animationDuration={300}
                    dataKey="value"
                    dot={<Dot />}
                    fill="url(#area-performance)"
                    fillOpacity={1}
                    name="Performance"
                    stroke={color}
                    strokeWidth={3}
                    type="natural"
                  />
                  <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
                </AreaChart>
              </ResponsiveContainer>
            </NoSsr>
            {/* <Legend /> */}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

// function Legend() {
//   return (
//     <Stack direction="row" spacing={2}>
//       {bars.map((bar) => (
//         <Stack direction="row" key={bar.name} spacing={1} sx={{ alignItems: 'center' }}>
//           <Box sx={{ bgcolor: bar.color, borderRadius: '2px', height: '4px', width: '16px' }} />
//           <Typography color="text.secondary" variant="caption">
//             {bar.name}
//           </Typography>
//         </Stack>
//       ))}
//     </Stack>
//   );
// }

function Dot({ active, cx, cy, payload, stroke }) {
  if (active && payload?.name === active) {
    return <circle cx={cx} cy={cy} fill={stroke} r={6} />;
  }

  return null;
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
              <Box sx={{ bgcolor: entry.stroke, borderRadius: '2px', height: '8px', width: '8px' }} />
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
