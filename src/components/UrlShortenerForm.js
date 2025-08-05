import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function UrlShortenerForm() {
  const [urls, setUrls] = useState(['']);
  const [results, setResults] = useState([]);

  const handleInputChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    if (urls.length < 5) setUrls([...urls, '']);
  };

  const handleSubmit = async () => {
    const payload = urls.map((url) => ({
      id: uuidv4(),
      longUrl: url,
      validity: 30, // default
      shortCode: null,
    }));
    try {
      const res = await axios.post('http://localhost:3001/api/shorten', payload);
      setResults(res.data);
    } catch (err) {
      alert('Error shortening URL');
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h5">URL Shortener</Typography>
      {urls.map((url, idx) => (
        <TextField
          key={idx}
          label={`URL ${idx + 1}`}
          fullWidth
          margin="normal"
          value={url}
          onChange={(e) => handleInputChange(idx, e.target.value)}
        />
      ))}
      <Button variant="contained" onClick={addUrlField} disabled={urls.length >= 5}>
        + Add URL
      </Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>
        Shorten
      </Button>

      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Shortened URLs:</Typography>
          {results.map((r) => (
            <Typography key={r.shortUrl}>
              {r.shortUrl} (Expires in {r.validity} min)
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default UrlShortenerForm;