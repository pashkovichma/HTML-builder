const fs = require('fs');
const path = require('path');

const folderFrom = path.join(__dirname, 'files');
const folderTo = path.join(__dirname, 'files-copy');

const copyDir = (folderFrom, folderTo) => {
  fs.rm(folderTo, { recursive: true, force: true }, (err) => {
    if (err) throw err;

    fs.mkdir(folderTo, { recursive: true }, (err) => {
      if (err) throw err;
    });

    fs.readdir(folderFrom, { withFileTypes: true }, (err, files) => {
      if (err) throw err;

      files.forEach((file) => {
        const fileFrom = path.join(folderFrom, file.name);
        const fileTo = path.join(folderTo, file.name);

        if (file.isDirectory()) {
          copyDir(fileFrom, fileTo);
        }

        if (file.isFile()) {
          fs.copyFile(fileFrom, fileTo, (err) => {
            if (err) throw err;
          });
        }
      });
    });
  });
};

copyDir(folderFrom, folderTo);