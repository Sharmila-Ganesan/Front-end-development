import {unitQuantity} from './config'; 

export const mobile=[
    {
        id:"mobile",
        title:"Phone Number",
        type:"Number",
        value:"",
        default:"",
        placeholder:'Enter your mobile number',
        rules:{
            required:true,
            mobile:true
        }
       
    }
]

export const code=[
    {
        id:"code",
        title:"Verification Code",
        type:"text",
        value:"",
        default:"",
        // partitioned:true,
        // maxLength:6,
        placeholder:'Enter your OTP',
        rules:{
            required:true,
        }
       
    }
]

export const password=[
    {
        id:"password",
        title:"Password",
        type:"password",
        placeholder:'Password',
        value:"",
        default:"",
        rules:{
            required:true,
            length:true,
            min:8,
            max:30
        }
    }
]



function calculateDeposit(value){
    if(value){
        return Math.ceil( value * unitQuantity)*40
    }
    return ''
}

export const deposit =[
    {
        id:"name",
        title:"Customer Name",
        type:"text",
        value:"",
        default:"",
        qrcode:true,
        readOnly:true,
        placeholder:'Scan QrCode',
        rules:{
            required:true
        }
       
    },
    {
        id:"quantity",
        title:"Quantity(ml per day)",
        type:"Number",
        value:"",
        default:"",  
        placeholder:'Enter milk quantity',
        formula:{
            destination:"deposit",
            action: calculateDeposit
        }    
    },
    {
        id:"deposit",
        title:"Secure Deposit",
        type:"Number",
        value:"",
        default:"",
        placeholder:'Deposit amount',
        rules:{
            required:true
        }
       
    }

]

export const welcomeOfferForm =[
    {
        id:"name",
        title:"Customer Name",
        type:"text",
        value:"",
        default:"",
        qrcode:true,
        readOnly:true,
        placeholder:'Scan QrCode',
        rules:{
            required:true
        }
       
    },
    {
        id:"quantity",
        title:"Quantity(ml per day)",
        type:"Number",
        value:"",
        default:"",  
        placeholder:'Enter milk quantity',
        formula:{
            destination:"welcomeOffer",
            action: calculateDeposit
        }    
    },
    {
        id:"welcomeOffer",
        title:"Welcome Offer Amount",
        type:"Number",
        value:"",
        default:"",
        placeholder:'Welcome offer amount',
        rules:{
            required:true
        }
       
    }

]
let items ={
    mobile,
    code,
    password,
    deposit,
    welcomeOfferForm
}
export default items