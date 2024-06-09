// 引入所需的模块和类型
"use client"; // 标记为客户端组件

import React, { useEffect, useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Spin } from 'antd';
import { getLiveList } from '../../components/RequestData';

const { Meta } = Card;

interface CardData {
  id: number;
  title: string;
  description: string;
  img: string;
  avatar: string;
}

const CardList: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      // 调用 getDirectionList 函数来获取数据
      getLiveList({
        onSuccess: (data:{data: CardData[]}) => {
            console.log("check data",data.data)
          setCards(data.data);
          setLoading(false);
        },
        onError: (error: any) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        },
      });
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
      {cards.map(card => (
        <Card
          key={card.id}
          style={{ width: 300 }}
          cover={
            <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
              <img
                alt={card.title}
                src={card.img}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} // 使用 contain 使图片自适应
              />
            </div>
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={<Avatar src={'/3591708684607_.pic.jpg'} />}
            title={card.title}
            description={card.description}
          />
        </Card>
      ))}
    </div>
  );
};

export default CardList;
