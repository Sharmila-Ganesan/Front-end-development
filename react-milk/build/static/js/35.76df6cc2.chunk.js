(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[35],{139:function(e,t,a){"use strict";a.r(t);var l=a(12),n=a(13),c=a(20),i=a(15),r=a(14),o=a(0),u=a.n(o),s=a(19),b=a(87),d=a(124),m=a(85),f=function(e){Object(i.a)(a,e);var t=Object(r.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={userInfo:[{id:"name",title:"Customer Name",type:"text",value:"",default:"",placeholder:"Scan QrCode",qrcode:!0,readOnly:!0,rules:{required:!0}}],isPay:!1},n.collectBill=n.collectBill.bind(Object(c.a)(n)),n}return Object(n.a)(a,[{key:"componentDidMount",value:function(){Object(m.c)(this.props),Object(m.j)(this.props)}},{key:"collectBill",value:function(e){e={mobile:e.mobile},this.setState({data:e,isPay:!0})}},{key:"render",value:function(){var e=this.state,t=e.userInfo,a=e.data,l=e.isPay;return u.a.createElement("div",{className:"container-fluid form-items mt-3 mb-55"},l?u.a.createElement(d.default,{data:a,mode:"collect"}):u.a.createElement(b.a,{data:t,onSubmit:this.collectBill,button:{submit:!0,reset:!0},title:"Collect Bill"}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return Object(m.h)(e),Object(m.j)(e),null}}]),a}(u.a.Component);t.default=Object(s.b)((function(e){return{userData:e}}))(f)}}]);