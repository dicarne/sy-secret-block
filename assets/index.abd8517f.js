import{c as G,a as K,d as O,u as H,b as E,r as w,o as Q,e as le,f as p,g as x,w as d,h as i,i as t,N as J,j as B,k as L,l as T,m as D,t as C,n as ce,p as I,q as R,F as j,s as P,v as W,x as re,y as ue,z as X,A,B as de,C as ie,D as pe,E as Y,G as _e,H as he,I as ye,J as we}from"./vendor.37f145b3.js";const fe=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerpolicy&&(a.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?a.credentials="include":e.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(e){if(e.ep)return;e.ep=!0;const a=o(e);fetch(e.href,a)}};fe();async function V(_){var e;const s=G(),l=await(await fetch("/api/attr/getBlockAttrs",{method:"post",body:JSON.stringify({id:s})})).json();if(l&&l.data&&l.data["custom-data"])try{const a=K.exports.AES.decrypt(l.data["custom-data"],_).toString(K.exports.enc.Utf8),u=JSON.parse(a);return u.type=="secret-block"?{success:!0,content:u.content,type:(e=u.content_type)!=null?e:"text"}:{success:!1}}catch(a){return{success:!1}}else return{success:!1,isFirst:!0}}const z=async(_,s,o)=>{const l=G(),e={type:"secret-block",content:_,content_type:o},a=K.exports.AES.encrypt(JSON.stringify(e),s).toString(),f=await(await fetch("/api/attr/setBlockAttrs",{method:"post",body:JSON.stringify({id:l,attrs:{"custom-data":a}})})).json();(!f||f.code!=0)&&console.log("save data error",f),await(await fetch("/api/attr/getBlockAttrs",{method:"post",body:JSON.stringify({id:l})})).json()},Z=_=>({head:[_("table_sample_column"),_("table_sample_column_2")],body:[["",""],["",""],["",""]]}),ve=O({props:{unlock:null,lock:null},setup(_){const s=_,o=H(),{t:l}=E(),e=w(""),a=[{label:"content_type_text",value:"text"},{label:"content_type_table",value:"sheet"}],u=w("text"),f=async()=>{const c=await V(e.value);c.success?s.unlock(e.value):c.isFirst?e.value===""?o.error(l("password_empty")):(await z("",e.value,u.value),s.unlock(e.value)):o.error(l("password_wrong"))},S=c=>{e.value=c},g=c=>{c.key==="Enter"&&f()},b=w(!1);return Q(async()=>{const c=G(),m=await le.getBlockAttr(c,"custom-data");m&&m.value!=""||(b.value=!0)}),(c,m)=>(p(),x(t(W),{"x-gap":"12",cols:"1 400:4",style:{margin:"auto",paddingLeft:"25px"}},{default:d(()=>[i(t(L),{span:"3"},{default:d(()=>[i(t(J),{"item-style":{margin:"10px",width:"100%"}},{default:d(()=>[i(t(B),{"on-update:value":S,placeholder:b.value?t(l)("set_initial_key"):t(l)("enter_the_key"),onKeyup:g,"passively-activated":"",round:"",type:"password"},null,8,["placeholder"])]),_:1})]),_:1}),i(t(L),{span:"1"},{default:d(()=>[i(t(J),{justify:"space-around","item-style":{margin:"10px"}},{default:d(()=>[i(t(T),{onClick:f,type:"primary",ghost:""},{default:d(()=>[D(C(c.$t("unlock")),1)]),_:1})]),_:1})]),_:1}),i(t(L),{span:"3"},{default:d(()=>[b.value?(p(),x(t(J),{key:0,justify:"center"},{default:d(()=>[i(t(ce),{value:u.value,"onUpdate:value":m[0]||(m[0]=r=>u.value=r),name:"radiobuttongroup1"},{default:d(()=>[(p(),I(j,null,R(a,r=>i(t(re),{key:r.value,value:r.value,label:r.label},{default:d(()=>[D(C(c.$t(r.label)),1)]),_:2},1032,["value","label"])),64))]),_:1},8,["value"])]),_:1})):P("",!0)]),_:1})]),_:1}))}}),be=_=>{const s=w(0);return ue(()=>(s.value+=1,setTimeout(()=>{s.value+=1},0),_()))},ge={style:{position:"relative",display:"flex",flex:"1"}},me=O({props:{psd:null,lock:null,changePassword:null},setup(_){const s=_,{t:o,locale:l}=E(),e=w(""),a=w("text"),u=X.exports.debounce(()=>z(e.value,s.psd,a.value),200),f=X.exports.throttle(()=>window.sessionStorage.setItem("sy-secret-password-time",new Date().toUTCString()),1e3),S=w(null),g=w(!1),b=()=>{const n=S.value.$refs.textareaElRef;n.scrollHeight>n.clientHeight?g.value=!0:g.value=!1},c=n=>{e.value=n,f(),u(),b()},m=()=>{e.value=JSON.stringify(r.value),f(),u()},r=w(Z(o)),h=w(!1),k=async()=>{var y;h.value=JSON.parse((y=window.localStorage.getItem("sy-secret-batch-secret"))!=null?y:"true");const n=await V(s.psd);if(n.success){if(e.value=n.content,a.value=n.type,a.value==="sheet")try{r.value=JSON.parse(e.value)}catch(v){r.value=Z(o)}}else s.lock();b()};Q(()=>k());const N=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9","_","-","$","%","&","@","+","!"],U=()=>{const n=14;let y="",v=N.length;for(let $=0;$<n;$++){let M=Math.floor(Math.random()*v);y+=N[M]}c(y)},F=async n=>{if(n==="lock-now")await z(e.value,s.psd,a.value),s.lock();else if(n==="change-password")s.changePassword(e.value,a.value);else if(n==="add-row"){const y=r.value.head.length;r.value.body.push(new Array(y).fill(""))}else n==="add-col"?(r.value.head.push(""),r.value.body.forEach(y=>y.push(""))):n==="del-row"?r.value.body.splice(r.value.body.length-1,1):n==="del-col"?(r.value.head.splice(r.value.head.length-1,1),r.value.body.forEach(y=>y.splice(y.length-1,1))):n==="disable-batch"?(window.localStorage.setItem("sy-secret-batch-secret","false"),h.value=!1):n==="enable-batch"&&(window.localStorage.setItem("sy-secret-batch-secret","true"),h.value=!0)},q=be(()=>{var v;let n=[{label:o("lock_now"),key:"lock-now"},{label:o("change_password"),key:"change-password"}];return a.value==="sheet"&&(n=[...n,{label:o("add_row"),key:"add-row"},{label:o("add_col"),key:"add-col"},{label:o("del_row"),key:"del-row"},{label:o("del_col"),key:"del-col"}]),JSON.parse((v=window.localStorage.getItem("sy-secret-batch-secret"))!=null?v:"true")?n.push({label:o("disable_batch_unlock"),key:"disable-batch"}):n.push({label:o("enable_batch_unlock"),key:"enable-batch"}),n}),ae=n=>y=>{r.value.head[n]=y,m()},se=(n,y)=>v=>{r.value.body[n][y]=v,m()},oe=()=>l.value==="zh_CN";return(n,y)=>(p(),I("div",ge,[a.value==="text"?(p(),x(t(B),{key:0,ref:(v,$)=>{$.inputRef=v,S.value=v},type:"textarea","on-update:value":c,value:e.value,placeholder:t(o)("secret_placeholder"),style:{display:"flex",flex:"1","--padding-right":"0px"}},null,8,["value","placeholder"])):P("",!0),a.value==="sheet"?(p(),x(t(de),{key:1,bordered:!1,"single-line":!1},{default:d(()=>[A("thead",null,[A("tr",null,[(p(!0),I(j,null,R(r.value.head,(v,$)=>(p(),I("th",null,[i(t(B),{value:v,"on-update:value":ae($)},null,8,["value","on-update:value"])]))),256))])]),A("tbody",null,[(p(!0),I(j,null,R(r.value.body,(v,$)=>(p(),I("tr",null,[(p(!0),I(j,null,R(v,(M,ne)=>(p(),I("td",null,[i(t(B),{value:M,"on-update:value":se($,ne),placeholder:t(o)("table_cell_placeholder")},null,8,["value","on-update:value","placeholder"])]))),256))]))),256))])]),_:1})):P("",!0),e.value===""?(p(),x(t(T),{key:2,circle:"",style:{position:"absolute",right:"5px",bottom:"5px"},onClick:U},{default:d(()=>[D(C(t(o)("password_button")),1)]),_:1})):P("",!0),i(t(pe),{trigger:"click",onSelect:F,options:t(q),placement:"bottom-end"},{default:d(()=>[i(t(T),{circle:oe(),style:ie({position:"absolute",right:g.value?"20px":"5px",top:"5px",backgroundColor:"white"}),size:"small"},{default:d(()=>[D(C(t(o)("dropdown_button")),1)]),_:1},8,["circle","style"])]),_:1},8,["options"])]))}}),ke={style:{marginLeft:"10px",marginRight:"10px"}},xe={style:{marginTop:"10px",marginLeft:"20px",marginRight:"20px"}},Se=O({props:{unlock:null,psd:null,content:null,type:null},setup(_){const s=_,o=H(),{t:l}=E(),e=w(""),a=w(!1),u=w(null),f=async()=>{if(e.value===""){o.error(l("password_empty"));return}a.value=!0,await z(s.content,e.value,s.type),s.unlock(e.value,!1)};Y(()=>{u.value!=null&&clearInterval(u.value)});const S=()=>{s.unlock(s.psd)},g=c=>{e.value=c},b=c=>{c.key==="Enter"&&f()};return(c,m)=>(p(),x(t(W),{"x-gap":"12",cols:"2",style:{margin:"auto"}},{default:d(()=>[i(t(L),{span:"2"},{default:d(()=>[A("div",ke,[i(t(B),{value:e.value,"on-update:value":g,placeholder:t(l)("enter_new_key"),onKeyup:b},null,8,["value","placeholder"])])]),_:1}),i(t(L),{span:"2"},{default:d(()=>[A("div",xe,C(c.$t("new_key_disclaimer_note")),1)]),_:1}),i(t(L),{span:"2"},{default:d(()=>[i(t(J),{justify:"space-around",style:{marginTop:"10px"}},{default:d(()=>[i(t(T),{disabled:a.value,onClick:f,ghost:"",type:"primary"},{default:d(()=>[D(C(c.$t("change")),1)]),_:1},8,["disabled"]),i(t(T),{disabled:a.value,onClick:S,ghost:"",type:"error"},{default:d(()=>[D(C(c.$t("cancel")),1)]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1}))}});const Ne={style:{display:"flex",flex:"1",padding:"5px"}},$e=O({setup(_){const s=H(),{t:o}=E(),l=w(""),e=async(h,k)=>{if(h===f.value)return;const N=await V(h);N.success?(g.value="secret-content",l.value=h,f.value=""):N.isFirst||(k!=!1&&s.error(o("password_wrong")),f.value=h)},a=async(h,k)=>{await e(h,k),window.sessionStorage.setItem("sy-secret-password",h),window.sessionStorage.setItem("sy-secret-password-time",new Date().toUTCString())},u=()=>{g.value="password-input",l.value="",window.sessionStorage.removeItem("sy-secret-password"),window.sessionStorage.removeItem("sy-secret-password-time")},f=w(""),S=setInterval(()=>{var U;const h=JSON.parse((U=window.localStorage.getItem("sy-secret-batch-secret"))!=null?U:"true"),k=window.sessionStorage.getItem("sy-secret-password"),N=window.sessionStorage.getItem("sy-secret-password-time");if(N!=null&&N!=""&&k!=""&&k!=null){const F=new Date(N);if(new Date().getTime()-F.getTime()>1e3*60*10)u();else if(b("password-input")){if(!h)return;e(k)}}else u()},500);Y(()=>{clearInterval(S)});const g=w("password-input"),b=h=>g.value===h,c=w(""),m=w("text"),r=(h,k)=>{g.value="change-password",c.value=h,m.value=k};return(h,k)=>(p(),x(t(_e),{embedded:"","content-style":{height:"100vh",display:"flex"}},{default:d(()=>[A("div",Ne,[b("password-input")?(p(),x(ve,{key:0,unlock:a,lock:u})):P("",!0),b("secret-content")?(p(),x(me,{key:1,psd:l.value,lock:u,"change-password":r},null,8,["psd"])):P("",!0),b("change-password")?(p(),x(Se,{key:2,unlock:a,psd:l.value,content:c.value,type:m.value},null,8,["psd","content","type"])):P("",!0)])]),_:1}))}}),Ie=O({setup(_){return(s,o)=>(p(),x(t(he),null,{default:d(()=>[i($e)]),_:1}))}}),Ce="incorrect password",Pe="Text",Le="Table",De="Password cannot be empty!",Ae="Please set the initial key",Oe="Please enter the key",Be="Please enter a new key",Te="unlock",Ue="change",Ee="cancel",Je="Secrets are hidden here~",Re="... ...",je="Password",ze="Options",Fe="Lock Now",Me="Change Password",Ge="Add Row",Ke="Add Column",He="Delete Row",Ve="Delete Column",qe="Disable Batch Unlock",Qe="Enable Batch Unlock",We="Username",Xe="PIN";var Ye={password_wrong:Ce,content_type_text:Pe,content_type_table:Le,password_empty:De,set_initial_key:Ae,enter_the_key:Oe,enter_new_key:Be,unlock:Te,change:Ue,cancel:Ee,secret_placeholder:Je,table_cell_placeholder:Re,password_button:je,dropdown_button:ze,lock_now:Fe,change_password:Me,add_row:Ge,add_col:Ke,del_row:He,del_col:Ve,disable_batch_unlock:qe,enable_batch_unlock:Qe,table_sample_column:We,table_sample_column_2:Xe};const Ze="\u5BC6\u7801\u9519\u8BEF\uFF01",et="\u6587\u672C",tt="\u8868\u683C",at="\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A\uFF01",st="\u8BF7\u8BBE\u7F6E\u521D\u59CB\u5BC6\u94A5",ot="\u8BF7\u8F93\u5165\u5BC6\u94A5",nt="\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801",lt="\u6CE8\u610F\uFF1A\u4FEE\u6539\u5BC6\u7801\u53EA\u4F1A\u4FEE\u6539\u5F53\u524D\u5757\u7684\u5BC6\u7801\uFF0C\u4E0D\u4F1A\u5F71\u54CD\u5176\u4ED6\u5757\uFF01",ct="\u89E3\u9501",rt="\u4FEE\u6539",ut="\u53D6\u6D88",dt="\u79D8\u5BC6\u85CF\u5728\u8FD9~",it="... ...",pt="\u5BC6",_t="\u9009\u9879",ht="\u7ACB\u5373\u9501\u5B9A",yt="\u4FEE\u6539\u5BC6\u7801",wt="\u589E\u52A0\u4E00\u884C",ft="\u589E\u52A0\u4E00\u5217",vt="\u5220\u9664\u4E00\u884C",bt="\u5220\u9664\u4E00\u5217",gt="\u5173\u95ED\u6279\u91CF\u89E3\u9501",mt="\u5F00\u542F\u6279\u91CF\u89E3\u9501",kt="\u7528\u6237\u540D",xt="\u5BC6\u7801";var St={password_wrong:Ze,content_type_text:et,content_type_table:tt,password_empty:at,set_initial_key:st,enter_the_key:ot,enter_new_key:nt,new_key_disclaimer_note:lt,unlock:ct,change:rt,cancel:ut,secret_placeholder:dt,table_cell_placeholder:it,password_button:pt,dropdown_button:_t,lock_now:ht,change_password:yt,add_row:wt,add_col:ft,del_row:vt,del_col:bt,disable_batch_unlock:gt,enable_batch_unlock:mt,table_sample_column:kt,table_sample_column_2:xt};const ee=ye({locale:"zh_CN",fallbackLocale:"zh_CN",messages:{en_US:Ye,zh_CN:St}}),te=we(Ie);te.use(ee);te.mount("#app");window.addEventListener("load",(..._)=>{var o,l;const s=((l=(o=window.parent.siyuan)==null?void 0:o.config)==null?void 0:l.lang)||"zh_CN";ee.global.locale=s});
//# sourceMappingURL=index.abd8517f.js.map
