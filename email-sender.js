const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { dotenv } = require("dotenv");
const OAuth2 = google.auth.OAuth2;
dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const refresh_token = process.env.REFRESH_TOKEN;
const access_token = process.env.ACCESS_TOKEN;

const myOauth2Client = new OAuth2(
  "605053398829-63d8urdonhhdd0hnnbunrd9o6jpgm2r1.apps.googleusercontent.com",
  "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",
  "https://developers.google.com/oauthplayground"
);

myOauth2Client.setCredentials({ refresh_token });

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "tijaanimukhtaar@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: refresh_token,
    accessToken: access_token,
  },
});

const checkEmailExist = (req, res, next) => {
  const { email } = req.body;
  const regrex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const emailIsMatch = email.match(regrex);

  return;
  if (!email.match)
    if (!email) {
      res.send("email is required");
    } else {
      next();
    }
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
app.post("/email/send", checkEmailExist, (req, res) => {
  const { email } = req.body;
  // console.log({ email });
  const mailOption = {
    to: email,
    from: "tijaanimukhtaar@gmail.com",
    subject: "Testing email service",
    html: `<div><h1>We are testing email functionality</h1></div>`,
  };
  transport.sendMail(mailOption, (error) => {
    if (error) {
      res.send("something went wrong");
    } else {
      res.send("email sent successfully");
    }
  });
});

module.exports = app;
