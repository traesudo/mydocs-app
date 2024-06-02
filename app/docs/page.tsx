'use client';

import React, { useState, useEffect } from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Spin } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { getDirectionList, getPostsList, fetchPostContent } from '../../components/RequestData';

interface DirectionItem {
  id: number;
  direction: string;
}
interface PostsItem {
  key: number;
  children: {
    key: string;
    label: string;
  }[];
  label: string;
}

const Loading: React.FC = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 255, 255, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin size="large" />
    </div>
  );
};

const My: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [items1, setItems1] = useState<MenuProps['items']>([]);
  const [items2, setItems2] = useState<MenuProps['items']>([]);
  const [loading, setLoading] = useState(true);
  const [selectedKey, setSelectedKey] = useState<string>('1'); // 选中项状态
  const [content, setContent] = useState<string>(''); // State for content

  useEffect(() => {
    // Fetch items1
    getDirectionList({
      onSuccess: (data: { data: DirectionItem[] }) => {
        console.log('Request succeeded111:', data);
        const formattedData = data.data.map((item: DirectionItem) => ({
          key: item.id.toString(), // 确保 key 是字符串
          label: item.direction,
        }));
        setItems1(formattedData);
        setLoading(false);
      },
      onError: (error) => {
        console.error('Request failed items1:', error);
        setLoading(false);
      },
    });
    // Fetch initial items2
    fetchPostsList(1); // Fetch posts for the initial direction id, assuming 1 is a valid id
  }, []);

  const fetchPostsList = (id: number) => {
    setLoading(true);
    getPostsList({
      id,
      onSuccess: (data: { data: PostsItem[] }) => {
        console.log('Request succeeded items2:', data);
        const formattedData = data.data.map((item: PostsItem) => ({
          key: item.key,
          label: item.label,
          icon: React.createElement(LaptopOutlined),
          children: item.children
        }));
        setItems2(formattedData);
        setLoading(false);
      },
      onError: (error) => {
        console.error('Request failed items2:', error);
        setLoading(false);
      },
    });
  };

  const handleMenuClick = (e: any) => {
    const directionId = parseInt(e.key, 10);
    setSelectedKey(e.key); // 更新选中项
    fetchPostsList(directionId);
  };

  const handleItemClick = (e: any) => {
    console.log("看看 e.key", e.key);
    fetchPostContent({
      id: e.key,
      onSuccess: (data) => {
        console.log("Post content fetched successfully:", data);
        if (data.data.content) {
          setContent(data.data.content); // Assuming the API response has a content field
        } else {
          console.error("No content field in the response data");
        }
      },
      onError: (error) => {
        console.error("Failed to fetch post content:", error);
      },
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]} // 使用 selectedKeys
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
          onClick={handleMenuClick}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>docs</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
              onClick={handleItemClick} // Add onClick handler for items2
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }} >
            <div dangerouslySetInnerHTML={{ __html: content }} /> {/* Display the fetched content */}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        my-docs ©{new Date().getFullYear()} Created by trae
      </Footer>
    </Layout>
  );
};

export default My;
