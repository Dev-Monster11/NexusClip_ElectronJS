import keytar from "keytar";

export class Keychain {
  account;
  service;

  constructor(account, service) {
    this.account = account;
    this.service = service;
  }

  async getPassword() {
    return keytar.getPassword(this.service, this.account);
  }

  async setPassword(password) {
    await keytar.setPassword(this.service, this.account, password);
  }

  async deletePassword() {
    await keytar.deletePassword(this.service, this.account);
  }
}
