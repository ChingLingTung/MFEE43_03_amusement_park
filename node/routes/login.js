import express from "express";


const router = express.Router();

router.use((req, res, next) => {
  const u = req.url.split("?")[0]; // 只要路徑
  console.log({ u });
  if (req.method === "GET" && u === "/") {
    return next();
  }
/*
  if (!req.session.admin) {
    return res.redirect("/login");
  } */
  next();
});


export default router;