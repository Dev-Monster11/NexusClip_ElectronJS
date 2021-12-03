import Vue from "vue";
import { Http } from "@/utils/Http.js";
const http = new Http("https://api-prod.nexusclips.com");

export async function makeAuthenticatedRequestExample() {
  const token = await Vue.$keychain.getPassword();

  await http.post(
    "some/protected/path",
    {
      example: "data",
    },
    {
      Authorization: `Bearer ${token}`,
    }
  );
}
