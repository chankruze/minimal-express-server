/*
Author: chankruze (chankruze@geekofia.in)
Created: Fri Nov 27 2020 11:43:26 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const router = require("express").Router(),
  utils = require("../utils"),
  path = require("path");

router.post("/download", async (req, res) => {
  // if API key don't matches (or not found in the DB [prod])
  // return unauthorized status
  if (req.headers["x-cproxy-api-key"] !== process.env.API_KEY) {
    return res.status(401).json({
      status: "failed",
      msg: "request unauthorized",
    });
  }

  // if content-type is not json
  // return bad request status
  if (req.headers["content-type"] !== "application/json") {
    return res.status(400).json({
      status: "ok",
      msg: "only json data allowed",
    });
  }

  const { torrentUrl } = req.body;

  try {
    const splittedUrl = torrentUrl.split("/");
    const filePath = path.resolve(
      __dirname,
      "../temp/",
      `${splittedUrl[splittedUrl.length - 1]}.torrent`
    );

    utils
      .downloadFile(torrentUrl, filePath)
      .then(() => {
        return res.status(200).json({
          status: "ok",
          file: `${splittedUrl[splittedUrl.length - 1]}.torrent`,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ status: "failed" });
      });

    // send file

    // delete file

    // res.status(200).json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed" });
  }
});

router.get("/download", (req, res) => {
  // if API key don't matches (or not found in the DB [prod])
  // return unauthorized status
  if (req.headers["x-cproxy-api-key"] !== process.env.API_KEY) {
    return res.status(401).json({
      status: "failed",
      msg: "request unauthorized",
    });
  }

  const { fileName } = req.query;

  if (fileName) {
    const filePath = path.resolve(__dirname, "../temp/", fileName);
    return res.sendFile(filePath);
  }

  return res.status(500).json({
    status: "failed",
  });
});

router.post("/delete", (req, res) => {
  // if API key don't matches (or not found in the DB [prod])
  // return unauthorized status
  if (req.headers["x-cproxy-api-key"] !== process.env.API_KEY) {
    return res.status(401).json({
      status: "failed",
      msg: "request unauthorized",
    });
  }

  // if content-type is not json
  // return bad request status
  if (req.headers["content-type"] !== "application/json") {
    return res.status(400).json({
      status: "failed",
      msg: "only json data allowed",
    });
  }

  const { fileName } = req.body;

  if (fileName) {
    const filePath = path.resolve(__dirname, "../temp/", fileName);
    utils
      .deleteFile(filePath)
      .then(() => {
        return res.status(200).json({
          status: "ok",
          msg: `deleted ${fileName} from server`,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: "failed",
          msg: `unable to delete ${fileName}`,
        });
      });
  }
});

module.exports = router;
