// Game State Management
var gameState = "menu"; // "menu", "settings", "playing", "gameover"

// Game Setup Variables
var playerX = 140;
var playerY = 380;
var playerSpeed = 7;
var score = 0;
var highScore = 0;
var currentWave = 1;
var gameFPS = 60; 
var bgColors = ["white", "#E3F2FD", "#F3E5F5", "#E8F5E9"]; 
var currentBgIndex = 0;

// Ball (Obstacle) Variables
var ball1X = randomNumber(20, 240);
var ball1Y = 0;
var ball1Speed = 4;

var ball2X = randomNumber(20, 240);
var ball2Y = -150; 
var ball2Speed = 4;
var isBall2Active = false;

var ball3X = randomNumber(20, 240);
var ball3Y = -300;
var ball3Speed = 4;
var isBall3Active = false;

// Collectible Orb Variables
var orbX = randomNumber(20, 260);
var orbY = randomNumber(240, 360); 
var orbType = "gold"; 
var orbPoints = 5;

// Track WASD holding states
var isHoldingW = false;
var isHoldingA = false;
var isHoldingS = false;
var isHoldingD = false;

// Track if Game Over labels exist so we don't get errors deleting them
var gameOverLabelExists = false;

// ==========================================
// CREATE USER INTERFACE ELEMENTS
// ==========================================

textLabel("bgOverlay", "");
setPosition("bgOverlay", 0, 0, 320, 450);

// MENU SCREEN ELEMENTS
textLabel("menuTitle", "SLOPE 2D 🟢");
setPosition("menuTitle", 40, 60, 240, 50);
setProperty("menuTitle", "font-size", 32);

textLabel("menuInstructions", "Press [ ENTER ] to Start Game\nPress [ S ] for Settings");
setPosition("menuInstructions", 20, 160, 280, 50);
setProperty("menuInstructions", "font-size", 16);
setProperty("menuInstructions", "text-color", "green");

textLabel("btnStart", "▶ OR CLICK HERE TO PLAY");
setPosition("btnStart", 40, 240, 240, 30);
setProperty("btnStart", "font-size", 14);

textLabel("btnSettings", "⚙ OR CLICK FOR SETTINGS");
setPosition("btnSettings", 40, 280, 240, 30);
setProperty("btnSettings", "font-size", 14);
setProperty("btnSettings", "text-color", "blue");

// SETTINGS SCREEN ELEMENTS
textLabel("settingsTitle", "SETTINGS");
setPosition("settingsTitle", 40, 30, 240, 40);
setProperty("settingsTitle", "font-size", 24);

textLabel("labelFps", "Game Speed (FPS): 60");
setPosition("labelFps", 20, 90, 280, 25);
setProperty("labelFps", "font-size", 14);

textLabel("btnFps60", "[60 FPS] - Ultra Fluid");
setPosition("btnFps60", 40, 120, 240, 25);
setProperty("btnFps60", "font-size", 13);
setProperty("btnFps60", "text-color", "purple");

textLabel("btnFps45", "[45 FPS] - High Speed");
setPosition("btnFps45", 40, 150, 240, 25);
setProperty("btnFps45", "font-size", 13);
setProperty("btnFps45", "text-color", "purple");

textLabel("btnFps30", "[30 FPS] - Normal Arcade");
setPosition("btnFps30", 40, 180, 240, 25);
setProperty("btnFps30", "font-size", 13);
setProperty("btnFps30", "text-color", "purple");

textLabel("btnFps5", "[5 FPS] - Slow-Mo Matrix Mode");
setPosition("btnFps5", 40, 210, 240, 25);
setProperty("btnFps5", "font-size", 13);
setProperty("btnFps5", "text-color", "magenta");

textLabel("btnColor", "🎨 Cycle Background Color");
setPosition("btnColor", 40, 265, 240, 30);
setProperty("btnColor", "font-size", 14);
setProperty("btnColor", "text-color", "teal");

textLabel("btnBack", "⬅ PRESS SHIFT TO EXIT TO MENU");
setPosition("btnBack", 20, 330, 280, 30);
setProperty("btnBack", "font-size", 13);
setProperty("btnBack", "text-color", "orange");

