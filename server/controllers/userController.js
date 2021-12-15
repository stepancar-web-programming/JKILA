const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customError = require('../error/customError');
const config = require('../config/default.json');
const { User, Workspace, Issue } = require('../models/models');

const generateJwt = (id, username, role) => jwt.sign(
  { id, username, role },
  config.SECRET_KEY,
  { expiresIn: '24h' },
);

async function registration(req, res, next) {
  const {
    username, password, role, fName, lName,
  } = req.body;
  if (!username || !password || !fName || !lName) {
    return next(customError.badRequest('Некорректный вводные данные'));
  }
  const candidate = await User.findOne({ where: { username } });
  if (candidate) {
    return next(customError.badRequest('Пользователь с таким username уже существует'));
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({
    username, role, password: hashPassword, first_name: fName, last_name: lName,
  });
  const token = generateJwt(user.id, user.username, user.role);
  return res.json({ token });
}

async function login(req, res, next) {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return next(customError.badRequest('Пользователь не найден'));
  }
  const comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    return next(customError.badRequest('Неверный пароль'));
  }
  const token = generateJwt(user.id, user.username, user.role);
  return res.json({ token });
}

async function check(req, res, next) {
  const token = generateJwt(req.user.id, req.user.username, req.user.role);
  return res.json({ token });
}

async function getAll(req, res) {
  const { id } = req.params;
  const workspace = await Workspace.findOne({ where: { id } });
  const users = await workspace.getUsers();
  return res.json(users);
}

async function getAssignees(req, res) {
  const { id } = req.params;
  const issue = await Issue.findOne({ where: { id } });
  const users = await issue.getUsers();
  return res.json(users);
}

async function getOne(req, res) {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  return res.json(user);
}

module.exports = {
  registration,
  login,
  check,
  getAll,
  getOne,
  getAssignees,
};
