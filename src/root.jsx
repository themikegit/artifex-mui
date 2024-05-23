'use client';

import * as React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import '@/styles/global.css';

import { config } from '@/config';
import { applyDefaultSettings } from '@/lib/settings/apply-default-settings';
import { getSettings as getPersistedSettings } from '@/lib/settings/get-settings';
import { SettingsProvider } from '@/contexts/settings';
import { Analytics } from '@/components/core/analytics';
import { I18nProvider } from '@/components/core/i18n-provider';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { SettingsButton } from '@/components/core/settings/settings-button';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { Toaster } from '@/components/core/toaster';

import { GenDataProvider } from './contexts/generic-data';
import { CityProvider } from './contexts/selected-city';

const metadata = { title: config.site.name };

export function Root({ children }) {
  const settings = React.useRef(applyDefaultSettings(getPersistedSettings()));
  const initialCity = {
    name: 'Mashpee',
    code: 'MA',
    min_lat: '41.619400689006284',
    min_lon: '-70.51634929657037',
    max_lat: '41.6805847834184',
    max_lon: '-70.4436507034303',
    ini_lon: '-70.48',
    ini_lat: '41.65',
  };
  return (
    <HelmetProvider>
      <Helmet>
        <meta content={config.site.themeColor} name="theme-color" />
        <title>{metadata.title}</title>
      </Helmet>
      <Analytics>
        <CityProvider selectedCity={initialCity}>
          <GenDataProvider>
            <LocalizationProvider>
              <SettingsProvider settings={settings.current}>
                <ThemeProvider>
                  {children}
                  {/* <SettingsButton /> */}
                  <Toaster position="bottom-right" />
                </ThemeProvider>
              </SettingsProvider>
            </LocalizationProvider>
          </GenDataProvider>
        </CityProvider>
      </Analytics>
    </HelmetProvider>
  );
}
