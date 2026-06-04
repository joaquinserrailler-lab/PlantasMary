import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Plantas Mary',
  description:
    'Tienda de plantas en Maipú. Suculentas, plantas de interior y entrega coordinada por WhatsApp.',
  icons: {
    icon: '/logo-plantas-mary.webp',
    apple: '/logo-plantas-mary.webp',
  },
  openGraph: {
    title: 'Plantas Mary',
    description:
      'Suculentas y plantas de fácil cuidado para darle vida a tu hogar.',
    images: [
      {
        url: '/logo-plantas-mary.webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plantas Mary',
    description:
      'Suculentas y plantas de fácil cuidado para darle vida a tu hogar.',
    images: ['/logo-plantas-mary.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
