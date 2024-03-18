import {Input} from 'antd';

// eslint-disable-next-line react/prop-types
function AppHeader({ onQueryChangeDelayed }) {
  return (
    <Input type='text' placeholder="Type to search..." onChange={onQueryChangeDelayed} />
  );
}

export default AppHeader;