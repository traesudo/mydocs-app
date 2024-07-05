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
      <footer style={{
      marginTop: 'auto',
      width: '100%',
      backgroundColor: '#f8f8f8',
      textAlign: 'center',
      padding: '10px 0',
      fontSize: '14px',
      color: '#666',
      borderTop: '1px solid #e7e7e7',
      position: 'fixed',
      bottom: 0
    }}>
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" style={{ 
        color: '#666', 
        textDecoration: 'none' 
      }}>
        湘ICP备2024071320号
      </a>
    </footer>
    </html>
  );
}