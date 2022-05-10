export function setGeoLocation(){
    return new Promise((resolve,reject)=>{
        try{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition( 
                    (position)=>{
                        let pos=position.coords.latitude+","+position.coords.longitude
                        localStorage.setItem("position",pos); 
                        resolve(pos);   
                    }
                )
               
              } else {
               alert("Geolocation is not supported by this browser.");
               reject()
            }
    
        }catch(err){
            reject()
        }
    })
   
}

export const signup=[
    {
        id:"name",
        title:"Name",
        type:"text",
        value:"",
        default:"",
        placeholder:'First name',
        rules:{
            required:true,
            length:true,
            min:3,
            max:30
        }
    },
    {
        id:"mobile",
        title:"Phone Number",
        type:"Number",
        value:"",
        default:"",
        placeholder:'your mobile number',
        rules:{
            required:true,
            mobile:true
        }
       
    },
    {
        id:"address1",
        title:"Address Line 1",
        type:"text",
        value:"",
        default:"",
        placeholder:'Address line 1',
        rules:{
            required:true
        }  
    },
    {
        id:"address2",
        title:"Address Line 2",
        type:"text",
        value:"",
        default:"",
        placeholder:'Address Line 2',
        rules:{
            required:true
        }  
    },
    {
        id:"location",
        title:"Location",
        location:true,
        type:"text",
        value:"",
        default:"",
        readOnly:true,
        placeholder:'Enter location(10.8091781,78.2885026)',
        rules:{
            required:true
        }
    }
]

export const branchmanager=[{
        id:"role",
        title:"User Role",
        type:"select",
        value:"salesman",
        options:[
            {
                key:"salesman",
                value:"Sales Man",
                isDefault:true
            },
            {
                key:"customer",
                value:"Customer"
            }
        ],
        default:"salesman"
}]

export const admin=[
    {
    id:"role",
    title:"User Role",
    type:"select",
    value:"branchmanager",
    options:[
        {
            key:"branchmanager",
            value:"Branch Manager",
            isDefault:true
        }
    ],
    default:"branchmanager"
    },
    {
        id:"branchcode",
        title:"Assign Branch",
        type:"select",
        value:"",
        options:[
            {
                key:"select",
                value:"Select Value",
                isDefault:true
            }
        ],
        default:"",
        rules:{
            required:true
        }
        }
]

export const root=[{
    id:"role",
    title:"User Role",
    type:"select",
    value:"admin",
    options:[
        {
            key:"admin",
            value:"Admin",
            isDefault:true
        }
    ],
    default:"admin"
}]
    
export const resetpassword=[
    {
        id:"newPassword",
        title:"New Password",
        type:"password",
        value:"",
        placeholder:'Minimum 8 characters',
        default:"",
        rules:{
            required:true,
            length:true,
            min:8,
            max:30
        }
    },
    {
        id:"confirmPassword",
        title:"Confirm Password",
        type:"password",
        value:"",
        default:"",
        placeholder:'Re enter your password',
        rules:{
            required:true,
            length:true,
            min:8,
            max:30
        }
    },
]


export const updateContactInfoForm=[
    {
        id:"name",
        title:"Name",
        type:"text",
        value:"",
        default:"",
        placeholder:'First name',
        rules:{
            required:true,
            length:true,
            min:3,
            max:30
        }
    },
    {
        id:"email",
        title:"Email",
        type:"email",
        value:"",
        default:"",
        placeholder:'i.e sample@abc.com',
        rules:{
           email:true
        }
    },
    {
        id:"address",
        title:"Address",
        type:"text",
        value:"",
        default:"",
        placeholder:'Address line 1',
        rules:{
            required:true
        }  
    },
    {
        id:"pincode",
        title:"Pin Code",
        type:"Number",
        value:"",
        placeholder:'Enter 6 digit pincode',
        default:0,
        rules:{
            required:true,
            length:true,
            min:6,
            max:6
        }
    },
    {
        id:"location",
        title:"Location",
        type:"text",
        value:"",
        default:"",
        placeholder:'Enter location(10.8091781,78.2885026)',
        rules:{
            location:true
        }
    }
]

export const updateBankInfoForm=[
    {
        id:"beneficiaryAccount",
        title:"Bank Account Number",
        type:"text",
        value:"",
        placeholder:'Enter Bank Account Number',
        default:"",
        rules:{
            required:true,
            length:true,
            min:9,
            max:18
        }
    },
    {
        id:"confirmbankAccNumber",
        title:"Confirm Bank Account Number",
        type:"text",
        value:"",
        default:"",
        placeholder:'Re enter Bank Account Number',
        rules:{
            required:true,
            length:true,
            min:9,
            max:18
        }
    },
    {
        id:"beneficiaryIFSC",
        title:"IFSC Code",
        type:"text",
        value:"",
        default:"",
        placeholder:'IFSC Code',
        rules:{
            required:true,
            length:true,
            min:11,
            max:11
        }
    },
    
]



let items={
    signup,
    branchmanager,
    admin,
    root,
    resetpassword,
    updateBankInfoForm,
    updateContactInfoForm
}

export default items;