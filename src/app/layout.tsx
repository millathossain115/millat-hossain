import type { Metadata, Viewport } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-ui',
  display: 'swap',
});

const siteTitle = 'Millat Hossain - Software Engineer & Full-Stack Developer';
const siteDescription =
  'Millat Hossain is a software engineer and full-stack developer in Dhaka, Bangladesh, and a UIU CSE graduate. Explore his projects, skills, experience, and contact details.';
const siteUrl = 'https://www.millathossain.me';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: 'Millat Hossain', url: siteUrl }],
  creator: 'Millat Hossain',
  publisher: 'Millat Hossain',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ZO-o1taxH8T7zVB6traZi4vT-x-8JHpOBHNKCcp8k_8',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Millat Hossain Portfolio',
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Millat Hossain - Software Engineer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/Favicon-M.svg?v=3',
    shortcut: '/Favicon-M.svg?v=3',
  },
};

export const viewport: Viewport = {
  themeColor: '#020202',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: siteTitle,
  url: `${siteUrl}/`,
  description: siteDescription,
  mainEntity: {
    '@id': `${siteUrl}/#person`,
    '@type': 'Person',
    name: 'Millat Hossain',
    url: `${siteUrl}/`,
    image: `${siteUrl}/millat-hossain.webp`,
    email: 'millathossain115@gmail.com',
    jobTitle: 'Software Engineer',
    description: siteDescription,
    homeLocation: {
      '@type': 'Place',
      name: 'Dhaka, Bangladesh',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'United International University',
    },
    knowsAbout: [
      'Software Engineering',
      'Full-Stack Development',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Frontend Development',
      'Backend Development',
      'UI Engineering',
    ],
    sameAs: [
      'https://github.com/millathossain115',
      'https://www.linkedin.com/in/millathossain115/',
      'https://www.facebook.com/millathossain115',
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sora.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
