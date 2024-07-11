import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Space } from 'antd';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { setRequestsDataAdmin } from '../../../../ReduxStore/actions/RequestActionAdmin';
import { useDispatch, useSelector } from 'react-redux';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import {
  DeleteOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import constants from '../../../../Constants/constants';

const AttendeesTable = (props) => {
  const dispatch = useDispatch();
  const requestsData = useSelector((state) => state.requests);
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Adjust the max-width value as needed
  const [isupdatedAfterAction, setisupdatedAfterAction] = useState(false)
  const [runuseffect, setrunuseffect] = useState(false)

  let pendingRequests;
  let acceptedRequests;
  let rejectedRequests;

  const requestInstance = createAuthenticatedRequest();

  useEffect(() => {
    if (requestsData.length === 0 || runuseffect === true || props.showOnlyActiveUsers) {
      console.log("inside useefect");
      requestInstance
        .get(`${constants.BASE_URL}get-all-requests`, {
          params: {
            getActiveonly: props.showOnlyActiveUsers === true ? true : false
          }
        })
        .then(response => {
          dispatch(setRequestsDataAdmin(response.data));
          navbarvalues()
        })
        .catch(err => {
          console.error('Error:', err);
        });
    }
    setrunuseffect(false)
  }, [dispatch, isupdatedAfterAction, props.showOnlyActiveUsers]);

  const handleAction = (id, action) => {
    console.log(id, action)
    let updatedFields;
    if (action === 'accept') {
      updatedFields = { status: 'active' };
    }
    else if (action === 'reject') {
      updatedFields = { status: 'Rejected' };
    }
    else if (action === 'make-admin') {
      updatedFields = { UserType: 'S-Admin' };
    }
    else if (action === 'revert') {
      updatedFields = { UserType: 'student' };
    }
    requestInstance.patch(`${constants.BASE_URL}request-action/${id}`, updatedFields)
      .then(response => {
        console.log('Component updated successfully:', response.data);
        if (response.data.success === true) {
          setisupdatedAfterAction(!isupdatedAfterAction)
          setrunuseffect(true)
        }
      })
      .catch(error => {
        console.error('Error updating component:', error);
      });
  }
  const navbarvalues = () => {
    pendingRequests = requestsData.filter(request => request.status === 'unactive').length;
    acceptedRequests = requestsData.filter(request => request.status === 'active').length;
    rejectedRequests = requestsData.filter(request => request.status === 'Rejected').length;
  }
  navbarvalues()

  const columns = [
    {
      title: 'Registration no.',
      dataIndex: 'Rollno', // Assuming 'Rollno' is the field containing usernames
      key: 'Rollno',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (_, record) => {
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }).format(new Date(record.date));

        return <span>{formattedDate}</span>;
      },
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },

    {
      title: 'UserType',
      dataIndex: 'UserType',
      key: 'UserType',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          {props.showADDRemove ?
            <>
              <Button icon={<CheckOutlined style={{ color: 'green' }} />} onClick={() => handleAction(record._id, 'accept')} />
              <Button icon={<DeleteOutlined />} danger onClick={() => handleAction(record._id, 'reject')} />
            </>
            :
            <>
              <Button type='primary' onClick={() => handleAction(record._id, 'make-admin')}>Make Admin</Button>
              <Button danger onClick={() => handleAction(record._id, 'revert')}>revert</Button>
            </>
          }
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" style={{ backgroundColor: 'dodgerblue' }}>
        <Grid item>
          <Typography variant="h6" style={{ color: 'white', padding: '5%', width: '100%' }}>
            {props.name}
          </Typography>
        </Grid>
        {props.showTage && <Grid item style={{ paddingBottom: isSmallScreen ? '5%' : '0', paddingLeft: isSmallScreen ? '5%' : '0' }}>
          <Tag color="blue">Pending: {pendingRequests}</Tag>
          <Tag color="green">Accepted: {acceptedRequests}</Tag>
          <Tag color="red">Rejected: {rejectedRequests}</Tag>
        </Grid>}
      </Grid>
      <Table columns={columns} dataSource={requestsData} style={{ overflowX: 'auto' }} />
    </div>
  );
};

export default AttendeesTable;
