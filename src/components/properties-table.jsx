'use client';

import * as React from 'react';
import { TableContainer } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';
import { XCircle as XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';

import { paths } from '@/paths';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

const columns = [
  { field: 'city', name: 'City', width: '90px' },
  { field: 'state', name: 'State', width: '90px' },
  { field: 'street_address', name: 'Street Address', width: '90px' },
  { field: 'year_built', name: 'Year Built', width: '50px' },
  {
    formatter(row) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.total_assessment);
    },
    name: 'Total Assessment',
    width: '100px',
  },
  {
    formatter: (row) => {
      let icon;
      row.voter_residence_flag === 'True'
        ? (icon = <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />)
        : (icon = <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" />);
      return icon;
    },
    name: 'Voter Residence',
    width: '100px',
  },
];

export function PropertiesTable({ rows = [] }) {
  return (
    <React.Fragment>
      <TableContainer sx={{ maxHeight: 540 }}>
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
