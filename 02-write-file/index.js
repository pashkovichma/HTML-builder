const process = require('process');
const fs = require('fs');
const path = require('path');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const file = fs.createWriteStream(path.join(__dirname, 'text.txt'));

rl.write('Введите текст, пожалуйста\n');

rl.on('line', (text) => {
    if (text.trim() === 'exit') {
        process.exit();
    }
    file.write(text.toString(), (error) => {
        if (error) throw error;
    });
});

process.on('SIGINT', () => {
    process.exit();
});

process.on('exit', (code) => {
    if (code === 0) {
        console.log('Пока - пока');
    } else {
        rl.write(`Ой, ошибка\n`);
    }
});

/*
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const pathToFile = path.join('02-write-file', 'text.txt');

const fileText = fs.createWriteStream(pathToFile);