import { Pagination } from 'antd';
import { Online } from 'react-detect-offline';

// eslint-disable-next-line react/prop-types
function AppFooter({ currentPage, totalPages, onPageChange }) {
  return (
    <Online>
      <Pagination defaultCurrent={1} current={currentPage} onChange={onPageChange} total={totalPages} pageSize={6} />
    </Online>
  );
}

export default AppFooter;