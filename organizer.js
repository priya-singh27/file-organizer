const process = require('process');
const { listFiles,
    getFiles } = require('./ls-command');

const folderName = process.argv[2];
const args = process.argv.slice(3);

const ls = async (folderName) => {
    const filesArray = await listFiles(folderName);
    // console.log(filesArray);
    // filesArray.forEach((direnObj) => {
    //     console.log(direnObj.name);
    // })

    console.log('-----------------------');

    const fileData = await getFiles(filesArray);
    for (const filename in fileData) {
        const data = fileData[filename];
        let output = `${data.icon} ${data.name}`; 
        // console.log(data);

        const parts = [];
        if (data.type) parts.push(data.type);
        if (data.size) parts.push(data.size);
        if (data.date) parts.push(data.date);

        if (parts.length > 0) {
            output += ` [${parts.join(', ')}]`;
        }

        console.log(output);
    }
}
ls(folderName);


