//This endpoint is responsible for posting questions

const Main = require("../models/main");

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