(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[1],{124:function(e,t,a){"use strict";a.r(t);var n=a(12),r=a(13),i=a(20),o=a(15),l=a(14),u=a(0),c=a.n(u),s=a(19),d=a(97),m=a(86),p=a(23),f=a(85),h=a(32),b=a(91),y=a(35),v=a(96),g=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={unpaidDetails:[],paidDetails:[],totalAmount:0,totalBillIds:[],mode:"",data:"",paymentDetails:"",isLoading:!1,paytmCallback:r.paytmCallback.bind(Object(i.a)(r)),popupData:Array.from(m.e)},r.payBill=r.payBill.bind(Object(i.a)(r)),r.handleSubmit=r.handleSubmit.bind(Object(i.a)(r)),r}return Object(r.a)(a,[{key:"componentDidMount",value:function(){Object(b.f)(),Object(f.c)(this.props);var e=this.props,t=e.mode,a=e.data;"collect"===t?(this.setState({mode:t,data:a}),this.props.dispatch(Object(d.e)(a))):(Object(f.j)(this.props),this.props.dispatch(Object(d.e)()))}},{key:"paytmCallback",value:function(e,t){this.setState({isLoading:!1}),"SESSION_EXPIRED"===e&&(alert("Your session has expired!!"),window.location.reload())}},{key:"payBill",value:function(e,t,a){var n=this.props,r=n.userData.users.userInfo.mobile,i=n.data,o={};if("total"===e){var l=this.state;o={billIds:l.totalBillIds,price:l.totalAmount,customerId:r,period:t}}else{o={billIds:a.billIds,price:a.price,period:t,customerId:r,type:a.type}}i&&i.mobile?(o.customerId=i.mobile,this.setState({temp:o,showPopup:!0})):this.props.dispatch(Object(d.h)(o)),this.setState({paymentDetails:o,isLoading:!0})}},{key:"handleSubmit",value:function(e){try{var t=this.state.temp;e&&e.confirm&&"collect"===e.confirm.toLocaleLowerCase()&&this.props.dispatch(Object(d.f)(t)),this.setState({showPopup:!1,isLoading:!1})}catch(a){console.log(a)}}},{key:"render",value:function(){var e=this,t=this.state,a=t.unpaidDetails,n=t.isLoading,r=t.showPopup,i=t.popupData,o=a&&a.length>0?a:[];return c.a.createElement("div",{className:"container-fluid mt-3  mb-55"},c.a.createElement("h4",{className:"text-center"},"Pay Bill"),o&&o.length>0?c.a.createElement("div",{className:"pay-bill-wrapper"},c.a.createElement("div",{className:"font-weight-bold mt-3 text-center"},c.a.createElement("span",{className:"col-5"},"PERIOD"),c.a.createElement("span",{className:"col-3"},"AMOUNT"),c.a.createElement("span",{className:"col-4"},"ACTION")),o.map((function(t,n){var r,i;a&&a.length>0&&(r=t.year,i=t.month-1);var o=m.a[i].slice(0,3)+"-"+r;return c.a.createElement("div",{className:"pay-bill-items",key:n},c.a.createElement("span",{className:"col-5"},"deposit"===t.type?"Deposit":o),c.a.createElement("span",{className:"col-3"},"\u20b9",t.price),c.a.createElement("span",{className:"col-4"},c.a.createElement("button",{className:"btn btn-primary",onClick:function(){return a&&a.length>0?e.payBill("single",o,t):null}},"PAY")))}))):c.a.createElement("div",{className:"no-pending-msg"},"No pending payments"),n?c.a.createElement(y.a,null):null,r&&c.a.createElement(v.a,{data:i,title:"Confirmation",onClose:function(){e.setState({showPopup:!1,isLoading:!1})},onSubmit:this.handleSubmit}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){Object(f.h)(e);var a=e.userData.payment,n=a.unpaidDetails,r=a.message,i=a.messageCode,o=a.order,l=t.mode,u=t.data,c=t.paytmCallback;if(r&&("PM101"===i&&(p.b.success(r),"collect"===l?e.dispatch(Object(d.e)(u)):(Object(f.j)(e),e.dispatch(Object(d.e)()))),"PAR101"===i&&o&&Object(b.g)(o,c),e.dispatch(Object(h.c)())),n&&t.unpaidDetails!==n){var s=0,m=[];return n.forEach((function(e){s+=e.price,m=m.concat(e.billIds)})),{unpaidDetails:n,totalAmount:s,totalBillIds:m}}return null}}]),a}(c.a.Component);t.default=Object(s.b)((function(e){return{userData:e}}))(g)},85:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"f",(function(){return o})),a.d(t,"i",(function(){return l})),a.d(t,"d",(function(){return u})),a.d(t,"g",(function(){return c})),a.d(t,"b",(function(){return s})),a.d(t,"e",(function(){return d})),a.d(t,"c",(function(){return m})),a.d(t,"h",(function(){return p})),a.d(t,"j",(function(){return f}));var n=a(32),r=a(86),i=function(e){return!!((e=e.trim())&&e.length>=3)&&e},o=function(e){return e>0},l=function(e){return!!e},u=function(e,t,a){return!!(e&&e.length>=t&&e.length<=a)},c=function(e){var t=new RegExp("^[6-9][0-9]{9}$");return!(!e||!t.test(e))},s=function(e){var t=new RegExp("^[a-zA-Z0-9_ .]+@[a-zA-Z0-9]+.[a-zA-Z]{2,3}$");return!(!e||!t.test(e))},d=function(e){var t=new RegExp("^[0-9]{1,2}[.][0-9]{5,16}, [0-9]{1,2}[.][0-9]{5,16}$");return!(!e||!t.test(e))},m=function(e){try{if(localStorage.getItem("token"))e.userData.users.token||e.dispatch(Object(n.t)());else e.history.push("/about")}catch(t){}},p=function(e){e.userData.users.token||(localStorage.getItem("token")||e.history.push("/about"))},f=function(e){var t=e.userData.users.userInfo,a=e.match.url,n=[];if(a&&t){var i=a.replace(/\/?\?[a-z=0-9]+/gi,"");if(i=i.replace("/",""),(n=r.b[i])&&n.length>0&&-1!==n.indexOf(t.role))return!0;e.history.push("/home")}}},86:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"a",(function(){return r})),a.d(t,"j",(function(){return u})),a.d(t,"i",(function(){return c})),a.d(t,"d",(function(){return s})),a.d(t,"c",(function(){return d})),a.d(t,"h",(function(){return m})),a.d(t,"k",(function(){return p})),a.d(t,"f",(function(){return f})),a.d(t,"g",(function(){return h})),a.d(t,"e",(function(){return b}));var n={addsale:["salesman"],addwelcome:["salesman"],testsale:["admin"],emptycan:["branchmanager","salesman"],register:["salesman","branchmanager","admin","root"],collectbill:["salesman","branchmanager"],deposit:["salesman","branchmanager"],edit:["branchmanager","admin"],control:["branchmanager","admin","root"],delete:["admin","root"],view:["branchmanager","admin","root"],pending:["branchmanager","admin"],history:["customer","salesman","admin","branchmanager"],home:["customer","salesman","admin","branchmanager","root"],profile:["customer","salesman","admin","branchmanager","root"],statement:["customer","salesman","admin","branchmanager"],pstatement:["customer","salesman","admin","branchmanager"],paybill:["customer","salesman","branchmanager"],generateid:["branchmanager","admin","root"],manageuser:["branchmanager","admin","root"],payout:["admin"],salary:["salesman","branchmanager"],addbranch:["admin"],managebranch:["admin"],viewbranch:["admin"],deletebranch:["admin"],deletesales:["admin"]},r=["January","February","March","April","May","June","July","August","September","October","November","December"],i=40,o=1e3,l=o/i,u=i/o;function c(e){l=(o=1e3)/(i=e),u=i/o}function s(e){if(e&&e<=9999){var t=Math.ceil(e*u);if(t<=499)return t}return""}var d=[{id:"name",title:"Customer Name",type:"text",value:"",default:"",readOnly:!0,placeholder:"Scan QrCode",qrcode:!0},{id:"price",title:"Price",type:"Number",value:"",default:"",placeholder:"Enter price",formula:{destination:"quantity",action:function(e){if(e){var t=Math.ceil(e*l);if(t<=9999)return t}return""}},rules:{required:!0}},{id:"quantity",title:"Quantity(ml)",type:"Number",value:"",default:"",placeholder:"Enter quantity",formula:{destination:"price",action:s},rules:{required:!0}}],m=[{id:"confirm",title:"Consent",type:"text",value:"",default:"",placeholder:"Type CONFIRM to collect security deposit ",rules:{required:!0}}],p=[{id:"confirm",title:"Consent",type:"text",value:"",default:"",placeholder:"Type CONFIRM to add Welcome Offer",rules:{required:!0}}],f=[{id:"confirm",title:"Consent",type:"text",value:"",default:"",placeholder:"Type DELETE to remove user permanently ",rules:{required:!0}}],h=[{id:"name",title:"Customer Name",type:"text",value:"",default:"",readOnly:!0,placeholder:"Scan QrCode",qrcode:!0,rules:{required:!0}}],b=[{id:"confirm",title:"Consent",type:"text",value:"",default:"",placeholder:"Type Collect to collect bill ",rules:{required:!0}}]},87:function(e,t,a){"use strict";var n=a(25),r=a.n(n),i=a(33),o=a(12),l=a(13),u=a(20),c=a(15),s=a(14),d=a(0),m=a.n(d),p=a(93),f=a.n(p),h=function(e){Object(c.a)(a,e);var t=Object(s.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var e=this.props,t=e.onCancel,a=e.onSucces;return m.a.createElement("div",{className:"full-overley",tabIndex:"0",onKeyPress:function(e){e.key&&t()}},m.a.createElement("div",{className:"popup-main"},m.a.createElement(f.a,{delay:300,showViewFinder:!1,facingMode:"environment",onError:function(e){console.log(e),t()},onScan:function(e){a(e)},style:{width:"100%"}}),m.a.createElement("span",{className:"qr-cancel"},m.a.createElement("button",{className:"btn btn-danger ",type:"button",onClick:t},"Cancel"))))}}]),a}(m.a.Component),b=a(94),y=a.n(b),v=a(85),g=a(88),E=(a(90),function(e){Object(c.a)(a,e);var t=Object(s.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={data:n.props.data},n.handleChange=n.handleChange.bind(Object(u.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(u.a)(n)),n.resetData=n.resetData.bind(Object(u.a)(n)),n.refreshLocation=n.refreshLocation.bind(Object(u.a)(n)),n.hotKeyControl=n.hotKeyControl.bind(Object(u.a)(n)),n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){y.a.bind("alt+o",this.hotKeyControl)}},{key:"hotKeyControl",value:function(){var e=this;this.state.data.forEach((function(t){t.qrcode&&e.qrControl("open",t)}))}},{key:"componentWillUnmount",value:function(){y.a.unbind("alt+o")}},{key:"handleChange",value:function(e,t){var a=this.state.data,n=e.target.value,r=a.findIndex((function(e){return e.id===t.id})),i=a[r];if(i.value=n,i.err="",i.formula){var o=a.findIndex((function(e){return e.id===t.formula.destination})),l=a[o];l.err="",l.value=i.formula.action(n)+"",""===l.value&&(i.value="")}this.setState({data:a})}},{key:"handleSubmit",value:function(e){try{e.preventDefault();var t=this.state.data,a={},n=!1;if(t.forEach((function(e,r){e.value+="";var i=e.value?e.value.trim():"";if(e.rules){var o=e.rules;if(o.required&&!Object(v.i)(i))return e.err=e.title+" is Required",n=!0,!1;if(o.length&&!Object(v.d)(i,o.min,o.max))return e.err=e.title+" should be minimum "+o.min+" characters and maximum "+o.max+" characters.",n=!0,!1;if(o.mobile&&!Object(v.g)(i))return e.err="Enter valid Mobile Number",n=!0,!1;if(o.email&&!Object(v.b)(i))return e.err="Enter valid email",n=!0,!1;if(o.location&&!Object(v.e)(i))return e.err="Invalid location, ie: 8.763250, 77457080",n=!0,!1}a[e.id]=i,"hidden"===e.type&&delete t[r]})),n)return this.setState({data:t}),!1;this.props.onSubmit(a),this.resetData()}catch(r){return console.log(r),{}}}},{key:"qrControl",value:function(e,t){try{if("open"===e)this.setState({qrStatus:!0,element:t});else if("close"===e)this.setState({qrStatus:!1});else if("set"===e&&t){t=JSON.parse(t);var a=this.state,n=a.data,r=a.element,i=n.findIndex((function(e){return e&&e.id===r.id})),o=n[i];o.value=t.name,o.err="";var l=n.findIndex((function(e){return e&&"mobile"===e.id}));if(-1!==l)n[l].value=t.mobile;else n.push({id:"mobile",value:t.mobile,type:"hidden"});this.setState({data:n,qrStatus:!1})}}catch(u){console.log(u)}}},{key:"refreshLocation",value:function(){var e=Object(i.a)(r.a.mark((function e(){var t,a,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(g.b)();case 2:t=this.state.data,a=t.findIndex((function(e){return"location"===e.id})),(n=t[a]).value=localStorage.getItem("position"),n.err="",this.setState({data:t,qrStatus:!1});case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"resetData",value:function(){var e=this.state.data;e.forEach((function(e){e.value=e.default})),this.setState({data:e})}},{key:"render",value:function(){var e=this,t=this.state,a=t.data,n=t.qrStatus,r=this.props.button,i=r.submit,o=r.reset;return m.a.createElement("form",{className:"custom-form",onSubmit:this.handleSubmit},this.props.title&&m.a.createElement("h4",null,this.props.title),a&&a.map((function(t){return"hidden"!==t.type?m.a.createElement("div",{className:"form-group col p-0 m-1",key:t.id},t.title&&m.a.createElement("label",{htmlFor:t.id,className:"cap form-title"},t.title+" :"),"select"===t.type?m.a.createElement("select",{className:"form-control",id:"sel1",value:t.value,onChange:function(a){return e.handleChange(a,t)}},t.options&&t.options.length>0?t.options.map((function(e){return m.a.createElement("option",{key:e.key,value:e.key}," ",e.value)})):null):m.a.createElement(m.a.Fragment,null,m.a.createElement("input",{type:t.type,name:t.id,className:"form-control  ".concat(t.partitioned?"partitioned":"custom-input"," ").concat(t.err?"input-err":""),value:t.value,placeholder:t.placeholder,maxLength:t.maxLength?t.maxLength:50,autoFocus:!!t.autofocus,onChange:function(a){return e.handleChange(a,t)},autoComplete:"off",readOnly:!!t.readOnly}),t.qrcode?m.a.createElement("button",{className:"btn cam-position",type:"button",onClick:function(a){return e.qrControl("open",t)}},m.a.createElement("i",{className:"fa fa-qrcode cam-color"})):null,t.location?m.a.createElement("button",{className:"btn cam-position",type:"button",onClick:e.refreshLocation},m.a.createElement("i",{className:"fa fa-map-marker cam-color"})):null,t.hint&&m.a.createElement("span",null,t.hint),t.qrcode&&n?m.a.createElement(h,{onSucces:function(t){return e.qrControl("set",t)},onCancel:function(){return e.qrControl("close")}}):null),m.a.createElement("label",{className:"input-err text-danger"},t.err?t.err:"")):""})),m.a.createElement("div",{className:"form-group  col-12  d-flex justify-content-space-around"},o&&m.a.createElement("input",{type:"reset",className:"btn btn-danger",value:"Reset",onClick:this.resetData}),i&&m.a.createElement("input",{type:"submit",id:"form-submit",value:"Proceed",className:"btn btn-primary"})))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return JSON.stringify(e.data)!==JSON.stringify(t.data)?{data:e.data}:null}}]),a}(m.a.Component));t.a=E},88:function(e,t,a){"use strict";function n(){return new Promise((function(e,t){try{navigator.geolocation?navigator.geolocation.getCurrentPosition((function(t){var a=t.coords.latitude+","+t.coords.longitude;localStorage.setItem("position",a),e(a)})):(alert("Geolocation is not supported by this browser."),t())}catch(a){t()}}))}a.d(t,"b",(function(){return n})),a.d(t,"d",(function(){return r})),a.d(t,"c",(function(){return i}));var r=[{id:"name",title:"Name",type:"text",value:"",default:"",placeholder:"First name",rules:{required:!0,length:!0,min:3,max:30}},{id:"email",title:"Email",type:"email",value:"",default:"",placeholder:"i.e sample@abc.com",rules:{email:!0}},{id:"address",title:"Address",type:"text",value:"",default:"",placeholder:"Address line 1",rules:{required:!0}},{id:"pincode",title:"Pin Code",type:"Number",value:"",placeholder:"Enter 6 digit pincode",default:0,rules:{required:!0,length:!0,min:6,max:6}},{id:"location",title:"Location",type:"text",value:"",default:"",placeholder:"Enter location(10.8091781,78.2885026)",rules:{location:!0}}],i=[{id:"beneficiaryAccount",title:"Bank Account Number",type:"text",value:"",placeholder:"Enter Bank Account Number",default:"",rules:{required:!0,length:!0,min:9,max:18}},{id:"confirmbankAccNumber",title:"Confirm Bank Account Number",type:"text",value:"",default:"",placeholder:"Re enter Bank Account Number",rules:{required:!0,length:!0,min:9,max:18}},{id:"beneficiaryIFSC",title:"IFSC Code",type:"text",value:"",default:"",placeholder:"IFSC Code",rules:{required:!0,length:!0,min:11,max:11}}],o={signup:[{id:"name",title:"Name",type:"text",value:"",default:"",placeholder:"First name",rules:{required:!0,length:!0,min:3,max:30}},{id:"mobile",title:"Phone Number",type:"Number",value:"",default:"",placeholder:"your mobile number",rules:{required:!0,mobile:!0}},{id:"address1",title:"Address Line 1",type:"text",value:"",default:"",placeholder:"Address line 1",rules:{required:!0}},{id:"address2",title:"Address Line 2",type:"text",value:"",default:"",placeholder:"Address Line 2",rules:{required:!0}},{id:"location",title:"Location",location:!0,type:"text",value:"",default:"",readOnly:!0,placeholder:"Enter location(10.8091781,78.2885026)",rules:{required:!0}}],branchmanager:[{id:"role",title:"User Role",type:"select",value:"salesman",options:[{key:"salesman",value:"Sales Man",isDefault:!0},{key:"customer",value:"Customer"}],default:"salesman"}],admin:[{id:"role",title:"User Role",type:"select",value:"branchmanager",options:[{key:"branchmanager",value:"Branch Manager",isDefault:!0}],default:"branchmanager"},{id:"branchcode",title:"Assign Branch",type:"select",value:"",options:[{key:"select",value:"Select Value",isDefault:!0}],default:"",rules:{required:!0}}],root:[{id:"role",title:"User Role",type:"select",value:"admin",options:[{key:"admin",value:"Admin",isDefault:!0}],default:"admin"}],resetpassword:[{id:"newPassword",title:"New Password",type:"password",value:"",placeholder:"Minimum 8 characters",default:"",rules:{required:!0,length:!0,min:8,max:30}},{id:"confirmPassword",title:"Confirm Password",type:"password",value:"",default:"",placeholder:"Re enter your password",rules:{required:!0,length:!0,min:8,max:30}}],updateBankInfoForm:i,updateContactInfoForm:r};t.a=o},89:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a(26);var r=a(34);function i(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(r.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},90:function(e,t,a){},91:function(e,t,a){"use strict";a.d(t,"d",(function(){return i})),a.d(t,"i",(function(){return o})),a.d(t,"a",(function(){return l})),a.d(t,"f",(function(){return u})),a.d(t,"h",(function(){return c})),a.d(t,"g",(function(){return s})),a.d(t,"c",(function(){return d})),a.d(t,"b",(function(){return m})),a.d(t,"e",(function(){return p})),a.d(t,"j",(function(){return f}));var n=a(89),r=a(92);function i(e,t){var a=new Date(e),n=""+(a.getMonth()+1),r=""+a.getDate(),i=a.getFullYear(),o=a.getHours(),l=a.getMinutes();return o=o<=9?"0"+o:o,l=l<=9?"0"+l:l,n.length<2&&(n="0"+n),r.length<2&&(r="0"+r),"date"===t?[i,n,r].join("-"):"custom"===t?[r,n,i].join("-"):[r,n,i].join("/")+"-"+[o,l].join(":")}function o(e){if(/[\u0080-\uffff]/.test(e))throw new Error("this needs encoding, like UTF-8");for(var t=new Uint8Array(e.length),a=e.length;a--;)t[a]=e.charCodeAt(a);return t.buffer}function l(e){var t=new Uint8Array(e.buffer),a=String.fromCharCode.apply(String,t);if(/[\u0080-\uffff]/.test(a))throw new Error("this string seems to contain (still encoded) multibytes");return a}function u(){var e=document.createElement("script");e.async=!0;e.src="https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/Sivali89602719243261.js",e.type="application/javascript",e.crossOrigin="anonymous",document.head.appendChild(e)}function c(e,t,a){var n=0,r=0,i=[];return e.forEach((function(e){-1!==(e[t]?e[t]+"":"").search(a)&&(i.push(e),n+=parseInt(e.price),r+=parseInt(e.quantity))})),[i,n,r]}function s(e,t){try{var a=e.orderId,n=e.amount,i=e.txnToken,o={root:"",flow:"DEFAULT",merchant:{name:"Sivalingam Milks",logo:r.a},data:{orderId:a,token:i,tokenType:"TXN_TOKEN",amount:n},handler:{notifyMerchant:t}};window.Paytm&&window.Paytm.CheckoutJS&&window.Paytm.CheckoutJS.init(o).then((function(){console.log("Before JS Checkout invoke"),window.Paytm.CheckoutJS.invoke()})).catch((function(e){console.log("Error => ",e)}))}catch(l){return!1}}function d(e,t,a){var n=[];return t?a.forEach((function(a){a[e]+""===t&&n.push(a)})):n=a,n}function m(e,t,a,r,i,o){var l=Object(n.a)(r);return i=[],o&&(o.role&&(l=d("role",o.role,l)),o.branchcode&&(l=d("branchcode",o.branchcode,l))),t&&a&&e?(t=new Date(t).setHours(0,0,0,0),a=new Date(a).setHours(0,0,0,0),l.forEach((function(n){var r=new Date(n[e]).setHours(0,0,0,0);r>=t&&r<=a&&i.push(n)}))):i=l,i}function p(e){try{var t=[];for(var a in e){var n=e[a];t.push({id:a,value:n,type:typeof n,default:n,title:a})}return t}catch(r){return[]}}function f(e){for(var t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),a=window.atob(t),n=new Uint8Array(a.length),r=0;r<a.length;++r)n[r]=a.charCodeAt(r);return n}},92:function(e,t,a){"use strict";t.a=a.p+"static/media/logo.ec169ce3.png"},95:function(e,t,a){},96:function(e,t,a){"use strict";var n=a(12),r=a(13),i=a(15),o=a(14),l=a(0),u=a.n(l),c=a(87),s=(a(95),function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={},r}return Object(r.a)(a,[{key:"render",value:function(){try{var e=this.props,t=e.data,a=e.title,n=e.onClose,r=e.onSubmit;return u.a.createElement("div",{className:"popup-overlay"},u.a.createElement("div",{className:"popup-container"},u.a.createElement("div",{className:"popup-header"},u.a.createElement("span",null,a),u.a.createElement("span",{onClick:n},u.a.createElement("i",{className:"fa fa-times"}))),u.a.createElement("div",{className:"popup-body"},u.a.createElement(c.a,{data:t,onSubmit:r,button:{submit:!0,reset:!0},title:""}))))}catch(i){console.log(i)}}}]),a}(u.a.Component));t.a=s},97:function(e,t,a){"use strict";a.d(t,"e",(function(){return i})),a.d(t,"a",(function(){return o})),a.d(t,"h",(function(){return l})),a.d(t,"f",(function(){return u})),a.d(t,"c",(function(){return c})),a.d(t,"b",(function(){return s})),a.d(t,"g",(function(){return d})),a.d(t,"d",(function(){return m}));var n=a(2),r=a(4);function i(e){return Object(r.a)(n.x,"get","payment/unpaid",e,"path")}function o(e){return Object(r.a)(n.s,"get","payment/paid",e,"path")}function l(e){return Object(r.a)(n.H,"post","requestpayment",e)}function u(e){return Object(r.a)(n.F,"put","payment",e)}function c(){return Object(r.a)(n.v,"get","payment/pending")}function s(){return Object(r.a)(n.u,"get","payout")}function d(e){return Object(r.a)(n.G,"post","payout",e)}function m(){return Object(r.a)(n.w,"get","salary")}}}]);