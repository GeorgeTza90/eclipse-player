const db = require("../db/db");

exports.getAllArtists = async (req, res) => {    
    try {
        const [rows] = await db.query("SELECT * FROM artists");
        res.json(rows);
    } catch (err) {
        console.error('Error loading artists', err);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.getArtist = async (req, res) => {
    const { name } = req.params;
    if (!name) return res.status(400).json({ error: "Artist name is required" });

    try {
        const [rows] = await db.query("SELECT * FROM artists WHERE name = ?", [name]);
        if (rows.length === 0) return res.status(404).json({ error: "Artist not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error("Error fetching artist:", err);
        res.status(500).json({ error: "Server error" });
    }
};
