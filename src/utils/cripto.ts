import JSEncrypt from "jsencrypt";

/**
 * Criptografa a senha fornecida usando uma chave pública.
 * @param {string} password - A senha que será criptografada.
 * @returns A senha criptrografada.
 */
export function passEncrypted(password: string) {
  const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4Nw5AWtsAl/kEFSvNNPdgdSYz
2c+d01350uvE7A/V65XPqSCbZphku+QuWhcQ9LYWQE5YE7Nf//aIDlMVzs5xoZO2
MKLyg/4PrBwVtdd4dHC1EGr70qhOT364txyEGeuMP9CiSuKc1qXa9uVZWwNlRMiT
s5Pu52SLOyweVLGyaQIDAQAB
-----END PUBLIC KEY-----`;

  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);

  return encrypt.encrypt(password);
}
