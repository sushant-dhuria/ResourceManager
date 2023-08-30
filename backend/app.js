const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
const authMiddleware = require('./middlewares/authMiddleware');
const UserRoute=require('./routes/UserRoute');
const ResourceBank=require('./routes/ResourceBank');
const cloudinary=require('cloudinary');
const resourceController = require('./controllers/resourceController'); 
const cookieParser = require('cookie-parser');
const { singleUpload } = require('./middlewares/multer');
const app = express();

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CloudinaryName,
  api_key: process.env.CloudinaryApi,
  api_secret: process.env.CloudinarySecret,
});

app.use(cookieParser());

// Parse incoming JSON data
app.use(express.json());
// Register a new user
app.use("/api/",UserRoute);

// Protected route
app.use('/api',ResourceBank);
app.post('/resourceupload',singleUpload,resourceController.uploadResource);

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

