import { Spin, Space } from 'antd';

function LoadingSpinner() {
  return (
    <Space align='center'>
      <Spin size='large' />
    </Space>
  );
}

export default LoadingSpinner;