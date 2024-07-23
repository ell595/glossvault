import{_ as c,e as i,o as u,a as m,b as e,w as h,h as l,v as d,t as g}from"./styles-BIwg1seq.js";const f={name:"loginForm",emits:["update"],data(){return{inputtedEmail:i(""),inputtedPassword:i(""),username:null,errors:[]}},methods:{async loginUser(){this.errors=[];try{const s=this.inputtedEmail,o=this.inputtedPassword,n=await fetch("http://api-glossvault.ell595.site/api/login",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({email:s,password:o})}).then(r=>{n.status===200?(localStorage.setItem("token",t.token),this.$router.push({path:"dashboard"})):this.errors.push(n.message)}).catch(r=>{this.errors.push(r.data.message),console.log(r),console.log("fetch catch"),console.error(r.message)}),t=await n.json()}catch(s){this.errors.push(s.data.message),console.log(s),console.log("try catch"),console.error(s.message)}}}},w={class:"background"},_=e("div",{class:"header"},[e("h3",null,"Welcome to"),e("h1",null,"GlossVault")],-1),y={class:"welcome"},b=e("label",{for:"email"},"Email",-1),v=e("label",{for:"password"},"Password",-1),E=e("div",null,[e("a",{href:"/register"},"Or create an account"),e("button",{type:"submit"},"Login")],-1),P=["v-for"];function k(s,o,p,n,t,r){return u(),m("div",w,[_,e("div",y,[e("form",{onSubmit:o[2]||(o[2]=h((...a)=>r.loginUser&&r.loginUser(...a),["prevent"]))},[b,l(e("input",{name:"email",type:"email",required:"","onUpdate:modelValue":o[0]||(o[0]=a=>t.inputtedEmail=a)},null,512),[[d,t.inputtedEmail]]),v,l(e("input",{name:"password",type:"password",required:"","onUpdate:modelValue":o[1]||(o[1]=a=>t.inputtedPassword=a)},null,512),[[d,t.inputtedPassword]]),E,e("p",{id:"error","v-for":s.error in t.errors},g(s.error),9,P)],32)])])}const U=c(f,[["render",k]]);export{U as default};
