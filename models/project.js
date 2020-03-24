// Creating our Developer model
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    //
    /**
     * needed columns for project table are
     *Title
     *Decsription
     *ClientEmail
     *DeveloperEmail
     *Status
     */
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clientEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    developerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  });

  return Project;
};
