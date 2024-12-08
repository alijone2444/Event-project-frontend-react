import React from 'react';
import { Button, Space, Tag } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import constants from './constants';

const columns = (handleDeleteEvent, handleEditEvent, handleApproveEvent) => [
  {
    title: 'Event Name',
    dataIndex: 'eventName',
    key: 'eventName',
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
    render: (date) => new Date(date).toLocaleDateString(), // Adjust the date format as needed
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    key: 'endDate',
    render: (date) => new Date(date).toLocaleDateString(), // Adjust the date format as needed
  },
  {
    title: 'Organizer',
    dataIndex: 'organizer',
    key: 'organizer',
  },
  {
    title: 'Max Attendees',
    dataIndex: 'maxAttendees',
    key: 'maxAttendees',
  },
  {
    title: 'Registration Open',
    dataIndex: 'registrationOpen',
    key: 'registrationOpen',
    render: (registrationOpen) => (
      <Tag key={registrationOpen ? 'yes' : 'no'} color={registrationOpen ? 'green' : 'red'}>
        {registrationOpen ? 'Yes' : 'No'}
      </Tag>
    ),
  },
  {
    title: 'Registration Deadline',
    dataIndex: 'registrationDeadline',
    key: 'registrationDeadline',
    render: (date) => (date ? new Date(date).toLocaleDateString() : 'N/A'),
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags) => (tags ? tags.join(', ') : 'N/A'),
  },
  {
    title: 'Main Image',
    dataIndex: 'dpimageFileName',
    key: 'dpimageFileName',
    render: (dpimageFileName) => <img src={`${constants.BASE_URL}images/${dpimageFileName}`} alt="Event" style={{ width: '50px', height: '50px' }} />,
  }, {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <span style={{ color: status === 'Approved' ? 'green' : 'red' }}>
        {status}
      </span>
    ),
  },

  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (text, record) => (
      <Space>
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEditEvent(record._id)}
        />
        <Button
          icon={<DeleteOutlined />}
          danger
          onClick={() => handleDeleteEvent(record._id)}
        />
        {record.status !== 'Approved' ? (
          <Button
            type="primary"
            onClick={() => handleApproveEvent(record._id, false)}
          >
            Approve
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => handleApproveEvent(record._id, true)}
          >
            Disapprove
          </Button>
        )}
      </Space>
    ),
  },
];

export default columns;
