const express = require('express');
const cors = require('cors');
require('dotenv').config();
const songsRoutes = require('./routes/songs');
const authRoutes = require('./routes/auth');
const playlistRoutes = require('./routes/playlists');
const artistsRoutes = require('./routes/artists');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://console.cloudinary.com",
    "https://eclipseplayer.netlify.app",
    "https://eclipseplayer.com"
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/artists', artistsRoutes);

// Test route
app.get('/', (req, res) => res.send({ message: 'Server is running!' }));

// Unknown API routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
