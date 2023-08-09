import React from 'react';
import { Table, Button ,Tag } from 'antd';
import { Grid, Typography ,useMediaQuery } from '@mui/material';
const AttendeesTable = ({  onAccept, onReject }) => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Adjust the max-width value as needed
    const data = [
        {
          key: '1',
          username: 'John Doe',
          date: '2023-08-09',
          department: 'Marketing',
          status: 'Pending',
        },
        {
          key: '2',
          username: 'Jane Smith',
          date: '2023-08-10',
          department: 'Sales',
          status: 'Pending',
        },
        {
          key: '3',
          username: 'Michael Johnson',
          date: '2023-08-11',
          department: 'Engineering',
          status: 'Accepted',
        },
        {
          key: '4',
          username: 'Emily Brown',
          date: '2023-08-12',
          department: 'HR',
          status: 'Pending',
        },
        {
          key: '5',
          username: 'David Lee',
          date: '2023-08-13',
          department: 'Finance',
          status: 'Rejected',
        },
      ];
    const pendingRequests = data.filter(request => request.status === 'Pending').length;
    const acceptedRequests = data.filter(request => request.status === 'Accepted').length;
    const rejectedRequests = data.filter(request => request.status === 'Rejected').length;
  
    
      
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          {record.status === 'Pending' && (
            <>
              <Button type="primary" onClick={() => onAccept(record.key)}>
                Accept
              </Button>
              <Button danger onClick={() => onReject(record.key)}>
                Reject
              </Button>
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div style={{overflowX:"auto"}}>
      <Grid container alignItems="center" justifyContent="space-between" style={{backgroundColor:"dodgerblue"}}>
      <Grid item>
        <Typography variant="h6" style={{color:"white",padding:"5%"}}>Registrations</Typography>
      </Grid>
      <Grid item style={{paddingBottom:isSmallScreen ?"5%":"0",paddingLeft:isSmallScreen ?"5%":"0"}}>
        <Tag color="blue">Pending: {pendingRequests}</Tag>
        <Tag color="green">Accepted: {acceptedRequests}</Tag>
        <Tag color="red">Rejected: {rejectedRequests}</Tag>
      </Grid>
    </Grid>
      <Table columns={columns} dataSource={data} />
    </div>
  );

};

export default AttendeesTable;
