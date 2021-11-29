const { Project } = require('../models/models');
const customError = require('../error/customError');

async function create(req, res) {
  const { name, work } = req.body;
  const project = await Project.create({
    proj_name: name, ws_id: work,
  });
  return res.json(project);
}

async function destroy(req, res) {
  const { id } = req.params;
  await Project.destroy({ where: { id } });
  return res.json({ message: `Project with ID = ${id} deleted` });
}

async function getAll(req, res) {
  const projects = await Project.findAll();
  return res.json(projects);
}

async function getOne(req, res, next) {
  const { id } = req.params;
  const project = await Project.findOne({ where: { id } });
  if (project === null) {
    return next(customError.badRequest('There is no PROJECT with this ID'));
  }
  res.json(project);
}

module.exports = {
  create,
  getOne,
  getAll,
  destroy,
};
