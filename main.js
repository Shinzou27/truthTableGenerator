/*
Alunos: Ana Gabriela da Silva Bezerra
        Carlos Vinicius Bezerra Lopes
        Felipe Cassiano Barbosa
        Gabriela Araujo de Abreu
*/
function logic(symbol, a, b) {
    switch (symbol) {
        case '^':
            return a && b;
        case 'v':
            return a || b;
        case '→':
            return (!a) || b;
        case '~':
            return !a;
        case '↔':
            return ((!a) || b) && ((!b) || a);
        default:
            console.log(symbol);
            console.log("Erro de leitura");
            break;
    }
}
function vfTranslator(boolean) {
    if (boolean) return "V";
    return "F";
}
let flagSwitch = false;
let resultArray = [];
const input = document.getElementById("expression");
function chooseFunction(number) {
    number = parseInt(number)
    const array = [["^", false],    ["v", false],   ["→", false],   ["↔", false],   ["~", false],
                   ["^", true],     ["v", true],    ["→", true],    ["↔", true],    ["~", true],]
    return coreTruthTable(array[number][0], array[number][1])
}

function coreTruthTable(symbol, flagSwap) {
    if (!flagSwap) {
        if(input.value[input.value.length-1] == ")") {
            if(!flagSwitch){input.value = input.value + " ^ "}
            else{input.value = input.value + " v "}
        }
        if (symbol != "~") {
            input.value = input.value + "(P" + symbol + "Q)"
        }
        else {
            input.value = input.value + "(" + symbol + "P)"
        }
    }
    else {
        if(input.value[input.value.length-1] == ")") {
            if(!flagSwitch){input.value = input.value + " ^ "}
            else{input.value = input.value + " v "}
        }
        if (symbol != "~") {
            input.value = input.value + "(Q" + symbol + "P)"
        }
        else {
            input.value = input.value + "(" + symbol + "Q)"
        }
    }
    let p = true;
    let q = true;
    let results = []
    let firstValue, secondValue;
    console.log("P | Q | RESULT");
    for (let i = 0; i < 2; i++) {
        for (let k = 0; k < 2; k++) {
            if (!flagSwap) {
                firstValue = p;
                secondValue = q;
            }
            else {
                firstValue = q;
                secondValue = p;
            }
            let result = logic(symbol, firstValue, secondValue);
            results.push(result);
            console.log(
                vfTranslator(p) + " | " +
                vfTranslator(q) + " | " +
                vfTranslator(result)
            );
            q = !q;
        }
        p = !p;
    }
    resultArray.push(results);
    console.log("----------------")
}
function switchConcat() {
    flagSwitch = !flagSwitch;
}
function finalTruthTable() {
    console.log("----------------")
    console.log("RESULTADO FINAL DE:");
    console.log(input.value);
    let array = [];
    let finalResult = [];
    let stringResult = "";
    for (k = 0; k < 4; k++) {
        for (i = 0; i < resultArray.length; i++) {
            array.push(resultArray[i][k])
            stringResult += vfTranslator(resultArray[i][k]) + " | "
        }
        if(!flagSwitch) {
            if(array.indexOf(false) == -1) {
                finalResult.push(vfTranslator(true));
            }
            else {
                finalResult.push(vfTranslator(false));
            }
        }
        else {
            if(array.indexOf(true) == -1) {
                finalResult.push(vfTranslator(false));
            }
            else {
                finalResult.push(vfTranslator(true));
            }
        }
        console.log(stringResult + " | " + finalResult[k])

        array = []
        stringResult = ""
    }
}