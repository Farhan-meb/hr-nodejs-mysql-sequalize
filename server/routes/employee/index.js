const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employee/employee.controller');

router.route('/').post(employeeController.addEmployee).get(employeeController.getAllEmployees);

router.route('/send-email').post(employeeController.sendEmail)

module.exports = router;