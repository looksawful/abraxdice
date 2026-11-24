import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import './globals.css';

export const metadata: Metadata = {
  title: 'abraxdice | Кубики',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru" data-theme="dark" suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: "try{let t=localStorage.getItem('abraxdice:theme');if(t===null){t=localStorage.getItem('rollform:theme');if(t!==null){localStorage.setItem('abraxdice:theme',t);localStorage.removeItem('rollform:theme')}}if(t==='light')document.documentElement.dataset.theme='light'}catch{}" }} />
    </head>
    <body><SiteShell>{children}</SiteShell></body>
  </html>;
}
