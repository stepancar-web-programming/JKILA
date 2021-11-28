const { Comment } = require('../models/models');
const customError = require('../error/customError');

async function create(req, res) {
  const { body, user, issue } = req.body;
  const comment = await Comment.create({
    body, user_id: user, issue_id: issue,
  });
  return res.json(comment);
}

async function destroy(req, res) {
  const { id } = req.params;
  await Comment.destroy({ where: { id } });
  return res.json({ message: `Comment with ID = ${id} deleted` });
}

async function getAll(req, res) {
  const comments = await Comment.findAll();
  return res.json(comments);
}

async function getOne(req, res, next) {
  const { id } = req.params;
  const comment = await Comment.findOne({ where: { id } });
  if (comment === null) {
    return next(customError.badRequest('There is no COMMENT with this ID'));
  }
  res.json(comment);
}

module.exports = {
  create,
  getOne,
  getAll,
  destroy,
};