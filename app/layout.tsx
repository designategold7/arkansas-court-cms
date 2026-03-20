import './globals.css';
import SessionWrapper from './SessionWrapper';

export const metadata = {
  title: 'Arkansas Judiciary CMS',
  description: 'Official CourtConnect system for Arkansas State Roleplay',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}