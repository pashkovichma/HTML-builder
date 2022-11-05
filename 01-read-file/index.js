const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname, 'text.txt'));

let data = '';

rs.on('data', (chunk) => data += chunk.toString());
rs.on('end', () => console.log(data));
rs.on('error', (error) => console.log('Error:', error.message));