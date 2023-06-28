import React, { useRef } from 'react';
import { Button, Box, Typography } from '@mui/material';

const UploadImageTemplate = () => {
  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    // Xử lý file tại đây
    console.log(file);
  };

  const handleOpenFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      border="2px dashed #ccc"
      borderRadius={4}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Drag and drop an image file or click below to upload.
      </Typography>
      <Button variant="contained" onClick={handleOpenFileDialog}>
        Choose File
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />
    </Box>
  );
};

export default UploadImageTemplate;
