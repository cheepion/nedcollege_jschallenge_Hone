import React, { memo, useRef, useState } from 'react';
import { Space, Button, Modal, Form, Input, DatePicker } from 'antd';
import PostTable from './components/PostTable';
import UserMenu from './components/UserMenu'
import { useLocation } from "react-router-dom";
import dayjs from 'dayjs';
import styles from './index.module.scss'

const Home = memo(() => {

  const { state } = useLocation() || ""
  const formRef = useRef(null)
  // mimic data
  const [pData, setPostData] = useState([
    {
      key: '1',
      created: 'Bob',
      link: "https://ned.ie/our-school/",
      date: '2023-02-12',
      content: "Show me the meaning of being lonely",
    },
    {
      key: '2',
      created: 'Eric',
      link: "https://ned.ie/admissions/drules",
      date: '2022-09-30',
      content: "So many words for the broken heart",
    },
    {
      key: '3',
      created: 'Nick',
      link: "https://ned.ie/our-school/",
      date: '2022-04-08',
      content: "Is this the feeling I need to walk with?",
    },
    {
      key: '4',
      created: 'Evan',
      link: "https://ned.ie/our-school/",
      date: '2023-01-05',
      content: "(Tell me why) tell me why I can't be there where you are",
    },
    {
      key: '5',
      created: 'Jim',
      link: "https://ned.ie/our-school/",
      date: '2022-03-22',
      content: "To feel the things you never show",
    }, ])

  // Modal
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState();
  const handleCancel = () => {
    formRef.current?.resetFields();
    setOpen(false);
  }

  // open form and give that flag like: 1:create, 2: edit
  const showModal = (flag) => {
    setFormState(flag)
    setOpen(true)
  }

  // form layout
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  // submit form
  const onFinish = (values) => {
    // 1: added item
    if(formState === 1) {
      setPostData([...pData, {
        key: '6',
        created: state.name || "",
        link: values.link,
        date: dayjs(values.date).format("YYYY-MM-DD"),
        content: values.content
      }])
      // 2 edit item
    } else {
      const newItem = pData.map((item) => {
        if(item.key === values.key) {
          return {
            key: values.key, 
            created: values.created,
            link: values.link,
            date: dayjs(values.date).format("YYYY-MM-DD"),
            content: values.content
          }
        }
        return item
      })
      setPostData([...newItem])
    }
    // close dialog
    handleCancel()
  };
  // fault to submit
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <div >
        <UserMenu {...state} />
      </div>
      <div className={styles.createBtn}>
        <Space className={styles.innerBtn} >
          <Button disabled={state ? false : true} onClick={() => showModal(1)}>Create</Button>
        </Space>
        {/* need time to improved */}
        <PostTable state={state} pData={pData} setPostData={setPostData} edit={showModal} formRef={formRef}/>
      </div>
      {/* create */}
      <Modal
        title="Create Post"
        open={open}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[]}
      >
        <Form
          {...layout}
          name="user-post"
          ref={formRef}
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="key"></Form.Item>
          <Form.Item name="created" label="Created">
            <Input defaultValue={state && state.name} disabled />
          </Form.Item>
          <Form.Item name="link"label="Link" rules={[{ required: true,}]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true}]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="content" label="Content">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
})
export default Home;



