function add(a, b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

//module.exports = add; //ye add function export krdega 
//module.exports = sub; //ye add function ko overwrite krdega 
//to avoid this we use object

// module.exports = {
//     addFn: add,
//     subFn: sub
// }

//another method

exports.add = (a,b) => a+b;
exports.sub = (a,b) => a-b;
//this gives an anonymous func because functionn ka naam nahi diya h 

//module.add krke bht baar exports kr skte but module.exports se sirf ek br(uske baad overwrite hojata)