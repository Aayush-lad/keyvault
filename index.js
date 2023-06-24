require('dotenv').config()
const express = require('express');
const app = express();
// In-memory key-value store
const keyValueStore = {
  text_analytics_endpoint : process.env.TEXT_ANALYTICS_ENDPOINT || 'https://centralindia.api.cognitive.microsoft.com/text/analytics/v2.0/',
  text_analytics_key : process.env.TEXT_ANALYTICS_KEY ,
  subscription:process.env.SUBSCRIPTION,
  API_KEY : process.env.API_KEY,
  TRANSLATOR_ENDPOINT : 'https://api.cognitive.microsofttranslator.com/',
  TRANSLATOR_KEY : process.env.TRANSLATOR_KEY,
  subscription_key : process.env.SUBSCRIPTION_KEY,
  endpoint : 'https://centralindia.api.cognitive.microsoft.com/sts/v1.0/issuetoken'
};
console.log(keyValueStore);
// API endpoint to get value by key
app.get('/api/get-value', (req, res) => {
  const key = req.query.key;

  if (!key) {
    return res.status(400).json({ error: 'Key is required' });
  }

  const value = keyValueStore[key];
  if (value === undefined) {
    return res.status(404).json({ error: 'Key not found' });
  }

  return res.json({ key, value });
});

// Start the server
const port = process.env.PORT||3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
