(() => {
const DATA = window.GROCERY_DATA;
const CONFIG = window.OUR_GROCERIES_CONFIG || {};
const cloudReady = CONFIG.supabaseUrl && CONFIG.supabaseKey &&
  !CONFIG.supabaseUrl.includes("PASTE_") && !CONFIG.supabaseKey.includes("PASTE_");
const SECTION_ORDER = [...DATA.sections];
const KEY = "ourGroceriesV2Demo";
const FONT_KEY = "groceriesFontScale";
const ACTIVE_HOUSEHOLD_KEY = "groceriesActiveHousehold";
const STORE_OPEN_KEY_PREFIX = "groceriesStoreOpen:";
const BAD_CATALOG_NAMES = new Set(["air freshener candles matches lighters batteries aa batteries aaa batteries light bulbs filters water filters","almond milk beverage oat milk beverage soy beverage non alcoholic beer drink mix powdered drink mix","apples bananas avocados oranges mandarins clementines grapefruit lemons limes grapes strawberries blueberries","applesauce cups pudding cups yogurt tubes snack packs","artichokes okra jicama rutabaga horseradish fresh turmeric fresh herbs salad kit coleslaw mix guacamole","banana bread zucchini bread cornbread biscuits","bandages band aids gauze first aid tape pain reliever acetaminophen ibuprofen aspirin allergy medicine cold medicine","bell peppers red peppers green peppers yellow peppers orange peppers jalapenos hot peppers poblano peppers","body lotion sunscreen sunblock lip balm toothpaste toothbrush toothbrushes dental floss floss picks mouthwash","bok choy swiss chard collard greens broccoli broccolini cauliflower brussels sprouts asparagus green beans","bouillon cubes pasta sauce tomato sauce pizza sauce pesto salsa taco sauce taco seasoning chili powder cumin","bread white bread whole wheat bread whole grain bread multigrain bread rye bread sourdough bread french bread","broth canned broth tuna canned tuna salmon canned salmon sardines anchovies oysters canned oysters crab canned crab","brown rice basmati rice jasmine rice wild rice quinoa couscous barley bulgur farro lentils red lentils green lentils","butter lettuce spring mix mixed greens spinach baby spinach kale arugula cabbage red cabbage napa cabbage","cake mix brownie mix muffin mix cookie mix instant pudding jello gelatin mix tortillas taco shells tostadas","canned beans black beans kidney beans white beans navy beans cannellini beans baked beans refried beans chickpeas","canned green beans canned carrots canned mushrooms canned beets canned pumpkin canned potatoes canned mixed vegetables","canned pineapple canned fruit fruit cocktail applesauce pickles dill pickles bread and butter pickles relish olives","canned tomatoes diced tomatoes crushed tomatoes whole tomatoes tomato paste tomato sauce canned corn canned peas","cantaloupe honeydew pomegranate papaya coconut figs dates apricots rhubarb romaine lettuce iceberg lettuce","cashew milk cream heavy cream whipping cream half and half coffee cream table cream sour cream creme fraiche","chicken chicken breasts chicken thighs chicken drumsticks chicken wings whole chicken ground chicken chicken cutlets","chicken tenders turkey whole turkey turkey breast ground turkey turkey burgers beef ground beef lean ground beef","chips potato chips tortilla chips corn chips nacho chips pretzels crackers saltines ritz crackers wheat crackers","chocolate spread ketchup mustard dijon mustard yellow mustard mayonnaise mayo miracle whip relish hot sauce","coconut milk canned coconut milk evaporated milk condensed milk sweetened condensed milk canned peaches canned pears","coconut oil sesame oil vinegar white vinegar apple cider vinegar balsamic vinegar red wine vinegar rice vinegar","coffee cake pound cake cupcakes cake cookies bakery cookies pie apple pie pumpkin pie tarts brownies","coffee filters vacuum bags mop refills swiffer refills broom dustpan rubber gloves cleaning gloves garbage bin liners","coffee ground coffee coffee beans instant coffee decaf coffee espresso tea black tea green tea herbal tea chai tea","coke pepsi ginger ale root beer lemon lime soda iced tea lemonade orange juice apple juice cranberry juice","comb hairbrush brush hair ties elastics bobby pins nail polish nail polish remover nail clippers hand sanitizer","cookies chocolate chip cookies oatmeal cookies oreos sandwich cookies wafers graham crackers digestive cookies","corn tortillas wraps flatbread pizza crust pizza dough garlic bread breadsticks croutons breadcrumbs","cottage cheese blue cheese monterey jack cheese pepper jack cheese cheese strings cheese slices shredded cheese","cough drops cough syrup antacid vitamins contact solution","dark chocolate chips white chocolate chips cocoa powder coconut shredded coconut raisins dried cranberries","deli turkey turkey slices smoked turkey deli chicken chicken slices ham black forest ham honey ham prosciutto","deodorant antiperspirant razors razor blades shaving cream shaving gel aftershave cotton swabs q tips cotton balls","dish soap dishwasher tablets dishwasher pods dishwasher detergent rinse aid sponges scrubbers steel wool","dried apricots dried fruit dates prunes nuts almonds walnuts pecans cashews peanuts pistachios sunflower seeds","dried beans chickpeas dried chickpeas black beans dried black beans kidney beans dried kidney beans split peas","eggs large eggs extra large eggs brown eggs free range eggs egg whites butter salted butter unsalted butter","energy bars fruit bars fruit snacks gummies gummy bears candy chocolate chocolate bars dark chocolate milk chocolate","extra lean ground beef steak sirloin steak striploin steak ribeye steak tenderloin steak flank steak skirt steak","french fries frozen fries sweet potato fries tater tots hash browns potato wedges onion rings frozen appetizers","frozen bacon frozen seafood frozen salmon frozen vegetables steamers","frozen bagels frozen muffins frozen croissants frozen waffles frozen breakfast sandwiches frozen sausage","frozen berries frozen strawberries frozen blueberries frozen raspberries frozen mixed berries frozen fruit frozen mango","frozen burgers frozen chicken burgers chicken nuggets chicken strips chicken fingers frozen chicken wings","frozen cauliflower frozen spinach frozen green beans frozen mixed vegetables frozen stir fry vegetables edamame","frozen fish fish sticks frozen shrimp ice cream vanilla ice cream chocolate ice cream strawberry ice cream gelato","frozen peaches frozen pineapple frozen cherries frozen vegetables frozen peas frozen corn frozen broccoli","frozen pizza pizza pockets frozen burritos frozen dinners frozen meals frozen lasagna frozen pasta frozen mac and cheese","garlic ginger potatoes russet potatoes red potatoes yellow potatoes yukon gold potatoes sweet potatoes yams","gatorade energy drinks red bull coffee drinks iced coffee cold brew tea drinks kombucha milk drinks chocolate milk","glass cleaner window cleaner floor cleaner wood cleaner oven cleaner stainless steel cleaner laundry detergent","gluten free bread bagels plain bagels everything bagels sesame bagels cinnamon raisin bagels english muffins","grapefruit juice pineapple juice tomato juice vegetable juice grape juice juice boxes coconut water sports drinks","gravy gravy mix broth chicken broth beef broth vegetable broth stock chicken stock beef stock vegetable stock","green olives black olives kalamata olives capers artichoke hearts roasted red peppers jalapenos jarred jalapenos","hamburger buns hot dog buns brioche buns sandwich buns sub buns pita pita bread naan tortillas flour tortillas","honey molasses agave salt sea salt kosher salt pepper black pepper olive oil vegetable oil canola oil avocado oil","hot chocolate cocoa cereal oatmeal oats rolled oats quick oats granola muesli flour all purpose flour bread flour","italian bread ciabatta baguette focaccia pumpernickel bread challah brioche raisin bread cinnamon raisin bread","kitchen cleaner all purpose cleaner disinfectant cleaner disinfecting wipes bleach bathroom cleaner toilet cleaner","laundry pods fabric softener dryer sheets stain remover oxygen bleach hand soap liquid hand soap bar soap","leg of lamb ground lamb salmon salmon fillets trout cod haddock halibut tilapia sole tuna steaks swordfish","lentils canned lentils canned soup tomato soup chicken noodle soup mushroom soup cream of mushroom soup vegetable soup","mac and cheese prepared meals ready meals olives antipasto pickles deli pickles feta olives marinated vegetables","macaroni salad pasta salad coleslaw caesar salad greek salad garden salad tabbouleh hummus tzatziki babaganoush","margarine cheddar cheese old cheddar mild cheddar marble cheese mozzarella cheese parmesan cheese parmigiano reggiano","milk skim milk 1% milk 2% milk whole milk chocolate milk lactose free milk oat milk almond milk soy milk coconut milk","mozzarella sticks spring rolls egg rolls samosas perogies pierogies dumplings potstickers frozen meatballs","muffins blueberry muffins bran muffins chocolate chip muffins corn muffins croissants rolls dinner rolls buns","mushrooms white mushrooms cremini mushrooms portobello mushrooms cilantro parsley basil mint dill rosemary","oregano dried oregano basil dried basil thyme rosemary parsley bay leaves chili flakes red pepper flakes","oyster sauce hoisin sauce tahini salad dressing ranch dressing caesar dressing italian dressing balsamic dressing","panko breadcrumbs hamburger rolls hot dog rolls kaiser rolls pretzel buns donuts doughnuts danishes scones","paper towels toilet paper tissues facial tissue napkins paper plates paper bowls plastic cups disposable cups","paprika smoked paprika garlic powder onion powder cinnamon nutmeg cloves ginger powder curry powder turmeric","pasta sauce marinara sauce alfredo sauce pesto salsa queso sauerkraut kimchi gravy jarred gravy","pasta spaghetti linguine fettuccine penne rigatoni macaroni lasagna noodles egg noodles ramen noodles rice white rice","peanut butter natural peanut butter almond butter cashew butter jam strawberry jam raspberry jam marmalade nutella","plastic cutlery aluminum foil tin foil parchment paper wax paper plastic wrap cling wrap freezer bags sandwich bags","popcorn kernels microwave popcorn nutritional yeast protein pasta noodles","pork pork chops pork tenderloin pork loin pork roast ground pork pork ribs back ribs side ribs bacon breakfast sausage","prepared sandwiches wraps sushi pizza prepared pizza soup prepared soup quiche meat pie lasagna prepared lasagna","pumpkin seeds chia seeds flax seeds sesame seeds crackers breadcrumbs panko stuffing mix pancake mix waffle mix","raspberries blackberries cranberries cherries peaches nectarines plums pears mangoes pineapple kiwi watermelon","refrigerated dough crescent rolls refrigerated cookie dough","rice crackers rice cakes popcorn microwave popcorn cheese puffs cheesies granola bars cereal bars protein bars","roma tomatoes beefsteak tomatoes onions yellow onions red onions white onions green onions scallions shallots","salami genoa salami pepperoni mortadella roast beef pastrami corned beef bologna deli cheese sliced cheese","salsa fresh salsa pico de gallo guacamole rotisserie chicken fried chicken chicken wings chicken tenders","sausages italian sausage mild italian sausage hot italian sausage bratwurst kielbasa chorizo lamb lamb chops","sea bass shrimp prawns scallops mussels clams oysters crab lobster calamari squid smoked salmon fish fillets","shampoo conditioner body wash soap bar soap hand soap face wash facial cleanser moisturizer face moisturizer","shortbread brownies mini muffins snack cakes donuts trail mix nuts mixed nuts peanuts almonds cashews pistachios","snap peas snow peas peas corn corn on the cob carrots baby carrots celery cucumber english cucumber zucchini","sorbet frozen yogurt popsicles ice pops ice cream sandwiches frozen pie frozen cake frozen bread frozen garlic bread","sriracha barbecue sauce bbq sauce steak sauce worcestershire sauce soy sauce tamari teriyaki sauce fish sauce","stewing beef beef roast pot roast roast beef brisket short ribs beef ribs hamburger patties burgers veal veal chops","sunflower seeds pumpkin seeds dried fruit raisins dried cranberries beef jerky jerky pepperettes cheese snacks","swiss cheese havarti cheese gouda cheese brie cheese camembert feta cheese goat cheese cream cheese ricotta cheese","swiss cheese slices cheddar slices provolone slices havarti slices mozzarella slices prepared salad potato salad","thyme sage chives oregano bean sprouts alfalfa sprouts radishes beets turnips parsnips leeks fennel eggplant","tissues tampons pads sanitary pads panty liners hair gel hair spray hairspray mousse hair dye dry shampoo","toothpicks skewers straws foil pans disposable pans","vanilla vanilla extract baking powder baking soda yeast cornstarch corn starch gelatin chocolate chips","waffles frozen waffles belgian waffles toaster waffles pancakes frozen pancakes french toast frozen french toast","water bottled water spring water distilled water sparkling water soda water club soda tonic water pop soda cola","white fish seafood mix anchovies fresh fish","whole wheat flour almond flour cornmeal sugar white sugar brown sugar icing sugar powdered sugar maple syrup syrup","yellow squash butternut squash acorn squash spaghetti squash pumpkin tomatoes cherry tomatoes grape tomatoes","yogurt greek yogurt plain yogurt vanilla yogurt fruit yogurt skyr kefir pudding whipped cream buttermilk","zipper bags storage bags garbage bags trash bags compost bags recycling bags food containers storage containers"]);
function validCatalogName(name){return !BAD_CATALOG_NAMES.has(String(name||"").trim().toLowerCase())}
function normalizeSuggestionName(name){
  const s=String(name||"").trim().replace(/\s+/g," ");
  if(/^coke\s+0$/i.test(s)) return "Coke Zero";
  return s;
}
function validSuggestionName(name){
  const s=String(name||"").trim().replace(/\s+/g," ");
  if(/^coke\s+0$/i.test(s)) return false;
  return validCatalogName(s);
}


let sb=null, household=null, user=null, items=[], customCatalog=[], recent=[], storeLists=[], channel=null;
let activeSuggestion=-1, demo=!cloudReady;
let sortables=[];
let editingId=null;
let sectionSortable=null;
let boughtOpen=false;
let storeListSortable=null;
let storeOpen=new Set();
let suppressRealtime=false;

const $=id=>document.getElementById(id);
const itemInput=$("itemInput"), suggestions=$("suggestions"), list=$("list"), quick=$("quick");
const count=$("count"), statusText=$("statusText"), statusDot=$("statusDot"), setupNotice=$("setupNotice");
const fontSizeBtn=$("fontSizeBtn");
const fontSizeMenu=$("fontSizeMenu");

const STAR_SVG=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.164.75a.53.53 0 0 1 .294.904l-3.737 3.643a2.12 2.12 0 0 0-.609 1.875l.882 5.143a.53.53 0 0 1-.769.559l-4.618-2.428a2.12 2.12 0 0 0-1.974 0l-4.618 2.428a.53.53 0 0 1-.77-.56l.883-5.142a2.12 2.12 0 0 0-.61-1.875L2.162 9.788a.53.53 0 0 1 .294-.906l5.165-.75a2.12 2.12 0 0 0 1.594-1.158z"/></svg>`;
const CHEVRON_SVG=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`;
const TRASH_SVG=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><path d="M19 6l-1 14c-.1 1-1 2-2 2H8c-1 0-1.9-1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`;
const PENCIL_SVG=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`;
const GRIP_SVG=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>`;
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
  customCatalog.filter(x=>validSuggestionName(x.name)).forEach(x=>m.set(x.name.toLowerCase(),{name:x.name,section:x.section,custom:true}));
  return [...m.values()];
}
function nextSortOrder(section){
  const vals=items.filter(x=>!x.bought && !x.store_list_id && x.section===section).map(x=>Number(x.sort_order)||0);
  return (vals.length?Math.max(...vals):0)+1000;
}
function nextStoreItemOrder(storeListId){
  const vals=items
    .filter(x=>!x.bought && String(x.store_list_id||"")===String(storeListId))
    .map(x=>Number(x.sort_order)||0);
  return (vals.length?Math.max(...vals):0)+1000;
}
function nextStoreListOrder(){
  const vals=storeLists.map(x=>Number(x.sort_order)||0);
  return (vals.length?Math.max(...vals):0)+1000;
}
function storeListOrder(a,b){
  const ao=Number(a.sort_order)||0,bo=Number(b.sort_order)||0;
  if(ao!==bo)return ao-bo;
  return new Date(a.created_at||0)-new Date(b.created_at||0);
}
function storeOpenKey(){
  return STORE_OPEN_KEY_PREFIX+(household?.id||"demo");
}
function loadStoreOpenState(){
  storeOpen=new Set();
  try{
    const saved=JSON.parse(localStorage.getItem(storeOpenKey())||"[]");
    if(Array.isArray(saved))saved.forEach(id=>storeOpen.add(String(id)));
  }catch(e){}
}
function saveStoreOpenState(){
  localStorage.setItem(storeOpenKey(),JSON.stringify([...storeOpen]));
}
function toggleStoreOpen(id){
  id=String(id);
  if(storeOpen.has(id))storeOpen.delete(id);else storeOpen.add(id);
  saveStoreOpenState();
  render();
}
function itemOrder(a,b){
  const ao=Number(a.sort_order)||0, bo=Number(b.sort_order)||0;
  if(ao!==bo) return ao-bo;
  return new Date(a.created_at||0)-new Date(b.created_at||0);
}

function applyFontScale(value){
  const legacy={"0.92":"1.00","0.98":"1.00","1":"1.10","1.08":"1.10","1.12":"1.20","1.18":"1.20","1.30":"1.34","1.44":"1.50"};
  const v=legacy[String(value)]||String(value||"1.10");
  document.documentElement.style.setProperty("--font-scale",v);
  localStorage.setItem(FONT_KEY,v);
  document.querySelectorAll(".fontChoice").forEach(b=>b.classList.toggle("active",b.dataset.scale===v));
}
applyFontScale(localStorage.getItem(FONT_KEY)||"1.10");

function closeFontMenu(){
  if(fontSizeMenu) fontSizeMenu.classList.remove("open");
  if(fontSizeBtn) fontSizeBtn.setAttribute("aria-expanded","false");
}
if(fontSizeBtn) fontSizeBtn.onclick=(e)=>{
  e.stopPropagation();
  const open=fontSizeMenu.classList.toggle("open");
  fontSizeBtn.setAttribute("aria-expanded",open?"true":"false");
};
document.querySelectorAll(".fontChoice").forEach(b=>b.onclick=()=>{
  applyFontScale(b.dataset.scale);
  closeFontMenu();
});
document.addEventListener("click",e=>{
  if(fontSizeMenu && !fontSizeMenu.contains(e.target) && e.target!==fontSizeBtn && !fontSizeBtn?.contains(e.target)) closeFontMenu();
});

function demoLoad(){
  const x=localStorage.getItem(KEY);
  if(x){try{return JSON.parse(x)}catch(e){}}
  return {
    items:[
      ["Bananas","Produce"],["Avocados","Produce"],["Bagels","Bakery"],
      ["Chicken breasts","Meat & Seafood"],["Milk","Dairy & Eggs"],["Eggs","Dairy & Eggs"],
      ["Coffee","Pantry"],["Paper towels","Household & Cleaning"]
    ].map((x,i)=>({id:Date.now()+i,name:x[0],section:x[1],bought:false,starred:false,sort_order:(i+1)*1000,created_at:new Date().toISOString()})),
    catalog:[],recent:["Milk","Bananas","Eggs","Coffee","Paper towels"],storeLists:[]
  };
}
function demoSave(){localStorage.setItem(KEY,JSON.stringify({items,catalog:customCatalog,recent,storeLists,sectionOrder:[...SECTION_ORDER]}))}

function applySectionOrder(order){
  if(!Array.isArray(order)||!order.length)return;
  const known=new Set(DATA.sections);
  const cleaned=order.filter((x,i,a)=>known.has(x)&&a.indexOf(x)===i);
  DATA.sections.forEach(x=>{if(!cleaned.includes(x))cleaned.push(x)});
  SECTION_ORDER.splice(0,SECTION_ORDER.length,...cleaned);
}
async function saveSectionOrder(order){
  applySectionOrder(order);
  if(demo){demoSave();return}
  const {error}=await sb.rpc("set_household_section_order",{p_household_id:household.id,p_section_order:[...SECTION_ORDER]});
  if(error)flash(error.message);
}

async function init(){
  const familyBtn=$("familyBtn");
  familyBtn.disabled=true;

  if(!cloudReady){
    const d=demoLoad();
    items=d.items||[];customCatalog=d.catalog||[];recent=d.recent||[];storeLists=d.storeLists||[];
    applySectionOrder(d.sectionOrder);
    loadStoreOpenState();
    demo=true;
    statusText.textContent="Demo";
    statusDot.classList.remove("online");
    setupNotice.innerHTML=`<div class="setupNotice"><strong>Demo mode.</strong> Supabase has not been connected. This list is saved only on this device.</div>`;
    familyBtn.disabled=false;
    render();
    return;
  }

  demo=false;
  statusText.textContent="Connecting…";
  statusDot.classList.remove("online");

  try{
    sb=window.supabase.createClient(CONFIG.supabaseUrl,CONFIG.supabaseKey);

    const {data:{session}}=await sb.auth.getSession();
    if(!session){
      const {data,error}=await sb.auth.signInAnonymously();
      if(error) throw error;
      user=data.user;
    }else{
      user=session.user;
    }

    const {data:memberships,error:merr}=await sb.from("memberships")
      .select("household_id,joined_at")
      .order("joined_at",{ascending:true});
    if(merr) throw merr;

    if(!memberships || !memberships.length){
      household=null;
      statusText.textContent="Set up";
      setupNotice.innerHTML="";
      familyBtn.disabled=false;
      showOnboarding();
      return;
    }

    const saved=localStorage.getItem(ACTIVE_HOUSEHOLD_KEY);
    const savedMembership=saved&&memberships.find(m=>String(m.household_id)===String(saved));

    if(savedMembership){
      await enterHousehold(savedMembership.household_id);
      return;
    }

    if(memberships.length===1){
      await enterHousehold(memberships[0].household_id);
      return;
    }

    // Never guess when this browser identity belongs to more than one household.
    statusText.textContent="Choose list";
    familyBtn.disabled=false;
    await showHouseholdChooser(memberships,false);

  }catch(e){
    // A configured cloud app must never silently become a fake/demo list.
    demo=false;
    household=null;
    items=[];customCatalog=[];recent=[];
    statusText.textContent="Offline";
    statusDot.classList.remove("online");
    setupNotice.innerHTML=`<div class="setupNotice"><strong>Cloud connection problem.</strong> ${esc(e.message||e)} <button class="retryCloud" id="retryCloud">Retry</button></div>`;
    familyBtn.disabled=true;
    render();
    const retry=$("retryCloud");
    if(retry)retry.onclick=()=>{
      setupNotice.innerHTML="";
      init();
    };
  }
}

async function enterHousehold(id){
  demo=false;
  statusText.textContent="Connecting…";
  statusDot.classList.remove("online");

  const {data:h,error:he}=await sb.from("households")
    .select("id,name,invite_code,section_order")
    .eq("id",id)
    .single();
  if(he) throw he;

  household=h;
  localStorage.setItem(ACTIVE_HOUSEHOLD_KEY,String(h.id));
  applySectionOrder(h.section_order);
  loadStoreOpenState();

  await reloadCloud();

  statusText.textContent="Shared";
  statusDot.classList.add("online");
  setupNotice.innerHTML="";
  $("familyBtn").disabled=false;

  subscribe();
  render();
}
async function reloadCloud(){
  if(demo)return;
  const [{data:i,error:ie},{data:c,error:ce},{data:s,error:se}]=await Promise.all([
    sb.from("grocery_items").select("*").eq("household_id",household.id).order("sort_order",{ascending:true}).order("created_at",{ascending:true}),
    sb.from("household_catalog").select("name,section,usage_count,last_used_at").eq("household_id",household.id).order("last_used_at",{ascending:false}).limit(150),
    sb.from("store_lists").select("*").eq("household_id",household.id).order("sort_order",{ascending:true}).order("created_at",{ascending:true})
  ]);
  if(ie)throw ie;if(ce)throw ce;if(se)throw se;
  items=i||[];
  customCatalog=(c||[]).filter(x=>validSuggestionName(x.name)).map(x=>({...x,name:normalizeSuggestionName(x.name)}));
  recent=customCatalog.map(x=>x.name);
  storeLists=(s||[]).sort(storeListOrder);
}
function subscribe(){
  if(channel) sb.removeChannel(channel);
  channel=sb.channel("groceries-"+household.id)
    .on("postgres_changes",{event:"*",schema:"public",table:"grocery_items",filter:`household_id=eq.${household.id}`},
      async()=>{if(suppressRealtime)return;await reloadCloud();render()})
    .on("postgres_changes",{event:"*",schema:"public",table:"store_lists",filter:`household_id=eq.${household.id}`},
      async()=>{if(suppressRealtime)return;await reloadCloud();render()})
    .on("postgres_changes",{event:"UPDATE",schema:"public",table:"households",filter:`id=eq.${household.id}`},
      payload=>{if(payload.new&&payload.new.section_order){household.section_order=payload.new.section_order;applySectionOrder(payload.new.section_order);render()}})
    .subscribe();
}

function showOnboarding(){
  $("modalRoot").innerHTML=`<div class="overlay"><div class="sheet">
    <h2>Connect this device</h2>
    <p>If your family already uses Groceries, enter the family code from one of the devices that has the correct shared list.</p>

    <input id="joinCode" placeholder="8-character family code" autocapitalize="characters" autocomplete="off">
    <button class="primary" id="joinFamily">Join existing family list</button>

    <div class="divider">OR</div>

    <button class="secondary" id="showCreateFamily">Create a new family list</button>
    <div id="createFamilyArea" style="display:none">
      <p class="small" style="margin-top:14px"><strong>Only create a new list if your household does not already have one.</strong></p>
      <input id="familyName" placeholder="Family list name" value="Groceries">
      <button class="secondary" id="createFamily">Create new list</button>
    </div>

    <div class="error" id="onboardError"></div>
    <p class="small">No email address or password is required. This browser receives its own anonymous identity and remembers which family list you choose.</p>
  </div></div>`;

  $("joinFamily").onclick=joinFamily;
  $("showCreateFamily").onclick=()=>{
    $("createFamilyArea").style.display="block";
    $("showCreateFamily").style.display="none";
    $("createFamily").onclick=createFamily;
  };
}

async function createFamily(){
  try{
    const err=$("onboardError");if(err)err.textContent="";
    const name=($("familyName")?.value||"").trim()||"Groceries";
    const {data,error}=await sb.rpc("create_household",{p_name:name});
    if(error)throw error;
    const rec=Array.isArray(data)?data[0]:data;
    await enterHousehold(rec.household_id);
    showFamilyCode(true);
  }catch(e){
    const err=$("onboardError");if(err)err.textContent=e.message||e;
  }
}

async function joinFamily(){
  try{
    const err=$("onboardError");if(err)err.textContent="";
    const code=($("joinCode")?.value||"").trim().toUpperCase();
    if(!code)throw new Error("Enter your family code.");

    const {data,error}=await sb.rpc("join_household",{p_invite_code:code});
    if(error)throw error;

    await enterHousehold(data);
    closeModal();
  }catch(e){
    const err=$("onboardError");if(err)err.textContent=e.message||e;
  }
}

function closeModal(){$("modalRoot").innerHTML=""}

async function getHouseholdOptions(memberships){
  const ids=[...new Set((memberships||[]).map(m=>m.household_id).filter(Boolean))];
  if(!ids.length)return[];

  const [{data:houses,error:he},{data:rows,error:ie}]=await Promise.all([
    sb.from("households").select("id,name,invite_code").in("id",ids),
    sb.from("grocery_items").select("household_id,bought").in("household_id",ids)
  ]);
  if(he)throw he;
  if(ie)throw ie;

  const counts={};
  (rows||[]).forEach(r=>{
    if(!r.bought)counts[r.household_id]=(counts[r.household_id]||0)+1;
  });

  const joined={};
  (memberships||[]).forEach(m=>joined[m.household_id]=m.joined_at||"");

  return (houses||[]).map(h=>({
    ...h,
    activeCount:counts[h.id]||0,
    joined_at:joined[h.id]||""
  })).sort((a,b)=>String(a.joined_at).localeCompare(String(b.joined_at)));
}

async function showHouseholdChooser(memberships,allowCancel=true){
  try{
    const options=await getHouseholdOptions(memberships);

    $("modalRoot").innerHTML=`<div class="overlay"><div class="sheet">
      <h2>Choose your family list</h2>
      <p>This device is connected to more than one Groceries list. Choose the one you want to use.</p>

      <div class="householdChoices">
        ${options.map(h=>`<button class="householdChoice" data-household="${attr(h.id)}">
          <span class="householdChoiceName">${esc(h.name||"Groceries")}</span>
          <span class="householdChoiceMeta">${h.activeCount} active ${h.activeCount===1?"item":"items"} · code ${esc(h.invite_code)}</span>
        </button>`).join("")}
      </div>

      <button class="secondary" id="joinAnotherFamily">Join another family list</button>
      ${allowCancel?`<button class="secondary" id="cancelHouseholdChoice">Cancel</button>`:""}
      <div class="error" id="onboardError"></div>
    </div></div>`;

    document.querySelectorAll(".householdChoice").forEach(b=>b.onclick=async()=>{
      try{
        await enterHousehold(b.dataset.household);
        closeModal();
      }catch(e){
        const err=$("onboardError");if(err)err.textContent=e.message||e;
      }
    });

    $("joinAnotherFamily").onclick=showJoinFamily;
    if(allowCancel&&$("cancelHouseholdChoice"))$("cancelHouseholdChoice").onclick=closeModal;

  }catch(e){
    $("modalRoot").innerHTML=`<div class="overlay"><div class="sheet">
      <h2>Could not load family lists</h2>
      <p class="error">${esc(e.message||e)}</p>
      ${allowCancel?`<button class="secondary" id="cancelHouseholdChoice">Close</button>`:""}
    </div></div>`;
    if(allowCancel&&$("cancelHouseholdChoice"))$("cancelHouseholdChoice").onclick=closeModal;
  }
}

function showJoinFamily(){
  $("modalRoot").innerHTML=`<div class="overlay"><div class="sheet">
    <h2>Join another family list</h2>
    <p>Enter the family code shown on a device that has the list you want.</p>
    <input id="joinCode" placeholder="8-character family code" autocapitalize="characters" autocomplete="off">
    <button class="primary" id="joinFamily">Join and use this list</button>
    <button class="secondary" id="cancelJoinFamily">Cancel</button>
    <div class="error" id="onboardError"></div>
  </div></div>`;
  $("joinFamily").onclick=joinFamily;
  $("cancelJoinFamily").onclick=closeModal;
}

async function showManageHouseholds(){
  try{
    const {data:memberships,error}=await sb.from("memberships")
      .select("household_id,joined_at")
      .order("joined_at",{ascending:true});
    if(error)throw error;

    if((memberships||[]).length<=1){
      showJoinFamily();
      return;
    }

    await showHouseholdChooser(memberships,true);
  }catch(e){
    flash(e.message||e);
  }
}

function showFamilyCode(first=false){
  if(demo){
    $("modalRoot").innerHTML=`<div class="overlay"><div class="sheet">
      <h2>Demo mode</h2>
      <p>Connect Supabase to enable a shared family code and live syncing.</p>
      <button class="secondary" id="closeDemo">Close</button>
    </div></div>`;
    $("closeDemo").onclick=closeModal;
    return;
  }

  if(!household){
    showOnboarding();
    return;
  }

  $("modalRoot").innerHTML=`<div class="overlay"><div class="sheet">
    <h2>${first?"Your family list is ready":"Family list"}</h2>
    <p>This device is currently using:</p>
    <div class="currentFamilyName">${esc(household.name||"Groceries")}</div>
    <div class="code">${esc(household.invite_code)}</div>
    <button class="primary" id="copyCode">Copy family code</button>
    <button class="secondary" id="manageFamilies">Choose / join another family list</button>
    <button class="secondary" id="closeFamily">Close</button>
    <p class="small">Anyone with this code can join this grocery list.</p>
  </div></div>`;

  $("copyCode").onclick=async()=>{
    await navigator.clipboard.writeText(household.invite_code);
    $("copyCode").textContent="Copied";
  };
  $("manageFamilies").onclick=showManageHouseholds;
  $("closeFamily").onclick=closeModal;
}

function showStoreListEditor(id=null){
  const existing=id?storeLists.find(x=>String(x.id)===String(id)):null;
  $("modalRoot").innerHTML=`<div class="overlay"><div class="sheet">
    <h2>${existing?"Rename store list":"New store list"}</h2>
    <p>${existing?"Change the name of this list.":"Create a list for a store or shopping destination."}</p>
    <input id="storeListName" value="${attr(existing?.name||"")}" placeholder="e.g. Costco" autocomplete="off">
    <button class="primary" id="saveStoreList">${existing?"Save name":"Create list"}</button>
    <button class="secondary" id="cancelStoreList">Cancel</button>
    <div class="error" id="storeListError"></div>
  </div></div>`;
  const input=$("storeListName");
  requestAnimationFrame(()=>{input.focus();input.select()});
  $("saveStoreList").onclick=()=>saveStoreList(existing?.id||null);
  $("cancelStoreList").onclick=closeModal;
  input.onkeydown=e=>{
    if(e.key==="Enter"){e.preventDefault();saveStoreList(existing?.id||null)}
    if(e.key==="Escape"){e.preventDefault();closeModal()}
  };
}

async function saveStoreList(id=null){
  const input=$("storeListName");
  const name=String(input?.value||"").trim().replace(/\s+/g," ");
  const err=$("storeListError");
  if(err)err.textContent="";
  if(!name){if(err)err.textContent="Enter a list name.";input?.focus();return}

  if(demo){
    if(id){
      const x=storeLists.find(s=>String(s.id)===String(id));if(x)x.name=name;
    }else{
      const newId=String(Date.now()+Math.random());
      storeLists.push({id:newId,household_id:"demo",name,sort_order:nextStoreListOrder(),created_at:new Date().toISOString()});
      storeOpen.add(newId);saveStoreOpenState();
    }
    storeLists.sort(storeListOrder);demoSave();closeModal();render();return;
  }

  try{
    suppressRealtime=true;
    if(id){
      const {error}=await sb.from("store_lists").update({name}).eq("id",id).eq("household_id",household.id);
      if(error)throw error;
    }else{
      const sort_order=nextStoreListOrder();
      const {data,error}=await sb.from("store_lists").insert({
        household_id:household.id,name,sort_order,created_by:user.id
      }).select("*").single();
      if(error)throw error;
      if(data){storeOpen.add(String(data.id));saveStoreOpenState()}
    }
    suppressRealtime=false;
    await reloadCloud();
    closeModal();
    render();
  }catch(e){
    suppressRealtime=false;
    if(err)err.textContent=e.message||e;
  }
}

function confirmDeleteStoreList(id){
  const x=storeLists.find(s=>String(s.id)===String(id));if(!x)return;
  const itemCount=items.filter(i=>!i.bought&&String(i.store_list_id||"")===String(id)).length;
  $("modalRoot").innerHTML=`<div class="overlay"><div class="sheet">
    <h2>Delete ${esc(x.name)}?</h2>
    <p>${itemCount?`${itemCount} active ${itemCount===1?"item":"items"} will return to the main grocery list in their remembered sections.`:"This list is empty."} No grocery items will be deleted.</p>
    <button class="dangerPrimary" id="deleteStoreListConfirm">Delete list</button>
    <button class="secondary" id="cancelDeleteStoreList">Cancel</button>
    <div class="error" id="storeListError"></div>
  </div></div>`;
  $("deleteStoreListConfirm").onclick=()=>deleteStoreList(id);
  $("cancelDeleteStoreList").onclick=closeModal;
}

async function deleteStoreList(id){
  const err=$("storeListError");if(err)err.textContent="";
  const oldLists=[...storeLists];
  const oldItems=items.map(x=>({...x}));

  if(demo){
    storeLists=storeLists.filter(s=>String(s.id)!==String(id));
    items.forEach(x=>{if(String(x.store_list_id||"")===String(id))x.store_list_id=null});
    storeOpen.delete(String(id));saveStoreOpenState();
    demoSave();closeModal();render();return;
  }

  try{
    suppressRealtime=true;
    const {error}=await sb.from("store_lists").delete().eq("id",id).eq("household_id",household.id);
    if(error)throw error;
    suppressRealtime=false;
    storeOpen.delete(String(id));saveStoreOpenState();
    await reloadCloud();
    closeModal();
    render();
  }catch(e){
    suppressRealtime=false;
    storeLists=oldLists;items=oldItems;
    if(err)err.textContent=e.message||e;
  }
}

async function persistStoreListOrder(){
  const host=$("storeListsHost");if(!host)return;
  const ids=[...host.querySelectorAll(".storeList[data-store-list-id]")].map(el=>el.dataset.storeListId);
  if(!ids.length)return;

  ids.forEach((id,index)=>{
    const x=storeLists.find(s=>String(s.id)===String(id));
    if(x)x.sort_order=(index+1)*1000;
  });
  storeLists.sort(storeListOrder);

  if(demo){demoSave();render();return}

  try{
    suppressRealtime=true;
    for(const id of ids){
      const x=storeLists.find(s=>String(s.id)===String(id));if(!x)continue;
      const {error}=await sb.from("store_lists").update({sort_order:x.sort_order}).eq("id",x.id).eq("household_id",household.id);
      if(error)throw error;
    }
    suppressRealtime=false;
    await reloadCloud();
    render();
  }catch(e){
    suppressRealtime=false;
    await reloadCloud();
    render();
    flash(e.message||e);
  }
}

async function moveItemToMain(id){
  const x=items.find(i=>String(i.id)===String(id));if(!x)return;
  if(!x.store_list_id)return;
  const oldStore=x.store_list_id,oldOrder=x.sort_order;
  x.store_list_id=null;
  x.sort_order=nextSortOrder(x.section);
  render();

  if(demo){demoSave();return}

  try{
    suppressRealtime=true;
    const {error}=await sb.from("grocery_items").update({
      store_list_id:null,sort_order:x.sort_order
    }).eq("id",id);
    if(error)throw error;
    suppressRealtime=false;
    await reloadCloud();render();
  }catch(e){
    suppressRealtime=false;
    x.store_list_id=oldStore;x.sort_order=oldOrder;
    await reloadCloud();render();flash(e.message||e);
  }
}

async function addItem(raw,storeListId=null,sourceInput=null){
  const clean=norm(raw);if(!clean)return;
  const name=displayName(clean);
  const duplicate=items.find(x=>!x.bought&&x.name.toLowerCase()===name.toLowerCase());
  if(duplicate){
    if(sourceInput){
      const old=sourceInput.placeholder;
      sourceInput.value="";
      sourceInput.placeholder="Already on the list";
      setTimeout(()=>sourceInput.placeholder=old,1100);
      sourceInput.focus();
    }else{
      flash("Already on the list");
    }
    return;
  }

  const section=inferSection(clean);
  const destination=storeListId?String(storeListId):null;
  const sort_order=destination?nextStoreItemOrder(destination):nextSortOrder(section);

  if(demo){
    items.push({
      id:Date.now()+Math.random(),
      name,section,bought:false,starred:false,sort_order,
      store_list_id:destination,
      created_at:new Date().toISOString()
    });
    customTouchLocal(name,section);
    demoSave();
    render();
  }else{
    const {error}=await sb.from("grocery_items").insert({
      household_id:household.id,
      name,section,bought:false,starred:false,sort_order,
      store_list_id:destination,
      created_by:user.id
    });
    if(error){
      if(sourceInput){
        const old=sourceInput.placeholder;
        sourceInput.value="";
        sourceInput.placeholder=error.message;
        setTimeout(()=>sourceInput.placeholder=old,1600);
        sourceInput.focus();
      }else{
        flash(error.message);
      }
      return;
    }
    await sb.rpc("touch_catalog",{p_household_id:household.id,p_name:name,p_section:section});
    customTouchLocal(name,section);
  }

  if(sourceInput){
    sourceInput.value="";
    sourceInput.focus();
  }else{
    itemInput.value="";
    closeSuggestions();
    itemInput.focus();
  }
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

function editItem(id){
  editingId=String(id);
  render();
  requestAnimationFrame(()=>{
    const input=document.querySelector(`.inlineEditInput[data-id="${CSS.escape(String(id))}"]`);
    if(input){input.focus();input.select()}
  });
}
function cancelEdit(){
  editingId=null;
  render();
}
async function saveEdit(id){
  const x=items.find(i=>String(i.id)===String(id));if(!x)return;
  const input=document.querySelector(`.inlineEditInput[data-id="${CSS.escape(String(id))}"]`);
  if(!input)return;
  const name=String(input.value||"").trim().replace(/\s+/g," ");
  if(!name){input.focus();return}
  if(name===x.name){cancelEdit();return}

  const oldName=x.name;
  x.name=name;
  editingId=null;
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
  if(!x.store_list_id)x.sort_order=nextSortOrder(section);

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

async function persistItemContainer(container){
  if(!container)return;
  const ids=[...container.querySelectorAll(".row[data-id]")].map(el=>el.dataset.id);
  const storeId=container.dataset.storeListId||null;
  const section=container.dataset.section||null;

  if(demo){
    ids.forEach((id,index)=>{
      const x=items.find(i=>String(i.id)===String(id));if(!x)return;
      x.sort_order=(index+1)*1000;
      if(storeId){
        x.store_list_id=storeId;
      }else if(section){
        x.store_list_id=null;
        if(x.section!==section){
          x.section=section;
          let learned=customCatalog.find(z=>z.name.toLowerCase()===x.name.toLowerCase());
          if(learned)learned.section=section;
          else customCatalog.unshift({name:x.name,section,usage_count:1,last_used_at:new Date().toISOString()});
        }
      }
    });
    return;
  }

  for(let index=0;index<ids.length;index++){
    const id=ids[index];
    const x=items.find(i=>String(i.id)===String(id));if(!x)continue;
    const order=(index+1)*1000;

    if(storeId){
      x.store_list_id=storeId;
      x.sort_order=order;
      const {error}=await sb.from("grocery_items").update({
        store_list_id:storeId,sort_order:order
      }).eq("id",id);
      if(error)throw error;
      continue;
    }

    if(section){
      if(x.section!==section){
        const {error:learnError}=await sb.rpc("set_catalog_section",{
          p_household_id:household.id,p_name:x.name,p_section:section
        });
        if(learnError)throw learnError;
        x.section=section;
        let learned=customCatalog.find(z=>z.name.toLowerCase()===x.name.toLowerCase());
        if(learned)learned.section=section;
        else customCatalog.unshift({name:x.name,section,usage_count:1,last_used_at:new Date().toISOString()});
      }
      x.store_list_id=null;
      x.sort_order=order;
      const {error}=await sb.from("grocery_items").update({
        section:x.section,store_list_id:null,sort_order:order
      }).eq("id",id);
      if(error)throw error;
    }
  }
}

async function persistItemDrop(to,from){
  try{
    if(demo){
      await persistItemContainer(to);
      if(from&&from!==to)await persistItemContainer(from);
      demoSave();render();return;
    }

    suppressRealtime=true;
    await persistItemContainer(to);
    if(from&&from!==to)await persistItemContainer(from);
    suppressRealtime=false;
    await reloadCloud();
    render();
  }catch(e){
    suppressRealtime=false;
    if(!demo)await reloadCloud();
    render();
    flash(e.message||e);
  }
}
function clearDropIndicators(){
  document.querySelectorAll(".drop-before,.drop-after").forEach(el=>{
    el.classList.remove("drop-before","drop-after");
  });
}
function setupSortables(){
  sortables.forEach(s=>s.destroy());sortables=[];
  if(storeListSortable){storeListSortable.destroy();storeListSortable=null}
  if(typeof Sortable==="undefined")return;

  document.querySelectorAll(".itemDropZone").forEach(card=>{
    sortables.push(new Sortable(card,{
      group:"groceries-items",
      animation:150,
      delay:120,
      delayOnTouchOnly:true,
      touchStartThreshold:4,
      draggable:".row",
      filter:".check,.starBtn,.menuBtn,.actions,select,button,.storeListEmpty",
      preventOnFilter:false,
      ghostClass:"sortable-ghost",
      chosenClass:"sortable-chosen",
      emptyInsertThreshold:24,
      onMove:evt=>{
        clearDropIndicators();
        const target=evt.related;
        if(target&&target.classList&&target.classList.contains("row")){
          target.classList.add(evt.willInsertAfter?"drop-after":"drop-before");
        }
        return true;
      },
      onEnd:async evt=>{
        clearDropIndicators();
        await persistItemDrop(evt.to,evt.from);
      },
      onUnchoose:clearDropIndicators
    }));
  });

  if(sectionSortable)sectionSortable.destroy();
  const sectionHost=document.getElementById("activeSections");
  if(sectionHost){
    sectionSortable=new Sortable(sectionHost,{
      animation:150,
      draggable:".section",
      handle:".section-title",
      ghostClass:"section-ghost",
      chosenClass:"section-chosen",
      onMove:evt=>{
        document.querySelectorAll(".section-drop-before,.section-drop-after").forEach(el=>el.classList.remove("section-drop-before","section-drop-after"));
        const target=evt.related;
        if(target&&target.classList&&target.classList.contains("section"))target.classList.add(evt.willInsertAfter?"section-drop-after":"section-drop-before");
        return true;
      },
      onEnd:async()=>{
        document.querySelectorAll(".section-drop-before,.section-drop-after").forEach(el=>el.classList.remove("section-drop-before","section-drop-after"));
        const visible=[...sectionHost.querySelectorAll(".section[data-section]")].map(el=>el.dataset.section);
        const visibleSet=new Set(visible);
        let n=0;
        const merged=SECTION_ORDER.map(s=>visibleSet.has(s)?visible[n++]:s);
        await saveSectionOrder(merged);
        render();
      }
    });
  }

  const storeHost=$("storeListsHost");
  if(storeHost){
    storeListSortable=new Sortable(storeHost,{
      animation:150,
      draggable:".storeList",
      handle:".storeListGrip",
      ghostClass:"store-list-ghost",
      chosenClass:"store-list-chosen",
      onMove:evt=>{
        document.querySelectorAll(".store-list-drop-before,.store-list-drop-after").forEach(el=>el.classList.remove("store-list-drop-before","store-list-drop-after"));
        const target=evt.related;
        if(target&&target.classList&&target.classList.contains("storeList")){
          target.classList.add(evt.willInsertAfter?"store-list-drop-after":"store-list-drop-before");
        }
        return true;
      },
      onEnd:async()=>{
        document.querySelectorAll(".store-list-drop-before,.store-list-drop-after").forEach(el=>el.classList.remove("store-list-drop-before","store-list-drop-after"));
        await persistStoreListOrder();
      }
    });
  }
}

function render(){
  const active=items.filter(x=>!x.bought);
  const mainActive=active.filter(x=>!x.store_list_id);
  count.textContent=`${active.length} ${active.length===1?"item":"items"}`;
  if(demo){statusText.textContent="Demo";statusDot.classList.remove("online")}
  renderQuick();

  let html="";
  if(!mainActive.length){
    html=`<div class="empty mainEmpty"><div class="emptyIcon">${BASKET_SVG}</div>${active.length?"Your main list is empty.":"Your list is empty."}<br>${active.length?"Items in store lists are below.":"Add something above."}</div>`;
  }

  let activeSectionsHtml="";
  for(const section of SECTION_ORDER){
    const arr=mainActive.filter(x=>x.section===section).sort(itemOrder);
    if(!arr.length)continue;
    activeSectionsHtml+=`<section class="section" data-section="${attr(section)}">
      <div class="section-title" title="Drag to reorder sections"><span class="sectionGrip">${GRIP_SVG}</span><span class="sectionName">${esc(section)}</span><span class="sectionCount">${arr.length}</span></div>
      <div class="card itemDropZone" data-section="${attr(section)}">${arr.map(rowHtml).join("")}</div>
    </section>`;
  }
  if(activeSectionsHtml)html+=`<div id="activeSections">${activeSectionsHtml}</div>`;

  html+=renderStoreLists(active);

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
  document.querySelectorAll(".inlineEditSave").forEach(b=>b.onclick=()=>saveEdit(b.dataset.id));
  document.querySelectorAll(".inlineEditCancel").forEach(b=>b.onclick=cancelEdit);
  document.querySelectorAll(".inlineEditInput").forEach(input=>input.onkeydown=e=>{
    if(e.key==="Enter"){e.preventDefault();saveEdit(input.dataset.id)}
    if(e.key==="Escape"){e.preventDefault();cancelEdit()}
  });
  document.querySelectorAll(".deleteBtn").forEach(b=>b.onclick=()=>deleteItem(b.dataset.id));
  document.querySelectorAll(".returnMainBtn").forEach(b=>b.onclick=()=>moveItemToMain(b.dataset.id));
  document.querySelectorAll(".boughtEditBtn").forEach(b=>b.onclick=()=>editItem(b.dataset.id));
  document.querySelectorAll(".boughtDeleteBtn").forEach(b=>b.onclick=()=>deleteItem(b.dataset.id));
  document.querySelectorAll("select[data-id]").forEach(s=>s.onchange=()=>changeSection(s.dataset.id,s.value));

  document.querySelectorAll(".storeListToggle").forEach(b=>b.onclick=()=>toggleStoreOpen(b.dataset.storeListId));
  document.querySelectorAll(".storeListMenuBtn").forEach(b=>b.onclick=()=>{
    const a=$("store-actions-"+b.dataset.storeListId);
    if(a)a.classList.toggle("open");
  });
  document.querySelectorAll(".renameStoreListBtn").forEach(b=>b.onclick=()=>showStoreListEditor(b.dataset.storeListId));
  document.querySelectorAll(".deleteStoreListBtn").forEach(b=>b.onclick=()=>confirmDeleteStoreList(b.dataset.storeListId));
  document.querySelectorAll(".storeListAddBtn").forEach(b=>b.onclick=()=>{
    const input=$("store-add-"+b.dataset.storeListId);
    if(input)addItem(input.value,b.dataset.storeListId,input);
  });
  document.querySelectorAll(".storeListAddInput").forEach(input=>input.onkeydown=e=>{
    if(e.key==="Enter"){
      e.preventDefault();
      addItem(input.value,input.dataset.storeListId,input);
    }
  });
  if($("newStoreList"))$("newStoreList").onclick=()=>showStoreListEditor();

  if($("boughtToggle"))$("boughtToggle").onclick=()=>{boughtOpen=!boughtOpen;render()};
  if($("clearBought"))$("clearBought").onclick=clearBought;
  setupSortables();
}

function renderStoreLists(active){
  const ordered=[...storeLists].sort(storeListOrder);
  let listsHtml="";
  for(const s of ordered){
    const id=String(s.id);
    const arr=active.filter(x=>String(x.store_list_id||"")===id).sort(itemOrder);
    const open=storeOpen.has(id);
    listsHtml+=`<section class="storeList ${open?"open":""}" data-store-list-id="${attr(id)}">
      <div class="storeListBar">
        <span class="storeListGrip" title="Drag to reorder lists">${GRIP_SVG}</span>
        <button class="storeListToggle" data-store-list-id="${attr(id)}" aria-expanded="${open?"true":"false"}">
          <span class="archiveChevron">${CHEVRON_SVG}</span>
          <span class="storeListName">${esc(s.name)}</span>
          <span class="storeListCount">${arr.length}</span>
        </button>
        <button class="storeListMenuBtn" data-store-list-id="${attr(id)}" aria-label="${attr(s.name)} list options">•••</button>
      </div>
      <div class="storeListActions" id="store-actions-${attr(id)}">
        <button class="renameStoreListBtn" data-store-list-id="${attr(id)}">${PENCIL_SVG}<span>Rename</span></button>
        <button class="deleteStoreListBtn" data-store-list-id="${attr(id)}">Delete list</button>
      </div>
      ${open?`<div class="card itemDropZone storeListCard" data-store-list-id="${attr(id)}">
        ${arr.map(rowHtml).join("")}
        ${arr.length?"":`<div class="storeListEmpty">Drag grocery items here, or add one below</div>`}
        <div class="storeListAdd">
          <input
            class="storeListAddInput"
            id="store-add-${attr(id)}"
            data-store-list-id="${attr(id)}"
            placeholder="Add an item to ${attr(s.name)}…"
            autocomplete="off"
            enterkeyhint="done"
            aria-label="Add an item to ${attr(s.name)}">
          <button
            class="storeListAddBtn"
            data-store-list-id="${attr(id)}"
            aria-label="Add item to ${attr(s.name)}">+</button>
        </div>
      </div>`:""}
    </section>`;
  }

  return `<section class="storeListsWrap">
    <div class="storeListsHeading">
      <div>
        <div class="storeListsTitle">Store lists</div>
        <div class="storeListsSub">Drag items here for particular stores</div>
      </div>
      <button class="newStoreListBtn" id="newStoreList">+ New list</button>
    </div>
    ${ordered.length?`<div id="storeListsHost">${listsHtml}</div>`:`<div class="storeListsEmptyState">No store lists yet.</div>`}
  </section>`;
}
function boughtRowHtml(x){
  return `<div class="boughtRow" data-id="${attr(x.id)}">
    <button class="check boughtRestore" data-id="${attr(x.id)}" aria-label="Restore ${attr(x.name)} to list"></button>
    <div class="boughtItemText">
      <div class="itemname">${esc(x.name)}</div>
      <div class="meta">Tap the checkmark to restore${x.store_list_id&&storeLists.find(s=>String(s.id)===String(x.store_list_id))?` · ${esc(storeLists.find(s=>String(s.id)===String(x.store_list_id)).name)}`:""}</div>
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
  const editing=(typeof editingId!=="undefined")&&String(editingId)===String(x.id);
  const inStore=!!x.store_list_id;
  const nameArea=editing
    ? `<div class="inlineEditor">
         <input class="inlineEditInput" data-id="${attr(x.id)}" value="${attr(x.name)}" aria-label="Edit grocery item">
         <div class="inlineEditActions">
           <button class="inlineEditCancel" type="button">Cancel</button>
           <button class="inlineEditSave" data-id="${attr(x.id)}" type="button">Save</button>
         </div>
       </div>`
    : `<div><div class="itemname">${esc(x.name)}</div>${inStore?`<div class="meta">${esc(x.section)}</div>`:(x.section==="Other"?`<div class="meta">Unsorted — choose a section once and I’ll remember it</div>`:"")}</div>`;
  return `<div class="row ${x.starred&&!x.bought?"starred":""} ${editing?"editing":""}" data-id="${attr(x.id)}">
    <button class="check" data-id="${attr(x.id)}" aria-label="${x.bought?"Put back":"Mark bought"}"></button>
    ${nameArea}
    ${editing?"":activeStar}
    ${editing?"":`<button class="menuBtn" data-id="${attr(x.id)}" aria-label="Item options">•••</button>`}
    ${editing?"":`<div class="actions" id="actions-${attr(x.id)}"><button class="editBtn" data-id="${attr(x.id)}">${PENCIL_SVG}<span>Edit</span></button><select data-id="${attr(x.id)}" aria-label="Move ${attr(x.name)} to section">${opts}</select>${inStore?`<button class="returnMainBtn" data-id="${attr(x.id)}">Main list</button>`:""}<button class="deleteBtn" data-id="${attr(x.id)}">Delete</button></div>`}
  </div>`;
}
function renderQuick(){
  const active=new Set(items.filter(x=>!x.bought).map(x=>x.name.toLowerCase()));
  const source=(recent.length?recent:["Milk","Bananas","Eggs","Coffee","Paper towels","Waffles","Muffins"]).filter(validSuggestionName);
  const names=source.filter((x,i,a)=>!active.has(x.toLowerCase())&&a.findIndex(y=>y.toLowerCase()===x.toLowerCase())===i).slice(0,7);
  quick.innerHTML=names.map(n=>`<button class="chip" data-name="${attr(n)}">+ ${esc(n)}</button>`).join("");
  quick.querySelectorAll(".chip").forEach(b=>b.onclick=()=>addItem(b.dataset.name));
}
function matches(q){
  q=norm(q).toLowerCase();if(!q)return[];
  return fullCatalog().filter(x=>validSuggestionName(x.name)&&x.name.toLowerCase().includes(q)).sort((a,b)=>{
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
$("familyBtn").onclick=()=>{
  if($("familyBtn").disabled)return;
  if(household||demo)showFamilyCode(false);
  else showOnboarding();
};

init();
})();
