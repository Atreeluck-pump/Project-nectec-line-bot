const request = require('request-promise');


const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer {RNBVQMom+5jCwGzd0hSlihhch+OsW9wiGlZLTW1UbRk2DgnFHJHo29qfRn1oiIzv/4/bnO6H8Xer+h93/n53c8PoxRB3hiSSMEE9NtyoZHjgzeZnLbZmJ3VNfU7+Wxk/3eoWXL6HmasPU7gOa0mn4gdB04t89/1O/w1cDnyilFU=}`
};
module.exports = (req, res) => {
    console.log(req)
    //const msg = req.query.msg
    //const userId = req.query.userId
    //return push(res,msg,userId);
    res.status(200)
}
const push = (res,msg,userId) => {
    return request({
        method: `POST`,
        uri: `${LINE_MESSAGING_API}/push`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            to: userId,
            messages: [
                {
                    type: `text`,
                    text: msg
                }
            ]
        })
    }).then(() => {
        return res.status(200).send(`Done`);
    }).catch((error) => {
        return Promise.reject(error);
    });
}

