const cloudinary = require('cloudinary');
const Resource = require('../models/Resource'); // Adjust the path to your Resource model
const getDataUri=require('../utils/datauri')


const uploadResource = async (req, res) => {
  try {
    const { title, type, creatorId, isPrivate } = req.body; // Access public_id of the uploaded file
    const file = req.file;
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.uploader.upload(fileUri.content, {
     resource_type: "raw",
    });
  
    // Upload successful, now create a resource record in MongoDB
    const newResource = new Resource({
      title,
      type,
      content: mycloud.public_id,
      url: mycloud.secure_url, 
      creator: creatorId,
      isPrivate
    });

    await newResource.save();

    res.json({ message: 'Resource uploaded and saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the resource' });
  }
};

module.exports = {
  uploadResource
};
