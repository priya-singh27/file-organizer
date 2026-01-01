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
                const file_types= await fileTypes(filesArray);
                for (const key in file_types) {
                    if (file_types[key]['isFile']) console.log(`${file_types[key]['icon']} ${key} [${file_types[key]['file_type']}] [${file_types[key]['size']}]`);
                    else console.log(`${file_types[key]['icon']} ${key} [${file_types[key]['size']}]`);
                }
            }
        })
    }
}
ls(folderName);


