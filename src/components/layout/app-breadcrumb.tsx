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
import { Home } from 'lucide-react';

const routeLabels: { [key: string]: string } = {
  dashboard: 'Dashboard',
  lessons: 'My Lessons',
  quiz: 'Quiz & Test',
  mindmaps: 'Mind Maps',
  tutor: 'AI Tutor',
  workspace: 'Workspace',
  grades: 'Grades',
  analytics: 'Analytics',
  settings: 'Settings',
};

export function AppBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  if (pathSegments.length <= 1) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard" className="flex items-center space-x-2">
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
          
          if (segment === 'dashboard') return null;
          
          return (
            <div key={segment} className="flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}