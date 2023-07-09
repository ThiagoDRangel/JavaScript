const CourseSchema = (sequelize, DataTypes) => {
  const CourseTable = sequelize.define('Course', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    creationDate: DataTypes.DATE,
    active: DataTypes.BOOLEAN,
  },
    {
      tableName: 'courses',
      underscored: true,
      timestamps: false // Avisando ao sequelize que não irei utilizar createdAt updatedAt
    });
  return CourseTable;
};

module.exports = CourseSchema;