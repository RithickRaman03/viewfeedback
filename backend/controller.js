const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
``;
const router = express.Router();
app.use(router);
const pool = require("./config/db");
const view = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
feedback.file_id, 
inbox.file_name, 
feedback.user_id,
feedback.question_id, 
feedback.answer, 
comments.comment, 
comments.submitted_by,
feedbackquestions.question
FROM 
feedback 
JOIN 
inbox ON feedback.file_id = inbox.file_id 
JOIN 
comments ON feedback.file_id = comments.file_id
JOIN
feedbackquestions ON feedback.question_id = feedbackquestions.question_id WHERE feedback.user_id=2`
    );
    console.log(result);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

router.get("/viewpage", view);

// module.exports = app;
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
