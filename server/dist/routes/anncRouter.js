"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const anncController_1 = require("../controllers/anncController");
const userController_1 = require("../controllers/userController");
exports.router = express_1.default.Router();
exports.router.post("/add", anncController_1.addAnnc);
exports.router.get("/", anncController_1.getAllAnncs);
exports.router
  .route("/:id")
  .get(anncController_1.getAnnc)
  .patch(anncController_1.updateAnnc)
  .delete(anncController_1.deleteAnnc);
