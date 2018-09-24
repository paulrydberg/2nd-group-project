module.exports = function (sequelize, DataTypes) {

  var Expense = sequelize.define('Expense', {
    // Giving the Expense model a name of type STRING
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    signup_date: DataTypes.DATEONLY,
    contract_length: DataTypes.DECIMAL(10, 0),
    amount: DataTypes.DECIMAL(10, 2),
    remind_custom: DataTypes.BOOLEAN,
    custom_date: DataTypes.DATEONLY

  });

  Expense.associate = function (models) {
    // Associating Expense with Posts
    // When an Expense is deleted, also delete any associated Posts
    Expense.hasMany(models.Post, {
      onDelete: 'cascade'
    });
  };

  return Expense;
};
