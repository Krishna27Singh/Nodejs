// ********* WORKING OF NODE JS ***********

// ### sbse pehle client ek server pe request krta hai (which is a node js server) 
// #   sbse pehle jo bi request aati hai vo nodejs server m event queue m queue ho jati hai 
// #   then hmari request event loop m jati hai
// #event loop- ek esa engline jo frequently check krta rehta hai ki event queue m koi request to nahi aati
// ## jisne sbse pehle request ki thi vo pehle execute hogi and baad vale ki baad m 
// ### event loop picks up the request from event queue and removes it from there

// jab request ko pick up krte hai to vo request 2 types ki ho skti 

// 1) Blocking operation/ Blocking request/ Synchronous task

// ye request ko Resolve krne ke liye request THREAD POOL ke paad jati hai 
// THREAD POOL ek pool hai jisme bht saare threads hai (threads--> workers smjh skte). these threads are responsible for fulfulling the blocking operations
// agr worker available hoga to kaam pe laga dega 
// Then thread pool returns the result
// THERE ARE LIMITED NUMBER OF WORKERS AVAIABLE. SO EK POINT OF TIME KE BAAD SAARE WORKERS BUS HOJAENGE THEN AAGE VALI KO WAIT KRNA PDEGA, WORKER FREE HOGA TB EXECUTION HOGA

// 1) Non-Blocking operation/ Non-Blocking request/ Asynchronous task
// request process hogi and user ko response mill jayega simple

