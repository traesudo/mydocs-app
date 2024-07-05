// page.tsx
"use client"; // 这是关键的一行

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Radio, Timeline, FloatButton, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import '../styles/myanimation.css'

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
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px', // Add padding
      boxSizing: 'border-box', // Ensure padding is included in the total width/height
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        height: '60vh', // Adjust height for the image container
        position: 'relative', // Add position relative for next/image
        marginBottom: '20px', // Add margin between image and the rest of the content
      }}>
        
        <div style={{ flex: 1, position: 'relative' }}>
          <Image
            src="/home.png"
            alt="Background Image"
            layout="fill" // Fill the container
            objectFit="contain" // Ensure the entire image is visible
          />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          marginLeft: '20px' // Space between image and buttons
        }}>
          <Link href="/docs">
            <Button type="primary" style={{ backgroundColor: '#C1DEFB' }}>笔记文档</Button>
          </Link>
          <Link href="/experiment">
            <Button type="primary" style={{ backgroundColor: '#C1DEFB' }}>生活记录</Button>
          </Link>
          <Link href="/experiment">
            <Button type="primary" style={{ backgroundColor: '#C1DEFB' }}>实验日志</Button>
          </Link>
        </div>
      </div>
      
      <div style={{
        width: '100%',
        maxWidth: '600px', // Limit the width of the content
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center', // Center the div horizontally
        }}>
        </div>
      </div>
      <div>
        <FloatButton tooltip={<div>欢迎来到我的笔记博客</div>} />
      </div>
      {/* <footer>
      <a href="https://beian.miit.gov.cn/" target="_blank">湘ICP备2024071320号</a>
      </footer> */}
      {/* <div className='loader'></div> */}
      <></>
    </div>
  );
};

export default App;



//手机端 处理