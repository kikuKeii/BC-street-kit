const router = require("express").Router();
const Home = require("../controller/Home");
const MainController = require("../controller/MainController");
const AuthorController = require("../controller/AuthorController");

router.get("/", Home.index);

router.get("/api", MainController.index);
router.get("/api/author", AuthorController.index);

router.get("/api/users", MainController.users);
router.get("/api/users/s", MainController.usersSearch);

module.exports = router;