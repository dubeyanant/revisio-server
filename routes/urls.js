const express = require("express");
const router = express.Router();
const Url = require("../models/url");

// Getting all
router.get("/", async (req, res) => {
  try {
    const link = await Url.find();
    res.json(link);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one
router.get("/:id", getUrl, (req, res) => {
  res.json(res.url);
});

// Creating one
router.post("/", async (req, res) => {
  const url = new Url({
    url: req.body.url,
  });

  try {
    const newUrl = await url.save();
    res.status(201).json(newUrl);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Updating one
router.patch("/:id", getUrl, async (req, res) => {
  if (req.body.url != null) {
    res.url.url = req.body.url;
  }

  try {
    const updatedUrl = await res.url.save();
    res.json(updatedUrl);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one
router.delete("/:id", getUrl, async (req, res) => {
  try {
    await res.url.deleteOne();
    res.json({ message: "URL deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getUrl(req, res, next) {
  try {
    url = await Url.findById(req.params.id);
    if (url == null) {
      return res.status(404).json({ message: "Cannot find url" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.url = url;
  next();
}

module.exports = router;
