const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Post/User Associations
Post.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Post, {
  foreignKey: "user_id",
});

// Comment/Post Associations
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

// Comment/User Associations
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  Post,
  Comment,
};
