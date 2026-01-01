const fs = require('fs/promises');

const listFiles = async (dir) => {
    const files = await fs.readdir(dir, { encoding: 'utf-8', withFileTypes: true, recursive: false });
    files.forEach(async (dirent) => {
        try {
            if (dirent.isFile()) {
                dirent.name = `\x1B[33m${dirent.name}\x1B[0m`;//yellow
            }
            else if (dirent.isDirectory()) {
                dirent.name = `\x1B[31m${dirent.name}\x1B[0m`;//red
            } else if (dirent.isSymbolicLink()) {
                dirent.name = `\x1B[34m${dirent.name}\x1B[0m`;
            }

        } catch (err) {
            console.log(err);
        }
    });
    return files;
}

const SIMPLE_CATEGORIES = {
    "document": ['pdf', 'doc', 'docx', 'txt'],
    "code": ['js', 'py', 'java', 'cpp', 'html', 'css', 'php'], 
    "image": ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
    "video": ['avi', 'mp4', 'webm', 'mov'],
    "audio": ['mp3', 'wav', 'flac', 'aac'],
    "archive": ['zip', 'rar', '7z'],
    "security": ['pem', 'crt', 'key', 'cer'],
    "config": ['json', 'yml', 'yaml', 'toml', 'ini', 'env'],
    "data": ['csv', 'xml', 'sql', 'db', 'parquet'],
};

const fileTypes = async (files) => {
    files.forEach(async (direnObj) => {
        try {
            const fileName = direnObj.name.replace(/\x1B\[[0-9]*m/g, '');
            const filePath = `${direnObj.parentPath}/${fileName}`
            
            const stat = await fs.stat(filePath);
            if (direnObj.isFile()) {
                const fileFormat = fileName.toLowerCase().split('.', 2)[1];
                const fileType = getFileType(fileFormat);
                // console.log(`${fileName}: [${fileType}]\n`);
                return {type: 'file', file_name: fileName, file_type:fileType}
            } else if (direnObj.isDirectory()) {
                return { type: 'directory', size: stat.size };
            }
        } catch (err) {
            console.log(`no stat for ${err}`);
        }
        
    });
}

const getFileType = (format) => {
    if (SIMPLE_CATEGORIES['document'].includes(format)) {
        return 'document';
    } else if (SIMPLE_CATEGORIES['code'].includes(format)) {
        return 'code';
    } else if (SIMPLE_CATEGORIES['image'].includes(format)) {
        return 'image';
    } else if (SIMPLE_CATEGORIES['video'].includes(format)) {
        return 'video';
    } else if (SIMPLE_CATEGORIES['archive'].includes(format)) {
        return 'archive';
    } else if (SIMPLE_CATEGORIES['security'].includes(format)) {
        return 'security';
    } else if (SIMPLE_CATEGORIES['config'].includes(format)) {
        return 'config';
    } else if (SIMPLE_CATEGORIES['data'].includes(format)) {
        return 'data';
    }
    else return 'other'
}

module.exports = {
    listFiles,
    fileTypes,
    
}