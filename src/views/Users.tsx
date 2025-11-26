import { Table, Button, Space, Popconfirm, message, Card, Tag, Empty } from 'antd';
import { DeleteOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteContact, clearContacts } from '../store/slices/userInformation';
import type { UserContact } from '../store/slices/userInformation';
import type { ColumnsType } from 'antd/es/table';

function Users() {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.userInformation.contacts);

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
    message.success('Contact deleted successfully');
  };

  const handleClearAll = () => {
    dispatch(clearContacts());
    message.success('All contacts cleared successfully');
  };

  const columns: ColumnsType<UserContact> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <UserOutlined className="text-blue-500" />
          <span className="font-medium">{text}</span>
        </Space>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => (
        <Space>
          <MailOutlined className="text-green-500" />
          <a href={`mailto:${text}`} className="text-blue-600 hover:text-blue-800">
            {text}
          </a>
        </Space>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: string) => (
        <Space>
          <PhoneOutlined className="text-purple-500" />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
      width: 300,
    },
    {
      title: 'Submitted At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => {
        const formattedDate = new Date(date).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
        return <Tag color="blue">{formattedDate}</Tag>;
      },
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Popconfirm
          title="Delete Contact"
          description="Are you sure you want to delete this contact?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">User Contacts</h1>
          <p className="text-lg text-gray-600 mt-2">
            Total Contacts: <span className="font-semibold text-blue-600">{contacts.length}</span>
          </p>
        </div>
        {contacts.length > 0 && (
          <Popconfirm
            title="Clear All Contacts"
            description="Are you sure you want to delete all contacts? This action cannot be undone."
            onConfirm={handleClearAll}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button danger size="large">
              Clear All Contacts
            </Button>
          </Popconfirm>
        )}
      </div>

      <Card className="shadow-lg">
        {contacts.length === 0 ? (
          <Empty
            description={
              <span className="text-gray-500">
                No contacts found. <a href="/contact" className="text-blue-600">Add your first contact</a>
              </span>
            }
          />
        ) : (
          <Table
            columns={columns}
            dataSource={contacts}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} contacts`,
            }}
            scroll={{ x: 1000 }}
          />
        )}
      </Card>
    </div>
  );
}

export default Users;
