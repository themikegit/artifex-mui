import { getSiteURL } from '@/lib/get-site-url';
import { LogLevel } from '@/lib/logger';

export const config = {
  site: {
    name: 'ArtifexAI',
    description: '',
    colorScheme: 'dark',
    themeColor: '#090a0b',
    primaryColor: 'chateauGreen',
    url: getSiteURL(),
    version: import.meta.env.VITE_SITE_VERSION || '0.0.0',
  },
  logLevel: import.meta.env.VITE_LOG_LEVEL || LogLevel.ALL,
  // auth: { strategy: import.meta.env.VITE_AUTH_STRATEGY || AuthStrategy.CUSTOM },
  mapbox: { apiKey: import.meta.env.VITE_MAPBOX_API_KEY },
  gtm: { id: import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID },
};
