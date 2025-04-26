import AWS from "aws-sdk";
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";

const AWS_BUCKET = "akshayadev-s3";
const AWS_ACCESS_KEY = "AKIATTSKFQ5LFRT3E3IH";
const AWS_SECRET_KEY = "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";
const AWS_REGION = "eu-north-1";

// Configure AWS credentials and region (ideally via environment variables)
// const s3 = new AWS.S3({
//     accessKeyId: "AKIATTSKFQ5LFRT3E3IH",
//     secretAccessKey: "f8YUh0qoWv0AGpMLdyQ6fK+kWEmIRxZYn2F6GyiS",
//     region: "eu-north-1"
// });

/**
 * Uploads a file to S3.
 * @param {Object} file - The file object, e.g., from req.file.
 * @returns {Promise<Object>} - The S3 upload result.
 */

// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
});

export const uploadToS3 = async (file) => {

    try {

        const params = {
            Bucket: AWS_BUCKET,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            // ACL: "public-read" // Optional: make the file public
        };

        const command = new PutObjectCommand(params);
        const fileUrl = `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${file.originalname}`;
        await s3.send(command);
        return fileUrl;
    } catch (e) {
        throw e;
    }
}

// export const uploadToS3 = async (file) => {
//     const params = {
//         Bucket: "akshayadev-s3",           // S3 bucket name
//         Key: file.originalname,                   // File name to save as in S3
//         Body: file.buffer,                        // File buffer
//         ContentType: file.mimetype,               // MIME type
//         ACL: 'public-read'                        // Optional: make file public
//     };
//
//     return s3.upload(params).promise();
// }
