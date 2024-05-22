import { paths } from '@/paths';

export const layoutConfig = {
  navItems: [
    {
      key: 'overview',
      title: 'Dashboard',
      items: [
        {
          title: 'Overview',
          href: paths.dashboard.overview.main,
          icon: 'overview',
        },
      ],
    },
    {
      key: 'general',
      title: 'Tools',
      items: [
        {
          key: 'assessment',
          title: 'Assessement',
          href: paths.dashboard.assessment.main,
          matcher: { type: 'startsWith', href: '/assessment' },
          icon: 'map',
        },
        {
          key: 'case_search',
          title: 'Case Search',
          href: paths.dashboard.caseSearch,
          icon: 'caseSearch',
          // matcher: { type: 'startsWith', href: '/dashboard/settings' },
        },
        {
          key: 'docu_discovery',
          title: 'Document Discovery',
          href: paths.dashboard.documentDiscovery,
          icon: 'docSearch',
        },
        {
          key: 'lead_gen',
          title: 'Lead Gen',
          icon: 'leadGen',
          href: paths.dashboard.leadGen.main,
          matcher: { type: 'startsWith', href: '/lead-gen' },
        },
        {
          key: 'municipal_arhive',
          title: 'Municipal Archive',
          href: paths.dashboard.municipalArchive.main,
          icon: 'municipal',
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
