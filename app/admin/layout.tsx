import React from 'react';
import AdminLayoutShell from '@/components/admin/AdminLayoutShell';

export const metadata = {
  title: 'Arqovia CMS',
  description: 'Admin dashboard for Arqovia Digital Studio',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
