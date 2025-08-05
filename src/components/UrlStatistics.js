import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

function UrlStatistics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/stats')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h5">URL Click Statistics</Typography>
      {data.map((item, index) => (
        <Box key={index} mt={2}>
          <Typography>Original: {item.longUrl}</Typography>
          <Typography>Short: {item.shortUrl}</Typography>
          <Typography>Clicks: {item.clicks}</Typography>
          <Typography>Created: {item.createdAt}</Typography>
          <Typography>Expires: {item.expiry}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default UrlStatistics;