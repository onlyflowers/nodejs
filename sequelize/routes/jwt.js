const jwt = require('jsonwebtoken');
const secretKey = 'suibianxiediansenmedongxi';
const cookieKey = 'token';

// 颁发jwt 
exports.publish = function (res, maxAge = 3600 * 24, payload = {} ) {
    const token = jwt.sign(payload, secretKey, {
        expiresIn: maxAge
    })

    // 添加到cookie
    res.cookie(cookieKey, token, {
        maxAge: maxAge * 1000,
        path: '/'
    })

    // 添加到authorization
    res.header('authorization', token);
}

// 验证jwt
exports.verify = function(req) {
    // 1.尝试从cookie中获取token
    let token = req.cookies[cookieKey];
    if (!token) {
        // 2.尝试从header中获取token
        token = req.headers.authorization;
        if (!token) {
            return null;
        }
    }
    token = token.split(' ');
    token = token.length === 1 ? token[0] : token[1];
    try {
        const result = jwt.verify(token, secretKey);
        return result;
    } catch {
        return null;
    }
}