const express = require("express");
const router = require("router");

router.get("/", (req, res) => res.send("Welcome"));

module.exports = router;
