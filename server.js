const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Tạo thư mục uploads nếu chưa có
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Cấu hình lưu file
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const student = req.body.studentName.replace(/\s+/g, '_');
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, `${student}_${uniqueSuffix}`);
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send("Không có file được tải lên.");
  res.send(`✅ Đã nộp bài: ${req.file.filename}`);
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
