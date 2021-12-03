import { reqresSubmitNewUser } from "./reqresSubmitNewUser";

export async function submitNewUser(email, password) {
  return reqresSubmitNewUser(email, password);
}
