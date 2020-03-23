// Creating our Developer model
module.exports = function(sequelize, DataTypes) {
  var Developer = sequelize.define("Developer", {
    //
    /**
     * needed columns for developer table are
     * full name
     * email
     * contact number
     * skills
     * experience
     * portfolio link
     * past projects
     * active projects
     */
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    contact: {
      type: DataTypes.STRING
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: false
    },
    experience: {
      type: DataTypes.INTEGER,
      aloowNull: false
    },
    portfolioLink: {
      type: DataTypes.STRING
    },
    pastProjects: {
      type: DataTypes.INTEGER
    },
    activeProjects: {
      type: DataTypes.INTEGER
    }
  });

  return Developer;
};
