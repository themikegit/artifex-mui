import * as React from 'react';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { RouterLink } from '@/components/core/link';
import { Newsletter } from '@/components/dashboard/blog/newsletter';
import { PostCard } from '@/components/dashboard/blog/post-card';

const metadata = { title: `List | Blog | Dashboard | ${config.site.name}` };

export function ArticlesGrid({ articles }) {
  return (
    <React.Fragment>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography variant="h4">Comunity profile</Typography>
            <div>
              <Typography color="text.secondary" variant="body1">
                Offering insights into our town's population dynamics, regulatory landscape, housing challenges, and
                ecological considerations
              </Typography>
            </div>
          </Stack>
          <Divider />
          <Grid container spacing={4}>
            <Grid key={'house'} md={6} xs={12}>
              <PostCard
                post={{
                  title: 'Population Dynamics Summary',
                  content: articles.population_dynamics,
                  source: 'n/a',
                  readTime: '2min',
                  category: 'population',
                  media: 'assets/population.png',
                }}
              />
            </Grid>
            <Grid key={'eco'} md={6} xs={12}>
              <PostCard
                post={{
                  title: 'Ecological Consideration',
                  content: articles.ecological_considerations,
                  source: 'n/a',
                  readTime: '2min',
                  category: 'eco',
                  media: 'assets/eco.png',
                }}
              />
            </Grid>
            <Grid key={'house'} md={6} xs={12}>
              <PostCard
                post={{
                  title: 'Housing Market Chalenges',
                  content: articles.housing_market_challenges,
                  source: 'n/a',
                  readTime: '2min',
                  category: 'eco',
                  media: 'assets/housing.png',
                }}
              />
            </Grid>
            <Grid key={'house'} md={6} xs={12}>
              <PostCard
                post={{
                  title: 'Regulatory Landscape',
                  content: articles.regulatory_landscape,
                  source: 'n/a',
                  readTime: '2min',
                  category: 'eco',
                  media: 'assets/landscape.png',
                }}
              />
            </Grid>
          </Grid>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Button disabled startIcon={<ArrowLeftIcon />}>
              Newer
            </Button>
            <Button endIcon={<ArrowRightIcon />}>Older</Button>
          </Stack>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
