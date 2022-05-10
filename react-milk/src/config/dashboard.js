
export const customer =[
    {
        title:"My Profile",
        key:'profile'
    }

]

export const salesman =[

    {
        title:"My Profile",
        key:'profile'
    },
    {
        title:"Collect Bill",
        key:"collectbill"
    },
    {
        title:"Welcome Offer",
        key:'addwelcome'
    },
    {
        title:"Add Customer",
        key:"register"
    },
    {
        title:"Secure Deposit",
        key:"deposit"

    },
    {
        title:"Salary History",
        key:"salary"
    },
    {
        title:"Empty Can",
        key:"emptycan"
    }
    
]
export const branchmanager=[
    {
        title:"My Profile",
        key:'profile'
    },
    {
        title:"Register",
        key:"register"
    },
    {
        title:"Secure Deposit",
        key:"deposit"
    },
    {
        title:"Pending Bills",
        key:"pending"
    },
    {
        title:"Manage User",
        key:"manageuser"
    },
    
    {
        title:"Collect Bill",
        key:"collectbill"
    },
   
    {
        title:"Salary History",
        key:"salary"
    },
    {
        title:"Empty Can",
        key:"emptycan"
    }
    
]
export const admin =[
    {
        title:"My Profile",
        key:'profile'
    },
    {
        title:"Register",
        key:"register"
    },
    {
        title:"Pending Bills",
        key:"pending"
    },
    {
        title:"Pay Out",
        key:"payout"
    },
    {
        title:"Manage User",
        key:"manageuser"
    },
    {
        title:"Manage Branch",
        key:"managebranch"   
    },
    {
        title:"Sale Test",
        key:"testsale"    
    },
    {
        title:"Delete Sales",
        key:"deletesales"    
    }
]

export const root=[
        {
            title:"My Profile",
            key:'profile'
        },    
        {
            title:"Register",
            key:"register"
        },
        {
            title:"Manage User",
            key:"manageuser"
        }
]




export const manageUser =[
    {
        title:"View All Users",
        key:"view"
    },
    {
        title:"Enable/Disable User",
        key:"control"
    }
]

export const manageBranch =[
    {
        title:"Add branch",
        key: 'addbranch'
    },
    {
        title:"View All Branch",
        key:"viewbranch"
    },
    {
        title:"Delete Branch",
        key:"deletebranch"
    }
]

const DashBoardConfig={
    branchmanager,
    admin,
    salesman,
    customer,
    root
}

export default DashBoardConfig;