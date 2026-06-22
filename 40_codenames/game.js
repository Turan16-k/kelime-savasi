/* ============================================================
   CODENAMES - OYUN MANTIĞI (tek cihaz / pass-and-play)
   ============================================================ */
const $ = (id) => document.getElementById(id);

const state = {
  cards: [],          // { word, key: 'red'|'blue'|'neutral'|'assassin', revealed: bool }
  turn: "red",        // sıradaki takım
  redLeft: 0,
  blueLeft: 0,
  names: { red: "Kırmızı", blue: "Mavi" },
  over: false,
  guessesLeft: 0,     // ipucu sonrası kalan tahmin (0 = ipucu yok)
};

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $(id).classList.add("active");
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- Yeni oyun dağıt ---------- */
function dealGame() {
  state.names.red = ($("red-name").value.trim() || "Kırmızı").slice(0, 14);
  state.names.blue = ($("blue-name").value.trim() || "Mavi").slice(0, 14);

  // Başlayan takım 9, diğeri 8 kelime alır
  const starter = Math.random() < 0.5 ? "red" : "blue";
  const other = starter === "red" ? "blue" : "red";

  const keys = [];
  for (let i = 0; i < 9; i++) keys.push(starter);
  for (let i = 0; i < 8; i++) keys.push(other);
  for (let i = 0; i < 7; i++) keys.push("neutral");
  keys.push("assassin");

  const words = shuffle(WORD_POOL).slice(0, 25);
  const shuffledKeys = shuffle(keys);

  state.cards = words.map((word, i) => ({ word, key: shuffledKeys[i], revealed: false }));
  state.turn = starter;
  state.redLeft = starter === "red" ? 9 : 8;
  state.blueLeft = starter === "blue" ? 9 : 8;
  state.over = false;
  state.guessesLeft = 0;

  $("clue-word").value = "";
  $("clue-num").value = "";
  $("active-clue").innerHTML = "İpucu bekleniyor…";

  renderBoard();
  renderStatus();
  showScreen("game-screen");
}

/* ---------- Tahtayı çiz ---------- */
function renderBoard() {
  const board = $("board");
  board.innerHTML = "";
  state.cards.forEach((c, i) => {
    const cell = document.createElement("div");
    cell.className = "cell key-" + c.key;
    cell.textContent = c.word;
    if (c.revealed) cell.classList.add("revealed", c.key);
    cell.addEventListener("click", () => guess(i));
    board.appendChild(cell);
  });
}

/* ---------- Durum / skor ---------- */
function renderStatus() {
  $("red-label").textContent = state.names.red;
  $("blue-label").textContent = state.names.blue;
  $("red-left").textContent = state.redLeft;
  $("blue-left").textContent = state.blueLeft;

  const pill = $("turn-pill");
  pill.className = "turn-pill " + state.turn;
  pill.textContent = "Sıra: " + state.names[state.turn];
}

/* ---------- İpucu ver ---------- */
function giveClue() {
  const word = $("clue-word").value.trim();
  const num = parseInt($("clue-num").value, 10);
  if (!word) { $("clue-word").focus(); return; }
  const n = isNaN(num) ? 0 : Math.max(0, Math.min(9, num));
  // Tahmin hakkı: sayı + 1 (sayı 0 ise sınırsız sayılır → 1 hak + bonus mantığı için 99)
  state.guessesLeft = n === 0 ? 99 : n + 1;
  $("active-clue").innerHTML =
    `<b>${escapeHtml(word.toUpperCase())}</b> &nbsp;·&nbsp; ${n} &nbsp;|&nbsp; ${state.names[state.turn]} tahmin ediyor`;
  $("clue-word").value = "";
  $("clue-num").value = "";
}

/* ---------- Kelime tahmini ---------- */
function guess(i) {
  if (state.over) return;
  const c = state.cards[i];
  if (c.revealed) return;
  if (state.guessesLeft <= 0) {
    flashClue("Önce ipucu verin!");
    return;
  }

  c.revealed = true;
  state.guessesLeft--;
  renderBoard();

  if (c.key === "assassin") {
    // Suikastçı → sıradaki takım anında kaybeder
    const loser = state.turn;
    const winner = loser === "red" ? "blue" : "red";
    endGame(winner, `${state.names[loser]} suikastçıya bastı! 💀`);
    return;
  }

  if (c.key === "red") state.redLeft--;
  if (c.key === "blue") state.blueLeft--;
  renderStatus();

  // Kazanma kontrolü
  if (state.redLeft === 0) return endGame("red", "Tüm ajanlarını buldu!");
  if (state.blueLeft === 0) return endGame("blue", "Tüm ajanlarını buldu!");

  if (c.key === state.turn) {
    // Doğru renk → devam (tahmin hakkı bittiyse sıra geçer)
    if (state.guessesLeft <= 0) {
      flashClue("Tahmin hakkı bitti. Sıra geçiyor…");
      switchTurn();
    }
  } else {
    // Nötr veya rakip → sıra biter
    const reason = c.key === "neutral" ? "Nötr kelime!" : "Rakibin kelimesi!";
    flashClue(reason + " Sıra geçiyor…");
    switchTurn();
  }
}

function flashClue(msg) {
  $("active-clue").innerHTML = `<span style="color:var(--muted)">${escapeHtml(msg)}</span>`;
}

function switchTurn() {
  state.turn = state.turn === "red" ? "blue" : "red";
  state.guessesLeft = 0;
  renderStatus();
  setTimeout(() => {
    if (!state.over) $("active-clue").innerHTML = "İpucu bekleniyor…";
  }, 1200);
}

function endTurnManual() {
  if (state.over) return;
  if (state.guessesLeft === 0) { flashClue("Zaten ipucu bekleniyor."); return; }
  flashClue("Sıra elle bitirildi.");
  switchTurn();
}

/* ---------- Oyun sonu ---------- */
function endGame(winner, reason) {
  state.over = true;
  // Tüm kartları aç
  state.cards.forEach((c) => (c.revealed = true));
  renderBoard();
  $("winner-emoji").textContent = winner === "red" ? "🟥" : "🟦";
  $("winner-name").textContent = state.names[winner] + " kazandı!";
  $("winner-reason").textContent = reason;
  setTimeout(() => showScreen("winner-screen"), 900);
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}

/* ---------- Kaptan görünümü (basılı tut) ---------- */
function setSpymaster(on) {
  $("board").classList.toggle("spymaster", on);
  $("spymaster-btn").classList.toggle("holding", on);
}

/* ---------- Olaylar ---------- */
$("start-game-btn").addEventListener("click", dealGame);
$("new-game-btn").addEventListener("click", dealGame);
$("play-again-btn").addEventListener("click", dealGame);
$("back-setup-btn").addEventListener("click", () => showScreen("setup-screen"));
$("give-clue-btn").addEventListener("click", giveClue);
$("clue-num").addEventListener("keydown", (e) => { if (e.key === "Enter") giveClue(); });
$("end-turn-btn").addEventListener("click", endTurnManual);

const spyBtn = $("spymaster-btn");
spyBtn.addEventListener("mousedown", () => setSpymaster(true));
spyBtn.addEventListener("mouseup", () => setSpymaster(false));
spyBtn.addEventListener("mouseleave", () => setSpymaster(false));
spyBtn.addEventListener("touchstart", (e) => { e.preventDefault(); setSpymaster(true); }, { passive: false });
spyBtn.addEventListener("touchend", (e) => { e.preventDefault(); setSpymaster(false); });
