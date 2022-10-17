import { S3, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3({
  endpoint: "https://fra1.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET as string,
  },
});

const getSignedPDFUrl = async (pdfUrl: string) => {
  try {
    const pdfKey = pdfUrl.replace("https://grugslair.fra1.digitaloceanspaces.com/", "");
    const url = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: "grugslair",
        Key: pdfKey,
      }),
      { expiresIn: 10 }
    ); // Adjustable expiration.
    return url;
  } catch (err) {
    console.log("Error", err);
  }
};

export { s3Client, getSignedPDFUrl };
