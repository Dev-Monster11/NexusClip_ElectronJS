import { nexusSubmitCredentials } from "./nexusSubmitCredentials";

export async function submitCredentials(email, password) {
  return nexusSubmitCredentials(email, password);
}
