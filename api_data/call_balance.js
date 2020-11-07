//firestore
var admin = require("firebase-admin");

const moment = require('moment')
const date = moment().locale("th").format('DD-MM-YYYY')

//เรียกสัดสัดส่วนทั้งหมดในวันนั้นหลังจากผู้ใช้เพิ่มแล้ว 1 มื้อ ตั้งต้น คงเหลือ รวม
async function callBalance(userId) {
    try {
        var balance;
        await admin.firestore().collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("balance").get().then(function (doc) {
            balance = doc.data()
        })
        var ratio;
        await admin.firestore().collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("ratio").get().then(function (doc) {
            ratio = doc.data()
        })
        var dataTotal;
        await admin.firestore().collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("total").get().then(function (doc) {
            dataTotal = doc.data()
        })
        
        return [ratio, dataTotal, balance]
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    'callBalance': callBalance
}