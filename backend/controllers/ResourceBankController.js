const ResourceBank = require('../models/ResourceBank');

// Create a new resource bank
async function createResourceBank(req, res) {
  try {
    const { title, type, accessCode } = req.body;
    const resourceBank = new ResourceBank({ title, type, accessCode });
    await resourceBank.save();
    res.status(201).json({ message: 'Resource bank created successfully', resourceBank });
  } catch (error) {
    res.status(500).json({ message: 'Error creating resource bank', error });
  }
}

// Delete a resource bank
async function deleteResourceBank(req, res) {
  try {
    const resourceBankId = req.params.id;
    const resourceBank = await ResourceBank.findByIdAndDelete(resourceBankId);
    if (!resourceBank) {
      return res.status(404).json({ message: 'Resource bank not found' });
    }
    res.json({ message: 'Resource bank deleted successfully', resourceBank });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource bank', error });
  }
}


async function getResourceBank(req, res) {
    try {
      const resourceBankId = req.params.id;
      const resourceBank = await ResourceBank.findById(resourceBankId);
  
      if (!resourceBank) {
        return res.status(404).json({ message: 'Resource bank not found' });
      }
  
      // If the resource bank is private, check for the password in the request body
      if (resourceBank.type === 'private') {
        const { password } = req.body;
        if (!password) {
          return res.status(400).json({ message: 'Password is required for private resource bank' });
        }
  
        // Check the provided password against the resource bank's accessCode
        if (password !== resourceBank.accessCode) {
          return res.status(401).json({ message: 'Invalid password for private resource bank' });
        }
      }
  
      res.json({ resourceBank });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving resource bank', error });
    }
  }
  
module.exports = { createResourceBank, deleteResourceBank ,getResourceBank};
