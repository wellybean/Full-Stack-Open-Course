(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),u=t.n(c),o=t(2),l=function(e){var n=e.newFilterName,t=e.handleFilterNameChange;return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{value:n,onChange:t}))},i=function(e){var n=e.addPerson,t=e.newName,a=e.newPhoneNumber,c=e.handleNameChange,u=e.handlePhoneNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:c})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},m=function(e){var n=e.persons,t=e.newFilterName,a=e.handleRemoveContact,c=n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}));return 0===c.length?r.a.createElement("div",null,"No person found"):r.a.createElement("div",null,c.map((function(e,n){return r.a.createElement("div",{key:n},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return a(e)}},"delete"))})))},s=t(3),f=t.n(s),d=function(e){return f.a.post("/api/persons",e).then((function(e){return e.data}))},h=function(e){return f.a.delete("".concat("/api/persons","/").concat(e)).then((function(e){return e.data}))},b=function(e,n){return f.a.put("".concat("/api/persons","/").concat(e),n).then((function(e){return e.data}))},p=(t(36),function(e){var n=e.message,t=e.type;return null===n?null:r.a.createElement("div",{className:t},n)}),v=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),s=Object(o.a)(u,2),v=s[0],E=s[1],w=Object(a.useState)(""),g=Object(o.a)(w,2),N=g[0],C=g[1],j=Object(a.useState)(""),O=Object(o.a)(j,2),k=O[0],y=O[1],P=Object(a.useState)(null),S=Object(o.a)(P,2),F=S[0],T=S[1],D=Object(a.useState)("success"),J=Object(o.a)(D,2),L=J[0],R=J[1];Object(a.useEffect)((function(){f.a.get("http://localhost:3001/persons").then((function(e){c(e.data)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(p,{message:F,type:L}),r.a.createElement(l,{newFilterName:N,handleFilterNameChange:function(e){C(e.target.value)}}),r.a.createElement("h1",null,"add a new"),r.a.createElement(i,{addPerson:function(e){e.preventDefault();var n={name:v,number:k};if(0===t.filter((function(e){return e.name===n.name})).length)d(n).then((function(e){c(t.concat(e)),R("success"),T("Added ".concat(e.name)),setTimeout((function(){T(null)}),5e3)}));else{var a="".concat(n.name," is already added to phonebook, replace the old number with a new one?");if(window.confirm(a)){var r=t.find((function(e){return e.name===n.name})).id;b(r,n).then((function(e){c(t.map((function(n){return n.name===e.name?e:n}))),R("success"),T("Changed number for ".concat(n.name)),setTimeout((function(){T(null)}),5e3)})).catch((function(e){R("error"),T("".concat(n.name," was already removed from server")),setTimeout((function(){T(null)}),5e3),c(t.filter((function(e){return e.name!==n.name})))}))}}E(""),y("")},newName:v,handleNameChange:function(e){E(e.target.value)},newPhoneNumber:k,handlePhoneNumberChange:function(e){y(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{persons:t,newFilterName:N,handleRemoveContact:function(e){window.confirm("Delete ".concat(e.name,"?"))&&h(e.id).then((function(n){c(t.filter((function(n){return n.id!==e.id}))),R("success"),T("Deleted ".concat(e.name)),setTimeout((function(){T(null)}),5e3)})).catch((function(n){R("error"),T("".concat(e.name," was already removed from server")),setTimeout((function(){T(null)}),5e3),c(t.filter((function(n){return n.name!==e.name})))}))}}))};u.a.render(r.a.createElement(v,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.de057baf.chunk.js.map