# aes-encode-decode
Simple Tool to Encode and Decode message or private-key using AES256 technique.

```
Usage:

For Encryption:-

    encode    - For Encryption
    --msg     - Message or Private that you want to Encrypt
    --secret  - Secret key to sign message with. Make sure only way to decrypt message is this key

For Decryption:-

    decode          - For Decryption
    --encryptedMsg  - Previously encrypted message
    --secret        - Secret key that used for encryption of message

```

### Ecryption Example

```bash
node aes.js encode --msg="This is test message" --secret="this-is-secret-key"
```

#### Output: 
```
{ encryptedPkey: "ebf4fa607de6f42bce2e3ccf65121ddab677f631723b570913ebb92d5eab8bf9"}
```


### Decryption Example:
```bash
node aes.js decode --encryptedMsg="ebf4fa607de6f42bce2e3ccf65121ddab677f631723b570913ebb92d5eab8bf9" --secret="this-is-secret-key"
```

#### Output:
```
{ decryptedPkey: 'This is test message' }
```
