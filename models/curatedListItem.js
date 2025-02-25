/**
 * models/curatedListItem.js
 */
module.exports = (sequelize, DataTypes) => {
    const CuratedListItem = sequelize.define(
      'CuratedListItem',
      {
        curatedListId: {
          type: DataTypes.INTEGER,
          references: { model: 'CuratedList', key: 'id' },
        },
        movieId: {
          type: DataTypes.INTEGER,
          references: { model: 'Movie', key: 'id' },
        },
        addedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        timestamps: true,
      }
    );
  
    // Associations
    CuratedListItem.associate = (models) => {
      CuratedListItem.belongsTo(models.CuratedList, { foreignKey: 'CuratedListId' });
      CuratedListItem.belongsTo(models.Movie, { foreignKey: 'movieId' });
    };
  
    return CuratedListItem;
  };
  