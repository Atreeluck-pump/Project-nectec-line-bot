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


//Auth
const email = "test@hotmail.com";
const password = "123456";
firebase.auth().signInWithEmailAndPassword(email, password);


window.onload = function () {
    const defaultLiffId = "1653872646-pW8my9P4";
    myLiffId = defaultLiffId;
    initializeLiff(myLiffId);
}
//install LIFF
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            getProfile();
        })
}

// text tag
const txtName = document.getElementById("txtName")
const txtGender = document.getElementById("txtGender")
const txtBday = document.getElementById("txtBday")
const txtWeight = document.getElementById("txtWeight")
const txtHeight = document.getElementById("txtHeight")
const txtTrainer = document.getElementById("txtTrainer")
const txtBmr = document.getElementById("txtBmr")
const txtBmi = document.getElementById("txtBmi")
const txtResultBmi = document.getElementById("txtResultBmi")

// input tag
const inputFullname = document.getElementById("inputFullname")
const inputLastname = document.getElementById("inputLastname")
const inputBday = document.getElementById("inputBday")
const inputWeight = document.getElementById("inputWeight")
const inputHeight = document.getElementById("inputHeight")
const inputTrainer = document.getElementById("inputTrainer")

function scanCode() {
    if (liff.scanCode) {
        liff.scanCode().then(result => {
            const stringifiedResult = JSON.stringify(result.value);
            const stringifiedResult1 = stringifiedResult.replace("\"", "")
            const qrcode = stringifiedResult1.replace("\"", "")
            inputTrainer.value = qrcode;
        });
    }
}
// Get data Profile
function getProfile() {
    liff.getProfile().then(function (profile) {
        const userId = profile.userId
        db.collection("users").doc(userId).collection("information").doc("profile").get()
            .then(function (doc) {
                //console.log(doc.data())
                const imageProfile = document.getElementById('imageProfile');
                imageProfile.src = doc.data().displayImage
                imageProfile.setAttribute('class', 'rounded mx-auto d-block')

                const name = `${doc.data().fullname} ${doc.data().lastname}`
                const fullname = doc.data().fullname
                const lastname = doc.data().lastname
                const gender = doc.data().gender
                const bday = doc.data().brithday
                const weight = doc.data().weight
                const height = doc.data().height
                const qrcodetrainer = doc.data().trainer
                //var trainer
                if (qrcodetrainer != '') {
                    db.collection("admin").doc(qrcodetrainer).get()
                        .then(function (doc) {
                            if (doc.exists) {
                                txtTrainer.innerHTML = `${doc.data().fullname} ${doc.data().lastname}`
                            } else {
                                // doc.data() will be undefined in this case
                                txtTrainer.innerHTML = 'ไม่มีผู้ดูแล'
                            }
                        })
                } else {
                    txtTrainer.innerHTML = doc.data().trainer
                }
                const bmi = doc.data().bmi
                const bmr = (doc.data().bmr).toFixed(2)
                const resultBmi = doc.data().resultBmi

                const brithday = moment(bday, 'DD/MM/YYYY').format('YYYY-MM-DD')
                const bdayTh = moment(bday, 'DD/MM/YYYY').add(543, 'years').format('Do MMMM YYYY')

                txtName.innerHTML = name
                txtGender.innerHTML = gender
                txtBday.innerHTML = bdayTh
                txtWeight.innerHTML = weight
                txtHeight.innerHTML = height
                txtBmr.innerHTML = bmr
                //txtTrainer.innerHTML = qrcodetrainer
                txtBmi.innerHTML = bmi
                txtResultBmi.innerHTML = resultBmi
                amchart(bmi)

                inputFullname.value = fullname
                inputLastname.value = lastname
                inputBday.value = brithday
                inputWeight.value = weight
                inputHeight.value = height
            })
    })

}

