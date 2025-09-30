// DOM Elements / DOM Elementy
// Get references to HTML elements for cookie counter and click button
// Získanie referencií na HTML elementy pre počítadlo cookies a tlačidlo kliknutia
const cookieCountElement = document.getElementById('cookie-count')
const getCookieButton = document.getElementById('get-cookie-button')

// Elements for upgrade functionality
// Elementy pre funkciu vylepšenia
const cookiesPerClickElement = document.getElementById('cookies-per-click')
const upgradeButton = document.getElementById('upgrade-button')

// Elements for miner functionality
// Elementy pre funkciu baníkov
const minersCountElement = document.getElementById('miners-count')
const buyMinerButton = document.getElementById('buy-miner-button')
const minerCostElement = document.getElementById('miner-cost')



// Progress bar for mining animation
// Progress bar pre animáciu ťažby
const miningProgressBarElement = document.getElementById('mining-progress-bar')

// Game State Variables / Stavové premenné hry
// Current number of cookies the player has
// Aktuálny počet cookies, ktoré má hráč
let cookieCount = 0;

// Number of cookies earned per click
// Počet cookies získaných za kliknutie
let cookiesPerClick = 1;

// Number of miners owned by the player
// Počet baníkov, ktorých má hráč
let minersCount = 0;

// Mining progress (0-100), starts at 100 for initial calculation
// Progres ťažby (0-100), začína na 100 pre počiatočný výpočet
let miningProgress = 1000 / 10;

// Cost to buy the next miner
// Cena za kúpu ďalšieho baníka
let minerCost = 25;

// Zadanie 1 

const totalMinedCookiesElement = document.getElementById('total-cookies-mined');

let totalMinedCookies = 0;

// Zadanie 2

const totalSpentCookiesElement = document.getElementById('total-cookies-spent');

let totalSpentCookies = 0;

// Bonus 1

let saveTime = 5000 // ms

function saveAll() {

  if (cookieCount > 0) { localStorage.setItem("cookieCount", cookieCount.toString()) };
  if (totalMinedCookies > 0) { localStorage.setItem("totalMinedCookies", totalMinedCookies.toString()) };
  if (totalSpentCookies > 0) { localStorage.setItem("totalSpentCookies", totalSpentCookies.toString()) };
  if (minerCost != 25) { localStorage.setItem("minerCost", minerCost.toString()) };
  if (minersCount > 0) { localStorage.setItem("minersCount", minersCount.toString()) };

}

function loadAll() {

  cookieCount = localStorage.getItem("cookieCount") ?? 0;
  totalMinedCookies = localStorage.getItem("totalMinedCookies") ?? 0;
  totalSpentCookies = localStorage.getItem("totalSpentCookies") ?? 0;
  minerCost = localStorage.getItem("minerCost") ?? 25;
  minersCount = localStorage.getItem("minersCount") ?? 0;

}

function resetGame() {

  cookieCount = 0;
  totalMinedCookies = 0;
  totalSpentCookies = 0;
  minerCost = 25;
  minersCount = 0;

  localStorage.clear();
  location.reload();

}

loadAll()
setInterval(saveAll, saveTime) 

// Bonus 2

const chanceToHitJackpotElement = document.getElementById('jackpot-chance')
const chanceToGetUpgradeForFreeElement = document.getElementById('free-upgrade-chance')

let chanceToBuyUpgradeForFree = 0.1 // 10%
let chanceToHitJackpot = 0.1 // 10%

chanceToGetUpgradeForFreeElement.innerHTML = (chanceToBuyUpgradeForFree * 100) + "%"
chanceToHitJackpotElement.innerHTML = (chanceToHitJackpot * 100) + "%"

// DU

let minerSpeed = 10 // (multiplier) default = 1, if 2 then mine speed 2x faster if 0.5x then mining is 2 times slower

// UI Update Function / Funkcia aktualizácie používateľského rozhrania
// Updates all display elements with current game state values
// Aktualizuje všetky zobrazované elementy s aktuálnymi hodnotami stavu hry
function render() {
  cookieCountElement.innerHTML = cookieCount ?? 0;
  cookiesPerClickElement.innerHTML = cookiesPerClick ?? 1;
  minersCountElement.innerHTML = minersCount ?? 0;
  minerCostElement.innerHTML = minerCost ?? 25;
  totalMinedCookiesElement.innerHTML = totalMinedCookies ?? 0;
  totalSpentCookiesElement.innerHTML = totalSpentCookies ?? 0;
}

