import { Space, Alert } from 'antd'

// eslint-disable-next-line react/prop-types
function ErrorMessage({ messageText }) {
  return (
    <Space
      size="middle"
      align='center'
      direction="vertical">
      <Alert 
        message="Error"
        description={messageText ? messageText : 'Произошла ошибка. Попробуйте позже.'}
        type="error"
        showIcon />
    </Space>
  )
}
export default ErrorMessage