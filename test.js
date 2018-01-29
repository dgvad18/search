var a = "3C 48 54 4D 4C 3E";
var code = decode(a);
function decode(str){
    var result = "",
        arr = str.split(' ');
    for(var i=0; i<arr.length; i++){
        result += String.fromCharCode('0x'+arr[i]);
    }
    return result;
}
console.log(code);