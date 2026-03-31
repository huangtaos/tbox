import type { Metadata } from 'next';
import '@/app/globals.css';
import { AppProvider } from '@/context/AppContext';
import FullScreenTimer from '@/features/timer/FullScreenTimer';
import LayoutWrapper from '@/components/shared/LayoutWrapper';

export const metadata: Metadata = {
  title: 'tbox - 你的全能工具箱',
  description: '一个简洁、高效、全能的在线工具箱',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23ffcf33%22/><circle cx=%2235%22 cy=%2245%22 r=%227%22 fill=%22%2345370a%22/><circle cx=%2265%22 cy=%2245%22 r=%227%22 fill=%22%2345370a%22/><rect x=%2230%22 y=%2265%22 width=%2240%22 height=%225%22 rx=%222.5%22 fill=%22%2345370a%22/></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <AppProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <FullScreenTimer />
        </AppProvider>
      </body>
    </html>
  );
}
