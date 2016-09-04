var crypto = require('crypto');

exports.encrypt = function(str){
    var cipher = crypto.createCipher('aes192', appSettings.secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}


exports.decrypt = function(str, secret){
    var decipher = crypto.createDecipher('aes192', appSettings.secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}