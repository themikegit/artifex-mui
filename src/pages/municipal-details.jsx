import React, { useEffect, useState } from 'react';
import { Grid, LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { config } from '@/config';
import { paths } from '@/paths';
import { GenDataContext } from '@/contexts/generic-data';
import { ChatBot } from '@/components/chat-bot';
import { RouterLink } from '@/components/core/link';

const metadata = { title: `Details | Blog | Dashboard | ${config.site.name}` };

export function Page() {
  const baseUrl = import.meta.env.VITE_SERVER_HOST;

  const [isLoading, setisLoading] = useState(true);
  const [municipalDetails, setmunicipalDetails] = useState(null);
  const [s3path, sets3Path] = useState(null);

  const { genericData } = React.useContext(GenDataContext);
  const { docId } = useParams();

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    fetch(`${baseUrl}town-doc/${docId}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setmunicipalDetails(data);
        sets3Path(data.s3_txtpath);
        setisLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  if (isLoading) {
    return <LinearProgress />;
  }
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
          <div>
            <Link
              color="text.primary"
              component={RouterLink}
              href={paths.dashboard.municipalArchive.main}
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              List
            </Link>
          </div>

          <Typography variant="h4"> Summary </Typography>

          <Grid container spacing={2}>
            <Grid xs={7}>
              <Box
                sx={{
                  bgcolor: 'var(--mui-palette-neutral-900)',
                  borderRadius: '20px',
                  color: 'var(--mui-palette-common-white)',
                  overflow: 'hidden',
                  position: 'relative',
                  // p: { xs: '32px 24px', md: '64px 56px', lg: '64px 56px' },
                }}
              >
                <Typography sx={{ p: 2 }} variant="body2">
                  {municipalDetails.summary}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box
                sx={{
                  bgcolor: 'var(--mui-palette-neutral-900)',
                  borderRadius: '20px',
                  color: 'var(--mui-palette-common-white)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {s3path && <ChatBot path={s3path}></ChatBot>}
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
