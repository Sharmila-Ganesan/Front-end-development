import MilkLogo  from '../assets/img/logo.png'

export function formatDate(date,mode) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = d.getHours(),
        minutes=d.getMinutes();
        hours = hours <= 9 ? "0"+hours:hours;
        minutes = minutes <= 9 ? "0"+minutes:minutes;
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if(mode ==="date"){
        return [year, month,day].join('-')
    }else if(mode ==="custom"){
        return [day, month, year].join('-')
    }
    return [day, month, year].join('/')+"-"+[hours,minutes].join(':');
}

export function toLiter(quantity){
    if(quantity){
        quantity = quantity/1000;
        return parseFloat(quantity).toFixed(2)+" Ltrs";
    }
    return false;
}

export function convertTimetoAmPm(dateStr){
    if(dateStr){
        var hours = new Date(dateStr).getHours();
        hours = (hours+24-2)%24; 
        var mid='AM';
        if(hours === 0){ //At 00 hours we need to show 12 am
            hours=12;
        }
        else if(hours>12)
        {
            hours=hours%12;
            mid='PM';
        }
        return mid;
    }
    return ""
}

export function stringToArrayBuffer(str){
    if(/[\u0080-\uffff]/.test(str)){
        throw new Error("this needs encoding, like UTF-8");
    }
    var arr = new Uint8Array(str.length);
    for(var i=str.length; i--; )
        arr[i] = str.charCodeAt(i);
    return arr.buffer;
}

export function arrayBufferToString(value){
    var arr = new Uint8Array(value.buffer);
    var str = String.fromCharCode.apply(String, arr);
    if(/[\u0080-\uffff]/.test(str)){
        throw new Error("this string seems to contain (still encoded) multibytes");
    }
    return str;
}



export function loadPaymentScript(){
    const script = document.createElement('script');
    // script.src = 'https://checkout.razorpay.com/v1/checkout.js'; //razor pay
    script.async=true;
    let url ="https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/dKWrKl64807719864245.js";
    url = "https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/Sivali89602719243261.js";
    script.src= url;
    script.type ="application/javascript"
    script.crossOrigin="anonymous"
    document.head.appendChild(script)
}
 // AIzaSyDa_nc0acKCg0Z385pThGbRrZ4sLU8pTXM

export function searchByValue(data,attr,value){
    let totalAmount=0;
    let totalQuantity=0;
    let temp=[];
    data.forEach(element => {
    let custId = element[attr] ? element[attr]+"":"";
    if(custId.search(value) !== -1){
        temp.push(element);
        totalAmount += parseInt(element.price);
        totalQuantity += parseInt(element.quantity);
    }
    });
    return [temp,totalAmount,totalQuantity];
}

export function paymentGatewayConfig(order,uicallback){
    try{
    //paytm config

    let {orderId,amount,txnToken}=order;
    var config = {
        "root": "",
        "flow": "DEFAULT",
        "merchant":{
            "name":"Sivalingam Milks",
            "logo":MilkLogo
        },
        "data": {
            "orderId": orderId, /* update order id */
            "token": txnToken, /* update token value */
            "tokenType": "TXN_TOKEN",
            "amount": amount /* update amount */
        },
        "handler": {
          "notifyMerchant": uicallback
        }
      };

    if (window.Paytm && window.Paytm.CheckoutJS) {
        // initialze configuration using init method
        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
            console.log('Before JS Checkout invoke');
            // after successfully update configuration invoke checkoutjs
            window.Paytm.CheckoutJS.invoke();
        }).catch(function onError(error) {
            console.log("Error => ", error);
        });
    }

    }catch(err){
        return false
    }
}

export function filterRecordByKey(key,value,array){
    let details=[]
    if(value){  
        array.forEach(element => {
                if(element[key]+"" === value){
                    details.push(element);
                }
        });   
    }else{
        details =array;
    }
    return details;
}
export function filterRecordByDate(){
    return true;
}
export function filterRecordByDateRange(key,startDate,endDate,data,details,filter){
    let array=[...data];
    details = [];
    if(filter){
        if(filter.role){
            array = filterRecordByKey('role',filter.role,array);
        }
        if(filter.branchcode){
            array = filterRecordByKey('branchcode',filter.branchcode,array);
        }
    }
    if(startDate && endDate && key){
        startDate = new Date(startDate).setHours(0,0,0,0);
        endDate = new Date(endDate).setHours(0,0,0,0);
        array.forEach(element => {
                let elementDate = new Date(element[key]).setHours(0,0,0,0);
               if( elementDate >= startDate && elementDate <= endDate){
                    details.push(element);
                }
        });   
    }else{
        details =array;
    }
    return details;      
}

export function generateFormData(data){
    try {
    let temp = []
    for(let key in data){
        let value =data[key];
        temp.push({
            id:key,
            value,
            type:typeof(value),
            default:value,
            title:key
        })
    }
    return temp;
        
    } catch (error) {
        return []
    }
    
}

export function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    // eslint-disable-next-line
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }