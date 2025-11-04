const db = require("../db/db");

exports.getSongs = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM songs");
    const songs = rows;    
    res.json(songs);
  } catch (err) {
    console.error('Error on loading songs', err);
    res.status(500).json({ error: "Server error" });
  }
};