import React from 'react';
import { Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import styles from '../index.module.scss'

// userAvatar
const PostMenu = (props) => { 

  const navigate = useNavigate();
  const hasObject = Object.keys(props).length === 0
    // avatar menu
  const handleMenuClick= (e) => {
    if(e.key === "1" || e.key === "2") {
      navigate("/login")
    } else {
      navigate("/register")
    }
  };

  const items= [
    {
      label: 'Log-in',
      key: '1',
      disabled: hasObject ? false : true
    },
    {
      label: 'Log-out',
      key: '2',
      disabled: hasObject ? true : false,
    },
    {
      label: 'Register',
      key: '3',
      disabled: hasObject ? false : true,
    },
  ]

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  
  return (
    <Dropdown.Button className={styles.user} menu={menuProps} placement="bottom" icon={<UserOutlined />}>  
      {props.name || "Unkown"}
    </Dropdown.Button>
  )
}

export default PostMenu