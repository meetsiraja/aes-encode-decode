const crypto = require('crypto')
var argv = require('minimist')(process.argv.slice(2));

async function encryptPkey(pkey, secret) {
    const cipher = crypto.createCipher('aes256', getUniqueKey(secret));
    let ciphered = cipher.update(pkey, 'utf8', 'hex');
    ciphered += cipher.final('hex');
    return { encryptedPkey: ciphered };
}

async function decryptPkey(encryptedPkey, secret) {
    const decipher = crypto.createDecipher('aes256', getUniqueKey(secret));
    let deciphered = decipher.update(encryptedPkey, 'hex', 'utf8');
    deciphered += decipher.final('utf8');
    return { decryptedPkey: deciphered };
}

function getUniqueKey(secret){
    const hash = crypto.createHash('sha256');
    const data = 'jkdsbfheiuwfg8ejkdfbewiugt5eroy;rtbndfjtfewiu7ejkrthnewiounioergj'
        + `${secret}`
        + 'sabdhasd78asdfjbr89rewj53gjbfiu723ngpdsgjdfkg9ewfnewfrnewjkhkty45esfrdrhutyu';
    hash.update(data);
    return hash.digest('hex');
}

if(argv['_'][0] == 'encode'){
    encryptPkey(argv['msg'], argv['secret']).then(msg => console.log(msg))
} else if(argv['_'][0] == 'decode'){
    decryptPkey(argv['encryptedMsg'], argv['secret']).then(msg => console.log(msg))
} else {
    console.log('\n============================================================')
    console.log('|                    AES-ENCODE-DECODE                     |')
    console.log('============================================================\n\n')
    console.log('Lighweight tool to Encrypt and Decrypt message or private-key using AES256 technique.\n')
    console.log('Usage:\n');
    console.log('For Encryption:-\n');
    console.log('    encode    - For Encryption');
    console.log('    --msg     - Message or Private that you want to Encrypt');
    console.log('    --secret  - Secret key to sign message with. Make sure only way to decrypt message is this key\n');
    console.log('    Example:-  node aes.js encode --msg="This is test message" --secret="this-is-secret-key"\n');
    console.log("    Output:-   { encryptedPkey: 'ebf4fa607de6f42bce2e3ccf65121ddab677f631723b570913ebb92d5eab8bf9' }\n")
    console.log('For Decryption:-\n');
    console.log('    encode          - For Decryption');
    console.log('    --encryptedMsg  - Previously encrypted message');
    console.log('    --secret        - Secret key that used for encryption of message\n');
    console.log('    Example:  node aes.js decode --encryptedMsg="ebf4fa607de6f42bce2e3ccf65121ddab677f631723b570913ebb92d5eab8bf9" --secret="this-is-secret-key"\n')
    console.log("    Output:-   { decryptedPkey: 'This is test message' }\n")
    
}
