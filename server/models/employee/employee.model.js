module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("employee", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { arg: [2, 30], msg: 'First name must contain 2-30 characters!' }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { arg: [2, 30], msg: 'First name must contain 2-30 characters!' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 40],
        isEmail: { arg: true, msg: 'Please provide a valid email!' }
      }
    }

  });

  return Employee;
};
