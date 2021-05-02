const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = "redditbucket1";
const region = "us-east-2";
const accessKeyId = "AKIA4LA6SJEMRQMJOGYS";

const secretAccessKey = "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";

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename + ".jpg",
    ACL: "public-read",
    ContentType: "image/png",
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;