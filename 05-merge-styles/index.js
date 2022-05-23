const fs = require('fs');
const path = require('path');

const folderFrom = path.join(__dirname, 'styles');
const fileTo = fs.createWriteStream( path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(folderFrom, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

  for (let file of files) {
    if (file.isFile()) {
      const fileFrom = path.join(folderFrom, file.name);

      if (path.extname(fileFrom).slice(1) === 'css') {
        const rs = fs.createReadStream(fileFrom);
        let data = '';

        rs.on('data', (chunk) => (data += chunk));
        rs.on('end', () => {
            fileTo.write(data.trim());
            fileTo.write('\n\n');
        });
        rs.on('error', (err) => {
            if (err) throw err;
        });
      }
    }
  };
});