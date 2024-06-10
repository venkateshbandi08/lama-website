const {
  register,
  login,
  addProject,
  addFile,
  editFile,
  deleteFile,
  editUserName,
  getProjectsList,
  getFilesList,
  getFile,
  getUserAccountDetails,
} = require("../controllers/userController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/addproject", addProject);
router.post("/addfile", addFile);
router.post("/getfile", getFile);
router.post("/editfile", editFile);
router.post("/deletefile", deleteFile);
router.post("/editusername", editUserName);
router.post("/getprojectslist", getProjectsList);
router.post("/getfileslist", getFilesList);
router.post("/getuseraccountdetails", getUserAccountDetails);

module.exports = router;
