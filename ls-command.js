const fs = require('fs/promises');

const listFiles = async (dir) => {
    const files = await fs.readdir(dir, { encoding: 'utf-8', withFileTypes: true, recursive: false });
    files.forEach(async (dirent) => {
        try {
            if (dirent.isFile()) {
                dirent.name = `\x1B[33m${dirent.name}\x1B[0m`;
            }
            else if (dirent.isDirectory()) {
                dirent.name = `\x1B[31m${dirent.name}\x1B[0m`;
            } else if (dirent.isSymbolicLink()) {
                dirent.name = `\x1B[34m${dirent.name}\x1B[0m`;
            }

        } catch (err) {
            console.log(err);
        }
    });
    return files;
}

const fileTypes = async (files) => {
    files.forEach(async (file) => {
        try {
            const isFile = file.isFile();
            if (isFile) {

            }
            else {
                const isDir = file.isDirectory();
                if (isDir) {
                    
                }
            }

            // const filePath =`${file.parentPath}/${file.name}`
            // const stat = await fs.stat(filePath);
            // console.log(`${file.name}:`, stat);

        } catch (err) {
            console.log(`no stat for ${file}`);
        }
        
    });
}

module.exports = {
    listFiles,
    fileTypes,
    
}