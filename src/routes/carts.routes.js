import { Router } from "express";
import { uploader } from "../uploader.js";

const router = Router();

router.get("/", (req, res) => {
  res.send({ data: pets });
});

router.post("/", uploader.single("avatar"), (req, res) => {
  const newContent = req.body;
  pets.push(newContent);
  res.send({ data: newContent });
});

export default router;
