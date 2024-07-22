import{_ as f,e as n,f as m,g as c,o as V,a as h,b as e,w as y,h as l,v as u,i as P,j as g,d as v}from"./styles-DBmWAwbP.js";const C={name:"registerForm",emits:["update"],data(){return{startValidation:n(!1),inputtedUsername:n(""),inputtedEmail:n(""),inputtedPassword:n(""),confirmPassword:n(""),isValidEmail:m(()=>this.startValidation?/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.inputtedEmail):!1),isStrongPassword:m(()=>this.startValidation?/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(this.inputtedPassword):!1),isPasswordConfirmed:m(()=>this.startValidation?this.inputtedPassword===this.confirmPassword:!1),userID:null}},methods:{clearValidation(a){a.target.setCustomValidity(""),a.target.reportValidity()},async registerUser(){this.startValidation=!0;var a=document.getElementById("email");this.isValidEmail?(a.setCustomValidity(""),a.reportValidity()):(a.setCustomValidity("Please enter a valid email address"),a.reportValidity());var t=document.getElementById("password");this.isStrongPassword?(t.setCustomValidity(""),t.reportValidity()):(t.setCustomValidity("Password must contain at least 8 characters, a capital letter and a special character"),t.reportValidity());var o=document.getElementById("confirmPassword");if(this.isPasswordConfirmed?(o.setCustomValidity(""),o.reportValidity()):(o.setCustomValidity("Please ensure passwords match"),o.reportValidity()),this.isPasswordConfirmed&&this.isStrongPassword&&this.isValidEmail)try{const d=this.inputtedUsername,i=this.inputtedEmail,r=this.inputtedPassword,s=await fetch("http://api.gloss.vault/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:d,email:i,password:r})}),w=await s.json();s.status===201&&(localStorage.setItem("token",w.token),this.$router.push({path:"dashboard"}))}catch(d){console.error(d.message)}}}},E={class:"background"},U=e("div",{class:"header"},[e("h3",null,"Welcome to"),e("h1",null,"GlossVault")],-1),b={class:"welcome"},I=e("label",{for:"username"},"Username",-1),_=e("label",{for:"email"},"Email",-1),B=e("label",{for:"password"},"Password",-1),S=e("label",{for:"confirmPassword"},"Confirm Password",-1),k=e("a",{href:"/login"},"Or log in to your account",-1);function x(a,t,o,d,i,r){const p=c("Button");return V(),h("div",E,[U,e("div",b,[e("form",{onSubmit:t[8]||(t[8]=y(s=>r.registerUser(),["prevent"]))},[I,l(e("input",{name:"username",required:"","onUpdate:modelValue":t[0]||(t[0]=s=>i.inputtedUsername=s)},null,512),[[u,i.inputtedUsername]]),_,l(e("input",{id:"email",name:"email",type:"email",required:"","onUpdate:modelValue":t[1]||(t[1]=s=>i.inputtedEmail=s),onInput:t[2]||(t[2]=s=>r.clearValidation(s))},null,544),[[u,i.inputtedEmail]]),B,l(e("input",{id:"password",name:"password",type:"password",required:"","onUpdate:modelValue":t[3]||(t[3]=s=>i.inputtedPassword=s),onInput:t[4]||(t[4]=s=>r.clearValidation(s))},null,544),[[u,i.inputtedPassword]]),S,l(e("input",{id:"confirmPassword",name:"confirmPassword",type:"password",required:"","onUpdate:modelValue":t[5]||(t[5]=s=>i.confirmPassword=s),onInput:t[6]||(t[6]=s=>r.clearValidation(s))},null,544),[[u,i.confirmPassword]]),e("div",null,[k,P(p,{onClick:t[7]||(t[7]=s=>r.registerUser())},{default:g(()=>[v("Register")]),_:1})])],32)])])}const N=f(C,[["render",x]]);export{N as default};
