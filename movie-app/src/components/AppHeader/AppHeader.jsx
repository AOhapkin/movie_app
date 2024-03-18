import {Input} from 'antd';

function AppHeader({ onQueryChange }) {
  return (
    <Input type='text' placeholder="Type to search..." onChange={onQueryChange} />
  );
}

export default AppHeader;