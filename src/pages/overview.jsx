import * as React from 'react';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowSquareOut as ArrowSquareOutIcon } from '@phosphor-icons/react/dist/ssr/ArrowSquareOut';
import { Briefcase as BriefcaseIcon } from '@phosphor-icons/react/dist/ssr/Briefcase';
import { FileCode as FileCodeIcon } from '@phosphor-icons/react/dist/ssr/FileCode';
import { House as HouseIcon } from '@phosphor-icons/react/dist/ssr/House';
import { Info as InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { Key as KeyIcon } from '@phosphor-icons/react/dist/ssr/Key';
import { Tag as TagIcon } from '@phosphor-icons/react/dist/ssr/Tag';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { GenDataContext } from '@/contexts/generic-data';
import { AppLimits } from '@/components/app-limits';
import { ArticlesGrid } from '@/components/articles-grid';
import { CounterWidget } from '@/components/counter-widget';
import { Events } from '@/components/events';
import { NewsList } from '@/components/news-list';
import { SalesPriceAanalysis } from '@/components/sales-price-analysis';

const metadata = { title: `Overview | Dashboard | ${config.site.name}` };

export function Page() {
  const { setgenericDataContext } = React.useContext(GenDataContext);

  const baseUrl = import.meta.env.VITE_SERVER_HOST;
  ///take from context
  const params = 'town=mashpee&state=ma&country=usa';

  const [townProfile, setTownProfile] = React.useState(null);
  const [localNews, setLocalNews] = React.useState(null);
  const [townSummary, setTownSummary] = React.useState(null);
  const [townSales, setTownSales] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [tProfileRes, locNewsRes, tSummRes, tSalesRes] = await Promise.all([
          fetch(`${baseUrl}get-town-stats/?${params}`),
          fetch(`${baseUrl}get-local-news/?${params}`),
          fetch(`${baseUrl}get-town-summary/?${params}`),
          fetch(`${baseUrl}get-town-sales/?${params}`),
        ]);

        const tProfile = await tProfileRes.json();
        const locNews = await locNewsRes.json();
        const tSumm = await tSummRes.json();
        const tSales = await tSalesRes.json();

        setTownProfile(tProfile);
        setLocalNews(locNews);
        ///prepare news articles
        const transformedNews = [
          {
            slug: 'population_dynamics',
            title: 'Population Dynamics Summary',
            content: tSumm.population_dynamics,
            source: 'n/a',
            readTime: '2min',
            category: 'population',
            media: 'assets/population.png',
          },
          {
            slug: 'ecological_considerations',
            title: 'Ecological Consideration',
            content: tSumm.ecological_considerations,
            source: 'n/a',
            readTime: '2min',
            category: 'eco',
            media: 'assets/eco.png',
          },
          {
            slug: 'housing_market_challenges',
            title: 'Housing Market Challenges',
            content: tSumm.housing_market_challenges,
            source: 'n/a',
            readTime: '2min',
            category: 'eco',
            media: 'assets/housing.png',
          },
          {
            slug: 'regulatory_landscape',
            title: 'Regulatory Landscape',
            content: tSumm.regulatory_landscape,
            source: 'n/a',
            readTime: '2min',
            category: 'eco',
            media: 'assets/landscape.png',
          },
        ];
        setTownSummary(transformedNews);
        setTownSales(tSales);
        setIsLoading(false);
        ///set context
        setgenericDataContext(transformedNews);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">
                {' '}
                {townProfile.town.charAt(0).toUpperCase() + townProfile.town.slice(1)},{' '}
                {townProfile.state.toUpperCase()}{' '}
              </Typography>
            </Box>
            <div>
              <Typography mr={1} display={'inline-block'} color="text.primary" variant="body2">
                <a href={townProfile.website}>mashpeema.gov</a>
              </Typography>
              <ArrowSquareOutIcon
                color="var(--mui-palette-text-primary)"
                fontSize="var(--icon-fontSize-md)"
              ></ArrowSquareOutIcon>
            </div>
          </Stack>

          <Grid container spacing={4}>
            <Grid md={4} xs={12}>
              <CounterWidget
                amount={townProfile.num_homes_for_sale}
                diff={15}
                icon={HouseIcon}
                title="Homes listed"
                trend="down"
              />
            </Grid>
            <Grid md={4} xs={12}>
              <CounterWidget
                amount={townProfile.num_rentals_listed}
                diff={5}
                icon={KeyIcon}
                title="Lont Term Rentals"
                trend="down"
              />
            </Grid>
            <Grid md={4} xs={12}>
              <CounterWidget
                amount={townProfile.num_short_term_rentals}
                diff={12}
                icon={KeyIcon}
                title="Short Term Rentals"
                trend="up"
              />
            </Grid>
            <Grid md={4} xs={12}>
              <CounterWidget
                amount={townProfile.avg_listing_price_for_sale}
                diff={12}
                currency={true}
                icon={TagIcon}
                title="Average Listing Price"
                trend="up"
              />
            </Grid>
            <Grid md={4} xs={12}>
              <CounterWidget
                amount={townProfile.avg_price_rent}
                diff={12}
                currency={true}
                icon={TagIcon}
                title="Average Rent"
                trend="up"
              />
            </Grid>
            <Grid md={4} xs={12}>
              <CounterWidget
                amount={townProfile.avg_nightly_price_short_term}
                diff={12}
                currency={true}
                icon={TagIcon}
                title="Average Nightly Rate"
                trend="up"
              />
            </Grid>

            <Grid md={8} xs={12}>
              <SalesPriceAanalysis data={townSales} />
            </Grid>
            <Grid md={4} xs={12}>
              <NewsList news={localNews} />
            </Grid>
            <Grid md={12} xs={12}>
              <ArticlesGrid articles={townSummary} />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
