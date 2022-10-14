//This endpoint is responsible for posting questions

const Main = require("../models/questionPost");
const Answer = require("../models/questionAnswer")

exports.questionPost = async (req, res, next) => {
    try {
      const { title, body, tags } = req.body;
    //   console.log(req.decoded)
  
      const main = new Main({
        userId: req.decoded.user_id,
        title: title,
        body: body,
        tags: tags
      });
  
      await main.save();
      return res.status(200).json({
        message: "Question posted succesfully",
      });
    } catch (error) {
      next(error);
    }
  };


//endpoint to answer questions

exports.answer = async (req, res, next) => {
  try {
    const {postId} = req.params
    const {answer} = req.body
    const newAnswer = await Answer({
        userId: req.decoded.user_id,
        questionPostId: postId,
        answer
    })
    const post = await Answer.findById(postId);
    post.answer.push(newAnswer);
    await post.save()
    await newAnswer.save()
    return res.status(200).json({
      message: "Answer posted succesfully",
    });
  } catch (error) {
      console.log(error)
    next(error);
  }
};