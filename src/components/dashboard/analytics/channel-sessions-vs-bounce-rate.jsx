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
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { ShareNetwork as ShareNetworkIcon } from '@phosphor-icons/react/dist/ssr/ShareNetwork';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export function ChannelSessionsVsBounce({ data }) {
  const chartHeight = 300;

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
            <ShareNetworkIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Total Assessment by year"
      />
      <CardContent>
        <Stack divider={<Divider />} spacing={3}>
          <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
            <ResponsiveContainer height={chartHeight}>
              <BarChart barGap={12} data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="2 4" vertical={false} />
                <XAxis axisLine={false} dataKey="tax_year" tickLine={false} type="category" />
                <YAxis />

                <Bar
                  animationDuration={300}
                  barSize={24}
                  dataKey="total_assessment"
                  fill="var(--mui-palette-primary-main)"
                  key="tax_year"
                  name="tax_year"
                  radius={[5, 5, 0, 0]}
                />

                <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
              </BarChart>
            </ResponsiveContainer>
          </NoSsr>
          {/* <Stack direction="row" spacing={2}>
            {data.map((bar) => (
              <Stack direction="row" key={bar.name} spacing={1} sx={{ alignItems: 'center' }}>
                <Box
                  sx={{ bgcolor: 'var(--mui-palette-primary-main)', borderRadius: '2px', height: '4px', width: '16px' }}
                />
                <Typography color="text.secondary" variant="caption">
                  {bar.name}
                </Typography>
              </Stack>
            ))}
          </Stack> */}
        </Stack>
      </CardContent>
    </Card>
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
