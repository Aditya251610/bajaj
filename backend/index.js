const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const cors = require('cors');

// CORS Middleware
app.use(cors())
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Origin', 'https://bajaj-black-ten.vercel.app'); // Specify your frontend origin
//   res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, ' +
//     'Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   );

//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200); // Handle preflight requests
//   }
//   next();
// });

app.use(express.json());
app.use(bodyParser.json());

// GET Route Example
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST Route Example
app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  let numbers = [];
  let alphabets = [];
  let highestLowerCase = '';

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === 'string') {
      alphabets.push(item);
      if (/[a-z]/.test(item)) {
        highestLowerCase = item > highestLowerCase ? item : highestLowerCase;
      }
    }
  });

  const fileValid = !!file_b64;
  const fileMimeType = 'image/png'; // Ensure correct MIME type
  const fileSizeKB = file_b64 ? Math.round(Buffer.byteLength(file_b64, 'base64') / 1024) : 0;

  res.json({
    is_success: true,
    user_id: 'aditya_sharma_16062003',
    email: 'as4175@srmist.edu.in',
    roll_number: 'RA2111027010189',
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowerCase ? [highestLowerCase] : [],
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB,
  });
});

// Root Route
app.all('/', (req, res) => {
  res.json({ message: 'Root route' });
});

// Server port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
