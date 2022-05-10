export const  ROLE = {
    ROOT:'root',
    ADMIN: 'admin',
    BRANCHMANAGER:"branchmanager",
    SALESMAN:'salesman',
    CUSTOMER: 'customer'
}

export const RouteAcccess ={
    addsale:['salesman'],
    addwelcome:['salesman'],
    testsale:['admin'],
    emptycan:['branchmanager','salesman'],
    register:['salesman','branchmanager','admin','root'],
    collectbill:['salesman','branchmanager'],
    deposit:['salesman','branchmanager'],
    edit:['branchmanager','admin'],
    control:['branchmanager','admin','root'],
    delete:['admin','root'],
    view:['branchmanager','admin','root'],
    pending:['branchmanager','admin'],
    history:['customer','salesman','admin','branchmanager'],
    home:['customer','salesman','admin','branchmanager','root'],
    profile:['customer','salesman','admin','branchmanager','root'],
    statement:['customer','salesman','admin','branchmanager'],
    pstatement:['customer','salesman','admin','branchmanager'],
    paybill:['customer','salesman','branchmanager'],
    generateid:['branchmanager','admin','root'],
    manageuser:['branchmanager','admin','root'],
    payout:['admin'],
    salary:['salesman','branchmanager'],
    addbranch:['admin'],
    managebranch:['admin'],
    viewbranch:['admin'],
    deletebranch:['admin'],
    deletesales:['admin']
}

export const MONTH =[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
var Price = 40;
var Quantity = 1000;
export var  unitPrice = Quantity/Price;
export var unitQuantity = Price/Quantity;
export function setMilkPrice(price){
    Price = price;
    Quantity = 1000;
    unitPrice = Quantity/Price;
    unitQuantity = Price/Quantity;
}

export function calculateQuantity(value){
    if(value){
        let quantity = Math.ceil( value * unitPrice);
        if(quantity <= 9999){
            return quantity;
        }
    }
    return ""
}

export function calculatePrice(value){
    if(value && value <= 9999){
        let price = Math.ceil( value * unitQuantity);
        if(price <= 499){
            return price;
        }
    }
    return ""
}

export const addSale =[
 
    {
        id:"name",
        title:"Customer Name",
        type:"text",
        value:"",
        default:"",
        readOnly:true,
        placeholder:'Scan QrCode',
        qrcode:true
    },
    {
        id:"price",
        title:"Price",
        type:"Number",
        value:"",
        default:"",
        placeholder:'Enter price',
        formula:{
            destination:"quantity",
            action: calculateQuantity
        },
        rules:{
            required:true
        }
    },
    {
        id:"quantity",
        title:"Quantity(ml)",
        type:"Number",
        value:"",
        default:"",  
        placeholder:'Enter quantity',
        formula:{
            destination:"price",
            action: calculatePrice
        },    
        rules:{
            required:true
        }
    }
]

export const emptyCan =[
    {
        id:"quantity",
        title:"Quantity(ml)",
        type:"Number",
        value:"",
        default:"",  
        placeholder:'Enter quantity',
        rules:{
            required:true
        }
    },
    {
        id:"type",
        title:"Type",
        type:"select",
        value:"milk",
        options:[
            {
                key:"milk",
                value:"Milk",
                isDefault:true
            },
            {
                key:"water",
                value:"Water"
            }
        ],
        default:"milk"
        }
]

export const depositConfirmPopup = [
    {
        id:"confirm",
        title:"Consent",
        type:"text",
        value:"",
        default:"",
        placeholder:'Type CONFIRM to collect security deposit ',
        rules:{
            required:true
        }
       
    }
]

export const welcomeOfferConfirmPopup = [
    {
        id:"confirm",
        title:"Consent",
        type:"text",
        value:"",
        default:"",
        placeholder:'Type CONFIRM to add Welcome Offer',
        rules:{
            required:true
        }
       
    }
]
export const deleteConfirmPopup = [
    {
        id:"confirm",
        title:"Consent",
        type:"text",
        value:"",
        default:"",
        placeholder:'Type DELETE to remove user permanently ',
        rules:{
            required:true
        }
       
    }
]

export const deleteUserForm = [
    {
        id:"name",
        title:"Customer Name",
        type:"text",
        value:"",
        default:"",
        readOnly:true,
        placeholder:'Scan QrCode',
        qrcode:true,
        rules:{
            required:true
        }
       
    }
]
export const collectBillConfirmPopup = [
    {
        id:"confirm",
        title:"Consent",
        type:"text",
        value:"",
        default:"",
        placeholder:'Type Collect to collect bill ',
        rules:{
            required:true
        }
       
    }
]