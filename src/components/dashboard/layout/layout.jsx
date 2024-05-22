import * as React from 'react';

import { DynamicLayout } from '@/components/dashboard/layout/dynamic-layout';

export function Layout({ children }) {
  return <DynamicLayout>{children}</DynamicLayout>;
}
