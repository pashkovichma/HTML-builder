const fs = require('fs');
const path = require('path');
const folderFrom = path.join(__dirname, 'styles');
const folderTo = path.join(__dirname, 'project-list');

let data = [];

fs.readdir(folderFrom, { withFileTypes: true },(err, files) => {
    if (err) throw err;

    fs.rm(folderTo, { recursive: true, force: true }, err => {
      if (err) throw err;

      fs.mkdir(folderTo, { recursive: true }, (err) => {
        if (err) throw err;
      });

      files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'styles', file.name), path.join(__dirname, 'project-list', file.name), (err) => {
          if (err) throw err;
        });
      });

    });
        
    fs.mkdir(folderTo, { recursive: true }, (err) => {
      if (err) throw err;
    });

    files.forEach(file => {
        fs.stat(path.join(__dirname, 'styles', file), (err, stats) => {
            console.log(path);
            console.log();
            console.log(stats);
            console.log();
        
           /* if (!stats.isDirectory() && path.extname(file).slice(1) == 'css') {
                let rs = fs.createReadStream(path.join(__dirname, file.name));

                rs.on('data', (chunk) => {
                    data.push(chunk.toString());
                });

                rs.on('end', () => {
                    console.log(data);
                });
            }*/
        });
      
    });
    
  }
);

