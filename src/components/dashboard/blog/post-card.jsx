import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { GenDataContext } from '@/contexts/generic-data';
import { RouterLink } from '@/components/core/link';

export function PostCard({ post }) {
  return (
    <Card>
      <CardMedia
        component={RouterLink}
        href={paths.dashboard.overview.details(post.slug)}
        image={post.media}
        sx={{ height: '100px' }}
      />
      <CardContent>
        <Stack spacing={2}>
          <div>
            <Chip label={post.category} />
          </div>
          <div>
            <Link color="text.primary" variant="h5">
              {post.title}
            </Link>
          </div>
          <Typography
            color="text.secondary"
            sx={{
              height: '260px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
            variant="body1"
          >
            {post.content}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            {/* <Avatar src={post.author.avatar} /> */}
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto', flexWrap: 'wrap' }}>
              <Typography sx={{ flex: '1 1 auto' }} variant="subtitle2">
                By {post.source} • {dayjs(post.date).format('MMM D, YYYY')}
              </Typography>
              <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="body2">
                {/* {post.readTime} read */}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
