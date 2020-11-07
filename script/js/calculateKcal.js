function calculateKcal() {
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
    //const txtSodium = parseFloat(checkData(sodium.value))

    //////Carbo////////
    //Rice
    const proteinRice = txtRice * 2
    const carboRice = txtRice * 18
    const fatRice = 0
    const kcalRice = txtRice * 80
    //Vegetable
    var proteinVegetable = 0
    var carboVegatable = 0
    var fatVegetable = 0
    var kcalVegetable = 0
    if (txtTypeVegetable == 'b') {
        proteinVegetable = txtVegetable * 2
        carboVegatable = txtVegetable * 5
        kcalVegetable = txtVegetable * 25
    }
    //Fruits
    var proteinFruits = 0
    var carboFruits = txtFruits * 15
    var fatFruits = 0
    var kcalFruits = txtFruits * 60
    //Sugar
    var proteinSugar = 0
    var carboSugar = txtSugar * 4
    var fatSugar = 0
    var kcalSugar = txtSugar * 16
    //Sum Carbo
    const proteinCarbo = proteinRice + proteinVegetable + proteinFruits + proteinSugar
    const carboCarbo = carboRice + carboVegatable + carboFruits + carboSugar
    const fatCarbo = fatRice + fatVegetable + fatFruits + fatSugar
    const kcalCarbo = kcalRice + kcalVegetable + kcalFruits + kcalSugar

    //////Protein////////
    //Milk
    var proteinMilk = 0
    var carboMilk = 0
    var fatMilk = 0
    var kcalMilk = 0
    if (txtTypeMilk == 'nonfat') {
        proteinMilk = txtMilk * 8
        carboMilk = txtMilk * 12
        fatMilk = txtMilk * 3
        kcalMilk = txtMilk * 90
    } else if (txtTypeMilk == 'lowfat') {
        proteinMilk = txtMilk * 8
        carboMilk = txtMilk * 12
        fatMilk = txtMilk * 5
        kcalMilk = txtMilk * 120
    } else if (txtTypeMilk == 'fat') {
        proteinMilk = txtMilk * 8
        carboMilk = txtMilk * 12
        fatMilk = txtMilk * 8
        kcalMilk = txtMilk * 150
    }
    //Meat
    var proteinMeat = 0
    var carboMeat = 0
    var fatMeat = 0
    var kcalMeat = 0
    if (txtTypeMeat == 'nonfat') {
        proteinMeat = txtMeat * 7
        fatMeat = txtMeat * 1
        kcalMeat = txtMeat * 35
    } else if (txtTypeMeat == 'lowfat') {
        proteinMeat = txtMeat * 7
        fatMeat = txtMeat * 3
        kcalMeat = txtMeat * 55
    } else if (txtTypeMeat == 'medium') {
        proteinMeat = txtMeat * 7
        fatMeat = txtMeat * 5
        kcalMeat = txtMeat * 75
    } else if (txtTypeMeat == 'highfat') {
        proteinMeat = txtMeat * 7
        fatMeat = txtMeat * 8
        kcalMeat = txtMeat * 100
    }
    //Sum protein
    const proteinProtein = proteinMilk + proteinMeat
    const carboProtein = carboMilk + carboMeat
    const fatProtein = fatMilk + fatMeat
    const kcalProtein = kcalMilk + kcalMeat

    //////Fat////////
    var proteinFatt = 0
    var carboFatt = 0
    var fatFatt = txtFat * 5
    var kcalFatt = txtFat * 45
    //Sum fat
    const proteinFat = proteinFatt
    const carboFat = carboFatt
    const fatFat = fatFatt
    const kcalFat = kcalFatt

    //Sodium
    var proteinSodium = 0
    var carboSodium = 0
    var fatSodium = 0
    var kcalSodium = 0

    //Sumkcal
    const sumProtein = kcalProtein
    const sumCarbo = kcalCarbo
    const sumFat = kcalFat
    const sumKcal = kcalCarbo + kcalProtein + kcalFat
    const result = {
        protein:sumProtein,
        carbo:sumCarbo,
        fat:sumFat,
        kcal:sumKcal
    }

    return result
}
function checkData(data) {
    if (data == '') { return 0 } else { return data }
}