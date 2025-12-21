const process = require('process');
const {listFiles, fileTypes} = require('./ls-command');

const folderName = process.argv[2];
const args = process.argv.slice[3];

const ls = async (folderName) => {
    const files = await listFiles(folderName);
    
}
ls(folderName);


