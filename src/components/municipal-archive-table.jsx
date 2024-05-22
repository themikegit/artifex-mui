'use client';

import * as React from 'react';
import { TableContainer } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { DotsThreeCircle as DotsThreeCircleIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeCircle';
import { FileArrowDown as FileArrowDownIcon } from '@phosphor-icons/react/dist/ssr/FileArrowDown';

import { paths } from '@/paths';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

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
      <IconButton component={RouterLink} href={row.s3_pdfpath}>
        <FileArrowDownIcon />
      </IconButton>
    ),
    name: 'Download',
    hideName: true,
    width: '40px',
    align: 'left',
  },

  {
    formatter: (row) => (
      <IconButton component={RouterLink} href={paths.dashboard.municipalArchive.details(row.id)}>
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
