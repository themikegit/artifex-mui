import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Briefcase as BriefcaseIcon } from '@phosphor-icons/react/dist/ssr/Briefcase';
import { FileCode as FileCodeIcon } from '@phosphor-icons/react/dist/ssr/FileCode';
import { House as HouseIcon } from '@phosphor-icons/react/dist/ssr/House';
import { Info as InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { Key as KeyIcon } from '@phosphor-icons/react/dist/ssr/Key';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { AppLimits } from '@/components/dashboard/overview/app-limits';
import { ArticlesGrid } from '@/components/dashboard/overview/articles-grid';
import { CounterWidget } from '@/components/dashboard/overview/counter-widget';
import { Events } from '@/components/dashboard/overview/events';
import { HelperWidget } from '@/components/dashboard/overview/helper-widget';
import { NewsList } from '@/components/dashboard/overview/news-list';
import { SalesPriceAanalysis } from '@/components/dashboard/overview/sales-price-analysis';

const metadata = { title: `Overview | Dashboard | ${config.site.name}` };

export function Page() {
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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">Mashpee, MA</Typography>
            </Box>
            {/* <div>
              <Button startIcon={<PlusIcon />} variant="contained">
                Dashboard
              </Button>
            </div> */}
          </Stack>
          <Grid container spacing={4}>
            <Grid md={4} xs={12}>
              <CounterWidget amount={31} diff={15} icon={HouseIcon} title="Homes listed" trend="down" />
            </Grid>
            <Grid md={4} xs={12}>
              <CounterWidget amount={240} diff={5} icon={KeyIcon} title="Lont Term Rentals" trend="down" />
            </Grid>
            <Grid md={4} xs={12}>
              <CounterWidget amount={21} diff={12} icon={KeyIcon} title="Short Term Rentals" trend="up" />
            </Grid>
            <Grid md={4} xs={12}>
              <CounterWidget
                amount={1215326}
                diff={12}
                currency={true}
                icon={KeyIcon}
                title="Average Listing Price"
                trend="up"
              />
            </Grid>
            <Grid md={4} xs={12}>
              <CounterWidget amount={5925} diff={12} currency={true} icon={KeyIcon} title="Average Rent" trend="up" />
            </Grid>
            <Grid md={4} xs={12}>
              <CounterWidget
                amount={463}
                diff={12}
                currency={true}
                icon={KeyIcon}
                title="Average Nightly Rate"
                trend="up"
              />
            </Grid>
            <Grid md={8} xs={12}>
              <SalesPriceAanalysis
                data={[
                  { name: 'Jan', v1: 36, v2: 19 },
                  { name: 'Feb', v1: 45, v2: 23 },
                  { name: 'Mar', v1: 26, v2: 12 },
                  { name: 'Apr', v1: 39, v2: 20 },
                  { name: 'May', v1: 26, v2: 12 },
                  { name: 'Jun', v1: 42, v2: 31 },
                  { name: 'Jul', v1: 38, v2: 19 },
                  { name: 'Aug', v1: 39, v2: 20 },
                  { name: 'Sep', v1: 37, v2: 18 },
                  { name: 'Oct', v1: 41, v2: 22 },
                  { name: 'Nov', v1: 45, v2: 24 },
                  { name: 'Dec', v1: 23, v2: 17 },
                ]}
              />
            </Grid>
            <Grid md={4} xs={12}>
              <NewsList
                messages={[
                  {
                    id: 'MSG-001',
                    content: 'Hello, we spoke earlier on the phone',
                    author: { name: 'Alcides Antonio', avatar: '/assets/avatar-10.png', status: 'online' },
                    createdAt: '2024-04-17',
                  },
                  {
                    id: 'MSG-002',
                    content: 'Is the job still available?',
                    author: { name: 'Marcus Finn', avatar: '/assets/avatar-9.png', status: 'offline' },
                    createdAt: dayjs().subtract(56, 'minute').toDate(),
                  },
                  {
                    id: 'MSG-003',
                    content: "What is a screening task? I'd like to",
                    author: { name: 'Carson Darrin', avatar: '/assets/avatar-3.png', status: 'online' },
                    createdAt: dayjs().subtract(3, 'hour').subtract(23, 'minute').toDate(),
                  },
                  {
                    id: 'MSG-004',
                    content: 'Still waiting for feedback',
                    author: { name: 'Fran Perez', avatar: '/assets/avatar-5.png', status: 'online' },
                    createdAt: dayjs().subtract(8, 'hour').subtract(6, 'minute').toDate(),
                  },
                  {
                    id: 'MSG-005',
                    content: 'Need more information about campaigns',
                    author: { name: 'Jie Yan', avatar: '/assets/avatar-8.png', status: 'offline' },
                    createdAt: dayjs().subtract(10, 'hour').subtract(18, 'minute').toDate(),
                  },
                ]}
              />
            </Grid>
            <Grid md={12} xs={12}>
              <ArticlesGrid />
            </Grid>
            {/* <Grid md={4} xs={12}></Grid>
            <Grid md={4} xs={12}>
              <Events
                events={[
                  {
                    id: 'EV-004',
                    title: 'Meeting with partners',
                    description: '17:00 to 18:00',
                    createdAt: dayjs().add(1, 'day').toDate(),
                  },
                  {
                    id: 'EV-003',
                    title: 'Interview with Jonas',
                    description: '15:30 to 16:45',
                    createdAt: dayjs().add(4, 'day').toDate(),
                  },
                  {
                    id: 'EV-002',
                    title: "Doctor's appointment",
                    description: '12:30 to 15:30',
                    createdAt: dayjs().add(4, 'day').toDate(),
                  },
                  {
                    id: 'EV-001',
                    title: 'Weekly meeting',
                    description: '09:00 to 09:30',
                    createdAt: dayjs().add(7, 'day').toDate(),
                  },
                ]}
              />
            </Grid>
            <Grid md={4} xs={12}>
              <AppLimits usage={80} />
            </Grid>
            <Grid md={4} xs={12}>
              <HelperWidget
                action={
                  <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
                    Search jobs
                  </Button>
                }
                description="Search for jobs that match your skills and apply to them directly."
                icon={BriefcaseIcon}
                label="Jobs"
                title="Find your dream job"
              />
            </Grid>
            <Grid md={4} xs={12}>
              <HelperWidget
                action={
                  <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
                    Help center
                  </Button>
                }
                description="Find answers to your questions and get in touch with our team."
                icon={InfoIcon}
                label="Help center"
                title="Need help figuring things out?"
              />
            </Grid>
            <Grid md={4} xs={12}>
              <HelperWidget
                action={
                  <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
                    Documentation
                  </Button>
                }
                description="Learn how to get started with our product and make the most of it."
                icon={FileCodeIcon}
                label="Documentation"
                title="Explore documentation"
              />
            </Grid> */}
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
