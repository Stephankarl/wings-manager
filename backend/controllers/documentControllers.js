const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require('crypto')

const User = require('../models/User');
const serverResponse = require('../utils/serverResponse');
const messages = require('../config/messages');
const { documentsToken } = require('../utils/generateToken');

// AWS S3 Configuration
const bucketName=process.env.BUCKET_NAME
const bucketRegion=process.env.BUCKET_REGION
const bucketAccessKey=process.env.BUCKET_ACCESS_KEY
const bucketSecretAccessKey=process.env.BUCKET_SECRET_ACCESS_KEY

// Create S3 Client
const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: bucketAccessKey,
        secretAccessKey: bucketSecretAccessKey
    }
});

// Generate random string for file name
const generateRandomString = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')


//Get User Document urls Route
exports.getDocuments = async (req, res) => {
    const userDocs = await User.findById(req.user.id).select('documents')

    for (const doc of userDocs.documents) {
        const getObjectParams = {
            Bucket: bucketName,
            Key: doc.fileName
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        doc.documentUrl = url
    }
    serverResponse.sendSuccess(res, messages.SUCCESSFUL, userDocs.documents)
}

// ************************************************************************************************************

// Upload document to S3 Route
exports.uploadDocument = async (req, res) => {
    try {
        //Create file name
        const randomString = generateRandomString()
        const fileName = `${req.body.name}_${randomString}`
        
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        });
    
        // Send To S3
        await s3.send(command)

        const document = {
            fileName,
            expiryDate: req.body.expiryDate,
            name: req.body.name
        }
    
        //Update User Document
        await User.findByIdAndUpdate(req.user.id, { $push: { documents: document } })

        //Get Document Url
        const getParams = {
            Bucket: bucketName,
            Key: fileName
        };
        const getCommand = new GetObjectCommand(getParams);
        const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
        document.documentUrl = url
    
        //Send Response

        return serverResponse.sendSuccess(res, messages.SUCCESSFUL_UPDATE, document)
        
    } catch (error) {
        serverResponse.sendError(res, messages.INTERNAL_SERVER_ERROR)
    }
}

// ************************************************************************************************************

exports.deleteDocument = async (req, res) => {
    const { id } = req.user
    try {
        await User.findByIdAndUpdate(id, { $pull: { documents: { fileName: req.body.fileName } } }, { new: true })
        
        const params = {
            Bucket: bucketName,
            Key: req.body.fileName
        };

        const command = new DeleteObjectCommand(params);
        await s3.send(command)

    
        return serverResponse.sendSuccess(res, messages.SUCCESSFUL_DELETE, req.body.fileName)

    } catch (error) {
        return serverResponse.sendError(res, messages.INTERNAL_SERVER_ERROR)
        
    }
}


// Test Route
exports.uploadTest = async (req, res) => {
   console.log('Test Route')
}