// GAMEPLAY ELEMENTS
textLabel("player", "🟢");
setPosition("player", -100, -100, 40, 40);
setProperty("player", "font-size", 24);

textLabel("obstacle1", "🔴");
setPosition("obstacle1", -100, -100, 60, 60);
setProperty("obstacle1", "font-size", 40);

textLabel("obstacle2", "🔴");
setPosition("obstacle2", -100, -100, 60, 60);
setProperty("obstacle2", "font-size", 40);

textLabel("obstacle3", "🔴");
setPosition("obstacle3", -100, -100, 60, 60);
setProperty("obstacle3", "font-size", 40);

textLabel("orb", "🌟");
setPosition("orb", -100, -100, 35, 35);
setProperty("orb", "font-size", 22);

textLabel("hudDisplay", "");
setPosition("hudDisplay", 20, 15, 280, 50);
setProperty("hudDisplay", "font-size", 14);

textLabel("restartPrompt", "");
setPosition("restartPrompt", -500, 0, 0, 0); // Kept hidden away until Game Over drops
setProperty("restartPrompt", "font-size", 14);
setProperty("restartPrompt", "text-color", "gray");

// Screen State Transitions
function hideMenu() {
  setPosition("menuTitle", -500, 0, 0, 0);
  setPosition("menuInstructions", -500, 0, 0, 0);
  setPosition("btnStart", -500, 0, 0, 0);
  setPosition("btnSettings", -500, 0, 0, 0);
}

function showMenu() {
  gameState = "menu";
  setPosition("menuTitle", 40, 80, 240, 50);
  setPosition("menuInstructions", 20, 160, 280, 50);
  setPosition("btnStart", 40, 240, 240, 30);
  setPosition("btnSettings", 40, 280, 240, 30);
  hideSettings();
  hideGameUI();
}

function hideSettings() {
  setPosition("settingsTitle", -500, 0, 0, 0);
  setPosition("labelFps", -500, 0, 0, 0);
  setPosition("btnFps60", -500, 0, 0, 0);
  setPosition("btnFps45", -500, 0, 0, 0);
  setPosition("btnFps30", -500, 0, 0, 0);
  setPosition("btnFps5", -500, 0, 0, 0);
  setPosition("btnColor", -500, 0, 0, 0);
  setPosition("btnBack", -500, 0, 0, 0);
}

function showSettings() {
  gameState = "settings";
  setPosition("settingsTitle", 40, 30, 240, 40);
  setPosition("labelFps", 20, 90, 280, 25);
  setPosition("btnFps60", 40, 120, 240, 25);
  setPosition("btnFps45", 40, 150, 240, 25);
  setPosition("btnFps30", 40, 180, 240, 25);
  setPosition("btnFps5", 40, 210, 240, 25);
  setPosition("btnColor", 40, 265, 240, 30);
  setPosition("btnBack", 20, 330, 280, 30);
  hideMenu();
}

function hideGameUI() {
  setPosition("player", -100, -100, 0, 0);
  setPosition("obstacle1", -100, -100, 0, 0);
  setPosition("obstacle2", -100, -100, 0, 0);
  setPosition("obstacle3", -100, -100, 0, 0);
  setPosition("orb", -100, -100, 0, 0);
  setText("hudDisplay", "");
  
  // Cleanly move prompt text off screen immediately
  setText("restartPrompt", "");
  setPosition("restartPrompt", -500, 0, 0, 0);
  clearGameOverText();
}

function clearGameOverText() {
  if (gameOverLabelExists) {
    deleteElement("gameOver");
    gameOverLabelExists = false;
  }
}

hideSettings();
hideGameUI();

