import React, { useEffect, useState } from 'react';
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
import { NewsList } from '@/components/news-list';

const metadata = { title: `Details | Dashboard | ${config.site.name}` };

export function Page() {
  const { articles } = React.useContext(GenDataContext);
  const [selectedArticles, setselectedArticles] = useState(null);
  useEffect(() => {
    console.log(articles);
    setselectedArticles(articles);
  }, []);

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
          {selectedArticles && <NewsList news={selectedArticles} />}
        </Stack>
      </Box>
    </React.Fragment>
  );
}
