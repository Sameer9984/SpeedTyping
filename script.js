const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const confirmSettingsBtn = document.getElementById('confirm-settings');

// List of words for game
const words = [
  'sigh', 'tense', 'airplane', 'ball', 'pies', 'juice', 'warlike', 'bad', 'north', 'dependent',
  'steer', 'silver', 'highfalutin', 'superficial', 'quince', 'eight', 'feeble', 'admit', 'drag', 'loving',
  'phenomenon', 'idyllic', 'rhythm', 'programmer', 'keyboard', 'algorithm', 'interface', 'framework', 'responsive', 'optimization',
  'accessibility', 'sustainability', 'collaboration', 'innovation', 'technology', 'iteration', 'agile', 'scalability', 'resilience', 'cybersecurity',
  'encryption', 'vulnerability', 'authentication', 'authorization', 'cryptography', 'blockchain', 'decentralized', 'distributed', 'consensus', 'immutable',
  'paradigm', 'infrastructure', 'deployment', 'continuous', 'integration', 'delivery', 'orchestration', 'microservices', 'serverless', 'containerization',
  'virtualization', 'cloud', 'compute', 'storage', 'networking', 'analytics', 'visualization', 'insights', 'intelligence', 'machine',
  'learning', 'neural', 'networks', 'perception', 'cognition', 'robotics', 'autonomous', 'internet', 'connectivity', 'ubiquitous',
  'wearable', 'ambient', 'internet', 'things', 'sensor', 'actuator', 'embedded', 'systems', 'realtime', 'lowpower',
  'immersive', 'augmented', 'virtual', 'reality', 'simulation', 'interaction', 'intuitive', 'ergonomic', 'inclusive', 'empathetic',
  'usability', 'engagement', 'gamification', 'motivation', 'incentive', 'social', 'collaborative', 'crowdsourcing', 'sharing', 'economy',
  'disruptive', 'innovative', 'entrepreneurial', 'startup', 'venture', 'incubator', 'accelerator', 'investor', 'mentor', 'pitching',
  'prototyping', 'iteration', 'pivoting', 'growth', 'hacking', 'lean', 'agile', 'scrum', 'kanban', 'waterfall'
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 30;

// Set difficulty to value in ls or medium
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Focus on text on start
text.focus();

// Start counting down
let timeInterval;

// Generate random word from local list
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  text.focus();
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <div class="end-game-content">
      <h2>Time's Up!</h2>
      <p>Your final score is ${score}</p>
      <button id="play-again-btn">Play Again</button>
    </div>
  `;

  endgameEl.style.display = 'flex';
  document.body.classList.add('blur');
  settingsBtn.setAttribute('aria-hidden', 'true');
  settings.setAttribute('aria-hidden', 'true');

  const playAgainBtn = document.getElementById('play-again-btn');
  playAgainBtn.addEventListener('click', () => {
    location.reload();
  });
}

// Start the game
function startGame() {
  timeInterval = setInterval(updateTime, 1000);
  addWordToDOM();
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener('keypress', e => {
  const insertedText = (e.target.value + e.key).trim().toLowerCase();
  const currentWord = word.innerText.trim().toLowerCase();

  // Check if the inserted text matches the current word up to the same length
  if (insertedText === currentWord.substring(0, insertedText.length)) {
    // If it matches, allow the key to be inserted
  } else {
    // Prevent the incorrect letter from being inserted
    e.preventDefault();

    // Shake the input field
    e.target.classList.add('shake');
    setTimeout(() => {
      e.target.classList.remove('shake');
    }, 300);
  }

  // If the entire word is typed correctly
  if (insertedText === currentWord) {
    addWordToDOM();
    updateScore();

    // Clear
    setTimeout(() => {
      text.value = "";
    }, 100);

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 4;
    } else {
      time += 7;
    }

    updateTime();
  }
});


// Settings btn click
settingsBtn.addEventListener('click', () => {
  settings.classList.remove('hide');
  settings.setAttribute('aria-hidden', 'false');
});

// Confirm settings
confirmSettingsBtn.addEventListener('click', () => {
  difficulty = difficultySelect.value;
  localStorage.setItem('difficulty', difficulty);
  settings.classList.add('hide');
  settings.setAttribute('aria-hidden', 'true');
  startGame();
});

// Error handling
window.addEventListener('error', (event) => {
  const errorMessage = `An error occurred: ${event.error.message}`;
  console.error(errorMessage);
  alert(errorMessage);
});