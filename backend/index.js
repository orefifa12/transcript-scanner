const express = require('express');
const cors = require('cors'); // Import cors
const multer = require('multer');
const Tesseract = require('tesseract.js'); // Import Tesseract.js
const app = express();
const PORT = 5001;

// Configure CORS to allow requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Use Tesseract.js to process the image
  Tesseract.recognize(
    file.buffer,
    'eng', // Language
    {
      logger: info => console.log(info) // Log progress
    }
  ).then(({ data: { text } }) => {
    res.send({ text });
  }).catch(err => {
    res.status(500).send('Error processing the image.');
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
