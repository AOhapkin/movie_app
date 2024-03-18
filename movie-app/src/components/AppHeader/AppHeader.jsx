import {Input} from 'antd';

import './AppHeader.css'

// eslint-disable-next-line react/prop-types
function AppHeader({ onQueryChange }) {
  return (
    <div className='header-wrapper'>
      <Input type='text' placeholder="Type to search..." onChange={onQueryChange} />
    </div>
  );
}

export default AppHeader;