const db = require("../../database");
const Employee = db.employees;
const Op = db.Sequelize.Op;
const catchAsync = require('../../utils/catchAsync');
const appError = require('../../utils/appError');
const AppError = require("../../utils/appError");
const email = require('../../helpers/email');

const addEmployee = catchAsync(async (req, res, next) => {
    const { first_name, last_name, email } = req.body;

    if (!first_name) return next(new AppError('First Name cannot be empty!'));
    if (!last_name) return next(new AppError('Last Name cannot be empty!'));
    if (!email) return next(new AppError('Email cannot be empty!'));

    const employee = {
        first_name,
        last_name,
        email
    };

    Employee.create(employee)
        .then(data => {
            res.status(201).json({
                message: 'Successfully created employee!',
                employee: data,
            })
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while creating employee."
            });
        });

});

const getAllEmployees = catchAsync(async (req, res, next) => {
    const { email } = req.body;

    //if needed to search employees by email in future
    const condition = email ? { email: { [Op.like]: `%${email}%` } } : null;


    Employee.findAll({
        where: condition,
        order: [
            ['createdAt', 'DESC']
        ],
        attributes: ['id', 'first_name', 'last_name', 'email']
    })
        .then(data => {
            res.status(200).json({
                employees: data,
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving employees."
            });
        });
})

const sendEmail = catchAsync(async (req, res, next) => {
    const { emails, subject, body } = req.body;

    if (!emails) return next(new AppError('Email cannot be empty!'));
    if (!subject) return next(new AppError('Subject cannot be empty!'));
    if (!body) return next(new AppError('Body cannot be empty!'));

    const response = await email.sendEmail(emails, subject, body);

    if (response) {
        res.status(200).json({
            message: "Email sent successfully to : " + emails,
        })
    }
    else {
        res.status(200).json({
            message: "Couldnt send email!"
        })
    }

})

module.exports = { addEmployee, getAllEmployees, sendEmail }