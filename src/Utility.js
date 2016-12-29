class Utility {


    static decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 0 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
    }

    static hexToDecimal(hex){

        return parseInt(hex,16);
    }


    static getCurrentTimeInUnix(){

        return (new Date()).getTime();
    }


}

export default Utility;