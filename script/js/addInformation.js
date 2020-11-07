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

const dateNow = moment().format('YYYY-MM-DD')

//Auth
const email = "test@hotmail.com";
const password = "123456";
firebase.auth().signInWithEmailAndPassword(email, password);

window.onload = function () {
    document.getElementById("inputBday").value = dateNow
    const defaultLiffId = "1653872646-1LvgpmlW";
    myLiffId = defaultLiffId;
    initializeLiff(myLiffId);
};
//install LIFF
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
//ดึงรูปโปรไฟล์ของผู้ใช้ ไลน์
function displayLiffData() {
    liff.getProfile().then(function (profile) {
        var profileImage;
        if (profile.pictureUrl) {
            profileImage = profile.pictureUrl
        } else {
            profileImage = "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/icon%2FFlex%2Fuser.jpg?alt=media&token=612e6c2c-4cf9-4462-8c70-3674e23f3e98";
        }
        const profilePictureDiv = document.getElementById('profilePictureDiv');
        profilePictureDiv.src = profileImage
        profilePictureDiv.setAttribute('class', 'rounded mx-auto d-block')
    });
}

// input tag
const inputFullname = document.getElementById("inputFullname")
const inputLastname = document.getElementById("inputLastname")
const inputBday = document.getElementById("inputBday")
const inputWeight = document.getElementById("inputWeight")
const inputHeight = document.getElementById("inputHeight")

// บันทึกข้อมูลผู้ใช้ลงฐานข้อมูล
btnSubmit.addEventListener('click', e => {
    const gender = document.querySelector('input[name="inputGender"]:checked').value
    const fullname = inputFullname.value
    const lastname = inputLastname.value
    const bday = inputBday.value
    // const weightInput = inputWeight.value
    // const heightInput = inputHeight.value
    const weight = parseFloat(inputWeight.value)
    const height = parseFloat(inputHeight.value)

    const trainer = 'ไม่มีผู้ดูแล'

    const diff = moment(bday, 'YYYY-MM-DD')
    const age = moment().diff(diff, 'years')

    const my_date = bday
    const brithday = moment(my_date, 'YYYY-MM-DD').format('DD/MM/YYYY')

    if (!fullname || !lastname || !weight || !height) {
        Swal.fire({
            icon: 'error',
            title: '<h6>กรุณาใส่ข้อมูลให้ครบถ้วน!</h6>',
        })
    } else {
        Swal.fire({
            icon: 'info',
            title: '<h6>รอสักครู่กำลังบันทึกข้อมูล!</h6>',
            showConfirmButton: false,
            timer: 20000
        })

        //Create userId
        liff.getProfile().then(async function (profile) {
            try {
                const userId = profile.userId;
                var displayImage
                if (profile.pictureUrl) {
                    displayImage = profile.pictureUrl
                } else {
                    displayImage = "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/icon%2FFlex%2Fuser.jpg?alt=media&token=612e6c2c-4cf9-4462-8c70-3674e23f3e98"
                }
                //Create DB userId
                await db.collection("users").doc(userId).set({
                    LoginTimestamp: new Date().getTime(),
                    LoginDate: date,
                    timestamp: new Date().getTime(),
                    userId: userId,
                    submitdate: date,
                    name: `${fullname} ${lastname}`,
                    trainer: trainer,
                })
                // // Add Profile
                await db.collection("users").doc(userId).collection("information").doc("profile").set({
                    displayImage: displayImage,
                    fullname: fullname,
                    lastname: lastname,
                    age: age,
                    brithday: brithday,
                    height: height,
                    weight: weight,
                    gender: gender,
                    trainer: trainer,
                    bmi: calBMI(height, weight),
                    bmr: calBMR(height, weight, age, gender),
                    resultBmi: resultBmi(height, weight)
                })
                // Add health record 
                await db.collection("users").doc(userId).collection("heigthweigth-record").doc(date).set({
                    timestamp: new Date().getTime(),
                    age: age,
                    height: height,
                    weight: weight,
                    bmi: calBMI(height, weight),
                    bmr: calBMR(height, weight, age, gender),
                    resultBmi: resultBmi(height, weight)
                })
                // Add ratio
                await db.collection("users").doc(userId).collection("ratio-record").doc(date).set({
                    timestamp: new Date().getTime(),
                    rice: 5,
                    fruits: 4,
                    vegetable: 5,
                    milk: 2,
                    meat: 10,
                    fat: 6,
                    sugar: 6,
                    sodium: 5,
                    bmr: calBMR(height, weight, age, gender),
                }).then(function () {
                    Swal.fire({
                        icon: 'success',
                        title: '<h6>บันทึกข้อมูลสำเร็จ!</h6>',
                    }).then(function () {
                        liff.sendMessages([{
                            'type': 'text',
                            'text': "ลงทะเบียนเรียบร้อย"
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
function calBMI(height, weight) {
    const x = (height / 100) * (height / 100)
    const y = weight / x
    const z = y.toFixed(2)
    const result = parseFloat(z)
    return result
}
function calBMR(height, weight, age, gender) {
    if (gender == 'ชาย') {
        const result = 66 + (13.7 * weight) + (5 * height) - (6.8 * age)
        return result
    } else {
        const result = 665 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
        return result
    }
}
function resultBmi(height, weight) {
    const x = (height / 100) * (height / 100)
    const y = weight / x
    const z = y.toFixed(2)
    const bmi = parseFloat(z)
    var result = ''
    if (bmi >= 35) {
        result = 'อ้วน'
    } else if (35 > bmi && bmi >= 30) {
        result = 'อ้วนปลางกลาง'
    } else if (30 > bmi && bmi >= 25) {
        result = 'ท้วม'
    } else if (25 > bmi && bmi >= 18.5) {
        result = 'ปกติ'
    } else if (0 <= bmi && bmi < 18.5) {
        result = 'ผอม'
    }
    return result
}