const db = require('../../database');
const Employee = db.employees;
const Op = db.Sequelize.Op;
const fs = require('fs');
const csv = require('csv-parser');
const catchAsync = require('../../utils/catchAsync');
const appError = require('../../utils/appError');
const AppError = require('../../utils/appError');
const email = require('../../helpers/email');

const addEmployee = catchAsync(async (req, res, next) => {
    const { first_name, last_name, email } = req.body;

    if (!first_name) return next(new AppError('First Name cannot be empty!'));
    if (!last_name) return next(new AppError('Last Name cannot be empty!'));
    if (!email) return next(new AppError('Email cannot be empty!'));

    const employee = {
        first_name,
        last_name,
        email,
    };

    await Employee.create(employee)
        .then((data) => {
            res.status(201).json({
                message: 'Successfully created employee!',
                employee: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message:
                    err.message ||
                    'Some error occurred while creating employee.',
            });
        });
});

const getAllEmployees = catchAsync(async (req, res, next) => {
    const { email } = req.body;

    const limit = parseInt(req.query.limit) || 5,
        page = parseInt(req.query.page) || 1;

    //if needed to search employees by email in future
    const condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

    await Employee.findAll({
        limit: limit,
        offset: (page - 1) * limit,
        where: condition,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'first_name', 'last_name', 'email'],
    })
        .then((data) => {
            res.status(200).json({
                employees: data,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving employees.',
            });
        });
});

const sendEmail = catchAsync(async (req, res, next) => {
    const { emails, subject, body } = req.body;

    const _emails = emails.join();

    if (emails.length <= 0) return next(new AppError('Email cannot be empty!'));
    if (!subject) return next(new AppError('Subject cannot be empty!'));
    if (!body) return next(new AppError('Body cannot be empty!'));

    const response = await email.sendEmail(_emails, subject, body);

    if (response) {
        res.status(200).json({
            message: 'Email sent successfully to',
            emails: emails,
        });
    } else {
        res.status(200).json({
            message: 'Couldnt send email!',
        });
    }
});

const importBulkEmployees = catchAsync(async (req, res, next) => {
    const file = req.file;

    let added = 0,
        skipped = 0;

    let addedEmployees = [],
        failedEmployees = [];

    const employees = [];

    fs.createReadStream('./uploads/' + file.filename)
        .pipe(csv({}))
        .on('data', async (data) => {
            const { first_name, last_name, email } = data;

            if (!first_name || !last_name || !email) {
                skipped += 1;
            } else {
                employees.push(data);
            }
        })
        .on('end', async () => {
            for (let employee of employees) {
                await Employee.create(employee)
                    .then((data) => {
                        added += 1;
                        addedEmployees.push(data);
                    })
                    .catch(() => {
                        skipped += 1;
                        failedEmployees.push(employee);
                    });
            }

            res.status(201).json({
                succeeded: 'Employee successfully imported ' + added,
                failed: 'Employee failed to import ' + skipped,
                addedEmployees,
                failedEmployees,
            });
        });
});

module.exports = {
    addEmployee,
    getAllEmployees,
    sendEmail,
    importBulkEmployees,
};
