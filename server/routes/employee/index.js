const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employee/employee.controller');
const multer = require('multer');
const upload = multer({
    dest: 'uploads',
    limits: { fieldSize: 25 * 1024 * 1024 },
});

router.route('/').post(employeeController.addEmployee).get(employeeController.getAllEmployees);

router.route('/send-email').post(employeeController.sendEmail);

router.route('/import-bulk-employees').post(upload.single('file'), employeeController.importBulkEmployees);

module.exports = router;