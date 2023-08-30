const express=require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const resourceBankController = require('../controllers/ResourceBankController'); 
router.route("/resourceBanks").post(authMiddleware,resourceBankController.createResourceBank);
router.route("//resourceBanks/:id").delete(authMiddleware,resourceBankController.deleteResourceBank);
router.route("/resourceBanks/:id").get(authMiddleware,resourceBankController.getResourceBank);
module.exports= router;