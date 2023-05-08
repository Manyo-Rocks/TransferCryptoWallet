  const secp = require("ethereum-cryptography/secp/256k1-compat");
  const { toHex } = require("ethereum-cryptography/utils");

  const privatKey = secp.utils.randomPrivateKey();
  console.log('private key', toHex(privatKey));

  const publicKey = secp.getPublicKey(privatKey);
  console.log('publicKey', toHex(publicKey))

