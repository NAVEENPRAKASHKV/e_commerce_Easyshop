const customerAuthController = require("../../controller/home/cutomerAuthController");
const express = require("express");
const router = express();

router.post(
  "/customer/customer-register",
  customerAuthController.customer_register
);
router.post("/customer/customer-login", customerAuthController.customer_login);
router.post("/auth/google", customerAuthController.google_signin);
router.post("/customer/send-otp", customerAuthController.send_otp);
router.post("/customer/verify-otp", customerAuthController.verify_otp);

// customer profile
router.put(
  "/customer/update-user-profile/:userId",
  customerAuthController.update_user_profile
);
router.get(
  "/customer/get-user-profile/:userId",
  customerAuthController.get_user_profile
);

module.exports = router;
