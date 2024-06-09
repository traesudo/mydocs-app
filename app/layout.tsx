import React from 'react';
// import {UserIcon} from './UserIcon';
// import {CameraIcon} from './CameraIcon';
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html >
      <body style={{backgroundColor:"#DCEDFF"}}>
        {children}
      </body>
    </html>
  );
}