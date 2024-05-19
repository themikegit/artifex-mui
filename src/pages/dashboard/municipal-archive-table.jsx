'use client';

import * as React from 'react';
import { TableContainer } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { DotsThreeCircle as DotsThreeCircleIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeCircle';
import { Minus as MinusIcon } from '@phosphor-icons/react/dist/ssr/Minus';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

import { useCustomersSelection } from '../../components/dashboard/customer/customers-selection-context';

const columns = [
  {
    name: 'File name',
    width: '200px',
    align: 'left',
    field: 'filename',
  },
  {
    name: 'Date',
    width: '75px',
    align: 'left',
    field: 'meeting_date',
  },
  {
    formatter: (row) => <Chip label={row.media_type} color="primary" />,
    name: 'Type',
    width: '20px',
    align: 'center',
    field: 'media_type',
  },

  {
    formatter: (row) => (
      <Typography sx={{ width: '170px' }} color="text.secondary" noWrap variant="body2">
        {row.summary}
      </Typography>
    ),
    name: 'Summary',
    width: '170px',
    align: 'left',
    field: 'summary',
  },

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

export function MunicipalArchiveTable({ rows }) {
  return (
    <React.Fragment>
      <TableContainer sx={{ maxHeight: 640 }}>
        <DataTable stickyHeader columns={columns} rows={rows} />
        {!rows.length ? (
          <Box sx={{ p: 3 }}>
            <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
              No documents found
            </Typography>
          </Box>
        ) : null}
      </TableContainer>
    </React.Fragment>
  );
}
