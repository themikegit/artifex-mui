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
import { PostCard } from '@/components/post-card';

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
            {articles.map((article, index) => (
              <Grid key={index} md={6} xs={12}>
                <PostCard
                  post={{
                    slug: article.slug,
                    title: article.title,
                    content: article.content,
                    source: article.source,
                    readTime: article.readTime,
                    category: article.category,
                    media: article.media,
                  }}
                />
              </Grid>
            ))}
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
