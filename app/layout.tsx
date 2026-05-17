import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bloom Growth Tribe',
  description: 'Agent-native growth matching demo for solo builders and creator channels.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
