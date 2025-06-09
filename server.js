const express = require('express');
const path = require('path');
const config = require('./config');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);

// Serve React frontend build folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start server
const port = config.port || process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});