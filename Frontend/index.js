import * as Fs from 'fs'

function putObjectMinio(file, fileName){
    const fileStat = Fs.stat(file, function (err, stats) {
    const fileStream = Fs.createReadStream(file)
    if (err) {
    return console.log(err)
    }
    minioClient.putObject('mybucket', fileName, fileStream, stats.size, function (err, objInfo) {
    if (err) {
        return console.log(err) // err should be null
    }
    console.log('Success', objInfo)
    })
})
}

const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener('click', (event)=>{
    let filePath = fileInput.value;
    putObjectMinio(filePath, fileInput.name);
});