// amchart bmi
function amchart(bmi) {
    //BMI
    am4core.ready(function () {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        var container = am4core.create("chartdiv", am4core.Container);
        container.width = am4core.percent(100);
        container.height = am4core.percent(70);
        container.layout = "vertical";
        createBulletChart(container, "solid");
        /* Create ranges */
        function createRange(axis, from, to, color) {
            var range = axis.axisRanges.create();
            range.value = from;
            range.endValue = to;
            range.axisFill.fill = color;
            range.axisFill.fillOpacity = 0.8;
            range.label.disabled = true;
            range.grid.disabled = true;
        }
        /* Create bullet chart with specified color type for background */
        function createBulletChart(parent, colorType) {
            var colors = ["#24abe2", "#3af901", "#fefb01", "#FF6611", "#F90D1B"];

            /* Create chart instance */
            var chart = container.createChild(am4charts.XYChart);
            chart.paddingRight = 25;

            /* Add data */
            chart.data = [{
                "category": "BMI",
                "value": bmi,
            }];

            /* Create axes */
            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "category";
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.grid.template.disabled = true;

            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.minGridDistance = 30;
            valueAxis.renderer.grid.template.disabled = true;
            valueAxis.min = 10;
            valueAxis.max = 50;
            valueAxis.strictMinMax = true;
            valueAxis.numberFormatter.numberFormat = "#";
            valueAxis.renderer.baseGrid.disabled = true;
            /* 
              In order to create separate background colors for each range of values, 
              you have to create multiple axisRange objects each with their own fill color 
            */
            if (colorType === "solid") {
                var start = 10, end = 18.5;
                createRange(valueAxis, start, end, am4core.color(colors[0]));
                var start = 18.5, end = 25;
                createRange(valueAxis, start, end, am4core.color(colors[1]));
                var start = 25, end = 30;
                createRange(valueAxis, start, end, am4core.color(colors[2]));
                var start = 30, end = 35;
                createRange(valueAxis, start, end, am4core.color(colors[3]));
                var start = 35, end = 50;
                createRange(valueAxis, start, end, am4core.color(colors[4]));
            }
            /* Create series */
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = "value";
            series.dataFields.categoryY = "category";
            series.columns.template.fill = am4core.color("#000");
            series.columns.template.stroke = am4core.color("#fff");
            series.columns.template.strokeWidth = 1;
            series.columns.template.strokeOpacity = 0.5;
            series.columns.template.height = am4core.percent(25);
            series.tooltipText = "{value}"

            chart.cursor = new am4charts.XYCursor()
            chart.cursor.lineX.disabled = true;
            chart.cursor.lineY.disabled = true;

            valueAxis.cursorTooltipEnabled = true;
            chart.arrangeTooltips = true;
        }
    }); // end am4core.ready()

}

