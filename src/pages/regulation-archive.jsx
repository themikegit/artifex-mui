import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';

const metadata = { title: `List | Customers | Dashboard | ${config.site.name}` };

const customers = [
  {
    id: 'USR-005',
    name: 'Fran Perez',
    avatar: '/assets/avatar-5.png',
    email: 'fran.perez@domain.com',
    phone: '(815) 704-0045',
    quota: 50,
    status: 'active',
    createdAt: dayjs().subtract(1, 'hour').toDate(),
  },
  {
    id: 'USR-004',
    name: 'Penjani Inyene',
    avatar: '/assets/avatar-4.png',
    email: 'penjani.inyene@domain.com',
    phone: '(803) 937-8925',
    quota: 100,
    status: 'active',
    createdAt: dayjs().subtract(3, 'hour').toDate(),
  },
  {
    id: 'USR-003',
    name: 'Carson Darrin',
    avatar: '/assets/avatar-3.png',
    email: 'carson.darrin@domain.com',
    phone: '(715) 278-5041',
    quota: 10,
    status: 'blocked',
    createdAt: dayjs().subtract(1, 'hour').subtract(1, 'day').toDate(),
  },
  {
    id: 'USR-002',
    name: 'Siegbert Gottfried',
    avatar: '/assets/avatar-2.png',
    email: 'siegbert.gottfried@domain.com',
    phone: '(603) 766-0431',
    quota: 0,
    status: 'pending',
    createdAt: dayjs().subtract(7, 'hour').subtract(1, 'day').toDate(),
  },
  {
    id: 'USR-001',
    name: 'Miron Vitold',
    avatar: '/assets/avatar-1.png',
    email: 'miron.vitold@domain.com',
    phone: '(425) 434-5535',
    quota: 50,
    status: 'active',
    createdAt: dayjs().subtract(2, 'hour').subtract(2, 'day').toDate(),
  },
];

export function Page() {
  const { email, phone, sortDir, status } = useExtractSearchParams();
  const sortedCustomers = applySort(customers, sortDir);
  const filteredCustomers = applyFilters(sortedCustomers, { email, phone, status });

  const baseUrl = import.meta.env.VITE_SERVER_HOST;
  const [septicLead, setsepticLeads] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}septic-leads/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const transfromed = data.results.map((o) => ({ ...o.fields }));
        setsepticLeads(transfromed);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  // const getSepticLead = () => {
  //   fetch(`${baseUrl}septic-leads/`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setsepticLeads(data);
  //     })
  //     .catch((error) => {
  //       console.error('There was a problem with the fetch operation:', error);
  //     });
  // };

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={4}>
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">Customers</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button startIcon={<PlusIcon />} variant="contained">
                Add
              </Button>
            </Box>
          </Stack> */}
        </Stack>
      </Box>
    </React.Fragment>
  );
}

function useExtractSearchParams() {
  const [searchParams] = useSearchParams();

  return {
    email: searchParams.get('email') || undefined,
    phone: searchParams.get('phone') || undefined,
    sortDir: searchParams.get('sortDir') || undefined,
    status: searchParams.get('status') || undefined,
  };
}

// Sorting and filtering has to be done on the server.

function applySort(row, sortDir) {
  return row.sort((a, b) => {
    if (sortDir === 'asc') {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }

    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

function applyFilters(row, { email, phone, status }) {
  return row.filter((item) => {
    if (email) {
      if (!item.email?.toLowerCase().includes(email.toLowerCase())) {
        return false;
      }
    }

    if (phone) {
      if (!item.phone?.toLowerCase().includes(phone.toLowerCase())) {
        return false;
      }
    }

    if (status) {
      if (item.status !== status) {
        return false;
      }
    }

    return true;
  });
}
