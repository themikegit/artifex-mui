import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Article as ArticleIcon } from '@phosphor-icons/react/dist/ssr/Article';
import { ChatCircleText as ChatCircleTextIcon } from '@phosphor-icons/react/dist/ssr/ChatCircleText';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';

import { dayjs } from '@/lib/dayjs';

export function NewsList({ news }) {
  return (
    <Card>
      {/* <CardHeader
        action={
          <IconButton>
            <DotsThreeIcon weight="bold" />
          </IconButton>
        }
        avatar={
          <Avatar>
            <ArticleIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Local news"
      /> */}

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
        {news.map((article) => (
          <ListItem key={article.headline} disablePadding>
            <ListItemButton>
              {/* <ListItemAvatar>
                {message.author.status === 'online' ? (
                  <Badge anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} color="success" variant="dot">
                    <Avatar src={message.author.avatar} />
                  </Badge>
                ) : (
                  <Avatar src={message.author.avatar} />
                )}
              </ListItemAvatar> */}
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
        <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
          See all news
        </Button>
      </CardActions>
    </Card>
  );
}
