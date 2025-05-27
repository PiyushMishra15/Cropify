const express = require("express");
const router = express.Router();
const {
  addFAQ,
  showFAQsbyProduct,
  showFAQsbySeller,
  ansFAQ,
} = require("../controllers/faqController");

const { verifyToken } = require("../controllers/auth");

router.post("/product/:productId/faq", verifyToken, addFAQ);

router.put("/faq/:faqId/answer", verifyToken, ansFAQ);

router.get("/product/:productId/faqs", verifyToken, showFAQsbyProduct);

router.get("/seller/faqs", verifyToken, showFAQsbySeller);

module.exports = router;
