var urlParams = new URLSearchParams(window.location.search);
const meal = urlParams.get('meal');
const docId = urlParams.get('docId');
const date = urlParams.get('date');
var mealName = convertTime(meal);
function convertTime(meal) {
    if (meal == "breakfast") { return 'อาหารมื้อเช้า' }
    if (meal == "morningsnack") { return 'อาหารว่างเช้า' }
    if (meal == "lunch") { return 'อาหารมื้อกลางวัน' }
    if (meal == "afternoonsnack") { return 'อาหารว่างบ่าย' }
    if (meal == "dinner") { return 'อาหารเย็น' }
    if (meal == "beforebed") { return 'อาหารก่อนนอน' }
}
document.title = `แก้ไข${mealName}`;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFdWUGFqrb_Z8HIMnDC1EcZMt5XgUrjDk",
    authDomain: "hba-project-db81d.firebaseapp.com",
    databaseURL: "https://hba-project-db81d.firebaseio.com",
    projectId: "hba-project-db81d",
    storageBucket: "hba-project-db81d.appspot.com",
    messagingSenderId: "73692768531",
    appId: "1:73692768531:web:5bed26d43798d601a7d2e6",
    measurementId: "G-824HMK752T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

//Auth
const email = "test@hotmail.com";
const password = "123456";
firebase.auth().signInWithEmailAndPassword(email, password);

window.onload = function () {
    const defaultLiffId = "1653872646-50jgVzQb";
    myLiffId = defaultLiffId;
    initializeLiff(myLiffId);
};
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
        })
}
function initializeApp() {
    displayLiffData();
}
const typeFood = document.getElementById("inputTypeFood")
const foodname = document.getElementById("inputNemeMeal")
const rice = document.getElementById("inputRice")
const fruits = document.getElementById("inputFruits")
const typevegetable = document.getElementById("inputTypeVegetable")
const vegetable = document.getElementById("inputVegetable")
const typemilk = document.getElementById("inputTypeMilk")
const milk = document.getElementById("inputMilk")
const typemeat = document.getElementById("inputTypeMeat")
const meat = document.getElementById("inputMeat")
const fat = document.getElementById("inputFat")
const sugar = document.getElementById("inputSugar")
const sodium = document.getElementById("inputSodium")
//const image = document.getElementById("inputImageFood")
const imagepath = document.getElementById("imagepath")
function displayLiffData() {
    liff.getProfile().then(function (profile) {
        const userId = profile.userId;
        db.collection("users").doc(userId).collection("diary").doc(date).collection(meal).doc(docId).get()
            .then(function (doc) {
                const imageFood = document.getElementById('imageFood');
                if (imageFood.firstElementChild) {
                    imageFood.removeChild(imageFood.firstElementChild);
                }
                const img = document.createElement('img');
                img.src = doc.data().image;
                img.alt = 'Profile Picture';
                //size image
                img.height = "200";
                imageFood.appendChild(img);

                typeFood.value = doc.data().typeFood
                foodname.value = doc.data().foodname
                rice.value = doc.data().rice
                fruits.value = doc.data().fruits
                typevegetable.value = doc.data().typeVegetable
                vegetable.value = doc.data().vegetable
                typemilk.value = doc.data().typemilk
                milk.value = doc.data().milk
                typemeat.value = doc.data().typeMeat
                meat.value = doc.data().meat
                fat.value = doc.data().fat
                sugar.value = doc.data().sugar
                sodium.value = doc.data().sodium
                imagepath.value = doc.data().imagepath;
            })
    });
}

btnUpload.addEventListener('click', e => {
    const txtTypeFood = typeFood.options[typeFood.selectedIndex].value
    const txtFoodname = foodname.value
    const txtRice = rice.value
    const txtFruits = fruits.value
    const txtTypeVegetable = typevegetable.options[typevegetable.selectedIndex].value
    const txtVegetable = vegetable.value
    const txtTypeMilk = typemilk.options[typemilk.selectedIndex].value
    const txtMilk = milk.value
    const txtTypeMeat = typemeat.options[typemeat.selectedIndex].value
    const txtMeat = meat.value
    const txtFat = fat.value
    const txtSugar = sugar.value
    const txtSodium = sodium.value

    const kcal = calculateKcal()
    //console.log(imageFile)
    //console.log(txtTypeFood, txtFoodname, txtRice, txtFruits, txtTypeVegetable, txtVegetable, txtTypeMilk, txtMilk, txtTypeMeat, txtMeat, txtTypeFat, txtFat, txtSugar, txtSodium)
    if (!txtFoodname) {
        Swal.fire({
            icon: 'error',
            title: '<h6>กรุณาใส่ชื่อเมนู!</h6>',
        })
    } else {
        Swal.fire({
            icon: 'info',
            title: '<h6>รอสักครู่กำลังบันทึกข้อมูล..</h6>',
            showConfirmButton: false,
            timer: 20000
        })
        liff.getProfile().then(async function (profile) {
            const userId = profile.userId;
            try {
                //แก้ไขมื้ออาหารที่ต้องการแก้ไข
                await db.collection("users").doc(userId).collection("diary").doc(date).collection(meal).doc(docId).update({
                    //console.log(txtTypeFood, txtFoodname, txtRice, txtFruits, txtTypeVegetable, txtVegetable, txtTypeMilk, txtMilk, txtTypeMeat, txtMeat, txtTypeFat, txtFat, txtSugar, txtSodium)
                    foodname: txtFoodname,
                    rice: parseFloat(checkData(txtRice)),
                    fruits: parseFloat(checkData(txtFruits)),
                    vegetable: parseFloat(checkData(txtVegetable)),
                    milk: parseFloat(checkData(txtMilk)),
                    meat: parseFloat(checkData(txtMeat)),
                    fat: parseFloat(checkData(txtFat)),
                    sugar: parseFloat(checkData(txtSugar)),
                    sodium: parseFloat(checkData(txtSodium)),
                    typeFood: txtTypeFood,
                    typeVegetable: txtTypeVegetable,
                    typeMeat: txtTypeMeat,
                    typemilk: txtTypeMilk,
                    kcalProtein: kcal.protein,
                    kcalCarbo: kcal.carbo,
                    kcalFat: kcal.fat,
                    kcal: kcal.kcal,
                })
                //แก้ไขสัดส่วนตั้งต้น คงเหลือ ที่กินทั้งหมดวันนั้น
                await updateHistory(userId).then(function () {
                    Swal.fire({
                        icon: 'success',
                        title: '<h6>บันทึกข้อมูลสำเร็จ!</h6>',
                    }).then(function () {
                        liff.sendMessages([{
                            'type': 'text',
                            'text': `ดู${mealName}`
                        }])
                        liff.closeWindow();
                    })
                })
            }
            catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: error,
                })
            }
        })
    }
})

