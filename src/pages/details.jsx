import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { config } from '@/config';
import { paths } from '@/paths';
import { GenDataContext } from '@/contexts/generic-data';
import { Content } from '@/components/content';
import { RouterLink } from '@/components/core/link';

const metadata = { title: `Details | Dashboard | ${config.site.name}` };

export function Page() {
  const { genericData } = React.useContext(GenDataContext);
  const { newsSlug } = useParams();

  const article = genericData.find((item) => item.slug === newsSlug);

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
        <Stack spacing={5}>
          <div>
            <Link
              color="text.primary"
              component={RouterLink}
              href={paths.dashboard.overview.main}
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              Overview
            </Link>
          </div>
          {/* <Stack spacing={1}>
            <Typography variant="h4">Post</Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link color="text.primary" component={RouterLink} href={paths.dashboard.overview} variant="subtitle2">
                Dashboard
              </Link>
              <Link color="text.primary" component={RouterLink} href={paths.dashboard.blog.list} variant="subtitle2">
                Blog
              </Link>
              <Typography color="text.secondary" variant="subtitle2">
                Details
              </Typography>
            </Breadcrumbs>
          </Stack> */}
          {/* <Card
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              boxShadow: 'var(--mui-shadows-16)',
              display: 'flex',
              justifyContent: 'space-between',
              px: 3,
              py: 2,
            }}
          >
            <Typography variant="subtitle1">Hello, Sofia</Typography>
            <Button component={RouterLink} href={paths.dashboard.blog.create} variant="contained">
              Edit post
            </Button>
          </Card> */}
          <Stack spacing={3}>
            {/* <div>
              <Chip label="Programming" />
            </div> */}
            <Stack spacing={2}>
              <Typography variant="h3"> {article.title} </Typography>
              {/* <Typography color="text.secondary" variant="subtitle1">
                Learn how to create a productivity dashboard using Google Cloud and Supabase for your team.
              </Typography> */}
            </Stack>
            {/* <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Avatar src="/assets/avatar-8.png" />
              <div>
                <Typography variant="subtitle2">
                  By Jie Yan •{' '}
                  {dayjs().subtract(39, 'minute').subtract(7, 'hour').subtract(5, 'day').format('MMM D, YYYY')}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  5 min read
                </Typography>
              </div>
            </Stack> */}
            <Box
              sx={{
                backgroundImage: `url(/${article.media})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: 1,
                height: '380px',
              }}
            />
            <Container>
              <Content content={article.content} />
            </Container>
            {/* <Divider /> */}
            {/* <Stack spacing={2}>
              {comments.map((comment) => (
                <CommentBox comment={comment} key={comment.id} />
              ))}
            </Stack> */}
            {/* <Divider /> */}
            {/* <CommentAdd /> */}
          </Stack>
          {/* <Newsletter /> */}
        </Stack>
      </Box>
    </React.Fragment>
  );
}
