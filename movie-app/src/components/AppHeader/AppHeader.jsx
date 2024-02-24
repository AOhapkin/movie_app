import React from 'react';
import { Header } from 'antd/es/layout/layout';
import {Tabs, Input} from 'antd';

const headerStyle = {
  textAlign: 'center',
  // height: 64,
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

function onTabsChange(key) {
  console.log(key);
}

const tabsItems = [
  {
    key: '1',
    label: 'Search',
  },
  {
    key: '2',
    label: 'Rated',
  },
]

function AppHeader() {
  return (
    <Header style={headerStyle}>
      <Tabs defaultActiveKey="1" items={tabsItems} onChange={onTabsChange} />
      <Input placeholder="Type to search..." />
    </Header>
  );
}

export default AppHeader;