// ==========================================
// ORB SPONTANEOUS RARITY GENERATOR
// ==========================================
function respawnOrb() {
  var roll = randomNumber(1, 100);
  
  if (roll == 1) { 
    orbType = "secret";
    orbPoints = 100;
    setText("orb", "🌈"); 
    orbX = randomNumber(20, 260);
    orbY = randomNumber(60, 140); 
  } else if (roll <= 10) { 
    orbType = "pink";
    orbPoints = 20;
    setText("orb", "💖"); 
    orbX = randomNumber(20, 260);
    orbY = randomNumber(60, 160); 
  } else if (roll <= 30) { 
    orbType = "purple";
    orbPoints = 10;
    setText("orb", "🔮"); 
    orbX = randomNumber(20, 260);
    orbY = randomNumber(140, 230); 
  } else { 
    orbType = "gold";
    orbPoints = 5;
    setText("orb", "🌟"); 
    orbX = randomNumber(20, 260);
    orbY = randomNumber(240, 360); 
  }
  
  if (gameState === "playing") {
    setPosition("orb", orbX, orbY, 35, 35);
  }
}

function startActualGame() {
  clearGameOverText(); 
  
  // BUG FIX: Ensure instruction block text is completely wiped & thrown off the screen layout on bootup
  setText("restartPrompt", "");
  setPosition("restartPrompt", -500, 0, 0, 0);

  hideMenu();
  hideSettings();
  gameState = "playing";
  gameActive = true;
  score = 0;
  currentWave = 1;
  playerX = 140;
  playerY = 380;
  ball1Y = 0;
  ball1X = randomNumber(20, 240);
  isBall2Active = false;
  isBall3Active = false;
  ball2Y = -150;
  ball3Y = -300;
  
  setPosition("player", playerX, playerY, 40, 40);
  respawnOrb();
}

// ==========================================
// DYNAMIC HEARTBEAT GAME ENGINE TICKER
// ==========================================
var engineLoop;

function launchEngineLoop() {
  stopTimedLoop(engineLoop);
  var tickRate = Math.floor(1000 / gameFPS);
  
  engineLoop = timedLoop(tickRate, function() {
    if (gameState === "playing" && gameActive) {
      
      var currentSpeed = (60 / gameFPS) * playerSpeed;
      if (isHoldingW && playerY > 50)  { playerY = playerY - currentSpeed; }
      if (isHoldingS && playerY < 400) { playerY = playerY + currentSpeed; }
      if (isHoldingA && playerX > 10)  { playerX = playerX - currentSpeed; }
      if (isHoldingD && playerX < 270) { playerX = playerX + currentSpeed; }
      setPosition("player", playerX, playerY, 40, 40);

      var calculatedWave = Math.floor(score / 10) + 1;
      currentWave = (calculatedWave > 100) ? 100 : calculatedWave;
      
      var frameSpeedScaler = (60 / gameFPS);
      var waveSpeedModifier = (4 + (currentWave * 0.35)) * frameSpeedScaler;
      ball1Speed = waveSpeedModifier;
      ball2Speed = waveSpeedModifier;
      ball3Speed = waveSpeedModifier;

      if (currentWave >= 2) { isBall2Active = true; }
      if (currentWave >= 5) { isBall3Active = true; }

      if (score > highScore) { highScore = score; }
      setText("hudDisplay", "Score: " + score + "  |  Wave: " + currentWave + "\nBest: " + highScore);

      ball1Y = ball1Y + ball1Speed;
      setPosition("obstacle1", ball1X, ball1Y, 60, 60);
      if (ball1Y > 450) {
        ball1Y = -20;
        ball1X = randomNumber(20, 240);
        score = score + 1; 
      }

      if (isBall2Active) {
        ball2Y = ball2Y + ball2Speed;
        setPosition("obstacle2", ball2X, ball2Y, 60, 60);
        if (ball2Y > 450) {
          ball2Y = -20;
          ball2X = randomNumber(20, 240);
          score = score + 1;
        }
      } else {
        setPosition("obstacle2", -100, -100, 0, 0); 
      }

      if (isBall3Active) {
        ball3Y = ball3Y + ball3Speed;
        setPosition("obstacle3", ball3X, ball3Y, 60, 60);
        if (ball3Y > 450) {
          ball3Y = -20;
          ball3X = randomNumber(20, 240);
          score = score + 1;
        }
      } else {
        setPosition("obstacle3", -100, -100, 0, 0); 
      }
      
      var pCenterX = playerX + 20; 
      var pCenterY = playerY + 20; 

      var distToOrb = Math.sqrt(Math.pow(pCenterX - (orbX + 17), 2) + Math.pow(pCenterY - (orbY + 17), 2));
      if (distToOrb < 30) {
        score = score + orbPoints; 
        respawnOrb();
      }

      var dist1 = Math.sqrt(Math.pow(pCenterX - (ball1X + 30), 2) + Math.pow(pCenterY - (ball1Y + 30), 2));
      var dist2 = Math.sqrt(Math.pow(pCenterX - (ball2X + 30), 2) + Math.pow(pCenterY - (ball2Y + 30), 2));
      var dist3 = Math.sqrt(Math.pow(pCenterX - (ball3X + 30), 2) + Math.pow(pCenterY - (ball3Y + 30), 2));

      var hit1 = dist1 < 38;
      var hit2 = isBall2Active && (dist2 < 38);
      var hit3 = isBall3Active && (dist3 < 38);
      
      if (hit1 || hit2 || hit3) {
        gameActive = false;
        gameState = "gameover";
        
        hideGameUI();
        
        textLabel("gameOver", "GAME OVER 💥");
        setPosition("gameOver", 60, 190, 200, 50);
        setProperty("gameOver", "font-size", 24);
        setProperty("gameOver", "text-color", "red");
        gameOverLabelExists = true;
        
        setText("restartPrompt", "Press [ ENTER ] to Play Again\nPress [ SHIFT ] for Main Menu");
        setPosition("restartPrompt", 20, 260, 280, 50);
      }
    }
  });
}

