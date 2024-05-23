import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';

import { RouterLink } from './core/link';

export function NewsList({ news }) {
  console.log(news);
  return (
    <Card>
      <List
        disablePadding
        sx={{
          p: 1,
          '& .MuiListItemButton-root': { borderRadius: 1 },
          '& .MuiBadge-dot': {
            border: '2px solid var(--mui-palette-background-paper)',
            borderRadius: '50%',
            bottom: '5px',
            height: '12px',
            right: '5px',
            width: '12px',
          },
        }}
      >
        {news &&
          news.map((article, index) => (
            <ListItem key={article.headline} disablePadding>
              <ListItemButton component={RouterLink} href={paths.dashboard.overview.details(article.id)}>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography noWrap variant="subtitle2">
                      {article.headline}
                    </Typography>
                  }
                  secondary={
                    <Typography color="text.secondary" noWrap variant="body2">
                      {article.summary}
                    </Typography>
                  }
                />
                <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="caption">
                  {dayjs(article.date).fromNow()}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider />
      <CardActions>
        <Button
          component={RouterLink}
          href={paths.dashboard.overview.all}
          color="secondary"
          endIcon={<ArrowRightIcon />}
          size="small"
        >
          See all news
        </Button>
      </CardActions>
    </Card>
  );
}
