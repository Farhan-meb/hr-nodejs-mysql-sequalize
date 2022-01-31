module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('employee', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 32],
                // isAlpha: {
                //     arg: true,
                //     msg: 'Please provide a valid first name!',
                // },
            },
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: {
                    args: [30],
                    msg: 'Maximum 30 characters allowed in last name',
                },
                min: {
                    args: [4],
                    msg: 'Minimum 4 characters required in last name',
                },
                // isAlpha: {
                //     arg: true,
                //     msg: 'Please provide a valid last name!',
                // },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: { arg: true, msg: 'Please provide a valid email!' },
            },
        },
    });

    return Employee;
};
