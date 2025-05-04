import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'TV Guide App',
  description: 'Guía de canales en vivo tipo Passport DVR',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}