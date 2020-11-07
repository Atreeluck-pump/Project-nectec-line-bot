//firestore
var admin = require("firebase-admin");

const moment = require('moment')
const date = moment().locale("th").format('DD-MM-YYYY')
//const month = moment().locale("th").format('MMMM')

//เรียกประวัติย้อนหลังทุกมื้อ
async function callHistory(userId) {
    try {
        var data = []
        const meal = ['breakfast', 'morningsnack', 'lunch', 'afternoonsnack', 'dinner', 'beforebed',]
        for (let i = 0; i < meal.length; i++) {
            await admin.firestore().collection('users').doc(userId).collection('diary').doc(date).collection(meal[i]).orderBy("time", "asc").get().then(snapshot => {
                snapshot.forEach(doc => {
                    const obj = {
                        time: doc.data().time,
                        foodname: doc.data().foodname,
                        kcal: doc.data().kcal
                    }
                    data.push(obj)
                });
            })
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

//เรียกประวัติย้อนหลังทุกมื้อแบบเลือกวันได้
async function callHistoryDate(userId, dateSelect) {
    const dateSel = moment(dateSelect, 'YYYY-MM-DD').format('DD-MM-YYYY')
    try {
        var data = []
        const meal = ['breakfast', 'morningsnack', 'lunch', 'afternoonsnack', 'dinner', 'beforebed',]
        for (let i = 0; i < meal.length; i++) {
            await admin.firestore().collection('users').doc(userId).collection('diary').doc(dateSel).collection(meal[i]).orderBy("time", "asc").get().then(snapshot => {
                snapshot.forEach(doc => {
                    const obj = {
                        time: doc.data().time,
                        foodname: doc.data().foodname,
                        kcal: doc.data().kcal
                    }
                    data.push(obj)
                });
            })
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

// เรียกประวัติอาหาร
async function callHistoryFood(userId) {
    try {
        var data = []
        var date = []
        const meal = ['breakfast', 'morningsnack', 'lunch', 'afternoonsnack', 'dinner', 'beforebed']

        await admin.firestore().collection('users').doc(userId).collection('diary').orderBy("timestamp", "desc").limit(7).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    for (let j = 0; j < meal.length; j++) {
                        admin.firestore().collection('users').doc(userId).collection('diary').doc(doc.id).collection(meal[j]).get()
                            .then(snapshot => {
                                snapshot.forEach(doc => {
                                    data.push(doc.data().foodname)
                                    console.log(doc.data().foodname)
                                });
                            })
                            .catch(err => {
                                console.log('Error getting documents', err);
                            });
                    }
                });
            })
        console.log(data)

    } catch (error) {
        console.log(error)
    }
}

async function callHistoryDateFood(userId) {
    try {
        const dateStart1 = moment().format('YYYY-MM-DD')
        const dateEnd1 = moment().subtract(7, 'days').format('YYYY-MM-DD')
        var a = moment(dateStart1)
        var b = moment(dateEnd1)
        var result = a.diff(b, 'days')
        //console.log(result)
        var data = []
        for (let i = 0; i <= result; i++) {
            //console.log(i)
            const z = moment(dateEnd1).add(i, 'days').format('DD-MM-YYYY')
            await admin.firestore().collection("users").doc(userId).collection('diary').doc(z).collection('history').doc('total').get().then(function (doc) {
                if (doc.exists) {
                    //console.log(z+'=>',doc.data().kcal)
                    const obj = {
                        date : z,
                        kcal : doc.data().kcal
                    }
                    data.push(obj)
                }
            })
        }
        return data

    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    'callHistory': callHistory,
    'callHistoryFood': callHistoryFood,
    'callHistoryDate': callHistoryDate,
    'callHistoryDateFood': callHistoryDateFood
}