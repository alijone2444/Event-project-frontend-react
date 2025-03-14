import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import axios from "axios";
import constants from "../../Constants/constants";
import createAuthenticatedRequest from "../../RequestwithHeader";
import { useMediaQuery } from "@mui/material";
import TopBar from "../AdminBar";
const { TextArea } = Input;
const AboutEventoEditor = () => {
  const [text, setText] = useState("");
  const isSmallScreen = useMediaQuery("(max-width: 899px)"); // Small screens (sm and below)
  const [loading, setLoading] = useState(false);
const requsetInstance=createAuthenticatedRequest()
  useEffect(() => {
    fetchText();
  }, []);

  const fetchText = async () => {
    try {
      const response = await requsetInstance.get(`${constants.BASE_URL}get-evento-knowledge`);
      setText(response.data.Knowledge || ""); 
    } catch (error) {
      console.error("Error fetching text:", error);
      message.error("Failed to fetch text");
    }
  };

  const saveText = async () => {
    try {
      setLoading(true); 
      await requsetInstance.put(`${constants.BASE_URL}save-evento-knowledge`, { AboutEventive: text });
      message.success("Text saved successfully!");

    } catch (error) {
      console.error("Error saving text:", error);
      message.error("Failed to save text");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
        <TopBar title={'Evento Knowledge'}/>
    <div style={{ padding: "24px" }}>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)} // Update the text state on change
        placeholder="Enter AboutEvento text"
        autoSize={{ minRows: 10, maxRows:isSmallScreen? 22 : 45 }} // Make the input field full-page
        style={{ width: "100%", marginBottom: "16px" }}
      />
      <div style={{width:"100%",textAlign:'center'}}>
      <Button
        type="primary"
        style={{width:"30%"}}
        onClick={saveText}
        loading={loading} // Show loading spinner when saving
      >
        Save
      </Button>
      </div>
    </div>
    </>
  );
};

export default AboutEventoEditor;