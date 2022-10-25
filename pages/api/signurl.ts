import type { NextApiRequest, NextApiResponse } from "next";
import { S3, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3({
  endpoint: "https://fra1.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_ID as string,
    secretAccessKey: process.env.S3_SECRET as string,
  },
});

const decode = (data: string) => {
  return Buffer.from(data, 'base64').toString('ascii');
}

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);
  const data = body.data;
  const decoded = decode(decode(data).replace('141r6ru6', '').replace('6ru6541ty', '')).replace('541ty141r', '').replace('541ty6ru6', '');

  switch (req.method) {
    case "POST":
      const pdfKey = decoded.replace(
        "https://grugslair.fra1.digitaloceanspaces.com/",
        ""
      );
      getSignedUrl(
        s3Client,
        new GetObjectCommand({
          Bucket: "grugslair",
          Key: pdfKey,
        }),
        { expiresIn: 10 } // Adjustable expiration.
      ).then((result) => res.status(200).json({ result }));
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
