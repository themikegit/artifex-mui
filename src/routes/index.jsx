import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from '@/components/dashboard/layout/layout';

export const routes = [
  {
    element: (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    ),
    children: [
      {
        path: '/overview',
        lazy: async () => {
          const { Page } = await import('@/pages/overview');
          return { Component: Page };
        },
      },
      {
        path: 'details/:newsSlug',
        lazy: async () => {
          const { Page } = await import('@/pages/details');
          return { Component: Page };
        },
      },

      {
        path: 'assessment',
        children: [
          {
            index: true,
            lazy: async () => {
              const { Page } = await import('@/pages/assessment');
              return { Component: Page };
            },
          },
        ],
      },
      {
        path: 'case-search',
        children: [
          {
            index: true,
            lazy: async () => {
              const { Page } = await import('@/pages/case-search');
              return { Component: Page };
            },
          },
        ],
      },
      {
        path: 'document-discovery',
        children: [
          {
            index: true,
            lazy: async () => {
              const { Page } = await import('@/pages/document-discovery');
              return { Component: Page };
            },
          },
        ],
      },
      {
        path: 'lead-gen',
        children: [
          {
            index: true,
            lazy: async () => {
              const { Page } = await import('@/pages/lead-gen');
              return { Component: Page };
            },
          },
          {
            path: ':videoId',
            lazy: async () => {
              const { Page } = await import('@/pages/gen-details');
              return { Component: Page };
            },
          },
        ],
      },
      {
        path: 'municipal-archive',
        children: [
          {
            index: true,
            lazy: async () => {
              const { Page } = await import('@/pages/municipal-archive');
              return { Component: Page };
            },
          },
          {
            path: ':docId',
            lazy: async () => {
              const { Page } = await import('@/pages/municipal-details');
              return { Component: Page };
            },
          },
        ],
      },
      {
        path: 'regulation-archive',
        children: [
          {
            index: true,
            lazy: async () => {
              const { Page } = await import('@/pages/regulation-archive');
              return { Component: Page };
            },
          },
          // {
          //   path: ':fileId',
          //   lazy: async () => {
          //     const { Page } = await import('@/pages/dashboard/');
          //     return { Component: Page };
          //   },
          // },
        ],
      },
      ///separate page for analyticcs
      // {
      //   path: 'analytics',
      //   lazy: async () => {
      //     const { Page } = await import('@/pages/dashboard/analytics');
      //     return { Component: Page };
      //   },
      // },
    ],
  },
  // { path: '*', element: <NotFoundPage /> },
];
