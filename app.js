(() => {
const DATA = window.GROCERY_DATA;
const CONFIG = window.OUR_GROCERIES_CONFIG || {};
const cloudReady = CONFIG.supabaseUrl && CONFIG.supabaseKey &&
  !CONFIG.supabaseUrl.includes("PASTE_") && !CONFIG.supabaseKey.includes("PASTE_");
const SECTION_ORDER = DATA.sections;
const KEY = "ourGroceriesV2Demo";
const FONT_KEY = "groceriesFontScale";

let sb=null, household=null, user=null, items=[], customCatalog=[], recent=[], channel=null;
let activeSuggestion=-1, demo=!cloudReady;
let sortables=[];

const $=id=>document.getElementById(id);
const itemInput=$("itemInput"), suggestions=$("suggestions"), list=$("list"), quick=$("quick");
const count=$("count"), statusText=$("statusText"), statusDot=$("statusDot"), setupNotice=$("setupNotice");
const fontSize=$("fontSize");

const STAR_SVG=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.164.75a.53.53 0 0 1 .294.904l-3.737 3.643a2.12 2.12 0 0 0-.609 1.875l.882 5.143a.53.53 0 0 1-.769.559l-4.618-2.428a2.12 2.12 0 0 0-1.974 0l-4.618 2.428a.53.53 0 0 1-.77-.56l.883-5.142a2.12 2.12 0 0 0-.61-1.875L2.162 9.788a.53.53 0 0 1 .294-.906l5.165-.75a2.12 2.12 0 0 0 1.594-1.158z"/></svg>`;
const BASKET_SVG=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/></svg>`;

function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function attr(s){return esc(s)}
function norm(s){return String(s||"").trim().replace(/\s+/g," ").replace(/^(add|some|a|an)\s+/i,"").trim()}
function titleish(s){s=norm(s);return s?s.charAt(0).toUpperCase()+s.slice(1):s}

function baseCatalogMap(){
  const m=new Map();
  DATA.catalog.forEach(x=>m.set(x.name.toLowerCase(),x));
  return m;
}
const baseMap=baseCatalogMap();

function resolveBuiltIn(raw){
  const q=norm(raw).toLowerCase();
  if(baseMap.has(q)) return baseMap.get(q);
  const alias=DATA.aliases[q];
  if(alias && baseMap.has(alias.toLowerCase())) return baseMap.get(alias.toLowerCase());
  return null;
}
function learnedItem(raw){
  const q=norm(raw).toLowerCase();
  return customCatalog.find(x=>x.name.toLowerCase()===q) || null;
}
function inferSection(raw){
  // Household learning wins over the built-in catalogue.
  const learned=learnedItem(raw);
  if(learned) return learned.section;
  const known=resolveBuiltIn(raw);
  if(known) return known.section;
  const q=norm(raw).toLowerCase();
  for(const rule of DATA.rules){
    if(rule.keywords.some(k=>q.includes(k))) return rule.section;
  }
  return "Other";
}
function displayName(raw){
  const learned=learnedItem(raw);
  if(learned) return learned.name;
  const known=resolveBuiltIn(raw);
  return known?known.name:titleish(raw);
}
function fullCatalog(){
  const m=new Map();
  DATA.catalog.forEach(x=>m.set(x.name.toLowerCase(),x));
  customCatalog.forEach(x=>m.set(x.name.toLowerCase(),{name:x.name,section:x.section,custom:true}));
  return [...m.values()];
}
function nextSortOrder(section){
  const vals=items.filter(x=>!x.bought && x.section===section).map(x=>Number(x.sort_order)||0);
  return (vals.length?Math.max(...vals):0)+1000;
}
function itemOrder(a,b){
  const ao=Number(a.sort_order)||0, bo=Number(b.sort_order)||0;
  if(ao!==bo) return ao-bo;
  return new Date(a.created_at||0)-new Date(b.created_at||0);
}

function applyFontScale(value){
  const v=String(value||"1");
  document.documentElement.style.setProperty("--font-scale",v);
  if(fontSize) fontSize.value=v;
  localStorage.setItem(FONT_KEY,v);
}
applyFontScale(localStorage.getItem(FONT_KEY)||"1");
if(fontSize) fontSize.onchange=()=>applyFontScale(fontSize.value);

function demoLoad(){
  const x=localStorage.getItem(KEY);
  if(x){try{return JSON.parse(x)}catch(e){}}
  return {
    items:[
      ["Bananas","Produce"],["Avocados","Produce"],["Bagels","Bakery"],
      ["Chicken breasts","Meat & Seafood"],["Milk","Dairy & Eggs"],["Eggs","Dairy & Eggs"],
      ["Coffee","Pantry"],["Paper towels","Household & Cleaning"]
    ].map((x,i)=>({id:Date.now()+i,name:x[0],section:x[1],bought:false,starred:false,sort_order:(i+1)*1000,created_at:new Date().toISOString()})),
    catalog:[],recent:["Milk","Bananas","Eggs","Coffee","Paper towels"]
  };
}
function demoSave(){localStorage.setItem(KEY,JSON.stringify({items,catalog:customCatalog,recent}))}

async function init(){
  if(!cloudReady){
    const d=demoLoad(); items=d.items||[]; customCatalog=d.catalog||[]; recent=d.recent||[];
    setupNotice.innerHTML=`<div class="setupNotice"><strong>Demo mode.</strong> This version is ready for shared syncing, but Supabase has not been connected yet. Your list is currently saved only on this device.</div>`;
    render(); return;
  }
  try{
    sb=window.supabase.createClient(CONFIG.supabaseUrl,CONFIG.supabaseKey);
    const {data:{session}}=await sb.auth.getSession();
    if(!session){
      const {data,error}=await sb.auth.signInAnonymously();
      if(error) throw error;
      user=data.user;
    } else user=session.user;

    const {data:memberships,error:merr}=await sb.from("memberships").select("household_id").limit(1);
    if(merr) throw merr;
    if(!memberships || !memberships.length){showOnboarding();return}
    await enterHousehold(memberships[0].household_id);
  }catch(e){
    setupNotice.innerHTML=`<div class="setupNotice"><strong>Cloud connection problem.</strong> ${esc(e.message||e)}</div>`;
    const d=demoLoad();items=d.items||[];customCatalog=d.catalog||[];recent=d.recent||[];demo=true;render();
  }
}

async function enterHousehold(id){
  demo=false;
  const {data:h,error:he}=await sb.from("households").select("id,name,invite_code").eq("id",id).single();
  if(he) throw he;
  household=h;
  await reloadCloud();
  statusText.textContent="Shared";
  statusDot.classList.add("online");
  setupNotice.innerHTML="";
  subscribe();
  render();
}

async function reloadCloud(){
  if(demo)return;
  const [{data:i,error:ie},{data:c,error:ce}]=await Promise.all([
    sb.from("grocery_items").select("*").eq("household_id",household.id).order("sort_order",{ascending:true}).order("created_at",{ascending:true}),
    sb.from("household_catalog").select("name,section,usage_count,last_used_at").eq("household_id",household.id).order("last_used_at",{ascending:false}).limit(150)
  ]);
  if(ie)throw ie;if(ce)throw ce;
  items=i||[]; customCatalog=c||[];
  recent=customCatalog.map(x=>x.name);
}
function subscribe(){
  if(channel) sb.removeChannel(channel);
  channel=sb.channel("groceries-"+household.id)
    .on("postgres_changes",{event:"*",schema:"public",table:"grocery_items",filter:`household_id=eq.${household.id}`},
      async()=>{await reloadCloud();render()})
    .subscribe();
}

function showOnboarding(){
  $("modalRoot").innerHTML=`<div class="overlay"><div class="sheet">
    <h2>Make it your family list</h2>
    <p>Create one shared list, or enter the family code from someone who already created it.</p>
    <input id="familyName" placeholder="Family list name" value="Groceries">
    <button class="primary" id="createFamily">Create family list</button>
    <div class="divider">OR</div>
    <input id="joinCode" placeholder="8-character family code" autocapitalize="characters">
    <button class="secondary" id="joinFamily">Join family list</button>
    <div class="error" id="onboardError"></div>
    <p class="small">No email address or password is required. This browser receives its own anonymous identity and remembers the family membership.</p>
  </div></div>`;
  $("createFamily").onclick=createFamily;$("joinFamily").onclick=joinFamily;
}
async function createFamily(){
  try{
    $("onboardError").textContent="";
    const name=$("familyName").value.trim()||"Groceries";
    const {data,error}=await sb.rpc("create_household",{p_name:name});if(error)throw error;
    const rec=Array.isArray(data)?data[0]:data;
    await enterHousehold(rec.household_id);showFamilyCode(true);
  }catch(e){$("onboardError").textContent=e.message||e}
}
async function joinFamily(){
  try{
    $("onboardError").textContent="";
    const code=$("joinCode").value.trim().toUpperCase();
    const {data,error}=await sb.rpc("join_household",{p_invite_code:code});if(error)throw error;
    await enterHousehold(data);closeModal();
  }catch(e){$("onboardError").textContent=e.message||e}
}
function closeModal(){$("modalRoot").innerHTML=""}
function showFamilyCode(first=false){
  if(demo){
    $("modalRoot").innerHTML=`<div class="overlay"><div class="sheet"><h2>Demo mode</h2><p>Connect Supabase to enable a shared family code and live syncing.</p><button class="secondary" id="closeDemo">Close</button></div></div>`;
    $("closeDemo").onclick=closeModal;return;
  }
  $("modalRoot").innerHTML=`<div class="overlay"><div class="sheet">
    <h2>${first?"Your family list is ready":"Family list"}</h2>
    <p>Use this code once on each family member’s device:</p>
    <div class="code">${esc(household.invite_code)}</div>
    <button class="primary" id="copyCode">Copy family code</button>
    <button class="secondary" id="closeFamily">Close</button>
    <p class="small">Treat the code like a small household password. Anyone with it can join this grocery list.</p>
  </div></div>`;
  $("copyCode").onclick=async()=>{await navigator.clipboard.writeText(household.invite_code);$("copyCode").textContent="Copied"};
  $("closeFamily").onclick=closeModal;
}

async function addItem(raw){
  const clean=norm(raw);if(!clean)return;
  const name=displayName(clean);
  if(items.find(x=>!x.bought&&x.name.toLowerCase()===name.toLowerCase())){flash("Already on the list");return}
  const section=inferSection(clean);
  const sort_order=nextSortOrder(section);
  if(demo){
    items.push({id:Date.now()+Math.random(),name,section,bought:false,starred:false,sort_order,created_at:new Date().toISOString()});
    customTouchLocal(name,section);demoSave();render();
  }else{
    const {error}=await sb.from("grocery_items").insert({household_id:household.id,name,section,bought:false,starred:false,sort_order,created_by:user.id});
    if(error){flash(error.message);return}
    await sb.rpc("touch_catalog",{p_household_id:household.id,p_name:name,p_section:section});
    customTouchLocal(name,section);
  }
  itemInput.value="";closeSuggestions();itemInput.focus();
}
function customTouchLocal(name,section){
  let x=customCatalog.find(c=>c.name.toLowerCase()===name.toLowerCase());
  if(x){
    x.usage_count=(x.usage_count||0)+1;x.last_used_at=new Date().toISOString();
    if(x.section==="Other"&&section!=="Other")x.section=section;
  }else customCatalog.unshift({name,section,usage_count:1,last_used_at:new Date().toISOString()});
  recent=[name,...recent.filter(x=>x.toLowerCase()!==name.toLowerCase())].slice(0,30);
}
async function toggleBought(id){
  const x=items.find(i=>String(i.id)===String(id));if(!x)return;
  const bought=!x.bought;
  x.bought=bought;x.bought_at=bought?new Date().toISOString():null;
  if(demo){demoSave();render();return}
  render();
  const {error}=await sb.from("grocery_items").update({bought,bought_at:x.bought_at}).eq("id",id);
  if(error){x.bought=!bought;render();flash(error.message)}
}
async function toggleStar(id){
  const x=items.find(i=>String(i.id)===String(id));if(!x)return;
  const old=!!x.starred;x.starred=!old;render();
  if(demo){demoSave();return}
  const {error}=await sb.from("grocery_items").update({starred:x.starred}).eq("id",id);
  if(error){x.starred=old;render();flash(error.message)}
}
async function deleteItem(id){
  const old=[...items];items=items.filter(i=>String(i.id)!==String(id));render();
  if(demo){demoSave();return}
  const {error}=await sb.from("grocery_items").delete().eq("id",id);
  if(error){items=old;render();flash(error.message)}
}
async function changeSection(id,section){
  const x=items.find(i=>String(i.id)===String(id));if(!x)return;
  const oldSection=x.section;
  x.section=section;
  x.sort_order=nextSortOrder(section);

  // Update the in-memory household catalogue immediately so the correction
  // is remembered even before the next reload.
  let learned=customCatalog.find(z=>z.name.toLowerCase()===x.name.toLowerCase());
  if(learned) learned.section=section;
  else customCatalog.unshift({name:x.name,section,usage_count:1,last_used_at:new Date().toISOString()});
  render();

  if(demo){demoSave();return}
  const {error}=await sb.from("grocery_items").update({section,sort_order:x.sort_order}).eq("id",id);
  if(error){x.section=oldSection;render();flash(error.message);return}
  const {error:rpcError}=await sb.rpc("set_catalog_section",{p_household_id:household.id,p_name:x.name,p_section:section});
  if(rpcError) flash(rpcError.message);
}
async function clearBought(){
  const removed=items.filter(x=>x.bought);
  if(!removed.length)return;
  items=items.filter(x=>!x.bought);
  render(); // immediate visual clear; don't wait for realtime
  if(demo){demoSave();return}
  const {error}=await sb.from("grocery_items").delete().eq("household_id",household.id).eq("bought",true);
  if(error){items=[...items,...removed];render();flash(error.message)}
}

async function persistOrder(section){
  const card=document.querySelector(`.card[data-section="${CSS.escape(section)}"]`);
  if(!card)return;
  const ids=[...card.querySelectorAll(".row[data-id]")].map(el=>el.dataset.id);
  const updates=[];
  ids.forEach((id,index)=>{
    const x=items.find(i=>String(i.id)===String(id));
    if(!x)return;
    const order=(index+1)*1000;
    x.sort_order=order;
    if(x.section!==section){
      x.section=section;
      let learned=customCatalog.find(z=>z.name.toLowerCase()===x.name.toLowerCase());
      if(learned) learned.section=section;
      else customCatalog.unshift({name:x.name,section,usage_count:1,last_used_at:new Date().toISOString()});
      if(!demo) updates.push(sb.rpc("set_catalog_section",{p_household_id:household.id,p_name:x.name,p_section:section}));
    }
    if(!demo) updates.push(sb.from("grocery_items").update({section,sort_order:order}).eq("id",id));
  });
  if(demo){demoSave();render();return}
  await Promise.all(updates);
  render();
}
function setupSortables(){
  sortables.forEach(s=>s.destroy());sortables=[];
  if(typeof Sortable==="undefined")return;
  document.querySelectorAll(".card[data-section]").forEach(card=>{
    const section=card.dataset.section;
    sortables.push(new Sortable(card,{
      group:"groceries",
      animation:150,
      delay:120,
      delayOnTouchOnly:true,
      touchStartThreshold:4,
      draggable:".row",
      filter:".check,.starBtn,.menuBtn,.actions,select,button",
      preventOnFilter:false,
      ghostClass:"sortable-ghost",
      chosenClass:"sortable-chosen",
      onEnd:async evt=>{
        const fromSection=evt.from.dataset.section;
        const toSection=evt.to.dataset.section;
        await persistOrder(toSection);
        if(fromSection!==toSection) await persistOrder(fromSection);
      }
    }));
  });
}

function render(){
  const active=items.filter(x=>!x.bought);
  count.textContent=`${active.length} ${active.length===1?"item":"items"}`;
  if(demo){statusText.textContent="Demo";statusDot.classList.remove("online")}
  renderQuick();

  let html="";
  if(!active.length){
    html=`<div class="empty"><div class="emptyIcon">${BASKET_SVG}</div>Your list is empty.<br>Add something above.</div>`;
  }

  for(const section of SECTION_ORDER){
    const arr=active.filter(x=>x.section===section).sort(itemOrder);
    if(!arr.length)continue;
    html+=`<section class="section">
      <div class="section-title"><span>${esc(section)}</span><span>${arr.length}</span></div>
      <div class="card" data-section="${attr(section)}">${arr.map(rowHtml).join("")}</div>
    </section>`;
  }

  const bought=items.filter(x=>x.bought).sort((a,b)=>new Date(b.bought_at||0)-new Date(a.bought_at||0));
  if(bought.length){
    html+=`<section class="boughtWrap">
      <div class="boughtHeader">
        <div class="section-title boughtTitle" style="margin:0"><span>Recently bought</span><span class="boughtCount">${bought.length}</span></div>
        <button class="linkBtn" id="clearBought">Clear</button>
      </div>
      <div class="card bought">${bought.map(rowHtml).join("")}</div>
    </section>`;
  }

  list.innerHTML=html;

  document.querySelectorAll(".check").forEach(b=>b.onclick=()=>toggleBought(b.dataset.id));
  document.querySelectorAll(".starBtn").forEach(b=>b.onclick=()=>toggleStar(b.dataset.id));
  document.querySelectorAll(".menuBtn").forEach(b=>b.onclick=()=>{const a=$("actions-"+b.dataset.id);if(a)a.classList.toggle("open")});
  document.querySelectorAll(".deleteBtn").forEach(b=>b.onclick=()=>deleteItem(b.dataset.id));
  document.querySelectorAll("select[data-id]").forEach(s=>s.onchange=()=>changeSection(s.dataset.id,s.value));
  if($("clearBought"))$("clearBought").onclick=clearBought;
  setupSortables();
}
function rowHtml(x){
  const opts=SECTION_ORDER.map(s=>`<option ${s===x.section?"selected":""}>${esc(s)}</option>`).join("");
  const activeStar=!x.bought?`<button class="starBtn ${x.starred?"active":""}" data-id="${attr(x.id)}" aria-label="${x.starred?"Unstar":"Star"} ${attr(x.name)}">${STAR_SVG}</button>`:"";
  return `<div class="row ${x.starred&&!x.bought?"starred":""}" data-id="${attr(x.id)}">
    <button class="check" data-id="${attr(x.id)}" aria-label="${x.bought?"Put back":"Mark bought"}"></button>
    <div><div class="itemname">${esc(x.name)}</div>${x.section==="Other"?`<div class="meta">Unsorted — choose a section once and I’ll remember it</div>`:""}</div>
    ${activeStar}
    <button class="menuBtn" data-id="${attr(x.id)}" aria-label="Item options">•••</button>
    <div class="actions" id="actions-${attr(x.id)}"><select data-id="${attr(x.id)}" aria-label="Move ${attr(x.name)} to section">${opts}</select><button class="deleteBtn" data-id="${attr(x.id)}">Delete</button></div>
  </div>`;
}
function renderQuick(){
  const active=new Set(items.filter(x=>!x.bought).map(x=>x.name.toLowerCase()));
  const source=recent.length?recent:["Milk","Bananas","Eggs","Coffee","Paper towels","Waffles","Muffins"];
  const names=source.filter((x,i,a)=>!active.has(x.toLowerCase())&&a.findIndex(y=>y.toLowerCase()===x.toLowerCase())===i).slice(0,7);
  quick.innerHTML=names.map(n=>`<button class="chip" data-name="${attr(n)}">+ ${esc(n)}</button>`).join("");
  quick.querySelectorAll(".chip").forEach(b=>b.onclick=()=>addItem(b.dataset.name));
}
function matches(q){
  q=norm(q).toLowerCase();if(!q)return[];
  return fullCatalog().filter(x=>x.name.toLowerCase().includes(q)).sort((a,b)=>{
    const A=a.name.toLowerCase().startsWith(q)?0:1,B=b.name.toLowerCase().startsWith(q)?0:1;if(A!==B)return A-B;
    const ar=recent.findIndex(r=>r.toLowerCase()===a.name.toLowerCase()),br=recent.findIndex(r=>r.toLowerCase()===b.name.toLowerCase());
    if((ar<0?999:ar)!==(br<0?999:br))return(ar<0?999:ar)-(br<0?999:br);
    return a.name.localeCompare(b.name);
  }).slice(0,7);
}
function showSuggestions(){
  const m=matches(itemInput.value);activeSuggestion=-1;
  if(!m.length){closeSuggestions();return}
  suggestions.innerHTML=m.map((x,i)=>`<button class="suggestion" data-i="${i}" data-name="${attr(x.name)}"><span>${esc(x.name)}</span><span class="sec">${esc(x.section)}</span></button>`).join("");
  suggestions.style.display="block";
  suggestions.querySelectorAll(".suggestion").forEach(b=>b.onclick=()=>addItem(b.dataset.name));
}
function closeSuggestions(){suggestions.style.display="none";suggestions.innerHTML="";activeSuggestion=-1}
function moveSuggestion(delta){
  const buttons=[...suggestions.querySelectorAll(".suggestion")];if(!buttons.length)return;
  activeSuggestion=(activeSuggestion+delta+buttons.length)%buttons.length;
  buttons.forEach((b,i)=>b.classList.toggle("active",i===activeSuggestion));
}
function flash(msg){
  const old=itemInput.placeholder;itemInput.value="";itemInput.placeholder=msg;
  setTimeout(()=>itemInput.placeholder=old,1100);
}

itemInput.addEventListener("input",showSuggestions);
itemInput.addEventListener("keydown",e=>{
  if(e.key==="ArrowDown"){e.preventDefault();moveSuggestion(1)}
  else if(e.key==="ArrowUp"){e.preventDefault();moveSuggestion(-1)}
  else if(e.key==="Escape")closeSuggestions();
  else if(e.key==="Enter"){
    e.preventDefault();
    const buttons=[...suggestions.querySelectorAll(".suggestion")];
    if(activeSuggestion>=0&&buttons[activeSuggestion])addItem(buttons[activeSuggestion].dataset.name);
    else addItem(itemInput.value);
  }
});
document.addEventListener("click",e=>{if(!e.target.closest(".inputwrap"))closeSuggestions()});
$("addBtn").onclick=()=>addItem(itemInput.value);
$("familyBtn").onclick=()=>showFamilyCode(false);

init();
})();
