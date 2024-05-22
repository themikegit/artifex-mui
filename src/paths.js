export const paths = {
  dashboard: {
    overview: {
      main: '/overview',
      details: (newsSlug) => `/details/${newsSlug}`,
    },
    assessment: {
      main: '/assessment',
      details: (name) => `/assessment/details/${name}`,
    },
    caseSearch: '/case-search',
    documentDiscovery: '/document-discovery',
    leadGen: {
      main: '/lead-gen',
      details: (videoId) => `/lead-gen/${videoId}`,
    },
    municipalArchive: {
      main: '/municipal-archive',
      details: (videoId) => `/municipal-archive/${videoId}`,
    },
    regulationArchive: {
      main: '/regulation-archive',
      details: (docId) => `/lead-gen/${docId}`,
    },
  },
};
