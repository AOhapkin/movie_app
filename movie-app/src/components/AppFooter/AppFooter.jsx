import { Pagination } from 'antd';
import { Online } from 'react-detect-offline';

import './AppFooter.css'

// eslint-disable-next-line react/prop-types
function AppFooter({ currentPage, totalPages, onPageChange }) {
  return (
    <div className='footer-wrapper'>
      <Online>
        <Pagination defaultCurrent={1} current={currentPage} onChange={onPageChange} total={totalPages} pageSize={6} />
      </Online>
    </div>
  );
}

export default AppFooter;