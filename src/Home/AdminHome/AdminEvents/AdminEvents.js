import React, { useState } from 'react';
import { Button, Radio, Select, Space, Table, Tag } from 'antd';
import { Grid } from '@mui/material';
import { Typography} from '@mui/material';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import EventCard from './gridview';
const { Option } = Select;

const columns = [
  {
    title: 'Event Name',
    dataIndex: 'eventName',
    key: 'eventName',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Popularity',
    dataIndex: 'popularity',
    key: 'popularity',
    render: (popularity) => (
      <Tag color={popularity === 'popular' ? 'green' : 'geekblue'}>
        {popularity.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: () => (
      <Space>
        <Button icon={<EditOutlined />} />
        <Button icon={<DeleteOutlined />} danger />
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    eventName: 'Event 1',
    date: '2023-08-10',
    popularity: 'popular',
  },
  {
    key: '2',
    eventName: 'Event 2',
    date: '2023-08-15',
    popularity: 'latest',
  },
  // Add more event data here
];

const EventManagementInterface = () => {
    const [sortOption, setSortOption] = useState('latest');
    const [viewType, setViewType] = useState('grid');
  
    const handleSortChange = (value) => {
      setSortOption(value);
    };
  
    const handleViewTypeChange = (e) => {
      setViewType(e.target.value);
    };
  
    return (
      <Grid container>
        <Grid container style={{background:"DodgerBlue"}}>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <div style={{display:"flex",alignItems:"center",paddingLeft:"5%",height:"100%"}}> 
            <Typography variant='h6' style={{color:"white"}}>Manage Events</Typography>
          </div>
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={8} style={{textAlign:'right'}}>      
          <Grid container>
            <Grid item xs={12} sm={8} md={8} lg={10} style={{padding:"2%"}}>
              <Select defaultValue="latest" onChange={handleSortChange} >
                <Option value="latest">Latest</Option>
                <Option value="mostpopular">Most Popular</Option>
              </Select>
              </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2} style={{padding:"2%"}}>
              <Radio.Group  onChange={handleViewTypeChange} defaultValue="grid" buttonStyle="solid" value={viewType} > 
                <Radio.Button value="grid"><AppstoreOutlined style={{color:"black"}}/></Radio.Button>
                <Radio.Button value="plain"><UnorderedListOutlined /></Radio.Button>
            </Radio.Group>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
        <Grid container>
        <Grid item xs={12}>
          {viewType === 'grid' ? (
            <div >
                <EventCard/>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}> {/* Wrap table with overflowX */}
              <Table columns={columns} dataSource={data} />
            </div>
          )}
        </Grid>
        </Grid>
        <Grid container>
        <Grid item xs={12}>
        <div  style={{ width:"100%",position:"fixed",top: 'auto', bottom: 0, background: 'DodgerBlue',height: '34px' }}>
        <div>
        <div style={{textAlign:"center"}}>
            <Button type="primary" icon={<PlusOutlined />} onClick={()=>{console.log("heloo")}} style={{ flexGrow: 1, background: 'transparent',marginRight:"15%" }}>
            Add Event
            </Button>
        </div>
        </div>
        </div>
        </Grid>
        </Grid>

      </Grid>
    );
  };
  
  export default EventManagementInterface;