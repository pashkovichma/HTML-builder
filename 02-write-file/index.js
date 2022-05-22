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
    file.write(`${text}\n`, (error) => {
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
        console.log(`Ой, ошибка`);
    }
});