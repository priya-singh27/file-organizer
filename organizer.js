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

    const files = await getFiles(filesArray);
    for (const filename in files) {
        
        let file_data = files[filename]
        let data = `${file_data['icon']} ${file_data['name']}`;
        const meta_data = [];
        if (file_data.type) meta_data.push(file_data.type);
        if (file_data.size) meta_data.push(file_data.size);
        if (file_data.date) meta_data.push(file_data.date);
        
        if (meta_data.length > 0)
            data += `[${meta_data.join(', ')}]`;

        console.log(data);

    }
}
ls(folderName);


