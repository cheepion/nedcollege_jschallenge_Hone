import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Typography } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { addData, getData } from "@/utils/Storage"
import { user_data } from "@/assets/data/userData"
import styles from './index.module.scss'

const Login = memo(() => {
  const { Title } = Typography;
  const navigate = useNavigate();

  // submiting
  const onFinish = (values) => {

    // skiping verity the password

    // load localData to use
    const userStoreKey = 'user';
    const userStoreValue = user_data
    addData(userStoreKey, userStoreValue)
    const userData = getData("user").filter((item) => item.name == values.username) || []
    // // go to next page, and take the user data
    if (userData.length != 0) {
      navigate('/home', { state: userData[0] })
    } else {
      message.error("can't find the user or password", [3])
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("the infomation is error");
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.pane}>
        <Title level={3} className={styles.title}>NED College</Title>
        <Form
          name="basic"
          onFinish={(onFinish)}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="username" rules={[{ required: true, message: 'input you name!' }]} >
            <Input
              prefix={<UserOutlined />}
              placeholder="username"
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'input you password!' }]}>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Login</Button>
            <Button type="text" onClick={() => navigate("/home")}>Visitor</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});

export default Login;