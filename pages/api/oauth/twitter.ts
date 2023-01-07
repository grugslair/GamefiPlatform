import axios from "axios";
import { objectToBase64 } from "helper/utilities";
import { NextApiRequest, NextApiResponse } from "next";
import TwitterSignIn from "twittersignin";
import store from "store2";

export default async function oauth(req: NextApiRequest, res: NextApiResponse) {
  // Replace TWITTER_CONSUMER_KEY and TWITTER_CONSUMER_SECRET with your actual consumer key and consumer secret
  const CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
  const CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
  const ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
  const ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET;

  // This should be the same redirect URI that you specified when you created your Twitter application
  const REDIRECT_URI = process.env.TWITTER_REDIRECT_URI;

  const twitterSignIn = TwitterSignIn({
    consumerKey: CONSUMER_KEY!,
    consumerSecret: CONSUMER_SECRET!,
    accessToken: ACCESS_TOKEN!,
    accessTokenSecret: ACCESS_TOKEN_SECRET!,
  });

  // Check if the user is returning from the Twitter authorization flow
  if (req.query.oauth_token && req.query.oauth_verifier) {
    try {
      // Exchange the request token for an access token
      const { oauth_token, oauth_verifier } = req.query;
      const requestTokenSecret = store.remove(`tokens-${oauth_token}`);
      const tokenResponse = await twitterSignIn.getAccessToken(
        oauth_token as string,
        requestTokenSecret,
        oauth_verifier as string
      );

      const data = objectToBase64(tokenResponse);

      // Redirect the user to the Twitter authorization URL
      res.writeHead(302, {
        Location: `${REDIRECT_URI}/result?data=${data}`,
      });
      res.end();
    } catch (error) {
      res.send("Error, please try again");
    }
  } else {
    // Generate a request token and redirect the user to the Twitter authorization URL
    try {
      const response = await twitterSignIn.getRequestToken({
        oauth_callback: REDIRECT_URI,
      });
      const requestToken = response.oauth_token;
      const requestTokenSecret = response.oauth_token_secret;

      store("tokens-" + requestToken, requestTokenSecret);

      // // Redirect the user to the Twitter authorization URL
      res.writeHead(302, {
        Location: `https://api.twitter.com/oauth/authorize?oauth_token=${requestToken}`,
      });
      res.end();
    } catch (error) {
      console.log(error);
      res.send("Error, please try again");
    }
  }
}
