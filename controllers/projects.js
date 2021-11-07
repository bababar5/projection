const Project = require('../models/project');
const { cloudinary } = require("../cloudinary");


module.exports.index = async (req, res) => {
    const projects = await Project.find({});
    res.render('projects/index', { projects })
}

module.exports.renderNewForm = (req, res) => {
    res.render('projects/new');
}

module.exports.createProject = async (req, res, next) => {
    const project = new Project(req.body.project);
    project.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    console.log(project);
    // project.images[0] = {url: req.file.path, filename: req.file.filename};
    await project.save();
//    req.flash('success', 'Successfully made a new project!');
    res.redirect(`/projects/${project._id}`)
}

module.exports.showProject = async (req, res,) => {
    const project = await Project.findById(req.params.id)
    if (!project) {
        // req.flash('error', 'Cannot find that project!');
        return res.redirect('/projects');
    }
    res.render('projects/show', { project });
}