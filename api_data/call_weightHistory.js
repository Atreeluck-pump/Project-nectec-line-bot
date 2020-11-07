//firestore
var admin = require("firebase-admin");

//const date = moment().locale("th").format('Do-MMMM-YYYY')

//เรียกประวัติน้ำหนักย้อนหลัง 7 วันล่าสุด
async function callWeightHistory(userId) {
    try {
        var data = []
        await admin.firestore().collection('users').doc(userId).collection('heigthweigth-record').orderBy("timestamp", "desc").limit(7).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const obj = {
                        date : doc.id,
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
    'callWeightHistory': callWeightHistory
}