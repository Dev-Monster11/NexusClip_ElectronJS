import { LocalStorage } from "@/utils/LocalStorage";

import { User } from "../../domain";

export async function getAuthenticatedUser() {
  const rawUser = LocalStorage.get("user");

  if (!rawUser) {
    return null;
  }

  return new User(rawUser.id, rawUser.email);
}
