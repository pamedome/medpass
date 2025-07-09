'use client';

import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React from 'react';

// A helper function to capitalize strings
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function PageHeader() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbItems = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;
    const label = capitalize(segment.replace(/-/g, ' '));
    return (
      <React.Fragment key={href}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{label}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  });

  const pageTitle =
    segments.length > 0
      ? capitalize(segments[segments.length - 1].replace(/-/g, ' '))
      : 'Dashboard';

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">{pageTitle}</h1>
       {segments.length > 1 && (
         <Breadcrumb>
           <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
         </Breadcrumb>
       )}
    </div>
  );
}