// Cookie Clicking Function / Funkcia klikania na cookie
// Called when player clicks the main cookie button
// Volaná keď hráč klikne na hlavné tlačidlo cookie
function getCookie() {
  // Add cookies based on current cookies per click value
  // Pridá cookies na základe aktuálnej hodnoty cookies za kliknutie
  rolledNumber = Math.random()

  if (rolledNumber <= chanceToHitJackpot) {
    cookieCount += (cookiesPerClick * 10);
    totalMinedCookies += (cookiesPerClick * 10);
    render()
  }
  else {
    cookieCount += cookiesPerClick;
    totalMinedCookies += cookiesPerClick;
    render()
  }
}

// Upgrade Function / Funkcia vylepšenia
// Increases cookies per click by spending 5 cookies
// Zvyšuje cookies za kliknutie za cenu 5 cookies
function upgrade() {
  // Check if player has enough cookies to upgrade
  // Kontrola, či má hráč dostatok cookies na vylepšenie
  if (cookieCount < 5) {
    return;
  }

  rolledNumber = Math.random()

  if (rolledNumber <= chanceToBuyUpgradeForFree) {
    cookiesPerClick += 2;
    render()
  }
  else {
    // Spend 5 cookies to buy the upgrade
    // Minieme 5 cookies na kúpu vylepšenia
   cookieCount -= 5;
   totalSpentCookies += 5;
  
    // Increase cookies per click by 2
    // Zvýšime cookies za kliknutie o 2
   cookiesPerClick += 2;
   render()
  }
}

// Buy Miner Function / Funkcia kúpy baníka
// Purchases a miner that automatically generates cookies
// Kúpi baníka, ktorý automaticky generuje cookies
function buyMiner() {
  // Check if player has enough cookies to buy a miner
  // Kontrola, či má hráč dostatok cookies na kúpu baníka
  if (cookieCount < minerCost) {
    return;
  }

  rolledNumber = Math.random()

  if (rolledNumber <= chanceToBuyUpgradeForFree) {
    minersCount += 1;
    render()
  }
  else {
   // Spend cookies to buy the miner
    // Minieme cookies na kúpu baníka
    cookieCount -= minerCost;
   totalSpentCookies += minerCost;
  
   // Increase miner count
   // Zvýšime počet baníkov
   minersCount += 1;

   // Double the cost for the next miner (exponential scaling)
   // Zdvojnásobíme cenu pre ďalšieho baníka (exponenciálne škálovanie)
   minerCost *= 2;

   render();
  }


}

// Mining Function / Funkcia ťažby
// Called when miners complete a mining cycle
// Volaná keď baníci dokončia cyklus ťažby
function mineCookies() {
  // Add cookies based on number of miners and cookies per click multiplier
  // Pridá cookies na základe počtu baníkov a násobiteľa cookies za kliknutie
  cookieCount += (minersCount * cookiesPerClick);
  totalMinedCookies += (minersCount * cookiesPerClick);
  render()
}



// Game Loop Update Function / Funkcia aktualizácie hernej slučky
// Continuously updates mining progress and handles automatic cookie generation
// Nepretržite aktualizuje progres ťažby a spracováva automatickú generáciu cookies
function update() {
  // Schedule next update in 10 milliseconds (100 FPS)
  // Naplánuje ďalšiu aktualizáciu za 10 milisekúnd (100 FPS)
  setTimeout(() => {
    update()
  }, 10)

  // Skip mining if no miners are owned
  // Preskočí ťažbu ak nie sú vlastnení žiadni baníci
  if (minersCount < 1) {
    return;
  }

  // Increment mining progress
  // Zvýši progres ťažby
  miningProgress += minerSpeed;

  // When progress reaches 100, mine cookies and reset progress
  // Keď progres dosiahne 100, vyťaží cookies a resetuje progres
  if (miningProgress >= 100) {
    mineCookies();
    miningProgress = 0;
  }

  // Update the visual progress bar
  // Aktualizuje vizuálny progress bar
  miningProgressBarElement.value = miningProgress;
}

// Game Initialization / Inicializácia hry
// Start the game loop and render initial state
// Spustí hernú slučku a vykreslí počiatočný stav
update();
render();
