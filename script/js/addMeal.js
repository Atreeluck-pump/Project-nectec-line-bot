var urlParams = new URLSearchParams(window.location.search);
const meal = urlParams.get('meal');
var nameMeal = convertTime(meal);
function convertTime(meal) {
    if (meal == "breakfast") { return 'อาหารมื้อเช้า' }
    if (meal == "morningsnack") { return 'อาหารว่างเช้า' }
    if (meal == "lunch") { return 'อาหารมื้อกลางวัน' }
    if (meal == "afternoonsnack") { return 'อาหารว่างบ่าย' }
    if (meal == "dinner") { return 'อาหารมื้อเย็น' }
    if (meal == "beforebed") { return 'อาหารก่อนนอน' }
}
document.title = `เพิ่ม${nameMeal}`;

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

//Moment
const date = moment().format('DD-MM-YYYY')
const time = moment().format('HH:mm:ss')

//Auth
const email = "test@hotmail.com";
const password = "123456";
firebase.auth().signInWithEmailAndPassword(email, password);

window.onload = function () {
    const defaultLiffId = "1653872646-1qwnbVX8";
    myLiffId = defaultLiffId;
    initializeLiff(myLiffId);
};
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
}

const typeFood = document.getElementById("inputTypeFood")
const foodname = document.getElementById("inputNameMeal")
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
const image = document.getElementById("inputImageFood")

// เพิ่มข้อมูลอาหารลงฐานข้อมูล
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
    const imageFile = image.files[0]

    const kcal = calculateKcal()
    //console.log(imageFile)
    //console.log(txtTypeFood, txtFoodname, txtRice, txtFruits, txtTypeVegetable, txtVegetable, txtTypeMilk, txtMilk, txtTypeMeat, txtMeat, txtTypeFat, txtFat, txtSugar, txtSodium)
    if (!txtFoodname) {
        Swal.fire({
            icon: 'error',
            title: '<h6>กรุณาใส่ชื่อเมนู!</h6>',
        })
    } else if (!imageFile) {
        //ถ้าผู้ใช้ไม่ใส่รูป
        Swal.fire({
            icon: 'info',
            title: '<h6>รอสักครู่กำลังบันทึกข้อมูล..</h6>',
            showConfirmButton: false,
            timer: 20000
        })
        liff.getProfile().then(async function (profile) {
            const userId = profile.userId;
            try {
                const image = "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/icon%2FFlex%2Ffood_default.png?alt=media&token=b0ccb88b-8aec-4b50-98be-225241dc1870"
                //อัพเดทการใช้งานล่าสุด
                await db.collection("users").doc(userId).update({
                    LoginDate: date,
                    LoginTimestamp: new Date().getTime()
                })
                //สร้างข้อมูลของวันนี้
                await db.collection("users").doc(userId).collection("diary").doc(date).set({
                    date: date,
                    timestamp: new Date().getTime()
                })
                // Add menu
                await db.collection("users").doc(userId).collection("diary").doc(date).collection(meal).add({
                    //console.log(txtTypeFood, txtFoodname, txtRice, txtFruits, txtTypeVegetable, txtVegetable, txtTypeMilk, txtMilk, txtTypeMeat, txtMeat, txtTypeFat, txtFat, txtSugar, txtSodium)
                    type: meal,
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
                    date: date,
                    time: time,
                    check: 'no',
                    image: image
                })
                //คำนวนสัดส่วนคงเหลือ สัดส่วนทั้งหมดที่กิน
                await calculateBalance(userId).then(function () {
                    Swal.fire({
                        icon: 'success',
                        title: '<h6>บันทึกข้อมูลสำเร็จ!</h6>',
                    }).then(function () {
                        liff.sendMessages([{
                            'type': 'text',
                            'text': `ดู${nameMeal}`
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
    } else {
        //ถ้าผู้ใช้ใส่รูป
        Swal.fire({
            icon: 'info',
            title: '<h6>รอสักครู่กำลังบันทึกข้อมูล..</h6>',
            showConfirmButton: false,
            timer: 20000
        })
        liff.getProfile().then(async function (profile) {
            const userId = profile.userId;
            try {
                //บันทึกรูปลง fire storage
                var imageName = new Date().getTime();
                var imagepath = `/images/${userId}/${imageName}`
                var storageref = firebase.storage().ref(`images/${userId}/` + imageName);
                var uploadTask = storageref.put(imageFile);

                uploadTask.on('state_changed', function (snapshot) {
                }, function (error) {
                    console.error(error);
                }, function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(async function (downloadURL) {
                        try {
                            //อัพเดทวันใช้งานล่าสุด
                            await db.collection("users").doc(userId).update({
                                LoginDate: date,
                                LoginTimestamp: new Date().getTime()
                            })
                            //สร้างข้อมูบของวันนี่
                            await db.collection("users").doc(userId).collection("diary").doc(date).set({
                                date: date,
                                timestamp: new Date().getTime()
                            })
                            //เพิ่มมื้ออาหาร
                            await db.collection("users").doc(userId).collection("diary").doc(date).collection(meal).add({
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
                                imagepath: imagepath,
                                date: date,
                                time: time,
                                check: 'no',
                                image: downloadURL
                            })
                            //คำนวณสัดส่วนคงเหลือ สัดส่วนทั้งหมดที่กิน
                            await calculateBalance(userId).then(function () {
                                Swal.fire({
                                    icon: 'success',
                                    title: '<h6>บันทึกข้อมูลสำเร็จ!</h6>',
                                }).then(function () {
                                    liff.sendMessages([{
                                        'type': 'text',
                                        'text': `ดู${nameMeal}`
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
                });
            }
            catch (error) {
                Swal.fire({
                    icon: 'success',
                    title: error,
                })
            }
        })

    }
})

function checkData(data) {
    if (data == '') { return '0' } else { return data }
}

// Script Image
function readURL(input) {
    if (input.files && input.files[0]) {
        
        
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.image-upload-wrap').hide();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();
            $('.image-title').html("ลบรูปภาพ");
        };
        reader.readAsDataURL(input.files[0]);

        var uploadFile = document.getElementById("inputImageFood").files[0];
        fileReader.readAsDataURL(uploadFile);

    } else {
        removeUpload();
    }
}
var fileReader = new FileReader();
fileReader.onload = function (event) {
    var image = new Image();

    image.onload = function () {
        //document.getElementById("original-Img").src = image.src;
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        canvas.width = image.width / 2;
        canvas.height = image.height / 2;
        context.drawImage(image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            canvas.width,
            canvas.height
        );
        //document.getElementById("upload-Preview").src = canvas.toDataURL();
        $('#canvasImg').val(canvas.toDataURL())
        
    }
    image.src = event.target.result;

};


function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

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