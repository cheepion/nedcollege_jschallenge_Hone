import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Typography } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { addData } from "@/utils/Storage"
import { user_data } from "@/assets/data/userData"
import styles from './index.module.scss'

const Register = memo(() => {
  const { Title } = Typography;
  const navigate = useNavigate();

  const onFinish = (values) => {

    // verify password
    if (values.password !== values.confirmPassword) {
      message.error("The passwords do not match", 2)
      return
    }

    // load localData to use
    const userStoreKey = 'user';
    const userStoreValue = user_data
    const newUser = {
      name: values.username,
      password: values.password,
      role: "user"
    }
    userStoreValue.push(newUser)
    addData(userStoreKey, userStoreValue)
    // go to next page, and take the user data
    navigate('/home', { state: newUser })
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
          className={styles.loginForm}
          onFinish={(onFinish)}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="username" rules={[{ required: true, message: 'input you name!' }]} >
            <Input
              prefix={<UserOutlined />}
              placeholder="username"
              className={styles.inputLine}
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'input you password!' }]}>
            <Input
              prefix={<LockOutlined />}
              placeholder="password"
              className={styles.inputLine}
            />
          </Form.Item>
          <Form.Item name="confirmPassword" rules={[{ required: true, message: 'input you confirmPassword!' }]}>
            <Input
              prefix={<LockOutlined />}
              placeholder="password"
              className={styles.inputLine}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Register</Button>
            <Button type="text" onClick={() => navigate("/home")}>Visitor</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});

export default Register;