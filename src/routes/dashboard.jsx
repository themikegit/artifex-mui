import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from '@/components/dashboard/layout/layout';

export const route = {
  element: (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
  children: [
    {
      path: 'dashboard',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/overview');
            return { Component: Page };
          },
        },
        {
          path: 'details/:newsSlug',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/details');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'assessment',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/assessment');
            return { Component: Page };
          },
        },
        {
          path: 'details',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/analytics');
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
            const { Page } = await import('@/pages/dashboard/case-search');
            return { Component: Page };
          },
        },
        {
          path: 'courses/:courseId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/academy/courses/details');
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
            const { Page } = await import('@/pages/dashboard/document-discovery');
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
            const { Page } = await import('@/pages/dashboard/lead-gen');
            return { Component: Page };
          },
        },
        {
          path: ':videoId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/gen-details');
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
            const { Page } = await import('@/pages/dashboard/municipal-archive');
            return { Component: Page };
          },
        },
        // {
        //   path: ':fileId',
        //   lazy: async () => {
        //     const { Page } = await import('@/pages/dashboard/regulation-archive');
        //     return { Component: Page };
        //   },
        // },
      ],
    },
    {
      path: 'regulation-archive',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/regulation-archive');
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
};
