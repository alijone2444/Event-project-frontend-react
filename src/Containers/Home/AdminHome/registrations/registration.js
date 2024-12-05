import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Space, Spin } from 'antd';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { setRequestsDataAdmin } from '../../../../ReduxStore/actions/RequestActionAdmin';
import { useDispatch, useSelector } from 'react-redux';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import {
  DeleteOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import constants from '../../../../Constants/constants';
import { CancelOutlined } from '@mui/icons-material';

const AttendeesTable = (props) => {
  const dispatch = useDispatch();
  const requestsData = useSelector((state) => state.requests);
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Adjust the max-width value as needed
  const [isupdatedAfterAction, setisupdatedAfterAction] = useState(false)
  const [runuseffect, setrunuseffect] = useState(false)
  const [loading, setloading] = useState(null)
  const [mainLoading, setMainloading] = useState(false)
  let pendingRequests;
  let acceptedRequests;
  let rejectedRequests;

  const requestInstance = createAuthenticatedRequest();

  useEffect(() => {
    if (requestsData.length === 0 || runuseffect === true || props.showOnlyActiveUsers) {
      setMainloading(true)
      requestInstance
        .get(`${constants.BASE_URL}get-all-requests`, {
          params: {
            getActiveonly: props.showOnlyActiveUsers === true ? true : false
          }
        })
        .then(response => {
          setMainloading(false)
          dispatch(setRequestsDataAdmin(response.data));
          navbarvalues()
        })
        .catch(err => {
          console.error('Error:', err);
          setMainloading(false)
        });
    }
    setrunuseffect(false)
    setloading(false)
  }, [dispatch, isupdatedAfterAction, props.showOnlyActiveUsers]);

  const handleAction = (id, action) => {
    setloading(id)
    let updatedFields;
    if (action === 'accept') {
      updatedFields = { status: 'active' };
    }
    else if (action === 'reject') {
      updatedFields = { status: 'Rejected' };
    }
    else if (action === 'delete-request') {
      updatedFields = { status: 'delete' };
    }
    else if (action === 'make-admin') {
      updatedFields = { UserType: 'President' };
    }
    else if (action === 'revert') {
      updatedFields = { UserType: 'student' };
    }
    requestInstance.patch(`${constants.BASE_URL}request-action/${id}`, updatedFields)
      .then(response => {
        if (response.data.success === true) {
          setisupdatedAfterAction(!isupdatedAfterAction)
          setrunuseffect(true)

          setloading(null)
        }
      })
      .catch(error => {

        setloading(null)
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
          {
            loading === record._id ? <Spin size='small' /> :
              props.showADDRemove ?
                <>
                  <Button icon={<CheckOutlined style={{ color: 'green' }} />} onClick={() => handleAction(record._id, 'accept')} />
                  <Button icon={<DeleteOutlined />} danger onClick={() => handleAction(record._id, 'delete-request')} />
                  <Button icon={< CancelOutlined />} danger onClick={() => handleAction(record._id, 'reject')} />
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
      {mainLoading ? <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          <Spin size='large' />
        </div>
      </div> : <Table columns={columns} dataSource={requestsData} style={{ overflowX: 'auto' }} />}
    </div>
  );
};

export default AttendeesTable;
