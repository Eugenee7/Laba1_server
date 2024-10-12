const http = require('http');
const fs = require('fs');
const path = require('path');

// Створення сервера
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Відправляємо HTML-файл на запит за кореневою URL
    const filePath = path.join(__dirname, '../golovna_html/golova.html');
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Помилка сервера');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/time') {
    // Відправляємо дату й час у форматі JSON
    const currentTime = new Date().toLocaleString();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ time: currentTime }));
  } else {
    // Обробка 404 - сторінка не знайдена
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404: Сторінка не знайдена');
  }
});

// Запуск сервера на порту 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
