//firestore
var admin = require("firebase-admin");

const moment = require('moment')
const date = moment().locale("th").format('DD-MM-YYYY')

//เรียกอาหารที่บันทึกทั้งหมดในวันนั้นแบบเป็นมื้อ เช้า กลางวัน เย็น
async function callMealDetail(userId, meal) {
    try {
        var data = []
        await admin.firestore().collection('users').doc(userId).collection('diary').doc(date).collection(meal).orderBy("time", "asc").get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const obj = {
                        docId : doc.id,
                        data : doc.data()
                    }
                    data.push(obj)
                });
            })
        return data
    }
    catch (error) {
        console.log(error)
    }
}
module.exports = {
    'callMealDetail': callMealDetail
}