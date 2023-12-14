import { createTransport } from "nodemailer";
import { google } from "googleapis";
import { join } from "path";
import { renderFile } from "ejs";
import { envConfig } from "../Config/environConfig";
import { sign } from "jsonwebtoken";

const oAuth = new google.auth.OAuth2(
  envConfig.GOOGLE_ID,
  envConfig.GOOGLE_SECRET,
  envConfig.GOOGLE_URL
);
oAuth.setCredentials({ access_token: envConfig.GOOGLE_REFRESH });

export const sendMail = async (user: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;
    const transport = createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "elizabethokorie407@gmail.com",
        clientId: envConfig.GOOGLE_ID,
        clientSecret: envConfig.GOOGLE_SECRET,
        refreshToken: envConfig.GOOGLE_REFRESH,
        accessToken,
      },
    });

    const token = sign({ id: user?._id }, envConfig.TOKEN_SECRET);

    const passedData = {
      userName: user?.userName,
      email: user?.email,
      url: `http://localhost:5173/${token}/verify`,
    };

    const locateEjsFile = join(__dirname, "../views/verificationMail.ejs");
    const ejsData = await renderFile(locateEjsFile, passedData);

    const mailer = {
      from: "Food Flex <elizabethokorie407@gmail.com>",
      to: user?.email,
      subject: `Verification Mail`,
      html: ejsData,
    };

    transport.sendMail(mailer);
  } catch (error: any) {
    console.error(error);
  }
};