btnSubmitName.addEventListener('click', e => {
    const fullname = inputFullname.value;
    const lastname = inputLastname.value;
    if (!fullname || !lastname) {
        Swal.fire({
            icon: 'error',
            title: '<h6>กรุณาใส่ข้อมูลให้ครบถ้วน!</h6>',
        })
    } else {
        Swal.fire({
            icon: 'warning',
            title: '<h6>รอสักครู่กำลังบันทึกข้อมูล..</h6>',
            showConfirmButton: false,
            timer: 20000
        })
        liff.getProfile().then(async function (profile) {
            const userId = profile.userId
            try {
                await db.collection("users").doc(userId).update({
                    LoginTimestamp: new Date().getTime(),
                    LoginDate: date,
                    name: `${fullname} ${lastname}`,
                })
                // Update information
                await db.collection("users").doc(userId).collection("information").doc("profile").update({
                    fullname: fullname,
                    lastname: lastname,
                })
                Swal.fire({
                    icon: 'success',
                    title: '<h6>บันทึกข้อมูลสำเร็จ!</h6>',
                })
                $('#modalName').modal('hide');
                getProfile(userId)
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

// update Gender
btnSubmitGender.addEventListener('click', e => {
    const inputGender = document.querySelector('input[name="inputGender"]:checked')
    const gender = inputGender.value;
    const weight = parseFloat(inputWeight.value)
    const height = parseFloat(inputHeight.value)
    const bday = inputBday.value
    const my_date = bday
    const brithday = moment(my_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    const diff = moment(bday, 'YYYY-MM-DD')
    const age = moment().diff(diff, 'years')
    Swal.fire({
        icon: 'warning',
        title: '<h6>รอสักครู่กำลังบันทึกข้อมูล..</h6>',
        showConfirmButton: false,
        timer: 20000
    })
    liff.getProfile().then(async function (profile) {
        const userId = profile.userId
        try {
            await db.collection("users").doc(userId).update({
                LoginTimestamp: new Date().getTime(),
                LoginDate: date,
            })
            // // Add Profile
            await db.collection("users").doc(userId).collection("information").doc("profile").update({
                age: age,
                brithday: brithday,
                height: height,
                weight: weight,
                gender: gender,
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
            Swal.fire({
                icon: 'success',
                title: '<h6>บันทึกข้อมูลสำเร็จ!</h6>',
            })
            $('#modalGender').modal('hide');
            getProfile(userId)
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: error,
            })
        }
    })

})
// update Bday
btnSubmitBday.addEventListener('click', e => {
    const inputGender = document.querySelector('input[name="inputGender"]:checked')
    const gender = inputGender.value;
    const weight = parseFloat(inputWeight.value)
    const height = parseFloat(inputHeight.value)
    const bday = inputBday.value
    const my_date = bday
    const brithday = moment(my_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    const diff = moment(bday, 'YYYY-MM-DD')
    const age = moment().diff(diff, 'years')
    Swal.fire({
        icon: 'warning',
        title: '<h6>รอสักครู่กำลังบันทึกข้อมูล..</h6>',
        showConfirmButton: false,
        timer: 20000
    })
    liff.getProfile().then(async function (profile) {
        const userId = profile.userId
        try {
            await db.collection("users").doc(userId).update({
                LoginTimestamp: new Date().getTime(),
                LoginDate: date,
            })
            // // Add Profile
            await db.collection("users").doc(userId).collection("information").doc("profile").update({
                age: age,
                brithday: brithday,
                height: height,
                weight: weight,
                gender: gender,
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
            Swal.fire({
                icon: 'success',
                title: '<h6>บันทึกข้อมูลสำเร็จ!</h6>',
            })
            $('#modalBday').modal('hide');
            getProfile(userId)
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: error,
            })
        }
    })

})
// update Weight
btnSubmitWeight.addEventListener('click', e => {
    const inputGender = document.querySelector('input[name="inputGender"]:checked')
    const gender = inputGender.value;
    const weight = parseFloat(inputWeight.value)
    const height = parseFloat(inputHeight.value)
    const bday = inputBday.value
    const my_date = bday
    const brithday = moment(my_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    const diff = moment(bday, 'YYYY-MM-DD')
    const age = moment().diff(diff, 'years')
    Swal.fire({
        icon: 'warning',
        title: '<h6>รอสักครู่กำลังบันทึกข้อมูล..</h6>',
        showConfirmButton: false,
        timer: 20000
    })
    liff.getProfile().then(async function (profile) {
        const userId = profile.userId
        var displayImage
        if (profile.pictureUrl) {
            displayImage = profile.pictureUrl
        } else {
            displayImage = "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/icon%2FFlex%2Fuser.jpg?alt=media&token=612e6c2c-4cf9-4462-8c70-3674e23f3e98"
        }
        try {
            await db.collection("users").doc(userId).update({
                LoginTimestamp: new Date().getTime(),
                LoginDate: date,
            })
            // // Add Profile
            await db.collection("users").doc(userId).collection("information").doc("profile").update({
                displayImage:displayImage,
                age: age,
                brithday: brithday,
                height: height,
                weight: weight,
                gender: gender,
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
            Swal.fire({
                icon: 'success',
                title: '<h6>บันทึกข้อมูลสำเร็จ!</h6>',
            })
            $('#modalWeight').modal('hide');
            getProfile(userId)
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: error,
            })
        }
    })

})
// update Height
btnSubmitHeight.addEventListener('click', e => {
    const inputGender = document.querySelector('input[name="inputGender"]:checked')
    const gender = inputGender.value;
    const weight = parseFloat(inputWeight.value)
    const height = parseFloat(inputHeight.value)
    const bday = inputBday.value
    const my_date = bday
    const brithday = moment(my_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    const diff = moment(bday, 'YYYY-MM-DD')
    const age = moment().diff(diff, 'years')
    Swal.fire({
        icon: 'warning',
        title: '<h6>รอสักครู่กำลังบันทึกข้อมูล..</h6>',
        showConfirmButton: false,
        timer: 20000
    })
    liff.getProfile().then(async function (profile) {
        const userId = profile.userId
        try {
            await db.collection("users").doc(userId).update({
                LoginTimestamp: new Date().getTime(),
                LoginDate: date,
            })
            // // Add Profile
            await db.collection("users").doc(userId).collection("information").doc("profile").update({
                age: age,
                brithday: brithday,
                height: height,
                weight: weight,
                gender: gender,
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
            Swal.fire({
                icon: 'success',
                title: '<h6>บันทึกข้อมูลสำเร็จ!</h6>',
            })
            $('#modalHeight').modal('hide');
            getProfile(userId)
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: error,
            })
        }
    })

})
// update Trainer
btnSubmitTrainer.addEventListener('click', e => {
    const trainer = inputTrainer.value
    if (!trainer) {
        Swal.fire({
            icon: 'error',
            title: '<h6>กรุณาใส่ QR code ผู้ดูแล</h6>',
        })
    } else {
        Swal.fire({
            icon: 'warning',
            title: '<h6>รอสักครู่กำลังบันทึกข้อมูล..</h6>',
            showConfirmButton: false,
            timer: 20000
        })
        liff.getProfile().then(async function (profile) {
            const userId = profile.userId
            try {
                await db.collection("users").doc(userId).update({
                    LoginTimestamp: new Date().getTime(),
                    LoginDate: date,
                    trainer: trainer
                })
                // // Add Profile
                await db.collection("users").doc(userId).collection("information").doc("profile").update({
                    trainer: trainer,
                })
                Swal.fire({
                    icon: 'success',
                    title: '<h6>บันทึกข้อมูลสำเร็จ!</h6>',
                })
                $('#modalTrainer').modal('hide');
                getProfile(userId)
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

// calculate BMI
function calBMI(height, weight) {
    const x = (height / 100) * (height / 100)
    const y = weight / x
    const z = y.toFixed(2)
    const result = parseFloat(z)
    return result
}
// calculate BMR
function calBMR(height, weight, age, gender) {
    if (gender == 'ชาย') {
        const result = 66 + (13.7 * weight) + (5 * height) - (6.8 * age)
        return result
    } else {
        const result = 665 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
        return result
    }
}
// calculate BMI ปกติ อ้วน อ้วนมาก ...
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