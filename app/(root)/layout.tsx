import { ClerkProvider, currentUser } from '@clerk/nextjs';
import '../globals.css';
import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Devlinks',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  // if (!user) return null;

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${instrumentSans.className} bg-near-white`}>
          <div className='max-w-[1800px] mx-auto'>
            <Navbar userId={user?.id || ""} />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
