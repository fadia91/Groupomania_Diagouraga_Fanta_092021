
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associate(db) {

			db.post.belongsTo(db.user, {
				onDelete : "CASCADE"
			});
			db.post.hasMany(db.reaction);

		}
	}
	Post.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},

		content: {
			allowNull: true,
			type: DataTypes.TEXT
		},
		imageUrl: {
			type: DataTypes.STRING,
			allowNull: true,

		},
		likes: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue:0,

		},
		dislikes: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue:0,

		},
		createdAt: {
			allowNull: false,
			type: DataTypes.TIME
		},
		updatedAt: {
			allowNull: true,
			type: DataTypes.DATE
		},
	},
		{
			sequelize,
			modelName: "post"
		})
	return Post
}