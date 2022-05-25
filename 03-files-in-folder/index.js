const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, {withFileTypes: true }, (err, files) => {
  if (err) throw err;

    for (let file of files) {
        const name = file.name.split('.').slice(0, -1).join('.');
        const filePath = path.join(__dirname, 'secret-folder', file.name);
        const extension = path.extname(filePath).slice(1);

      fs.stat(filePath, (err, file) => {
        if (err) throw err;
        console.log( `${name} - ${extension} - ${file.size}B`);
      })
    }
  });
