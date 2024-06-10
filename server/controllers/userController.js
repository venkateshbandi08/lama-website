const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already exists", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.json({
      msg: "User Registered Successfully",
      user,
      status: true,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    return res.json({ msg: "User Logged In Successfully", user, status: true });
  } catch (ex) {
    next(ex);
  }
};

module.exports.addProject = async (req, res, next) => {
  try {
    const { userId, projectName, episodes } = req.body;
    const user = await User.findById(userId);
    if (!userId) {
      return res.json({ msg: "no user found", status: false });
    }
    const newProject = {
      projectName: projectName,
      episodes: episodes,
      filesList: [],
    };
    user.projectslist.push(newProject);
    await user.save();
    return res.json({ msg: "Project added successfully", status: true });
  } catch (ex) {
    next(ex);
  }
};

module.exports.addFile = async (req, res, next) => {
  try {
    const { userId, projectId, fileName, fileDescription } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ msg: "No user found", status: false });
    }
    const currentProject = user.projectslist.id(projectId);
    if (!currentProject) {
      return res.json({ msg: "No project found", status: false });
    }
    const newFile = {
      _id: uuidv4(),
      fileName,
      fileDescription,
    };
    currentProject.filesList.push(newFile);
    await user.save();
    return res.json({ msg: "File added Successfully", status: true });
  } catch (err) {
    next(err);
  }
};

module.exports.getProjectsList = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    return res.json({ projectslist: user.projectslist, status: true });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getFilesList = async (req, res, next) => {
  try {
    const { userId, projectId } = req.body;
    const user = await User.findById(userId);
    const projectsList = user.projectslist;
    const currentProject = projectsList.id(projectId);
    return res.json({ filesList: currentProject.filesList, status: true });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getFile = async (req, res, next) => {
  try {
    const { userId, projectId, fileId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ msg: "No user found", status: false });
    }
    const currentProject = user.projectslist.id(projectId);
    if (!currentProject) {
      return res.json({ msg: "No project found", status: false });
    }
    const currentFile = currentProject.filesList.find(
      (file) => file._id == fileId
    );
    return res.json({
      file: currentFile,
      msg: "File edited successfully",
      status: true,
    });
  } catch (err) {
    next(ex);
  }
};

module.exports.editFile = async (req, res, next) => {
  try {
    const { userId, projectId, fileId, fileDescription, date } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ msg: "No user found", status: false });
    }

    const currentProject = user.projectslist.id(projectId);
    if (!currentProject) {
      return res.json({ msg: "No project found", status: false });
    }

    const currentFile = currentProject.filesList.find(
      (file) => file._id == fileId
    );
    if (!currentFile) {
      return res.json({ msg: "No file found", status: false });
    }

    currentFile.fileDescription = fileDescription;
    currentFile.date = date;

    await user.save();

    return res.json({
      file: currentFile,
      msg: "File edited successfully",
      status: true,
    });
  } catch (ex) {
    console.log("Error in editing file ");
    next(ex);
  }
};

module.exports.deleteFile = async (req, res, next) => {
  try {
    const { userId, projectId, fileId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ msg: "No user found", status: false });
    }

    const currentProject = user.projectslist.id(projectId);
    if (!currentProject) {
      return res.json({ msg: "No project found", status: false });
    }

    const fileIndex = currentProject.filesList.findIndex(
      (file) => file._id == fileId
    );
    if (fileIndex === -1) {
      return res.json({ msg: "No file found", status: false });
    }

    currentProject.filesList.splice(fileIndex, 1);

    await user.save();

    return res.json({ msg: "File deleted successfully", status: true });
  } catch (ex) {
    next(ex);
  }
};

module.exports.editUserName = async (req, res, next) => {
  try {
    const { userId, newUserName } = req.body;
    const user = await User.findById(userId);
    user.username = newUserName;
    await user.save();

    return res.json({ msg: "UserName edited successfully", status: true });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getUserAccountDetails = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const details = {
      username: user.username,
      email: user.email,
    };
    return res.json({ details, status: true });
  } catch (ex) {
    next(ex);
  }
};
