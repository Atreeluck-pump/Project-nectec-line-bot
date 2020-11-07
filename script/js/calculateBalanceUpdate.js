async function updateHistory(userId) {
    const result = calculateKcal()
    const txtRice = parseFloat(checkData(rice.value))
    const txtFruits = parseFloat(checkData(fruits.value))
    const txtTypeVegetable = typevegetable.options[typevegetable.selectedIndex].value
    const txtVegetable = parseFloat(checkData(vegetable.value))
    const txtTypeMilk = typemilk.options[typemilk.selectedIndex].value
    const txtMilk = parseFloat(checkData(milk.value))
    const txtTypeMeat = typemeat.options[typemeat.selectedIndex].value
    const txtMeat = parseFloat(checkData(meat.value))
    const txtFat = parseFloat(checkData(fat.value))
    const txtSugar = parseFloat(checkData(sugar.value))
    const txtSodium = parseFloat(checkData(sodium.value))
    var vegetableA = 0
    if (txtTypeVegetable == 'a') {
        vegetableA = txtVegetable
    }
    var vegetableB = 0
    if (txtTypeVegetable == 'b') {
        vegetableB = txtVegetable
    }
    var milkNonfat = 0
    if (txtTypeMilk == 'nonfat') {
        milkNonfat = txtMilk
    }
    var milkLowfat = 0
    if (txtTypeMilk == 'lowfat') {
        milkLowfat = txtMilk
    }
    var milkFat = 0
    if (txtTypeMilk == 'fat') {
        milkFat = txtMilk
    }
    var meatNonfat = 0
    var meatLowfat = 0
    var meatMedium = 0
    var meatHighfat = 0
    if (txtTypeMeat == 'nonfat') {
        meatNonfat = txtMeat
    }
    if (txtTypeMeat == 'lowfat') {
        meatLowfat = txtMeat
    }
    if (txtTypeMeat == 'medium') {
        meatMedium = txtMeat
    }
    if (txtTypeMeat == 'highfat') {
        meatHighfat = txtMeat
    }

    try {
        var getRatio
        // เรียกข้อมูลสัดส่วนตั้งต้น
        await db.collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("ratio").get().then(function (doc) {
            getRatio = doc.data();
        })
        var data = [
            breakfastData = { fat: 0, fruits: 0, kcal: 0, kcalCarbo: 0, kcalFat: 0, kcalProtein: 0, meat: 0, meatHighfat: 0, meatLowfat: 0, meatMedium: 0, meatNonfat: 0, milk: 0, milkFat: 0, milkLowfat: 0, milkNonfat: 0, rice: 0, sodium: 0, sugar: 0, vegetable: 0, vegetableA: 0, vegetableB: 0 },
            morningsnackData = { fat: 0, fruits: 0, kcal: 0, kcalCarbo: 0, kcalFat: 0, kcalProtein: 0, meat: 0, meatHighfat: 0, meatLowfat: 0, meatMedium: 0, meatNonfat: 0, milk: 0, milkFat: 0, milkLowfat: 0, milkNonfat: 0, rice: 0, sodium: 0, sugar: 0, vegetable: 0, vegetableA: 0, vegetableB: 0 },
            lunchData = { fat: 0, fruits: 0, kcal: 0, kcalCarbo: 0, kcalFat: 0, kcalProtein: 0, meat: 0, meatHighfat: 0, meatLowfat: 0, meatMedium: 0, meatNonfat: 0, milk: 0, milkFat: 0, milkLowfat: 0, milkNonfat: 0, rice: 0, sodium: 0, sugar: 0, vegetable: 0, vegetableA: 0, vegetableB: 0 },
            afternoonsnackData = { fat: 0, fruits: 0, kcal: 0, kcalCarbo: 0, kcalFat: 0, kcalProtein: 0, meat: 0, meatHighfat: 0, meatLowfat: 0, meatMedium: 0, meatNonfat: 0, milk: 0, milkFat: 0, milkLowfat: 0, milkNonfat: 0, rice: 0, sodium: 0, sugar: 0, vegetable: 0, vegetableA: 0, vegetableB: 0 },
            dinnerData = { fat: 0, fruits: 0, kcal: 0, kcalCarbo: 0, kcalFat: 0, kcalProtein: 0, meat: 0, meatHighfat: 0, meatLowfat: 0, meatMedium: 0, meatNonfat: 0, milk: 0, milkFat: 0, milkLowfat: 0, milkNonfat: 0, rice: 0, sodium: 0, sugar: 0, vegetable: 0, vegetableA: 0, vegetableB: 0 },
            beforebedData = { fat: 0, fruits: 0, kcal: 0, kcalCarbo: 0, kcalFat: 0, kcalProtein: 0, meat: 0, meatHighfat: 0, meatLowfat: 0, meatMedium: 0, meatNonfat: 0, milk: 0, milkFat: 0, milkLowfat: 0, milkNonfat: 0, rice: 0, sodium: 0, sugar: 0, vegetable: 0, vegetableA: 0, vegetableB: 0 },
        ]
        //เรียกประวัติการทานอาหารทั้งหมดในสันนั้น
        const collectionMeal = ['breakfast', 'morningsnack', 'lunch', 'afternoonsnack', 'dinner', 'beforebed',]
        for (let i = 0; i < collectionMeal.length; i++) {
            await db.collection("users").doc(userId).collection("diary").doc(date).collection(collectionMeal[i]).get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        data[i].rice = data[i].rice + doc.data().rice
                        data[i].fruits = data[i].fruits + doc.data().fruits
                        ////Vegetable
                        data[i].vegetable = data[i].vegetable + doc.data().vegetable
                        if (doc.data().typeVegetable == 'a') {
                            data[i].vegetableA = data[i].vegetableA + doc.data().vegetable
                        }
                        if (doc.data().typeVegetable == 'b') {
                            data[i].vegetableB = data[i].vegetableB + doc.data().vegetable
                        }
                        ////Milk
                        data[i].milk = data[i].milk + doc.data().milk
                        if (doc.data().typemilk == 'nonfat') {
                            data[i].milkNonfat = data[i].milkNonfat + doc.data().milk
                        }
                        if (doc.data().typemilk == 'lowfat') {
                            data[i].milkLowfat = data[i].milkLowfat + doc.data().milk
                        }
                        if (doc.data().typemilk == 'fat') {
                            data[i].milkFat = data[i].milkFat + doc.data().milkFat
                        }
                        ////Meat
                        data[i].meat = data[i].meat + doc.data().meat
                        if (doc.data().typemilk == 'nonfat') {
                            data[i].meatNonfat = data[i].meatNonfat + doc.data().meat
                        }
                        if (doc.data().typemilk == 'lowfat') {
                            data[i].meatLowfat = data[i].meatLowfat + doc.data().meat
                        }
                        if (doc.data().typemilk == 'medium') {
                            data[i].meatMedium = data[i].meatMedium + doc.data().meat
                        }
                        if (doc.data().typemilk == 'highfat') {
                            data[i].meatHighfat = data[i].meatHighfat + doc.data().meat
                        }
                        data[i].fat = data[i].fat + doc.data().fat
                        data[i].sugar = data[i].sugar + doc.data().sugar
                        data[i].sodium = data[i].sodium + doc.data().sodium
                        data[i].kcal = data[i].kcal + doc.data().kcal
                        data[i].kcalCarbo = data[i].kcalCarbo + doc.data().kcalCarbo
                        data[i].kcalFat = data[i].kcalFat + doc.data().kcalFat
                        data[i].kcalProtein = data[i].kcalProtein + doc.data().kcalProtein
                    });
                })
        }

        var newTotal = {
            rice: data[0].rice + data[1].rice + data[2].rice + data[3].rice + data[4].rice + data[5].rice,
            fruits: data[0].fruits + data[1].fruits + data[2].fruits + data[3].fruits + data[4].fruits + data[5].fruits,
            vegetable: data[0].vegetable + data[1].vegetable + data[2].vegetable + data[3].vegetable + data[4].vegetable + data[5].vegetable,
            vegetableA: data[0].vegetableA + data[1].vegetableA + data[2].vegetableA + data[3].vegetableA + data[4].vegetableA + data[5].vegetableA,
            vegetableB: data[0].vegetableB + data[1].vegetableB + data[2].vegetableB + data[3].vegetableB + data[4].vegetableB + data[5].vegetableB,
            milk: data[0].milk + data[1].milk + data[2].milk + data[3].milk + data[4].milk + data[5].milk,
            milkFat: data[0].milkFat + data[1].milkFat + data[2].milkFat + data[3].milkFat + data[4].milkFat + data[5].milkFat,
            milkLowfat: data[0].milkLowfat + data[1].milkLowfat + data[2].milkLowfat + data[3].milkLowfat + data[4].milkLowfat + data[5].milkLowfat,
            milkNonfat: data[0].milkNonfat + data[1].milkNonfat + data[2].milkNonfat + data[3].milkNonfat + data[4].milkNonfat + data[5].milkNonfat,
            meat: data[0].meat + data[1].meat + data[2].meat + data[3].meat + data[4].meat + data[5].meat,
            meatHighfat: data[0].meatHighfat + data[1].meatHighfat + data[2].meatHighfat + data[3].meatHighfat + data[4].meatHighfat + data[5].meatHighfat,
            meatLowfat: data[0].meatLowfat + data[1].meatLowfat + data[2].meatLowfat + data[3].meatLowfat + data[4].meatLowfat + data[5].meatLowfat,
            meatMedium: data[0].meatMedium + data[1].meatMedium + data[2].meatMedium + data[3].meatMedium + data[4].meatMedium + data[5].meatMedium,
            meatNonfat: data[0].meatNonfat + data[1].meatNonfat + data[2].meatNonfat + data[3].meatNonfat + data[4].meatNonfat + data[5].meatNonfat,
            fat: data[0].fat + data[1].fat + data[2].fat + data[3].fat + data[4].fat + data[5].fat,
            sugar: data[0].sugar + data[1].sugar + data[2].sugar + data[3].sugar + data[4].sugar + data[5].sugar,
            sodium: data[0].sodium + data[1].sodium + data[2].sodium + data[3].sodium + data[4].sodium + data[5].sodium,
            kcal: data[0].kcal + data[1].kcal + data[2].kcal + data[3].kcal + data[4].kcal + data[5].kcal,
            kcalCarbo: data[0].kcalCarbo + data[1].kcalCarbo + data[2].kcalCarbo + data[3].kcalCarbo + data[4].kcalCarbo + data[5].kcalCarbo,
            kcalFat: data[0].kcalFat + data[1].kcalFat + data[2].kcalFat + data[3].kcalFat + data[4].kcalFat + data[5].kcalFat,
            kcalProtein: data[0].kcalProtein + data[1].kcalProtein + data[2].kcalProtein + data[3].kcalProtein + data[4].kcalProtein + data[5].kcalProtein,
        }
        if (newTotal.kcal != 0) {
            var balance = {
                rice: getRatio.rice - newTotal.rice,
                fruits: getRatio.fruits - newTotal.fruits,
                vegetable: getRatio.vegetable - newTotal.vegetable,
                milk: getRatio.milk - newTotal.milk,
                meat: getRatio.meat - newTotal.meat,
                fat: getRatio.fat - newTotal.fat,
                sugar: getRatio.sugar - newTotal.sugar,
                sodium: getRatio.sodium - newTotal.sodium,
                kcal: getRatio.bmr - newTotal.kcal
            }
            //บันทึกสัดส่วนที่กินทั้งหมด
            await db.collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("total").set(
                newTotal
            )
            //บันทึกสัดส่วนคงเหลือต่อวันทั้งหมด
            await db.collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("balance").set(
                balance
            )
        } else {
            // ถ้าผู้ใช้ลบมื้ออาหารจนหมดจะลบ doc date ของวันนั้นทิ้ง
            await db.collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("ratio").delete()
            await db.collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("total").delete()
            await db.collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("balance").delete()
            await db.collection("users").doc(userId).collection("diary").doc(date).delete()
        }

    }
    catch (error) {
        console.log(error)
    }
}
