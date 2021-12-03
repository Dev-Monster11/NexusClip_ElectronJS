import Vue from "vue";

import { Http } from "@/utils/Http";
import { LocalStorage } from "@/utils/LocalStorage";

import { User } from "@/core/auth/authenticated/domain";

const http = new Http("https://reqres.in/api");

export async function reqresSubmitNewUser(email, password) {
  const response = await http.post("register", {
    email,
    password,
  });

  if (response.error) {
    throw new Error(response.error);
  }

  const token = response.token;

  const user = new User(response.id, email);

  LocalStorage.set("user", user.pojo());

  await Vue.$keychain.setPassword(token);

  return user;
}
