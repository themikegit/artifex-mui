'use client';

import * as React from 'react';
import { TableContainer } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { DotsThreeCircle as DotsThreeCircleIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeCircle';

import { paths } from '@/paths';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

const columns = [
  {
    name: 'Source',
    width: '85px',
    align: 'left',
    field: 'source',
  },
  {
    name: 'Address',
    width: '75px',
    align: 'left',
    field: 'address',
  },
  {
    name: 'Owner Information',
    width: '85px',
    align: 'left',
    field: 'owners',
  },

  {
    name: 'Date',
    width: '30px',
    align: 'left',
    field: 'meeting_date',
  },
  {
    //   formatter: (row) => {
    //     const mapping = {
    //       active: { label: 'Active', icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> },
    //       blocked: { label: 'Blocked', icon: <MinusIcon color="var(--mui-palette-error-main)" /> },
    //       pending: { label: 'Pending', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
    //     };
    //     const { label, icon } = mapping[row.status] ?? { label: 'Unknown', icon: null };

    //     return <Chip icon={icon} label={label} size="small" variant="outlined" />;
    //   },
    name: 'Topic',
    width: '70px',
    align: 'left',
    field: 'topics',
  },
  {
    name: 'Summary',
    width: '160px',
    align: 'left',
    field: 'case_summary',
  },
  // {
  //   name: 'Key Points',
  //   width: '100px',
  //   align: 'left',
  // },
  // {
  //   formatter: (row) => (
  //     <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
  //       <Avatar src={row.avatar} />{' '}
  //       <div>
  //         <Link
  //           color="inherit"
  //           component={RouterLink}
  //           href={paths.dashboard.customers.details('1')}
  //           sx={{ whiteSpace: 'nowrap' }}
  //           variant="subtitle2"
  //         >
  //           {row.name}
  //         </Link>
  //         <Typography color="text.secondary" variant="body2">
  //           {row.email}
  //         </Typography>
  //       </div>
  //     </Stack>
  //   ),
  //   name: 'Name',
  //   width: '250px',
  // },
  // {
  //   formatter: (row) => (
  //     <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
  //       <LinearProgress sx={{ flex: '1 1 auto' }} value={row.quota} variant="determinate" />
  //       <Typography color="text.secondary" variant="body2">
  //         {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(row.quota / 100)}
  //       </Typography>
  //     </Stack>
  //   ),
  //   name: 'Quota',
  //   width: '250px',
  // },
  // { field: 'phone', name: 'Phone number', width: '150px' },
  // {
  //   formatter(row) {
  //     return dayjs(row.createdAt).format('MMM D, YYYY h:mm A');
  //   },
  //   name: 'Created at',
  //   width: '200px',
  // },
  // {
  //   formatter: (row) => {
  //     const mapping = {
  //       active: { label: 'Active', icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> },
  //       blocked: { label: 'Blocked', icon: <MinusIcon color="var(--mui-palette-error-main)" /> },
  //       pending: { label: 'Pending', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
  //     };
  //     const { label, icon } = mapping[row.status] ?? { label: 'Unknown', icon: null };

  //     return <Chip icon={icon} label={label} size="small" variant="outlined" />;
  //   },
  //   name: 'Status',
  //   width: '150px',
  // },
  {
    formatter: (row) => (
      <IconButton component={RouterLink} href={paths.dashboard.leadGen.details(row.video_id)}>
        <DotsThreeCircleIcon />
      </IconButton>
    ),
    name: 'Actions',
    hideName: true,
    width: '40px',
    align: 'left',
  },
];

export function SepticTable({ rows }) {
  return (
    <React.Fragment>
      <TableContainer sx={{ maxHeight: 840 }}>
        <DataTable stickyHeader columns={columns} rows={rows} />
        {!rows.length ? (
          <Box sx={{ p: 3 }}>
            <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
              No products found
            </Typography>
          </Box>
        ) : null}
      </TableContainer>
    </React.Fragment>
  );
}
