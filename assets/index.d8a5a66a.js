import{c as R,a as M,b as j,d as N,u as G,r as v,o as V,e as c,f as m,w as l,g as o,h as n,N as P,i as I,j as D,k as L,l as Z,m as b,n as T,F as $,p as C,q as z,s as S,t as ee,v as te,x as H,y as A,z as se,A as ae,B as ne,C as q,D as ue,E as le,G as oe}from"./vendor.ce46ea2d.js";const re=function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const f of e.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function a(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(t){if(t.ep)return;t.ep=!0;const e=a(t);fetch(t.href,e)}};re();async function J(h){var s;const u=R(),a=await M.getBlockAttr(u,"custom-data");if(a&&a.value!="")try{const t=j.exports.AES.decrypt(a.value,h).toString(j.exports.enc.Utf8),e=JSON.parse(t);return e.type=="secret-block"?{success:!0,content:e.content,type:(s=e.content_type)!=null?s:"text"}:{success:!1}}catch(t){return{success:!1}}else return{success:!1,isFirst:!0}}const U=async(h,u,a)=>{const s=R(),t={type:"secret-block",content:h,content_type:a},e=j.exports.AES.encrypt(JSON.stringify(t),u).toString();await M.setBlockAttrs({id:s,attrs:{"custom-data":e}})},Q=()=>({head:["\u7528\u6237\u540D","\u5BC6\u7801"],body:[["",""],["",""],["",""]]}),ce=S("\u89E3\u9501"),ie=N({props:{unlock:null,lock:null},setup(h){const u=h,a=G(),s=v(""),t=[{label:"\u6587\u672C",value:"text"},{label:"\u8868\u683C",value:"sheet"}],e=v("text"),f=async()=>{const r=await J(s.value);r.success?u.unlock(s.value):r.isFirst?s.value===""?a.error("\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A\uFF01"):(await U("",s.value,e.value),u.unlock(s.value)):a.error("\u5BC6\u7801\u9519\u8BEF\uFF01")},k=r=>{s.value=r},g=r=>{r.key==="Enter"&&f()},y=v(!1);return V(async()=>{const r=R(),p=await M.getBlockAttr(r,"custom-data");p&&p.value!=""||(y.value=!0)}),(r,p)=>(c(),m(n(z),{"x-gap":"12",cols:"1 400:4",style:{margin:"auto",paddingLeft:"25px"}},{default:l(()=>[o(n(D),{span:"3"},{default:l(()=>[o(n(P),{"item-style":{margin:"10px",width:"100%"}},{default:l(()=>[o(n(I),{"on-update:value":k,placeholder:y.value?"\u8BF7\u8BBE\u7F6E\u521D\u59CB\u5BC6\u94A5":"\u8BF7\u8F93\u5165\u5BC6\u94A5",onKeyup:g,"passively-activated":"",round:"",type:"password"},null,8,["placeholder"])]),_:1})]),_:1}),o(n(D),{span:"1"},{default:l(()=>[o(n(P),{justify:"space-around","item-style":{margin:"10px"}},{default:l(()=>[o(n(L),{onClick:f,type:"primary",ghost:""},{default:l(()=>[ce]),_:1})]),_:1})]),_:1}),o(n(D),{span:"3"},{default:l(()=>[y.value?(c(),m(n(P),{key:0,justify:"center"},{default:l(()=>[o(n(Z),{value:e.value,"onUpdate:value":p[0]||(p[0]=w=>e.value=w),name:"radiobuttongroup1"},{default:l(()=>[(c(),b($,null,T(t,w=>o(n(ee),{key:w.value,value:w.value,label:w.label},{default:l(()=>[S(te(w.label),1)]),_:2},1032,["value","label"])),64))]),_:1},8,["value"])]),_:1})):C("",!0)]),_:1})]),_:1}))}}),de={style:{position:"relative",display:"flex",flex:"1"}},pe=S("\u5BC6"),ve=S("\xB7\xB7\xB7"),fe=N({props:{psd:null,lock:null,changePassword:null},setup(h){const u=h,a=v(""),s=v("text"),t=H.exports.debounce(()=>U(a.value,u.psd,s.value),200),e=H.exports.throttle(()=>window.sessionStorage.setItem("sy-secret-password-time",new Date().toUTCString()),1e3),f=v(null),k=v(!1),g=()=>{const d=f.value.$refs.textareaElRef;d.scrollHeight>d.clientHeight?k.value=!0:k.value=!1},y=d=>{a.value=d,e(),t(),g()},r=()=>{a.value=JSON.stringify(p.value),e(),t()},p=v(Q()),w=async()=>{const d=await J(u.psd);if(d.success){if(a.value=d.content,s.value=d.type,s.value==="sheet")try{p.value=JSON.parse(a.value)}catch(F){p.value=Q()}}else u.lock();g()};V(()=>w());const i=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9","_","-","$","%","&","@","+","!"],_=()=>{const d=14;let F="",x=i.length;for(let B=0;B<d;B++){let O=Math.floor(Math.random()*x);F+=i[O]}y(F)},E=async d=>{d==="lock-now"?(await U(a.value,u.psd,s.value),u.lock()):d==="change-password"&&u.changePassword(a.value,s.value)},K=v([{label:"\u7ACB\u5373\u9501\u5B9A",key:"lock-now"},{label:"\u4FEE\u6539\u5BC6\u7801",key:"change-password"}]),W=d=>F=>{p.value.head[d]=F,r()},X=(d,F)=>x=>{p.value.body[d][F]=x,r()};return(d,F)=>(c(),b("div",de,[s.value==="text"?(c(),m(n(I),{key:0,ref:(x,B)=>{B.inputRef=x,f.value=x},type:"textarea","on-update:value":y,value:a.value,placeholder:"\u79D8\u5BC6\u85CF\u5728\u8FD9~",style:{display:"flex",flex:"1","--padding-right":"0px"}},null,8,["value"])):C("",!0),s.value==="sheet"?(c(),m(n(se),{key:1,bordered:!1,"single-line":!1},{default:l(()=>[A("thead",null,[A("tr",null,[(c(!0),b($,null,T(p.value.head,(x,B)=>(c(),b("th",null,[o(n(I),{value:x,"on-update:value":W(B)},null,8,["value","on-update:value"])]))),256))])]),A("tbody",null,[(c(!0),b($,null,T(p.value.body,(x,B)=>(c(),b("tr",null,[(c(!0),b($,null,T(x,(O,Y)=>(c(),b("td",null,[o(n(I),{value:O,"on-update:value":X(B,Y),placeholder:"... ..."},null,8,["value","on-update:value"])]))),256))]))),256))])]),_:1})):C("",!0),a.value===""?(c(),m(n(L),{key:2,circle:"",style:{position:"absolute",right:"5px",bottom:"5px"},onClick:_},{default:l(()=>[pe]),_:1})):C("",!0),o(n(ne),{trigger:"click",onSelect:E,options:K.value,placement:"bottom-end"},{default:l(()=>[o(n(L),{circle:"",style:ae({position:"absolute",right:k.value?"20px":"5px",top:"5px",backgroundColor:"white"}),size:"small"},{default:l(()=>[ve]),_:1},8,["style"])]),_:1},8,["options"])]))}}),ye={style:{marginLeft:"10px",marginRight:"10px"}},he=A("div",{style:{marginTop:"10px",marginLeft:"20px",marginRight:"20px"}},"\u6CE8\u610F\uFF1A\u4FEE\u6539\u5BC6\u7801\u53EA\u4F1A\u4FEE\u6539\u5F53\u524D\u5757\u7684\u5BC6\u7801\uFF0C\u4E0D\u4F1A\u5F71\u54CD\u5176\u4ED6\u5757\uFF01",-1),_e=S("\u4FEE\u6539"),ge=S("\u53D6\u6D88"),me=N({props:{unlock:null,psd:null,content:null,type:null},setup(h){const u=h,a=G(),s=v(""),t=v(!1),e=v(null),f=async()=>{if(s.value===""){a.error("\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A\uFF01");return}t.value=!0,await U(u.content,s.value,u.type),e.value=setInterval(()=>{u.unlock(s.value,!1)},500)};q(()=>{e.value!=null&&clearInterval(e.value)});const k=()=>{u.unlock(u.psd)},g=r=>{s.value=r},y=r=>{r.key==="Enter"&&f()};return(r,p)=>(c(),m(n(z),{"x-gap":"12",cols:"2",style:{margin:"auto"}},{default:l(()=>[o(n(D),{span:"2"},{default:l(()=>[A("div",ye,[o(n(I),{value:s.value,"on-update:value":g,placeholder:"\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801",onKeyup:y},null,8,["value"])])]),_:1}),o(n(D),{span:"2"},{default:l(()=>[he]),_:1}),o(n(D),{span:"2"},{default:l(()=>[o(n(P),{justify:"space-around",style:{marginTop:"10px"}},{default:l(()=>[o(n(L),{disabled:t.value,onClick:f,ghost:"",type:"primary"},{default:l(()=>[_e]),_:1},8,["disabled"]),o(n(L),{disabled:t.value,onClick:k,ghost:"",type:"error"},{default:l(()=>[ge]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1}))}});const we={style:{display:"flex",flex:"1",padding:"5px"}},xe=N({setup(h){const u=G(),a=v(""),s=async(i,_)=>{const E=await J(i);E.success?(g.value="secret-content",a.value=i,f.value=""):E.isFirst||(_!=!1&&u.error("\u5BC6\u7801\u9519\u8BEF"),f.value=i)},t=async(i,_)=>{await s(i,_),window.sessionStorage.setItem("sy-secret-password",i),window.sessionStorage.setItem("sy-secret-password-time",new Date().toUTCString())},e=()=>{g.value="password-input",a.value="",window.sessionStorage.removeItem("sy-secret-password"),window.sessionStorage.removeItem("sy-secret-password-time")},f=v(""),k=setInterval(()=>{const i=window.sessionStorage.getItem("sy-secret-password"),_=window.sessionStorage.getItem("sy-secret-password-time");if(_!=null&&_!=""&&i!=""&&i!=null){const E=new Date(_);new Date().getTime()-E.getTime()>1e3*60*10?e():y("password-input")&&s(i)}else e()},500);q(()=>{clearInterval(k)});const g=v("password-input"),y=i=>g.value===i,r=v(""),p=v("text"),w=(i,_)=>{g.value="change-password",r.value=i,p.value=_};return(i,_)=>(c(),m(n(ue),{embedded:"","content-style":{height:"100vh",display:"flex"}},{default:l(()=>[A("div",we,[y("password-input")?(c(),m(ie,{key:0,unlock:t,lock:e})):C("",!0),y("secret-content")?(c(),m(fe,{key:1,psd:a.value,lock:e,"change-password":w},null,8,["psd"])):C("",!0),y("change-password")?(c(),m(me,{key:2,unlock:t,psd:a.value,content:r.value,type:p.value},null,8,["psd","content","type"])):C("",!0)])]),_:1}))}}),ke=N({setup(h){return(u,a)=>(c(),m(n(le),null,{default:l(()=>[o(xe)]),_:1}))}});oe(ke).mount("#app");
//# sourceMappingURL=index.d8a5a66a.js.map
