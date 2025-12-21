const fs = require('fs/promises');

const listFiles = async (dir) => {
    const files = await fs.readdir(dir, { encoding: 'utf-8', withFileTypes: true, recursive: false });
    console.log(files);
}

const fileTypes = async (files) => {
    files.forEach(async (file) => {
        const stat = await fs.stat(file);
        console.log(`${file}:`, stat);
    });
}

module.exports = {
    listFiles,
    fileTypes
}