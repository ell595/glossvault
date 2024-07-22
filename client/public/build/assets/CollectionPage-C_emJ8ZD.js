import{_ as p,o as d,a as i,b as e,d as c,t as r,g as _,k as y,F as m,l as f,m as v}from"./styles-DBmWAwbP.js";const C={methods:{async deleteGloss(){try{const t=this.gloss.id,s=localStorage.token;(await fetch("http://api.gloss.vault/api/deletegloss",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({gloss_id:t,token:s})})).status===200&&this.$emit("delete")}catch(t){console.error(t.message)}}},props:{gloss:Object},mounted(){this.gloss.image_path}},k={id:"glossCard"},b=["src"],B=["href"];function G(t,s,o,a,n,l){return d(),i("div",k,[e("img",{src:"https://glossvault.s3.eu-north-1.amazonaws.com/"+o.gloss.image_path},null,8,b),e("p",null,[c("Name: "),e("span",null,r(o.gloss.name),1)]),e("p",null,[c("Colour: "),e("span",null,r(o.gloss.colour),1)]),e("p",null,[c("Brand: "),e("span",null,r(o.gloss.brand),1)]),e("a",{href:"https://www.amazon.co.uk/s?k="+o.gloss.name+" "+o.gloss.brand+" lip+gloss&i=beauty&camp=1634&creative=6738&linkId=8cac87ef773c8da26d49e3d2582e0d16",target:"”_blank”"},"Search on Amazon",8,B),e("button",{onClick:s[0]||(s[0]=(...g)=>l.deleteGloss&&l.deleteGloss(...g))},"Delete")])}const E=p(C,[["render",G]]),I={name:"CollectionPage",data(){return{isLoading:!0,collection:null}},methods:{async getCollection(){this.isLoading=!0;const t=this.$route.params.id;try{const o={token:localStorage.token,collectionId:t},a=await fetch("http://api.gloss.vault/api/getcollection",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),n=await a.json();a.status===200&&(this.collection=n[0][0],this.isLoading=!1)}catch(s){console.error(s.message)}},async addGloss(){this.isLoading=!0;let t=new FormData;t.append("image",document.getElementById("image").files[0]),t.append("name",document.getElementById("glossName").value),t.append("colour",document.getElementById("glossColour").value),t.append("brand",document.getElementById("glossBrand").value),t.append("token",localStorage.token),t.append("collection_id",this.$route.params.id);try{(await fetch("http://api.gloss.vault/api/newgloss",{method:"POST",body:t})).status===201&&(this.getCollection(),document.getElementById("image").value="",document.getElementById("glossName").value="",document.getElementById("glossColour").value="",document.getElementById("glossBrand").value="",this.isLoading=!1)}catch(s){console.error(s.message)}}},components:{GlossCard:E},mounted(){this.getCollection()}},N={key:0,class:"loading"},w={id:"grid"},L={id:"header"},S=e("h4",null,"Collection Name:",-1),x={id:"addGloss"},D=e("div",{id:"inputs"},[e("input",{id:"glossName",type:"text",placeholder:"Gloss Name"}),e("input",{id:"glossColour",type:"text",placeholder:"Gloss Colour"}),e("input",{id:"glossBrand",type:"text",placeholder:"Gloss Brand"})],-1),T={id:"buttons"},O=e("label",{for:"image",class:"button"},[c("Upload an Image "),e("input",{type:"file",accept:"image/*;capture=camera",name:"image",id:"image",style:{display:"none"}})],-1),j={id:"glosses"};function P(t,s,o,a,n,l){const g=_("GlossCard");return d(),i(m,null,[n.isLoading?(d(),i("div",N,"Loading")):y("",!0),e("div",w,[e("div",L,[S,e("h2",null,r(n.collection.name),1)]),e("div",x,[D,e("div",T,[O,e("div",{class:"button",onClick:s[0]||(s[0]=(...u)=>l.addGloss&&l.addGloss(...u))},"Add Gloss")])]),e("div",j,[(d(!0),i(m,null,f(n.collection.glosses,(u,h)=>(d(),v(g,{key:h,gloss:u,onDelete:l.getCollection},null,8,["gloss","onDelete"]))),128))])])],64)}const F=p(I,[["render",P]]);export{F as default};
