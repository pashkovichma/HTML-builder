const process = require('process');
const fs = require('fs');
const path = require('path');
const { stdout, stdin } = require('process');

const file = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Введите текст, пожалуйста\n');

stdin.on('data', (data) => {
    if (data.toString().trim() === 'exit') {
        process.exit();
    }
    file.write(data, (error) => {
        if (error) throw error;
    });
});

process.on('SIGINT', () => process.exit());
process.on('exit', (code) => {
    if (code === 0) {
        console.log('Пока - пока');
    } else {
        rl.write(`Ой, ошибка\n`);
    }
});

/*const process = require('process');
const fs = require('fs');
const path = require('path');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const file = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

rl.write('Введите текст, пожалуйста\n');

rl.on('line', (text) => {
    if (text.trim() === 'exit') {
        process.exit();
    }
    file.write(text, (error) => {
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
*/