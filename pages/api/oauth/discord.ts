import axios from "axios";
import { objectToBase64 } from "helper/utilities";
import { NextApiRequest, NextApiResponse } from "next";

export default async function oauth(req: NextApiRequest, res: NextApiResponse) {
  // Replace CLIENT_ID and CLIENT_SECRET with your actual client ID and client secret
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  const SCOPES = ["identify", "email", "guilds.members.read"].join(" ");

  // This should be the same redirect URI that you specified when you created your Discord application
  const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

  // Check if the user is returning from the Discord authorization flow
  if (req.query.code) {
    try {
      // Exchange the authorization code for an access token
      const { code } = req.query;
      const tokenResponse = await axios.post(
        "https://discord.com/api/oauth2/token",
        {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: REDIRECT_URI,
          scope: SCOPES,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Encoding": "application/x-www-form-urlencoded",
          },
        }
      );
      const accessToken = tokenResponse.data.access_token;

      // Use the access token to make an API call to the Discord API
      const userResponse = await axios.get(
        "https://discord.com/api/users/@me",
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Encoding": "application/x-www-form-urlencoded",
          },
        }
      );
      const guildResponse = await axios.get(
        "https://discord.com/api/users/@me/guilds/866462950830506065/member",
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Encoding": "application/x-www-form-urlencoded",
          },
        }
      );
      const user = userResponse.data;
      const guild = guildResponse.data;

      const data = objectToBase64({ isMemberOfGrug: true, user, guild });

      res.writeHead(302, {
        Location: `${REDIRECT_URI}/result?data=${data}`,
      });
      res.end();
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message === "Unknown Guild") {
        const data = objectToBase64({ isMemberOfGrug: false });
        res.writeHead(302, {
          Location: `${REDIRECT_URI}/result?data=${data}`,
        });
        res.end();
      } else {
        res.send("Error, please try again");
      }
    }
  } else {
    // Redirect the user to the Discord authorization URL
    res.writeHead(302, {
      Location: `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES}`,
    });
    res.end();
  }
}
