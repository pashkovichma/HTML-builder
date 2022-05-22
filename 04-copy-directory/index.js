const fs = require('fs');
const path = require('path');
const folderFrom = path.join(__dirname, 'files');
const folderTo = path.join(__dirname, 'files-copy');

fs.readdir(folderFrom, { withFileTypes: true },(err, files) => {
    if (err) throw err;

    fs.rm(folderTo, { recursive: true, force: true }, err => {
      if (err) throw err;

      fs.mkdir(folderTo, { recursive: true }, (err) => {
        if (err) throw err;
      });

      files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), (err) => {
          if (err) throw err;
        });
      });

    });
        
    fs.mkdir(folderTo, { recursive: true }, (err) => {
      if (err) throw err;
    });

    files.forEach(file => {
      fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), (err) => {
        if (err) throw err;
      });
    });
    
  }
);