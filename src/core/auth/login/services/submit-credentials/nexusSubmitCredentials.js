// import Vue from "vue";

import { Http } from "@/utils/Http";
import { LocalStorage } from "@/utils/LocalStorage";
import { User } from "@/core/auth/authenticated/domain";

const jwt = require("jsonwebtoken");
const http = new Http("https://api-prod.nexusclips.com");

export async function nexusSubmitCredentials(email, password) {
  const response = await http.post("v1/auth/token", {
    email,
    password,
  });

  if (response.error) {
    throw new Error(response.error);
  }

  const token = response.token;
  const userId = jwt.decode(token).iss;
  const user = new User(userId, email);

  LocalStorage.set("user", user.pojo());

  return { user, token };
}
