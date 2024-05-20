import { paths } from '@/paths';

export const layoutConfig = {
  navItems: [
    {
      key: 'dashboards',
      title: 'Dashboard',
      items: [
        {
          title: 'Overview',
          href: paths.dashboard.overview.main,
          icon: 'house',
          matcher: { type: 'startsWith', href: '/dashboard' },
        },
      ],
    },
    {
      key: 'general',
      title: 'Tools',
      items: [
        {
          key: 'core',
          title: 'Assessement',
          href: paths.dashboard.assessment.main,
          matcher: { type: 'startsWith', href: '/assessment' },
          icon: 'receipt',
          //  items: [{ key: 'invoices', title: 'Tax-Sim tool', href: paths.dashboard.invoices.list }],
        },
        {
          key: 'settings',
          title: 'Case Search',
          href: paths.dashboard.caseSearch,
          icon: 'receipt',
          // matcher: { type: 'startsWith', href: '/dashboard/settings' },
        },
        {
          key: 'customers',
          title: 'Document Discovery',
          href: paths.dashboard.documentDiscovery,
          icon: 'receipt',
        },
        {
          key: 'lead_gen',
          title: 'Lead Gen',
          icon: 'shopping-bag-open',
          href: paths.dashboard.leadGen.main,
          matcher: { type: 'startsWith', href: '/lead-gen' },
        },
        {
          key: 'orders',
          title: 'Municipal Archive',
          href: paths.dashboard.municipalArchive.main,
          icon: 'receipt',
        },
        {
          key: 'regulation_archive',
          title: 'Regulation Archive',
          href: paths.dashboard.regulationArchive.main,
          icon: 'receipt',
          disabled: true,
        },
      ],
    },
  ],
};
