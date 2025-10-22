const express = require('express');
const multer = require('multer');
const Media = require('../models/Media')
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const newMedia = new Media({
            name: req.file.originalname,
            img: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });
        await newMedia.save();
        res.send('File uploaded successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
