let A = [];
let M = [];
let Img = [];
let Memmory = [0, 0, 0];
let K = [];
let take1 = document.getElementById("time");
let take2 = document.getElementById("lose");

onload = function () {
  Arr(4);
  Tbl(4);
  setInterval(CountDown, 1000);
}

setTimeout(Hide, 1500);

let second = 50;

function CountDown() {
  second -= 1;
  if (second > 0) {
    take1.innerHTML = "Oyunun bitməsinə: " + second;
  } else {
    take1.style.display = "none";
    take2.innerHTML = `<p>Game Over</p><a href="index.htm">Try Game </a>`;
    take2.style.display = "block";
    document.getElementsByTagName("table")[0].style.display = "none";
  }
}

function Arr(n) {
  let x,
    k = 1;
  for (let i = 0; i < 16; i++) {
    k = k > 8 ? 1 : k;
    A[i] = k++;
  }

  for (let i = 0; i < n; i++) {
    M[i] = [];
    Img[i] = [];
    K[i] = [];
    for (let j = 0; j < n; j++) {
      x = Math.floor(Math.random() * A.length);
      M[i][j] = A[x];
      Img[i][j] = A[x];
      A.splice(x, 1);
    }
  }
}

function Tbl(n) {
  let tbl = "";
  for (let i = 0; i < n; i++) {
    tbl += "<tr>";
    for (let j = 0; j < n; j++) {
      tbl += `<td><img id="A${i}_${j}" src="img/${M[i][j]}.png" onclick="Click(${i},${j})" /></td>`;
    }
    tbl += "</tr>";
  }
  document.getElementsByTagName("table")[0].innerHTML = tbl;
}

function Hide() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      M[i][j] = 0;
    }
  }
  Tbl(4);
}

function Click(i, j) {
  M[i][j] = Img[i][j];
  Tbl(4);
  if (Memmory[2] == 0) {
    Memmory[0] = i;
    Memmory[1] = j;
    Memmory[2] = Img[i][j];
  } else {
    if (Memmory[2] != Img[i][j] || (Memmory[0] == i && Memmory[1] == j)) {
      M[i][j] = 0;
      M[Memmory[0]][Memmory[1]] = 0;
      setTimeout(function () {
        Tbl(4);
        Sil();
      }, 500);
    } else {
      K[i][j] = 1;
      K[Memmory[0]][Memmory[1]] = 1;
    }

    Memmory[2] = 0;
  }
  Sil();
  Yoxla();
}

function Sil() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (K[i][j] == 1) {
        document.getElementById(`A${i}_${j}`).removeAttribute("onclick");
      }
    }
  }
}

function Yoxla() {
  let say = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (K[i][j] == 1) {
        say++;
      }
    }
  }

  if (say == 16) {
    alert("WİN");
  }
}