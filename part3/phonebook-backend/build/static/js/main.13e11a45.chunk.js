(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),u=t.n(c),o=t(2),l=function(e){var n=e.newFilterName,t=e.handleFilterNameChange;return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{value:n,onChange:t}))},i=function(e){var n=e.addPerson,t=e.newName,a=e.newPhoneNumber,c=e.handleNameChange,u=e.handlePhoneNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:c})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},m=function(e){var n=e.persons,t=e.newFilterName,a=e.handleRemoveContact,c=n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}));return 0===c.length?r.a.createElement("div",null,"No person found"):r.a.createElement("div",null,c.map((function(e,n){return r.a.createElement("div",{key:n},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return a(e)}},"delete"))})))},f=t(3),s=t.n(f),d="/api/persons",h=function(){return s.a.get(d).then((function(e){return e.data}))},b=function(e){return s.a.post(d,e).then((function(e){return e.data}))},v=function(e){return s.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},p=function(e,n){return s.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},E=(t(36),function(e){var n=e.message,t=e.type;return null===n?null:r.a.createElement("div",{className:t},n)}),w=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),f=Object(o.a)(u,2),s=f[0],d=f[1],w=Object(a.useState)(""),g=Object(o.a)(w,2),N=g[0],C=g[1],j=Object(a.useState)(""),O=Object(o.a)(j,2),k=O[0],y=O[1],P=Object(a.useState)(null),S=Object(o.a)(P,2),F=S[0],T=S[1],D=Object(a.useState)("success"),J=Object(o.a)(D,2),L=J[0],R=J[1];Object(a.useEffect)((function(){h().then((function(e){c(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{message:F,type:L}),r.a.createElement(l,{newFilterName:N,handleFilterNameChange:function(e){C(e.target.value)}}),r.a.createElement("h1",null,"add a new"),r.a.createElement(i,{addPerson:function(e){e.preventDefault();var n={name:s,number:k};if(0===t.filter((function(e){return e.name===n.name})).length)b(n).then((function(e){c(t.concat(e)),R("success"),T("Added ".concat(e.name)),setTimeout((function(){T(null)}),5e3)})).catch((function(e){R("error"),T("".concat(e.response.data.error)),setTimeout((function(){T(null)}),5e3)}));else{var a="".concat(n.name," is already added to phonebook, replace the old number with a new one?");if(window.confirm(a)){var r=t.find((function(e){return e.name===n.name})).id;p(r,n).then((function(e){c(t.map((function(n){return n.name===e.name?e:n}))),R("success"),T("Changed number for ".concat(n.name)),setTimeout((function(){T(null)}),5e3)})).catch((function(e){R("error"),T("".concat(n.name," was already removed from server")),setTimeout((function(){T(null)}),5e3),c(t.filter((function(e){return e.name!==n.name})))}))}}d(""),y("")},newName:s,handleNameChange:function(e){d(e.target.value)},newPhoneNumber:k,handlePhoneNumberChange:function(e){y(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{persons:t,newFilterName:N,handleRemoveContact:function(e){window.confirm("Delete ".concat(e.name,"?"))&&v(e.id).then((function(){c(t.filter((function(n){return n.id!==e.id}))),R("success"),T("Deleted ".concat(e.name)),setTimeout((function(){T(null)}),5e3)})).catch((function(n){R("error"),T("".concat(e.name," was already removed from server")),setTimeout((function(){T(null)}),5e3),c(t.filter((function(n){return n.name!==e.name})))}))}}))};u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.13e11a45.chunk.js.map