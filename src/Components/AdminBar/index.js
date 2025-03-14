import React from "react";
import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;

const TopBar = ({ title }) => {
  return (
    <Header
      style={{
        backgroundColor: "dodgerblue", // Dark background color
        padding: "0 24px", // Add padding
        display: "flex",
        alignItems: "center", // Center vertically
      }}
    >
      <Title
        level={4}
        style={{
          color: "#fff", // White text color
          margin: 0, // Remove default margin
        }}
      >
        {title} {/* Display the title prop */}
      </Title>
    </Header>
  );
};

export default TopBar;