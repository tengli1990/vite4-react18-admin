import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input } from "antd"
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./index.module.css"

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [query] = useSearchParams()

  console.log('params', query.get('redirect'))
  const onFinish = (values: any) => {
    
    const redirect: any = decodeURIComponent((query.get('redirect') as any) || '/')

    dispatch({
      type: 'user/getUserInfo', payload: {
        navigate,
        redirect
      }
    })
    // navigate("/")
  }

  return (
    <div className={styles.content}>
      <Card style={{ width: 300 }} title="登陆" bordered={false}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请填写用户名!" }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请填写用户名!" }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