launchEngineLoop();

// ==========================================
// INTERACTIVE ACTION EVENT HANDLERS
// ==========================================
onEvent("btnStart", "click", function() { startActualGame(); });
onEvent("btnSettings", "click", function() { showSettings(); });
onEvent("btnColor", "click", function() {
  currentBgIndex = (currentBgIndex + 1) % bgColors.length;
  setProperty("bgOverlay", "background-color", bgColors[currentBgIndex]);
});

onEvent("btnFps60", "click", function() { gameFPS = 60; setText("labelFps", "Game Speed (FPS): 60 (Ultra Sensitive)"); launchEngineLoop(); });
onEvent("btnFps45", "click", function() { gameFPS = 45; setText("labelFps", "Game Speed (FPS): 45 (High Performance)"); launchEngineLoop(); });
onEvent("btnFps30", "click", function() { gameFPS = 30; setText("labelFps", "Game Speed (FPS): 30 (Normal Arcade)"); launchEngineLoop(); });
onEvent("btnFps5", "click", function() { gameFPS = 5; setText("labelFps", "Game Speed (FPS): 5 (Slow-Mo Matrix Mode)"); launchEngineLoop(); });

// ==========================================
// KEYBOARD ENGINE COMMAND MAPPERS
// ==========================================
onEvent("screen1", "keydown", function(event) {
  var key = event.key.toLowerCase();
  
  if (gameState === "playing" && gameActive) {
    if (key === "w") { isHoldingW = true; }
    if (key === "a") { isHoldingA = true; }
    if (key === "s") { isHoldingS = true; }
    if (key === "d") { isHoldingD = true; }
    if (event.key === "Shift") { 
      gameActive = false;
      showMenu(); 
    }
  } else if (gameState === "menu") {
    if (event.key === "Enter") { startActualGame(); }
    if (key === "s") { showSettings(); }
  } else if (gameState === "settings") {
    if (event.key === "Shift") { showMenu(); }
  } else if (gameState === "gameover") {
    if (event.key === "Enter") {
      startActualGame(); 
    }
    if (event.key === "Shift") {
      showMenu();
    }
  }
});

onEvent("screen1", "keyup", function(event) {
  var key = event.key.toLowerCase();
  if (key === "w") { isHoldingW = false; }
  if (key === "a") { isHoldingA = false; }
  if (key === "s") { isHoldingS = false; }
  if (key === "d") { isHoldingD = false; }
});