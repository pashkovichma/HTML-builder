const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
    for (let file of files) {
        fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
        if (!stats.isDirectory()) {
          console.log( `${path.basename(file, path.extname(file))} - ${path.extname(file).slice(1)} - ${stats.size}B`);
        }
      });
    }
  });
