import { Pagination } from 'antd';
import { Online } from 'react-detect-offline';

import './AppFooter.css'

// eslint-disable-next-line react/prop-types
function AppFooter({ currentPage, totalPages, onPageChange }) {
  return (
    <div className='footer-wrapper'>
      <Online>
        <Pagination 
          defaultCurrent={currentPage}
          onChange={onPageChange}
          total={totalPages}
          showSizeChanger={false}
          pageSize={1}
        />
      </Online>
    </div>
  );
}

export default AppFooter;