const Tesseract = require('tesseract.js');

async function performOCR(imagePath) {
  try {
    const result = await Tesseract.recognize(
      imagePath,
      'eng', // Language
      {
        logger: info => console.log(info), // Optional logging
      }
    );
    return result.data.text;
  } catch (error) {
    console.error('OCR Error:', error);
    throw error;
  }
}

module.exports = { performOCR };
