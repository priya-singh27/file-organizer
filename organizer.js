const process = require('process');
const {listFiles, fileTypes} = require('./ls-command');

const folderName = process.argv[2];
const args = process.argv.slice(3);

const ls = async (folderName) => {
    const filesArray = await listFiles(folderName);
    filesArray.forEach((direnObj) => {
        console.log(direnObj.name);
    })


    if (args) {
        args.forEach(async (arg) => {
            if (arg === '--show-types') {
                // console.log(files);
                // await fileTypes(files);
            }
        })
    }
}
ls(folderName);


