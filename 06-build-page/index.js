const { Console } = require('console');
const fs = require('fs');
const path = require('path');

const folderAssetsFrom = path.join(__dirname, 'assets');
const folderAssetsTo = path.join(__dirname, 'project-dist/assets');
const folderStylesFrom = path.join(__dirname, 'styles');
const templateHtml = path.join(__dirname, 'template.html');
const indexHtml = path.join(__dirname, 'project-dist/index.html');

//create project-dist folder
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
});

//create project-dist/index.html
fs.copyFile(templateHtml, indexHtml, (err) => {
    if (err) {
      return console.error(err);
    }
  });
  
  fs.readFile(templateHtml, 'utf-8', (err, data) => {
    if (err) console.log(err);
  
    let templateData = data;
    const templateTags = data.match(/{{\w+}}/gm);
    
    for (let tag of templateTags) {
      const tagPath = path.join(__dirname,'components',`${tag.slice(2, -2)}.html`,
      );
  
      fs.readFile(tagPath, 'utf-8', (err, dataTag) => {
        if (err) console.log(err);
  
        templateData = templateData.replace(tag, dataTag);
  
        fs.rm(indexHtml, { recursive: true, force: true }, (err) => {
          if (err) {
            return console.error(err);
          }
          const index = fs.createWriteStream(indexHtml);
          index.write(templateData);
        });
      });
    }
  });

//create project-dist/style.css
const style = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'),
  
);

fs.readdir(folderStylesFrom, { withFileTypes: true }, (err, files) => {
  if (err) {
    return console.error(err);
  }

  for (let file of files) {
    if (file.isFile()) {
      const fileFrom = path.join(folderStylesFrom, file.name);
      
      if (path.extname(fileFrom).slice(1) === 'css') {
        const rs = fs.createReadStream(fileFrom, 'utf-8');
        let data = '';

        rs.on('data', (chunk) => (data += chunk));
        rs.on('end', () => {
          style.write(data.trim());
          style.write('\n');
        });
        rs.on('error', (err) => {
            if (err) throw err;
        });
      }
    }
  };
});

//create project-dist/assets
const copyDir = (folderFrom, folderTo) => {
  fs.rm(folderTo, { recursive: true, force: true }, (err) => {
    if (err) throw err;

    fs.mkdir(folderTo, { recursive: true }, (err) => {
        if (err) throw err;
    });

    fs.readdir(folderFrom, { withFileTypes: true }, (err, files) => {
        if (err) throw err;

        for (let file of files) {
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
        };
    });
  });
};

copyDir(folderAssetsFrom, folderAssetsTo);