'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Spin, AutoComplete, Input } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { getDirectionList, getPostsList, fetchPostContent, getSreachList } from '../../components/RequestData';
import { SearchOutlined } from '@ant-design/icons';
import {Button} from "@nextui-org/react";

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
const { Search } = Input;

const My: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [items1, setItems1] = useState<MenuProps['items']>([]);
  const [items2, setItems2] = useState<MenuProps['items']>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDirectionKey, setSelectedDirectionKey] = useState<string>('1'); // 选中项状态 for horizontal menu
  const [selectedPostKey, setSelectedPostKey] = useState<string>(''); // 选中项状态 for sidebar menu
  const [content, setContent] = useState<string>(''); // State for content
  const [searchLoading, setSearchLoading] = useState(false);
  const [options, setOptions] = useState<{ value: string, id: string }[]>([]); // AutoComplete options with id

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
    setSelectedDirectionKey(e.key); // 更新选中项
    fetchPostsList(directionId);
    // Reset selected post key when direction changes
    setSelectedPostKey('');
  };

  const handleSearch = (value: string) => {
    setSearchLoading(true);
    searchOptions(value);
  };

  const searchOptions = (query: string) => {
    const onSuccess = (data: any) => {
      console.log('Search list fetched successfully:', data);
      const dataOptions = data.map((item: any) => ({ value: item.title, id: item.id }));
      setOptions(dataOptions);
      setSearchLoading(false);
    };

    const onError = (error: any) => {
      console.error('Failed to fetch search list:', error);
      setSearchLoading(false);
    };

    getSreachList({
      text1: query,
      onSuccess,
      onError
    });
  };

  const handleSelect = (value: string) => {
    const selectedOption = options.find(option => option.value === value);
    if (selectedOption) {
      handleItemClick({ key: selectedOption.id });
      // Update selected key for sidebar menu
      setSelectedPostKey(selectedOption.id);
    }
  };

  const handleItemClick = (e: any) => {
    fetchPostContent({
      id: e.key,
      onSuccess: (data) => {
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
    // Update selected key for sidebar menu
    setSelectedPostKey(e.key);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <div className="demo-logo" />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            marginRight: "30px"
          }}>
          <AutoComplete
            options={options}
            style={{ width: 200 }}
            onSearch={handleSearch}
            onSelect={handleSelect} // Add onSelect handler for AutoComplete
          >
            <Input.Search
              placeholder="输入你想查看的内容"
              enterButton="🔍"
              size="large"
              loading={searchLoading}
              onSearch={handleSearch}
            />
          </AutoComplete>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedDirectionKey]} // 使用 selectedDirectionKey
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
          onClick={handleMenuClick}
        />
    <Link href="/" passHref>
      <Button isIconOnly color="danger" aria-label="Like">
        退出文档
      </Button> 
    </Link>    
      </Header>
      <Content style={{ padding: '0 48px', marginTop: '64px' }}> {/* Add marginTop to avoid content being hidden */}
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>docs</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              selectedKeys={[selectedPostKey]} // Use selectedPostKey for inline menu
              style={{ height: '100%' }}
              items={items2}
              onClick={handleItemClick} // Add onClick handler for items2
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
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
