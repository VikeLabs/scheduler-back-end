import express = require("express");
const router = express.Router();

router.get("/courses", (req, res) => {
	res.json({
		title: "Introduction to Artificial Intelligence",
		subject: "CSC",
		courseCode: 110,
		term: 202001,
	}); // TODO: server some json data
});

module.exports = router;
