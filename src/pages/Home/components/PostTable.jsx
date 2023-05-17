import { Space, Table, Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import styles from '../index.module.scss'

// user table
const PostTable = (props) => {
  
  const identifyRoles = props.state ===null || Object.keys(props.state).length === 0 || props.state.role !== "admin"
  const identifyUser = props.state ===null || Object.keys(props.state).length === 0
  // edit item
  const editItem = (item) => {
    setTimeout( ()=> {
      props.formRef.current.setFieldsValue({
        key: item.key,
        created: item.created,
        link: item.link,
        date: dayjs(item.date),
        content: item.content
      });
    }, 200)
    props.edit(2)
  }

  // delete item
  const delItem = (key) => {
    const PostData = props.pData.filter((item) => item.key !== key)
    props.setPostData(PostData)
  }

  const columns = [
    {
      title: ' Created',
      dataIndex: 'created',
      key: 'created',
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: "30%"
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      width: "30%"
    },
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            disabled={identifyUser ? true : false}
            size="small"
            onClick={() => editItem(record)}>Edit
          </Button>
            <Popconfirm 
              className={identifyRoles ? styles.popColorUnWork: styles.popColor}
              title="Sure to delete?" 
              disabled={identifyRoles ? true : false} 
              onConfirm={() => delItem(record.key)}
              >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return ( 
    <Table columns={columns} dataSource={props.pData} pagination={{pageSize: 4}} style={{width: 900}} />
  )
}

export default PostTable
