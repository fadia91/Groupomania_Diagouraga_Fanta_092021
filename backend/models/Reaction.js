
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
	class Reaction extends Model {
		static associate(db) {

			db.reaction.belongsTo(db.user, {
				onDelete : "CASCADE"
			});
			db.reaction.belongsTo(db.post, {
				onDelete : "CASCADE"
			});
		}
	}
	Reaction.init({
		type : {type : DataTypes.INTEGER}
	},
		{
			sequelize,
			modelName: "reaction"
		})
	return Reaction
}