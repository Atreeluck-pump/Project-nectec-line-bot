var admin = require("firebase-admin");
const serviceAccount = require("../key-firestore.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hba-project-db81d.firebaseio.com",
    storageBucket: "gs://hba-project-db81d.appspot.com"
});

const show = (userId) => {
    admin.firestore().collection("users").doc(userId).collection('diary').where("type", "==", 'breakfast')
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}
const add = (userId, txtType, txtFoodname, txtRice, txtFruits, txtVegetable, txtMilk, txtMeat, txtFat, txtSugar, txtSodium) => {
    const obj = {
        type: txtType,
        foodname: txtFoodname,
        rice: txtRice,
        fruits: txtFruits,
        vegetable: txtVegetable,
        milk: txtMilk,
        meat: txtMeat,
        fat: txtFat,
        sugar: txtSugar,
        sodium: txtSodium,
    }
    admin.firestore().collection('users').doc(userId).collection('diary').add(obj).then(ref => {
        console.log('Added document with ID: ', ref.id);
    })
}
const profile = (userId) => {
    admin.firestore().collection('users').doc(userId).collection('information').doc('profile').get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data());
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
}
const user = (userId) => {
    admin.firestore().collection("users").where("userId", "==", userId)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}
module.exports = {
    add,
    show,
    profile,
    user
}