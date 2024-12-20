import * as Minio from 'minio'
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;;

const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: '9r6ZsISOC3fAqWV5S2O4',
  secretKey: 'rNd46UUrag515C4h0J0RjclyFMrSx8J1IGjTIDNM',
})

// await minioClient.makeBucket('mybucket', 'us-east-1')
// console.log('Bucket created successfully in "us-east-1".')

// import * as Fs from 'fs'
// const file = 'C:\\Users\\ADMIN\\OneDrive\\Desktop\\UI\\minioPro1\\temp.txt'
// const fileStream = Fs.createReadStream(file)
// const fileStat = Fs.stat(file, function (err, stats) {
//   if (err) {
//     return console.log(err)
//   }
//   minioClient.putObject('mybucket', 'temp', fileStream, stats.size, function (err, objInfo) {
//     if (err) {
//       return console.log(err) // err should be null
//     }
//     console.log('Success', objInfo)
//   })
// })

const fs = import('fs');
const path = import('path');

(async () => {
  const bucketName = 'mybucket';
  const objectName = 'temp';
  const outputFilePath = "C:\\Users\\ADMIN\\OneDrive\\Desktop\\UI\\testing\\" + 'output-temp-file.txt';

  try {
    let size = 0;
    const fileStream = (await fs).createWriteStream(outputFilePath);
    const dataStream = await minioClient.getObject(bucketName, objectName);
    dataStream.on('data', function (chunk) {
      size += chunk.length;
      fileStream.write(chunk);
    });

    dataStream.on('end', function () {
      fileStream.end(); 
      console.log(`Data saved to: ${outputFilePath}`);
    });

    dataStream.on('error', function (err) {
      console.error('Error reading the data stream:', err);
      fileStream.end(); 
    });

    fileStream.on('error', function (err) {
      console.error('Error writing to file:', err);
    });
  } catch (err) {
    console.error('Error fetching object from MinIO:', err);
  }
})();
