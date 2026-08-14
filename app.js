(() => {
const DATA = window.GROCERY_DATA;
const CONFIG = window.OUR_GROCERIES_CONFIG || {};
const cloudReady = CONFIG.supabaseUrl && CONFIG.supabaseKey &&
  !CONFIG.supabaseUrl.includes("PASTE_") && !CONFIG.supabaseKey.includes("PASTE_");
const SECTION_ORDER = DATA.sections;
const KEY = "ourGroceriesV2Demo";
const FONT_KEY = "groceriesFontScale";
const BAD_CATALOG_NAMES = new Set(["air freshener candles matches lighters batteries aa batteries aaa batteries light bulbs filters water filters","almond milk beverage oat milk beverage soy beverage non alcoholic beer drink mix powdered drink mix","apples bananas avocados oranges mandarins clementines grapefruit lemons limes grapes strawberries blueberries","applesauce cups pudding cups yogurt tubes snack packs","artichokes okra jicama rutabaga horseradish fresh turmeric fresh herbs salad kit coleslaw mix guacamole","banana bread zucchini bread cornbread biscuits","bandages band aids gauze first aid tape pain reliever acetaminophen ibuprofen aspirin allergy medicine cold medicine","bell peppers red peppers green peppers yellow peppers orange peppers jalapenos hot peppers poblano peppers","body lotion sunscreen sunblock lip balm toothpaste toothbrush toothbrushes dental floss floss picks mouthwash","bok choy swiss chard collard greens broccoli broccolini cauliflower brussels sprouts asparagus green beans","bouillon cubes pasta sauce tomato sauce pizza sauce pesto salsa taco sauce taco seasoning chili powder cumin","bread white bread whole wheat bread whole grain bread multigrain bread rye bread sourdough bread french bread","broth canned broth tuna canned tuna salmon canned salmon sardines anchovies oysters canned oysters crab canned crab","brown rice basmati rice jasmine rice wild rice quinoa couscous barley bulgur farro lentils red lentils green lentils","butter lettuce spring mix mixed greens spinach baby spinach kale arugula cabbage red cabbage napa cabbage","cake mix brownie mix muffin mix cookie mix instant pudding jello gelatin mix tortillas taco shells tostadas","canned beans black beans kidney beans white beans navy beans cannellini beans baked beans refried beans chickpeas","canned green beans canned carrots canned mushrooms canned beets canned pumpkin canned potatoes canned mixed vegetables","canned pineapple canned fruit fruit cocktail applesauce pickles dill pickles bread and butter pickles relish olives","canned tomatoes diced tomatoes crushed tomatoes whole tomatoes tomato paste tomato sauce canned corn canned peas","cantaloupe honeydew pomegranate papaya coconut figs dates apricots rhubarb romaine lettuce iceberg lettuce","cashew milk cream heavy cream whipping cream half and half coffee cream table cream sour cream creme fraiche","chicken chicken breasts chicken thighs chicken drumsticks chicken wings whole chicken ground chicken chicken cutlets","chicken tenders turkey whole turkey turkey breast ground turkey turkey burgers beef ground beef lean ground beef","chips potato chips tortilla chips corn chips nacho chips pretzels crackers saltines ritz crackers wheat crackers","chocolate spread ketchup mustard dijon mustard yellow mustard mayonnaise mayo miracle whip relish hot sauce","coconut milk canned coconut milk evaporated milk condensed milk sweetened condensed milk canned peaches canned pears","coconut oil sesame oil vinegar white vinegar apple cider vinegar balsamic vinegar red wine vinegar rice vinegar","coffee cake pound cake cupcakes cake cookies bakery cookies pie apple pie pumpkin pie tarts brownies","coffee filters vacuum bags mop refills swiffer refills broom dustpan rubber gloves cleaning gloves garbage bin liners","coffee ground coffee coffee beans instant coffee decaf coffee espresso tea black tea green tea herbal tea chai tea","coke pepsi ginger ale root beer lemon lime soda iced tea lemonade orange juice apple juice cranberry juice","comb hairbrush brush hair ties elastics bobby pins nail polish nail polish remover nail clippers hand sanitizer","cookies chocolate chip cookies oatmeal cookies oreos sandwich cookies wafers graham crackers digestive cookies","corn tortillas wraps flatbread pizza crust pizza dough garlic bread breadsticks croutons breadcrumbs","cottage cheese blue cheese monterey jack cheese pepper jack cheese cheese strings cheese slices shredded cheese","cough drops cough syrup antacid vitamins contact solution","dark chocolate chips white chocolate chips cocoa powder coconut shredded coconut raisins dried cranberries","deli turkey turkey slices smoked turkey deli chicken chicken slices ham black forest ham honey ham prosciutto","deodorant antiperspirant razors razor blades shaving cream shaving gel aftershave cotton swabs q tips cotton balls","dish soap dishwasher tablets dishwasher pods dishwasher detergent rinse aid sponges scrubbers steel wool","dried apricots dried fruit dates prunes nuts almonds walnuts pecans cashews peanuts pistachios sunflower seeds","dried beans chickpeas dried chickpeas black beans dried black beans kidney beans dried kidney beans split peas","eggs large eggs extra large eggs brown eggs free range eggs egg whites butter salted butter unsalted butter","energy bars fruit bars fruit snacks gummies gummy bears candy chocolate chocolate bars dark chocolate milk chocolate","extra lean ground beef steak sirloin steak striploin steak ribeye steak tenderloin steak flank steak skirt steak","french fries frozen fries sweet potato fries tater tots hash browns potato wedges onion rings frozen appetizers","frozen bacon frozen seafood frozen salmon frozen vegetables steamers","frozen bagels frozen muffins frozen croissants frozen waffles frozen breakfast sandwiches frozen sausage","frozen berries frozen strawberries frozen blueberries frozen raspberries frozen mixed berries frozen fruit frozen mango","frozen burgers frozen chicken burgers chicken nuggets chicken strips chicken fingers frozen chicken wings","frozen cauliflower frozen spinach frozen green beans frozen mixed vegetables frozen stir fry vegetables edamame","frozen fish fish sticks frozen shrimp ice cream vanilla ice cream chocolate ice cream strawberry ice cream gelato","frozen peaches frozen pineapple frozen cherries frozen vegetables frozen peas frozen corn frozen broccoli","frozen pizza pizza pockets frozen burritos frozen dinners frozen meals frozen lasagna frozen pasta frozen mac and cheese","garlic ginger potatoes russet potatoes red potatoes yellow potatoes yukon gold potatoes sweet potatoes yams","gatorade energy drinks red bull coffee drinks iced coffee cold brew tea drinks kombucha milk drinks chocolate milk","glass cleaner window cleaner floor cleaner wood cleaner oven cleaner stainless steel cleaner laundry detergent","gluten free bread bagels plain bagels everything bagels sesame bagels cinnamon raisin bagels english muffins","grapefruit juice pineapple juice tomato juice vegetable juice grape juice juice boxes coconut water sports drinks","gravy gravy mix broth chicken broth beef broth vegetable broth stock chicken stock beef stock vegetable stock","green olives black olives kalamata olives capers artichoke hearts roasted red peppers jalapenos jarred jalapenos","hamburger buns hot dog buns brioche buns sandwich buns sub buns pita pita bread naan tortillas flour tortillas","honey molasses agave salt sea salt kosher salt pepper black pepper olive oil vegetable oil canola oil avocado oil","hot chocolate cocoa cereal oatmeal oats rolled oats quick oats granola muesli flour all purpose flour bread flour","italian bread ciabatta baguette focaccia pumpernickel bread challah brioche raisin bread cinnamon raisin bread","kitchen cleaner all purpose cleaner disinfectant cleaner disinfecting wipes bleach bathroom cleaner toilet cleaner","laundry pods fabric softener dryer sheets stain remover oxygen bleach hand soap liquid hand soap bar soap","leg of lamb ground lamb salmon salmon fillets trout cod haddock halibut tilapia sole tuna steaks swordfish","lentils canned lentils canned soup tomato soup chicken noodle soup mushroom soup cream of mushroom soup vegetable soup","mac and cheese prepared meals ready meals olives antipasto pickles deli pickles feta olives marinated vegetables","macaroni salad pasta salad coleslaw caesar salad greek salad garden salad tabbouleh hummus tzatziki babaganoush","margarine cheddar cheese old cheddar mild cheddar marble cheese mozzarella cheese parmesan cheese parmigiano reggiano","milk skim milk 1% milk 2% milk whole milk chocolate milk lactose free milk oat milk almond milk soy milk coconut milk","mozzarella sticks spring rolls egg rolls samosas perogies pierogies dumplings potstickers frozen meatballs","muffins blueberry muffins bran muffins chocolate chip muffins corn muffins croissants rolls dinner rolls buns","mushrooms white mushrooms cremini mushrooms portobello mushrooms cilantro parsley basil mint dill rosemary","oregano dried oregano basil dried basil thyme rosemary parsley bay leaves chili flakes red pepper flakes","oyster sauce hoisin sauce tahini salad dressing ranch dressing caesar dressing italian dressing balsamic dressing","panko breadcrumbs hamburger rolls hot dog rolls kaiser rolls pretzel buns donuts doughnuts danishes scones","paper towels toilet paper tissues facial tissue napkins paper plates paper bowls plastic cups disposable cups","paprika smoked paprika garlic powder onion powder cinnamon nutmeg cloves ginger powder curry powder turmeric","pasta sauce marinara sauce alfredo sauce pesto salsa queso sauerkraut kimchi gravy jarred gravy","pasta spaghetti linguine fettuccine penne rigatoni macaroni lasagna noodles egg noodles ramen noodles rice white rice","peanut butter natural peanut butter almond butter cashew butter jam strawberry jam raspberry jam marmalade nutella","plastic cutlery aluminum foil tin foil parchment paper wax paper plastic wrap cling wrap freezer bags sandwich bags","popcorn kernels microwave popcorn nutritional yeast protein pasta noodles","pork pork chops pork tenderloin pork loin pork roast ground pork pork ribs back ribs side ribs bacon breakfast sausage","prepared sandwiches wraps sushi pizza prepared pizza soup prepared soup quiche meat pie lasagna prepared lasagna","pumpkin seeds chia seeds flax seeds sesame seeds crackers breadcrumbs panko stuffing mix pancake mix waffle mix","raspberries blackberries cranberries cherries peaches nectarines plums pears mangoes pineapple kiwi watermelon","refrigerated dough crescent rolls refrigerated cookie dough","rice crackers rice cakes popcorn microwave popcorn cheese puffs cheesies granola bars cereal bars protein bars","roma tomatoes beefsteak tomatoes onions yellow onions red onions white onions green onions scallions shallots","salami genoa salami pepperoni mortadella roast beef pastrami corned beef bologna deli cheese sliced cheese","salsa fresh salsa pico de gallo guacamole rotisserie chicken fried chicken chicken wings chicken tenders","sausages italian sausage mild italian sausage hot italian sausage bratwurst kielbasa chorizo lamb lamb chops","sea bass shrimp prawns scallops mussels clams oysters crab lobster calamari squid smoked salmon fish fillets","shampoo conditioner body wash soap bar soap hand soap face wash facial cleanser moisturizer face moisturizer","shortbread brownies mini muffins snack cakes donuts trail mix nuts mixed nuts peanuts almonds cashews pistachios","snap peas snow peas peas corn corn on the cob carrots baby carrots celery cucumber english cucumber zucchini","sorbet frozen yogurt popsicles ice pops ice cream sandwiches frozen pie frozen cake frozen bread frozen garlic bread","sriracha barbecue sauce bbq sauce steak sauce worcestershire sauce soy sauce tamari teriyaki sauce fish sauce","stewing beef beef roast pot roast roast beef brisket short ribs beef ribs hamburger patties burgers veal veal chops","sunflower seeds pumpkin seeds dried fruit raisins dried cranberries beef jerky jerky pepperettes cheese snacks","swiss cheese havarti cheese gouda cheese brie cheese camembert feta cheese goat cheese cream cheese ricotta cheese","swiss cheese slices cheddar slices provolone slices havarti slices mozzarella slices prepared salad potato salad","thyme sage chives oregano bean sprouts alfalfa sprouts radishes beets turnips parsnips leeks fennel eggplant","tissues tampons pads sanitary pads panty liners hair gel hair spray hairspray mousse hair dye dry shampoo","toothpicks skewers straws foil pans disposable pans","vanilla vanilla extract baking powder baking soda yeast cornstarch corn starch gelatin chocolate chips","waffles frozen waffles belgian waffles toaster waffles pancakes frozen pancakes french toast frozen french toast","water bottled water spring water distilled water sparkling water soda water club soda tonic water pop soda cola","white fish seafood mix anchovies fresh fish","whole wheat flour almond flour cornmeal sugar white sugar brown sugar icing sugar powdered sugar maple syrup syrup","yellow squash butternut squash acorn squash spaghetti squash pumpkin tomatoes cherry tomatoes grape tomatoes","yogurt greek yogurt plain yogurt vanilla yogurt fruit yogurt skyr kefir pudding whipped cream buttermilk","zipper bags storage bags garbage bags trash bags compost bags recycling bags food containers storage containers"]);
function validCatalogName(name){return !BAD_CATALOG_NAMES.has(String(name||"").trim().toLowerCase())}


let sb=null, household=null, user=null, items=[], customCatalog=[], recent=[], channel=null;
let activeSuggestion=-1, demo=!cloudReady;
let sortables=[];
let boughtOpen=false;

const $=id=>document.getElementById(id);
const itemInput=$("itemInput"), suggestions=$("suggestions"), list=$("list"), quick=$("quick");
const count=$("count"), statusText=$("statusText"), statusDot=$("statusDot"), setupNotice=$("setupNotice");
const fontSize=$("fontSize");

const STAR_SVG=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.164.75a.53.53 0 0 1 .294.904l-3.737 3.643a2.12 2.12 0 0 0-.609 1.875l.882 5.143a.53.53 0 0 1-.769.559l-4.618-2.428a2.12 2.12 0 0 0-1.974 0l-4.618 2.428a.53.53 0 0 1-.77-.56l.883-5.142a2.12 2.12 0 0 0-.61-1.875L2.162 9.788a.53.53 0 0 1 .294-.906l5.165-.75a2.12 2.12 0 0 0 1.594-1.158z"/></svg>`;
const CHEVRON_SVG=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`;
const TRASH_SVG=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><path d="M19 6l-1 14c-.1 1-1 2-2 2H8c-1 0-1.9-1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`;
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
  customCatalog.filter(x=>validCatalogName(x.name)).forEach(x=>m.set(x.name.toLowerCase(),{name:x.name,section:x.section,custom:true}));
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
  items=i||[]; customCatalog=(c||[]).filter(x=>validCatalogName(x.name));
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

async function editItem(id){
  const x=items.find(i=>String(i.id)===String(id));if(!x)return;
  const next=prompt("Edit item",x.name);
  if(next===null)return;
  const name=String(next).trim().replace(/\s+/g," ");
  if(!name || name===x.name)return;

  const oldName=x.name;
  x.name=name;
  render();

  if(demo){
    let learned=customCatalog.find(z=>z.name.toLowerCase()===oldName.toLowerCase());
    if(learned){learned.name=name;learned.section=x.section}
    else customCatalog.unshift({name,section:x.section,usage_count:1,last_used_at:new Date().toISOString()});
    demoSave();return;
  }

  const {error}=await sb.from("grocery_items").update({name}).eq("id",id);
  if(error){
    x.name=oldName;render();flash(error.message);return;
  }

  const {error:learnError}=await sb.rpc("set_catalog_section",{
    p_household_id:household.id,p_name:name,p_section:x.section
  });
  if(learnError) flash(learnError.message);

  let learned=customCatalog.find(z=>z.name.toLowerCase()===oldName.toLowerCase());
  if(learned){learned.name=name;learned.section=x.section}
  else customCatalog.unshift({name,section:x.section,usage_count:1,last_used_at:new Date().toISOString()});
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
  const oldOrder=x.sort_order;
  x.section=section;
  x.sort_order=nextSortOrder(section);

  let learned=customCatalog.find(z=>z.name.toLowerCase()===x.name.toLowerCase());
  if(learned){learned.section=section;learned.last_used_at=new Date().toISOString()}
  else customCatalog.unshift({name:x.name,section,usage_count:1,last_used_at:new Date().toISOString()});
  render();

  if(demo){demoSave();return}

  // Save household learning FIRST. The grocery-item update triggers realtime;
  // doing the catalogue write first ensures the ensuing reload sees the new section.
  const {error:rpcError}=await sb.rpc("set_catalog_section",{
    p_household_id:household.id,p_name:x.name,p_section:section
  });
  if(rpcError){
    x.section=oldSection;x.sort_order=oldOrder;render();flash(rpcError.message);return;
  }

  const {error}=await sb.from("grocery_items").update({
    section,sort_order:x.sort_order
  }).eq("id",id);
  if(error){
    x.section=oldSection;x.sort_order=oldOrder;render();flash(error.message);
  }
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

  if(demo){
    ids.forEach((id,index)=>{
      const x=items.find(i=>String(i.id)===String(id));if(!x)return;
      x.sort_order=(index+1)*1000;
      if(x.section!==section){
        x.section=section;
        let learned=customCatalog.find(z=>z.name.toLowerCase()===x.name.toLowerCase());
        if(learned) learned.section=section;
        else customCatalog.unshift({name:x.name,section,usage_count:1,last_used_at:new Date().toISOString()});
      }
    });
    demoSave();render();return;
  }

  for(let index=0;index<ids.length;index++){
    const id=ids[index];
    const x=items.find(i=>String(i.id)===String(id));if(!x)continue;
    const order=(index+1)*1000;

    if(x.section!==section){
      // Persist the household correction before the grocery row, so realtime
      // reloads cannot race ahead of the learned category.
      const {error:learnError}=await sb.rpc("set_catalog_section",{
        p_household_id:household.id,p_name:x.name,p_section:section
      });
      if(learnError){flash(learnError.message);continue}
      x.section=section;
      let learned=customCatalog.find(z=>z.name.toLowerCase()===x.name.toLowerCase());
      if(learned) learned.section=section;
      else customCatalog.unshift({name:x.name,section,usage_count:1,last_used_at:new Date().toISOString()});
    }

    x.sort_order=order;
    const {error}=await sb.from("grocery_items").update({
      section:x.section,sort_order:order
    }).eq("id",id);
    if(error) flash(error.message);
  }
  render();
}
function clearDropIndicators(){
  document.querySelectorAll(".drop-before,.drop-after").forEach(el=>{
    el.classList.remove("drop-before","drop-after");
  });
}
function setupSortables(){
  sortables.forEach(s=>s.destroy());sortables=[];
  if(typeof Sortable==="undefined")return;
  document.querySelectorAll(".card[data-section]").forEach(card=>{
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
      onMove:evt=>{
        clearDropIndicators();
        const target=evt.related;
        if(target && target.classList && target.classList.contains("row")){
          target.classList.add(evt.willInsertAfter?"drop-after":"drop-before");
        }
        return true;
      },
      onEnd:async evt=>{
        clearDropIndicators();
        const fromSection=evt.from.dataset.section;
        const toSection=evt.to.dataset.section;
        await persistOrder(toSection);
        if(fromSection!==toSection) await persistOrder(fromSection);
      },
      onUnchoose:clearDropIndicators
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
    html+=`<section class="boughtWrap ${boughtOpen?"open":""}">
      <div class="boughtArchiveBar">
        <button class="boughtToggle" id="boughtToggle" aria-expanded="${boughtOpen?"true":"false"}">
          <span class="archiveChevron">${CHEVRON_SVG}</span>
          <span>Recently bought</span>
          <span class="boughtCount">${bought.length}</span>
        </button>
        ${boughtOpen?`<button class="linkBtn clearAllBtn" id="clearBought">Clear all</button>`:""}
      </div>
      ${boughtOpen?`<div class="card bought">${bought.map(boughtRowHtml).join("")}</div>`:""}
    </section>`;
  }

  list.innerHTML=html;

  document.querySelectorAll(".check").forEach(b=>b.onclick=()=>toggleBought(b.dataset.id));
  document.querySelectorAll(".starBtn").forEach(b=>b.onclick=()=>toggleStar(b.dataset.id));
  document.querySelectorAll(".menuBtn").forEach(b=>b.onclick=()=>{const a=$("actions-"+b.dataset.id);if(a)a.classList.toggle("open")});
  document.querySelectorAll(".editBtn").forEach(b=>b.onclick=()=>editItem(b.dataset.id));
  document.querySelectorAll(".deleteBtn").forEach(b=>b.onclick=()=>deleteItem(b.dataset.id));
  document.querySelectorAll(".boughtEditBtn").forEach(b=>b.onclick=()=>editItem(b.dataset.id));
  document.querySelectorAll(".boughtDeleteBtn").forEach(b=>b.onclick=()=>deleteItem(b.dataset.id));
  document.querySelectorAll("select[data-id]").forEach(s=>s.onchange=()=>changeSection(s.dataset.id,s.value));
  if($("boughtToggle"))$("boughtToggle").onclick=()=>{boughtOpen=!boughtOpen;render()};
  if($("clearBought"))$("clearBought").onclick=clearBought;
  setupSortables();
}
function boughtRowHtml(x){
  return `<div class="boughtRow" data-id="${attr(x.id)}">
    <button class="check boughtRestore" data-id="${attr(x.id)}" aria-label="Restore ${attr(x.name)} to list"></button>
    <div class="boughtItemText">
      <div class="itemname">${esc(x.name)}</div>
      <div class="meta">Tap the checkmark to restore</div>
    </div>
    <div class="boughtRowActions">
      <button class="boughtEditBtn" data-id="${attr(x.id)}" aria-label="Edit ${attr(x.name)}">Edit</button>
      <button class="boughtDeleteBtn" data-id="${attr(x.id)}" aria-label="Delete ${attr(x.name)} permanently">${TRASH_SVG}</button>
    </div>
  </div>`;
}
function rowHtml(x){
  const opts=SECTION_ORDER.map(s=>`<option ${s===x.section?"selected":""}>${esc(s)}</option>`).join("");
  const activeStar=!x.bought?`<button class="starBtn ${x.starred?"active":""}" data-id="${attr(x.id)}" aria-label="${x.starred?"Unstar":"Star"} ${attr(x.name)}">${STAR_SVG}</button>`:"";
  return `<div class="row ${x.starred&&!x.bought?"starred":""}" data-id="${attr(x.id)}">
    <button class="check" data-id="${attr(x.id)}" aria-label="${x.bought?"Put back":"Mark bought"}"></button>
    <div><div class="itemname">${esc(x.name)}</div>${x.section==="Other"?`<div class="meta">Unsorted — choose a section once and I’ll remember it</div>`:""}</div>
    ${activeStar}
    <button class="menuBtn" data-id="${attr(x.id)}" aria-label="Item options">•••</button>
    <div class="actions" id="actions-${attr(x.id)}"><select data-id="${attr(x.id)}" aria-label="Move ${attr(x.name)} to section">${opts}</select><button class="editBtn" data-id="${attr(x.id)}">Edit</button><button class="deleteBtn" data-id="${attr(x.id)}">Delete</button></div>
  </div>`;
}
function renderQuick(){
  const active=new Set(items.filter(x=>!x.bought).map(x=>x.name.toLowerCase()));
  const source=(recent.length?recent:["Milk","Bananas","Eggs","Coffee","Paper towels","Waffles","Muffins"]).filter(validCatalogName);
  const names=source.filter((x,i,a)=>!active.has(x.toLowerCase())&&a.findIndex(y=>y.toLowerCase()===x.toLowerCase())===i).slice(0,7);
  quick.innerHTML=names.map(n=>`<button class="chip" data-name="${attr(n)}">+ ${esc(n)}</button>`).join("");
  quick.querySelectorAll(".chip").forEach(b=>b.onclick=()=>addItem(b.dataset.name));
}
function matches(q){
  q=norm(q).toLowerCase();if(!q)return[];
  return fullCatalog().filter(x=>validCatalogName(x.name)&&x.name.toLowerCase().includes(q)).sort((a,b)=>{
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
