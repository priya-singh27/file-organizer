const process = require('process');
const {listFiles, fileTypes} = require('./ls-command');

const folderName = process.argv[2];
const args = process.argv.slice(3);

const ls = async (folderName) => {
    const filesArray = await listFiles(folderName);
    console.log(filesArray);
    filesArray.forEach((direnObj) => {
        console.log(direnObj.name);
    })

    console.log('-----------------------');

    if (args) {
        args.forEach(async (arg) => {
            if (arg === '--show-types') {
                const file_data = await fileTypes(filesArray);
                console.log(file_data);
            }
        })
    }
}
ls(folderName);


