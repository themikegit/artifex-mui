'use client';

import * as React from 'react';
import { Divider, TableContainer, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { display } from '@mui/system';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { DotsThreeCircle as DotsThreeCircleIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeCircle';
import { Minus as MinusIcon } from '@phosphor-icons/react/dist/ssr/Minus';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

import { useCustomersSelection } from './dashboard/customer/customers-selection-context';

const columns = [
  {
    name: 'Case number',
    width: '140px',
    align: 'left',
    field: 'case_number',
  },
  {
    name: 'City',
    width: '75px',
    align: 'left',
    field: 'city',
  },
  {
    name: 'Address',
    width: '75px',
    align: 'left',
    field: 'full_addr',
  },

  {
    name: 'Date',
    width: '75px',
    align: 'left',
    field: 'meeting_date',
  },

  {
    name: 'Meeting type',
    width: '125px',
    align: 'left',
    field: 'meeting_type',
  },
  {
    name: 'Owner',
    width: '75px',
    align: 'left',
    field: 'owner',
  },

  {
    formatter: (row) => (
      <Box sx={{ height: '90px', overflow: 'scroll' }}>
        {row.representatives.map((rep) => (
          <>
            <Typography color="text.primary" noWrap variant="body1">
              {rep.representative_name}
            </Typography>

            <Typography color="text.secondary" noWrap variant="body2">
              {rep.representative_role}
            </Typography>
            <Divider />
          </>
        ))}
      </Box>
    ),

    name: 'Reperesentives',
    width: '75px',
    align: 'left',
    field: 'representatives',
  },
  {
    formatter: (row) => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '200px' }}>
        {row.variances_and_regulations.map((vr) => (
          <Chip sx={{ m: 1 }} label={vr} color="secondary" />
        ))}
      </Box>
    ),
    name: 'Variances & Regulations',
    width: '75px',
    align: 'left',
    field: 'variances_and_regulations',
  },
  {
    formatter: (row) => (
      <Tooltip title={row.summary}>
        <Typography sx={{ width: '170px' }} color="text.secondary" noWrap variant="body2">
          {row.summary}
        </Typography>
      </Tooltip>
    ),
    name: 'Summary',
    width: '75px',
    align: 'left',
    field: 'summary',
  },
  {
    formatter: (row) =>
      row.topic.map((t) => (
        <Typography color="text.secondary" variant="body2">
          {t}
        </Typography>
      )),
    name: 'Topics',
    width: '200px',
    align: 'left',
    field: 'topic',
  },

  {
    formatter: (row) => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '200px' }}>
        {row.zoning_district.map((zd) => (
          <Chip sx={{ m: 1 }} label={zd} color="primary" />
        ))}
      </Box>
    ),
    name: 'Zoning District',
    align: 'left',
    field: 'zoning_district',
  },
];

export function ZoningCasesTable({ rows }) {
  console.log(rows);
  return (
    <React.Fragment>
      <TableContainer sx={{ maxHeight: 740 }}>
        <DataTable stickyHeader columns={columns} rows={rows} />
        {!rows.length ? (
          <Box sx={{ p: 3 }}>
            <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
              No cases found
            </Typography>
          </Box>
        ) : null}
      </TableContainer>
    </React.Fragment>
  );
}
