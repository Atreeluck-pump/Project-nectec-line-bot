//firestore
var admin = require("firebase-admin");

//const moment = require('moment')
//const date = moment().locale("th").format('Do-MMMM-YYYY')
//const month = moment().locale("th").format('MMMM')

async function calBalance(userId,date) {
    var ratio;
    await admin.firestore().collection("users").doc(userId).collection("ratio-record").orderBy("timestamp", "desc").limit(1).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                ratio = doc.data()
            });
        });
    //console.log(ratio)

    var data = [
        breakfastData = { rice: 0, fruits: 0, vegetable: 0, milk: 0, meat: 0, fat: 0, sugar: 0, sodium: 0 },
        morningsnackData = { rice: 0, fruits: 0, vegetable: 0, milk: 0, meat: 0, fat: 0, sugar: 0, sodium: 0 },
        lunchData = { rice: 0, fruits: 0, vegetable: 0, milk: 0, meat: 0, fat: 0, sugar: 0, sodium: 0 },
        afternoonsnackData = { rice: 0, fruits: 0, vegetable: 0, milk: 0, meat: 0, fat: 0, sugar: 0, sodium: 0 },
        dinnerData = { rice: 0, fruits: 0, vegetable: 0, milk: 0, meat: 0, fat: 0, sugar: 0, sodium: 0 },
        beforebedData = { rice: 0, fruits: 0, vegetable: 0, milk: 0, meat: 0, fat: 0, sugar: 0, sodium: 0 }
    ]
    await admin.firestore().collection("users").doc(userId).collection("diary").doc(date).collection('breakfast').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                data[0].rice = data[0].rice + doc.data().rice
                data[0].fruits = data[0].fruits + doc.data().fruits
                data[0].vegetable = data[0].vegetable + doc.data().vegetable
                data[0].milk = data[0].milk + doc.data().milk
                data[0].meat = data[0].meat + doc.data().meat
                data[0].fat = data[0].fat + doc.data().fat
                data[0].sugar = data[0].sugar + doc.data().sugar
                data[0].sodium = data[0].sodium + doc.data().sodium
            });
        })
    await admin.firestore().collection("users").doc(userId).collection("diary").doc(date).collection('morningsnack').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                data[1].rice = data[1].rice + doc.data().rice
                data[1].fruits = data[1].fruits + doc.data().fruits
                data[1].vegetable = data[1].vegetable + doc.data().vegetable
                data[1].milk = data[1].milk + doc.data().milk
                data[1].meat = data[1].meat + doc.data().meat
                data[1].fat = data[1].fat + doc.data().fat
                data[1].sugar = data[1].sugar + doc.data().sugar
                data[1].sodium = data[1].sodium + doc.data().sodium
            });
        })
    await admin.firestore().collection("users").doc(userId).collection("diary").doc(date).collection('lunch').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                data[2].rice = data[2].rice + doc.data().rice
                data[2].fruits = data[2].fruits + doc.data().fruits
                data[2].vegetable = data[2].vegetable + doc.data().vegetable
                data[2].milk = data[2].milk + doc.data().milk
                data[2].meat = data[2].meat + doc.data().meat
                data[2].fat = data[2].fat + doc.data().fat
                data[2].sugar = data[2].sugar + doc.data().sugar
                data[2].sodium = data[2].sodium + doc.data().sodium
            });
        })
    await admin.firestore().collection("users").doc(userId).collection("diary").doc(date).collection('afternoonsnack').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                data[3].rice = data[3].rice + doc.data().rice
                data[3].fruits = data[3].fruits + doc.data().fruits
                data[3].vegetable = data[3].vegetable + doc.data().vegetable
                data[3].milk = data[3].milk + doc.data().milk
                data[3].meat = data[3].meat + doc.data().meat
                data[3].fat = data[3].fat + doc.data().fat
                data[3].sugar = data[3].sugar + doc.data().sugar
                data[3].sodium = data[3].sodium + doc.data().sodium
            });
        })
    await admin.firestore().collection("users").doc(userId).collection("diary").doc(date).collection('dinner').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                data[4].rice = data[4].rice + doc.data().rice
                data[4].fruits = data[4].fruits + doc.data().fruits
                data[4].vegetable = data[4].vegetable + doc.data().vegetable
                data[4].milk = data[4].milk + doc.data().milk
                data[4].meat = data[4].meat + doc.data().meat
                data[4].fat = data[4].fat + doc.data().fat
                data[4].sugar = data[4].sugar + doc.data().sugar
                data[4].sodium = data[4].sodium + doc.data().sodium
            });
        })
    await admin.firestore().collection("users").doc(userId).collection("diary").doc(date).collection('beforebed').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                data[5].rice = data[5].rice + doc.data().rice
                data[5].fruits = data[5].fruits + doc.data().fruits
                data[5].vegetable = data[5].vegetable + doc.data().vegetable
                data[5].milk = data[5].milk + doc.data().milk
                data[5].meat = data[5].meat + doc.data().meat
                data[5].fat = data[5].fat + doc.data().fat
                data[5].sugar = data[5].sugar + doc.data().sugar
                data[5].sodium = data[5].sodium + doc.data().sodium
            });
        })

    var dataTotal = {
        rice: data[0].rice + data[1].rice + data[2].rice + data[3].rice + data[4].rice + data[5].rice,
        fruits: data[0].fruits + data[1].fruits + data[2].fruits + data[3].fruits + data[4].fruits + data[5].fruits,
        vegetable: data[0].vegetable + data[1].vegetable + data[2].vegetable + data[3].vegetable + data[4].vegetable + data[5].vegetable,
        milk: data[0].milk + data[1].milk + data[2].milk + data[3].milk + data[4].milk + data[5].milk,
        meat: data[0].meat + data[1].meat + data[2].meat + data[3].meat + data[4].meat + data[5].meat,
        fat: data[0].fat + data[1].fat + data[2].fat + data[3].fat + data[4].fat + data[5].fat,
        sugar: data[0].sugar + data[1].sugar + data[2].sugar + data[3].sugar + data[4].sugar + data[5].sugar,
        sodium: data[0].sodium + data[1].sodium + data[2].sodium + data[3].sodium + data[4].sodium + data[5].sodium,
    }

    //console.log(dataTotal)
    var balance = {
        rice: calculate(ratio.rice, dataTotal.rice),
        fruits: calculate(ratio.fruits, dataTotal.fruits),
        vegetable: calculate(ratio.vegetable, dataTotal.vegetable),
        milk: calculate(ratio.milk, dataTotal.milk),
        meat: calculate(ratio.meat, dataTotal.meat),
        fat: calculate(ratio.fat, dataTotal.fat),
        sugar: calculate(ratio.sugar, dataTotal.sugar),
        sodium: calculate(ratio.sodium, dataTotal.sodium),
    }
    //console.log(balance)

    await admin.firestore().collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("ratio").set(ratio);
    await admin.firestore().collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("total").set(dataTotal);
    await admin.firestore().collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("balance").set(balance);


    function calculate(ratio, dataTotal) {
        var result = ratio - dataTotal

        return parseFloat(result)
    }
}

module.exports = {
    'calBalance': calBalance
}