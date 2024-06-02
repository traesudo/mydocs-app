
import React from 'react';
// import {UserIcon} from './UserIcon';
// import {CameraIcon} from './CameraIcon';
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html >
      <body style={{backgroundColor:"#A1E2E6"}}>
        {children}
      </body>
      <></>
    </html>
  );
}
