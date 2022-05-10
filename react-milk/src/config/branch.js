export const branch=[
    {
        id:"branchname",
        title:"Branch Name",
        type:"String",
        value:"",
        default:"",
        placeholder:'Enter branch name',
        rules:{
            required:true
        }  
    },
    {
        id:"email",
        title:"Email",
        type:"email",
        value:"",
        default:"",
        placeholder:'Enter branch email',
        rules:{
            required:true,
            email:true
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
        type:"text",
        value:"",
        default:"",
        placeholder:'Enter branch location',
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
        id:"milkPrice",
        title:"Milk Price",
        type:"Number",
        value:"",
        default:"",
        placeholder:'Enter branch milk price',
        rules:{
            required:true
        }  
    },
    {
        id:"serviceCharge",
        title:"Service Charge",
        type:"Number",
        value:"",
        default:"",
        placeholder:'Enter service charge',
        rules:{
            required:true
        }  
    },
    {
        id:"salesManShare",
        title:"Salesman Share",
        type:"Number",
        value:"",
        default:"",
        placeholder:'Enter salesman share',
        rules:{
            required:true
        }  
    },
]