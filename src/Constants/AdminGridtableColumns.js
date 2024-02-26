import React from 'react';
import { Button, Space,Tag } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

const columns =(handleDeleteEvent)=> [
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
      dataIndex: 'mainImageData',
      key: 'mainImageData',
      render: (mainImageData) => <img src={`data:image/jpeg;base64,${mainImageData}`} alt="Event" style={{ width: '50px', height: '50px' }} />,
  
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button icon={<EditOutlined />} />
          <Button 
            icon={<DeleteOutlined />} 
            danger 
            onClick={() => handleDeleteEvent(record._id)}
          />
        </Space>
      ),
    },
  ];
export default columns;  