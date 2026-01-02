const fs = require('fs/promises');
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
const args = process.argv.slice(3);
const shouldShowTypes = args.includes('--show-types');
const shouldShowSize = args.includes('--size');
const shouldShowDate = args.includes('--date');

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

const getType = async (direnObj) => {
    console.log('Getting types...');
    // const filesType={}
    // for( const direnObj of files) {
        try {
            const fileName = direnObj.name.replace(/\x1B\[[0-9]*m/g, '');
            
            // if (direnObj.isFile()) {
                const fileFormat = fileName.toLowerCase().split('.', 2)[1];
                const fileType = getFileType(fileFormat);

                // filesType[fileName] = fileType;
                
            // } else if (direnObj.isDirectory()) {
                
                // filesType[fileName] = { icon:'📁', isFile:false}
            // }

            return fileType;
        } catch (err) {
            console.log(`no stat for ${err}`);
        }
    // };

    return filesType;
}

const getSize = async (direnObj) => { 
    console.log('Getting sizes...');
    // const filesSizes = {}
    // for (const direnObj of files) {
        try {

            const fileName = direnObj.name.replace(/\x1B\[[0-9]*m/g, '');
            const filePath = `${direnObj.parentPath}/${fileName}`

            const stat = await fs.stat(filePath);

            let file_size = formatSize(stat.size);

            // if (direnObj.isFile()) {
                // filesSizes[fileName] = file_size

                
                // filesSizes[fileName] = { icon: '📄', isFile: true, file_name: fileName, size: file_size }

            // } else if (direnObj.isDirectory()) {

                // filesSizes[fileName] = file_size;
            // }
            
            return file_size;

        } catch (err) {
            console.log(`no stat for ${err}`);
        }

    // };

    return filesSizes;
}

const getDate = async (direnObj) => {
    // const filesModified = {}
    
    try {

        const fileName = direnObj.name.replace(/\x1B\[[0-9]*m/g, '');
        const filePath = `${direnObj.parentPath}/${fileName}`

        const stat = await fs.stat(filePath);
        
            // filesModified[fileName] = new Date(stat.mtimeMs)
            // filesModified[fileName] = { icon: '📄', isFile: true, file_name: fileName, size: file_size }
        return new Date(stat.mtimeMs)

    } catch (err) {
        console.log(`no stat for ${err}`);
    }


    return filesModified;
}

const getFiles = async (filesArray) => {
    // Collect ALL data in one object
    const fileData = {};
    for (const direnObj of filesArray) {
        const filename = direnObj.name.replace(/\x1B\[[0-9]*m/g, '');
        fileData[filename] = {
            name: filename,
            icon: direnObj.isFile() ? '📄' : '📁',
            type: shouldShowTypes ? await getType(direnObj) : null,
            size: shouldShowSize ? await getSize(direnObj) : null,
            date: shouldShowDate ? await getDate(direnObj) : null
        };
    }
    return fileData
}

const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
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
    getType,
    getSize,
    getDate,
    getFiles
}