function checkData(data) {
    if (data == '') { return '0' } else { return data }
}
// ลบมื้ออาหารที่เลือก
btnDelete.addEventListener('click', e => {
    Swal.fire({
        icon: 'info',
        title: '<h6>รอสักครู่กำลังลบข้อมูล..</h6>',
        showConfirmButton: false,
        timer: 20000
    })
    const path = imagepath.value;
    liff.getProfile().then(async function (profile) {
        const userId = profile.userId;
        try {
            //ลบอาหารมื้อที่ต้องการ
            await db.collection("users").doc(userId).collection("diary").doc(date).collection(meal).doc(docId).delete().then(function () {
                if (path != undefined) {
                    var storage = firebase.storage();
                    // Create a storage reference from our storage service
                    var storageRef = storage.ref();
                    var desertRef = storageRef.child(path);
                    // Delete the file
                    desertRef.delete()
                }
            })
            //อัพเดทสัดส่วนทั้งหมด สัดส่วนคงเหลือ
            await updateHistory(userId).then(function () {
                Swal.fire({
                    icon: 'success',
                    title: '<h6>ลบมื้ออาหารสำเร็จ!</h6>',
                }).then(function () {
                    liff.sendMessages([{
                        'type': 'text',
                        'text': `ดู${mealName}`
                    }])
                    liff.closeWindow();
                })
            })
        }
        catch (error) {
            Swal.fire({
                icon: 'success',
                title: error,
            })
        }

    })
})

// Modal แผ่นพับรายการอาหารแลกเปลี่ยน
function modalImg(inputDataModal) {
    if (inputDataModal == 'rice') {
        imageDataModal = 'https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F001.jpeg?alt=media&token=914ce531-3078-4c5b-86d2-9752badf903b'
        sweetImage(imageDataModal)
    }
    if (inputDataModal == 'fruits') {
        imageDataModal = 'https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F002.jpeg?alt=media&token=0d937fc3-2642-4a9a-86d8-bfd129f6f1c7'
        sweetImage(imageDataModal)
    }
    if (inputDataModal == 'vegetable') {
        imageDataModal = 'https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F003.jpeg?alt=media&token=26e02c22-86bf-484f-a4eb-b9bad6ab0b06'
        imageDataModal2 = 'https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F004.jpeg?alt=media&token=c0b7dc5e-8664-4141-8b28-034e91031026'
        sweetImage(imageDataModal, imageDataModal2)
    }
    if (inputDataModal == 'milk') {
        imageDataModal = 'https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F005.jpeg?alt=media&token=edf28208-1d10-4b84-bf94-0adcbe2b7b17'
        sweetImage(imageDataModal)
    }
    if (inputDataModal == 'meat') {
        imageDataModal = 'https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F006.jpeg?alt=media&token=0a224c37-b47d-457f-a80a-8fc4fa6d35a9'
        imageDataModal2 = 'https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F007.jpeg?alt=media&token=f8653256-a22d-453a-8325-c3ebc6d4cab4'
        sweetImage(imageDataModal, imageDataModal2)
    }
    if (inputDataModal == 'fat') {
        imageDataModal = 'https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F008.jpeg?alt=media&token=40511d70-a1b7-4839-98df-8367481c91b9'
        sweetImage(imageDataModal)
    }

    function sweetImage(imageDataModal, imageDataModal2) {
        if (imageDataModal2) {
            Swal.fire({
                html: `<img src="${imageDataModal} " height="300 " ><br><img src="${imageDataModal2} " height="300 ">`,
                showCloseButton: true,
            })
        } else {
            Swal.fire({
                html: `<img src="${imageDataModal} " height="300 " >`,
                showCloseButton: true,
            })
        }
    }
}