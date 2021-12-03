import { S3Client } from "@aws-sdk/client-s3";

const REGION = "eu-west-1";
const BUCKET = "nexus-clips";
const s3Client = new S3Client({ region: REGION });

export { s3Client, REGION, BUCKET };
