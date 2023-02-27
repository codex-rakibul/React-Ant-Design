import "./App.css";
import { Button, Progress, Space, Typography, Upload } from "antd";
import { FileOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";

function App() {
  const [files, setFiles] = useState({});
  const handleFileUpload = ({ file }) => {
    const getFileObject = (progress) => {
      return {
        name: file.name,
        uid: file.uid,
        progress: progress,
      };
    };
    axios.post("http://localhost:5500/fileUpload", file, {
      onUploadProgress: (event) => {
        setFiles((pre) => {
          return { ...pre, [file.uid]: getFileObject(event.progress) };
        });
      },
    });
  };
  return (
    <div style={{ margin: "20px 20px" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Upload
          multiple
          customRequest={handleFileUpload}
          showUploadList={false}
        >
          <Button type="primary">Click to Upload</Button>
        </Upload>
        {Object.values(files).map((file, index) => {
          return (
            <Space
              direction="vertical"
              key={index}
              style={{
                background: "white",
                color: "gray",
                width: "100%",
                padding: 8,
              }}
            >
              <Space>
                <FileOutlined />
                <Typography style={{ color: "gray" }}>{file.name}</Typography>
                <Typography.Text type="secondary"> 
                {" "}
                is being uploaded in {Math.ceil(file.estimated)}
                </Typography.Text>
              </Space>
              <Progress
                strokeColor={"tomato"}
                percent={Math.ceil(file.progress * 100)}
              />
            </Space>
          );
        })}
      </Space>
    </div>
  );
}

export default App;
