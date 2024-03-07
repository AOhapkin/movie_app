import React from 'react';
import { Header } from 'antd/es/layout/layout';
import {Input} from 'antd';

const headerStyle = {
  paddingTop: '20px',
  width: '938px',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

// function onTabsChange(key) {
//   console.log(key);
// }

// const tabsItems = [
//   {
//     key: '1',
//     label: 'Search',
//   },
//   {
//     key: '2',
//     label: 'Rated',
//   },
// ]

// eslint-disable-next-line react/prop-types
function AppHeader({ onQueryChange }) {
  return (
    <Header style={headerStyle}>
      {/* <Tabs defaultActiveKey="1" items={tabsItems} onChange={onTabsChange} /> */}
      <Input type='text' placeholder="Type to search..." onChange={onQueryChange} />
    </Header>
  );
}

export default AppHeader;