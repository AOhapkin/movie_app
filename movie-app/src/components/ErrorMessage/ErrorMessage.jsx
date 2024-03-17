import { Space, Alert } from 'antd'

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