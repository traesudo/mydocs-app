// page.tsx
"use client"; // 这是关键的一行

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Radio, Timeline } from 'antd';
import type { RadioChangeEvent } from 'antd';

const App: React.FC = () => {
  const [mode, setMode] = useState<'left' | 'alternate' | 'right'>('left');

  const onChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh', // Use vh to specify the height as a percentage of the viewport height
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px', // Add padding
      boxSizing: 'border-box', // Ensure padding is included in the total width/height
    }}>
      <div style={{
        width: '100%',
        height: '60vh', // Adjust height for the image container
        position: 'relative', // Add position relative for next/image
        marginBottom: '20px', // Add margin between image and the rest of the content
      }}>
        <Link href="/docs">
          <Image
            src="/home.png"
            alt="Background Image"
            layout="fill" // Fill the container
            objectFit="contain" // Ensure the entire image is visible
          />
        </Link>
      </div>
      
      <div style={{
        width: '100%',
        maxWidth: '600px', // Limit the width of the content
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center', // Center the div horizontally
        }}>
          <div style={{
            textAlign: 'center',
            width: '20%', // Set the width to 20%
            color: "#17485A",
            fontSize: "24px",
            fontWeight: 'bold',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '5px 10px',
            borderRadius: '5px',
          }}>
            学习日记
          </div>
        </div>
        <Radio.Group
          onChange={onChange}
          value='学习轨迹'
          style={{
            marginBottom: 20,
          }}
        >
          {/* <Radio. >学习轨迹</Radio.> */}
          {/* <Radio value="left">Left</Radio>
          <Radio value="right">Right</Radio>
          <Radio value="alternate">Alternate</Radio> */}
        </Radio.Group>
        <Timeline
          mode={mode}
          items={[
            {
              label: '2023-02-01',
              children: 'golang学习',
            },
            {
              label: '2024-03-01',
              children: 'mysql深入学习',
            },
            {
              label: '2024-04-05',
              children: 'star rocks学习',
            },
            {
              label: '2024-05-18',
              children: 'nginx学习',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default App;
