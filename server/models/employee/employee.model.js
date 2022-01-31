module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define(
        'employee',
        {
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    min: {
                        args: [4],
                        msg: 'Minimum 4 characters required in fist name',
                    },
                    max: {
                        args: [30],
                        msg: 'Maximum 30 characters allowed in first name',
                    },
                    isAlpha: {
                        arg: true,
                        msg: 'First name must contain only alphabetic character!',
                    },
                },
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
                min: {
                    args: [4],
                    msg: 'Minimum 4 characters required in last name',
                },
                max: {
                    args: [30],
                    msg: 'Maximum 30 characters allowed in last name',
                },
                validate: {
                    isAlpha: {
                        arg: true,
                        msg: 'First name must contain only alphabetic character!',
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: {
                        arg: true,
                        msg: 'Please provide a valid email!',
                    },
                },
            },
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['email'],
                },
            ],
        }
    );

    return Employee;
};
