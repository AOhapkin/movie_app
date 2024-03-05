import { Pagination } from 'antd';

// eslint-disable-next-line react/prop-types
function AppFooter({ currentPage, totalPages, onPageChange }) {
  return <Pagination defaultCurrent={1} current={currentPage} onChange={onPageChange} total={totalPages} />
}

export default AppFooter;