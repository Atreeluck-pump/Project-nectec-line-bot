
const admin = require('firebase-admin')
const serviceAccount = require("./key-firestore.json");
const moment = require('moment')
// connect DB
/*
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hba-project-db81d.firebaseio.com",
    storageBucket: "gs://hba-project-db81d.appspot.com"
});
*/

const request = require('request-promise');

//line
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer RNBVQMom+5jCwGzd0hSlihhch+OsW9wiGlZLTW1UbRk2DgnFHJHo29qfRn1oiIzv/4/bnO6H8Xer+h93/n53c8PoxRB3hiSSMEE9NtyoZHjgzeZnLbZmJ3VNfU7+Wxk/3eoWXL6HmasPU7gOa0mn4gdB04t89/1O/w1cDnyilFU=`
};

// function จาก api_data
const { flexRatio, flexMeal, flexRecordFood, flexMealDetail, flexFoodList, flexFoodHistory, flexFoodHistoryDate, flexRecordHealth, flexResultRatio, flexHistoryWeight } = require('./flexmessage/flexmessage')
const { callMealDetail } = require('./api_data/call_mealDetail')
const { callHistory, callHistoryDate, callHistoryDateFood } = require('./api_data/call_history')
const { callBalance } = require('./api_data/call_balance')
const { callComment } = require('./api_data/call_comment')
const { callWeightHistory } = require('./api_data/call_weightHistory')

//rich menu ทั้งสองแบบ
const richMenuId1 = 'richmenu-65557a25a17de50eac053311118af165'
const richMenuId2 = 'richmenu-34e6462ac9b7ebbe4c523e514b998838'
module.exports = async (req, res) => {

    //console.log(req.body.events[0])
    const typeReq = req.body.events[0].type
    const userId = req.body.events[0].source.userId

    if (typeReq == 'follow') {
        // set Richmenu Register
        uri = `https://api.line.me/v2/bot/user/${userId}/richmenu`
        request({
            method: `DELETE`,
            uri: uri,
            headers: {
                Authorization: 'Bearer {RNBVQMom+5jCwGzd0hSlihhch+OsW9wiGlZLTW1UbRk2DgnFHJHo29qfRn1oiIzv/4/bnO6H8Xer+h93/n53c8PoxRB3hiSSMEE9NtyoZHjgzeZnLbZmJ3VNfU7+Wxk/3eoWXL6HmasPU7gOa0mn4gdB04t89/1O/w1cDnyilFU=}'
            }
        });
        return res.status(200).end()
    }

    if (typeReq == 'unfollow') {
        return res.status(200).end()
    }

    if (req.body.events[0].message.type !== 'text') {
        return res.status(200).end();
    }

    const messageReq = req.body.events[0].message.text

    // message input
    if (messageReq == 'อาหารเช้า' || messageReq == 'อาหารกลางวัน' || messageReq == 'อาหารเย็น') {
        const mealName = ['อาหารเช้า', 'อาหารเช้า', 'อาหารกลางวัน', 'อาหารกลางวัน', 'อาหารเย็น', 'อาหารเย็น']
        const meal = ['breakfast', 'morningsnack', 'lunch', 'afternoonsnack', 'dinner', 'beforebed',]
        const indexOf = mealName.indexOf(messageReq)
        let payloadJson = flexMeal(meal[indexOf], meal[indexOf + 1])
        reply(req.body, payloadJson)
    }
    // message input
    if (messageReq == 'ดูอาหารมื้อเช้า' || messageReq == 'ดูอาหารว่างเช้า' || messageReq == 'ดูอาหารมื้อกลางวัน' || messageReq == 'ดูอาหารว่างบ่าย' || messageReq == 'ดูอาหารมื้อเย็น' || messageReq == 'ดูอาหารก่อนนอน') {
        const mealName = ['ดูอาหารมื้อเช้า', 'ดูอาหารว่างเช้า', 'ดูอาหารมื้อกลางวัน', 'ดูอาหารว่างบ่าย', 'ดูอาหารมื้อเย็น', 'ดูอาหารก่อนนอน']
        const meal = ['breakfast', 'morningsnack', 'lunch', 'afternoonsnack', 'dinner', 'beforebed',]
        const indexOf = mealName.indexOf(messageReq)
        try {
            // เรียกประวัติการบันทึกทั้งหมดของมื้อนั้น
            const data = await callMealDetail(userId, meal[indexOf])
            if (data.length != 0) {
                //เรียก flex เพื่อแสดงประวัติการบันทึกทั้งหมดของมื้อนั้น
                let payloadJson = flexMealDetail(meal[indexOf], data)
                reply(req.body, payloadJson)
            } else {
                let payloadJson = { type: `text`, text: 'ยังไม่ได้ทานอะไรเลยน้า' }
                reply(req.body, payloadJson)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    if (messageReq == 'สัดส่วน') {
        try {
            // เรียกข้อมูลสัดส่วนตั้งต้น คงเหลือ ทั้งหมด
            const data = await callBalance(userId)
            //console.log(data)
            const ratio = data[0];
            const dataTotal = data[1];
            const balance = data[2];
            const dataKcal = data[3];
            if (ratio != undefined) {
                //เรียก flex เพื่อแสดงสัดส่วนตั้งต้น คงเหลือ ... ในเมนูสัดส่วน
                let payloadJson = flexRatio(ratio, dataTotal, balance, dataKcal)
                reply(req.body, payloadJson)
            } else {
                let payloadJson = {
                    type: `text`, text: 'วันนี้ยังไม่ได้ทานอะไรเลยน้า'
                }
                reply(req.body, payloadJson)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    // message input
    if (messageReq == 'ประวัติการกิน') {
        try {
            //เรียกประวัติการกินของวันนั้น ผ่าน qlick reply
            const data = await callHistory(userId)
            if (data[0] != undefined) {
                // เรียก flex อาหารทั้งหมดของวันนั้นเป็นตาราง
                let payloadJson = flexFoodHistory(data)
                //let payloadJson = { type: `text`, text: `${data[0].foodname}` }
                reply(req.body, payloadJson)
            } else {
                let payloadJson = { type: `text`, text: 'ยังไม่ได้ทานอะไรเลยน้า' }
                reply(req.body, payloadJson)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    // message input
    if (messageReq == 'ประวัติการกินย้อนหลัง') {
        try {
            // เรียกประวัติการบันทึกอาหารย้อนหลัง 7 วันล่าสุด
            const data = await callHistoryDateFood(userId)
            // เรียก flex อาหารย้อนหลัง 7 วันล่าสุด ในเมนูประวัติการกินย้อนหลัง
            let payloadJson = flexRecordFood(data)
            reply(req.body, payloadJson)
        } catch (error) {
            console.log(error)
        }


    }
    // message input
    if (messageReq == 'ลงทะเบียน') {
        let payloadJson = { type: `text`, text: 'line://app/1653872646-1LvgpmlW' }
        //let payloadJson = { type: `text`, text: 'line://app/1653872646-OPR9gm7B' }
        reply(req.body, payloadJson)
    }
    // message input
    if (messageReq == 'รายการอาหาร') {
        // เรียก flex แสดงแผ่นพับรายการอาหารแลกเปลี่ยน
        let payloadJson = flexFoodList()
        reply(req.body, payloadJson)
    }

    // message input
    if (messageReq == 'ประวัติน้ำหนัก') {
        try {
            // เรียกน้ำหนักย้อนหลัง 7 วันล่าสุดที่บันทึก
            const data = await callWeightHistory(userId)
            // เรียก fle แสดงประวัติน้ำหนักย้อนหลังเป้นตาราง
            let payloadJson = flexHistoryWeight(data)
            reply(req.body, payloadJson)
        }
        catch (error) {
            console.log(error)
        }
    }

    const history = messageReq.split(' ')
    // message input
    if (history[0] == 'ย้อนหลังวันที่') {
        try {
            // เรียกประวัติการบันทึกอาหารย้อนหลังจาก 7 วันที่แสดง
            const dateShow = moment(history[1], 'DD-MM-YYYY').format('YYYY-MM-DD')
            const data = await callHistoryDate(userId, dateShow)
            if (data[0] != undefined) {
                //เรียก flex ประวัติการกินย้อนหลังในวันนั้นเป็นตาราง
                let payloadJson = flexFoodHistoryDate(data, history[1])
                //let payloadJson = { type: `text`, text: `${data[0].foodname}` }
                reply(req.body, payloadJson)
            } else {
                let payloadJson = { type: `text`, text: 'วันนี้ไม่ได้ทานอะไรเลยน๊า' }
                reply(req.body, payloadJson)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    // message input
    if (messageReq == 'ข้อมูลสรุป') {
        try {
            //เรียกสัดสัดส่วนทั้งหมดในวันนั้นหลังจากผู้ใช้เพิ่มแล้ว 1 มื้อ ตั้งต้น คงเหลือ รวม
            const data = await callBalance(userId)
            // เรียกคำแนะนำจากผู้เชี่ยวชาญ
            const comment = await callComment(userId)
            //console.log(data)
            const ratio = data[0];
            const dataTotal = data[1];
            const balance = data[2];
            const dataKcal = data[3];
            if (ratio != undefined) {
                //เรียก flex แสดงข้อมูลสรุกที่กดจาก qlick reply 
                let payloadJson = flexResultRatio(ratio, dataTotal, balance, comment)
                reply(req.body, payloadJson)
            } else {
                let payloadJson = { type: `text`, text: 'ยังไม่ได้ทานอะไรเลยน้า' }
                reply(req.body, payloadJson)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    // message input
    if (messageReq == 'ลงทะเบียนเรียบร้อย' || messageReq == 'เมนูหลัก' || messageReq == 'เมนูเพิ่มเติม') {

        if (messageReq == 'ลงทะเบียนเรียบร้อย' || messageReq == 'เมนูหลัก') {
            // set Richmenu เมนูหลัก
            uri = `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId1}`
        } else {
            // set Richmenu เมนูสำรอง
            uri = `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId2}`
        }
        request({
            method: `POST`,
            uri: uri,
            headers: {
                Authorization: 'Bearer {RNBVQMom+5jCwGzd0hSlihhch+OsW9wiGlZLTW1UbRk2DgnFHJHo29qfRn1oiIzv/4/bnO6H8Xer+h93/n53c8PoxRB3hiSSMEE9NtyoZHjgzeZnLbZmJ3VNfU7+Wxk/3eoWXL6HmasPU7gOa0mn4gdB04t89/1O/w1cDnyilFU=}'
            }
        });
    }

    res.status(200).end()
}

// function reply
const reply = (bodyResponse, payloadJson) => {
    return request({
        method: `POST`,
        uri: `${LINE_MESSAGING_API}/reply`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            replyToken: bodyResponse.events[0].replyToken,
            messages: [
                payloadJson
            ]
        })
    });
};
