import{_ as u,e as l,o as c,a as m,b as e,w as h,h as d,v as p}from"./styles-BIbcGk1-.js";const f={name:"loginForm",emits:["update"],data(){return{inputtedEmail:l(""),inputtedPassword:l(""),username:null}},methods:{async loginUser(){try{const n=this.inputtedEmail,t=this.inputtedPassword,a={email:n,password:t};console.log(a);const i=await fetch("http://api-glossvault.ell595.site/api/login",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)}),s=await i.json();i.status===200&&(localStorage.setItem("token",s.token),this.$router.push({path:"dashboard"}))}catch(n){console.error(n.message)}}}},w={class:"background"},_=e("div",{class:"header"},[e("h3",null,"Welcome to"),e("h1",null,"GlossVault")],-1),g={class:"welcome"},b=e("label",{for:"email"},"Email",-1),v=e("label",{for:"password"},"Password",-1),y=e("div",null,[e("a",{href:"/register"},"Or create an account"),e("button",{type:"submit"},"Login")],-1);function E(n,t,a,i,s,r){return c(),m("div",w,[_,e("div",g,[e("form",{onSubmit:t[2]||(t[2]=h((...o)=>r.loginUser&&r.loginUser(...o),["prevent"]))},[b,d(e("input",{name:"email",type:"email",required:"","onUpdate:modelValue":t[0]||(t[0]=o=>s.inputtedEmail=o)},null,512),[[p,s.inputtedEmail]]),v,d(e("input",{name:"password",type:"password",required:"","onUpdate:modelValue":t[1]||(t[1]=o=>s.inputtedPassword=o)},null,512),[[p,s.inputtedPassword]]),y],32)])])}const k=u(f,[["render",E]]);export{k as default};