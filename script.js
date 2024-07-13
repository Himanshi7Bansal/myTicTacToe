// game sound
var mainAudio = new Audio("./game.mp3"); // inbuilt constructor
mainAudio.play();

var button = document.querySelectorAll(".grid div"); // selecting all 9 buttons
var reset = document.querySelector("#reset"); // reset button
var board = document.querySelector("#board");

// constant turn values
const X = "X";
const O = "O";

let currPlayer = X; // current player
let spaces = Array(9).fill(null); // for alternative moves

// adding eventListener to all 9 buttons
Array.from(button).forEach((item) =>
    item.addEventListener("click", (e) => {
        const id = e.target.id;
        board.style.display = "none";
        reset.style.display = "inline";
        mainAudio.pause();
        mainAudio.currentTime = 0;

        if (!spaces[id]) {
            // spaces array is null
            spaces[id] = currPlayer; // fill array element
            e.target.innerText = currPlayer; // current player playing his turn

            // sound
            sound(currPlayer);

            // check whether anyone won
            if (win() !== false) {
                if (currPlayer == X) {
                    // gif bubu win
                    document
                        .querySelector("#bubu")
                        .setAttribute("src", "./gif/bubu/win.gif");
                    document
                        .querySelector("#dudu")
                        .setAttribute("src", "./gif/dudu/lose.gif");
                    // Winboard
                    board.innerText = "BUBU WON! 👈🏾☝🏾";
                    board.style.color = "rgb(142, 195, 207)";
                    board.classList.add("fun1");
                    board.classList.remove("fun");
                } else {
                    // gif dudu win
                    document
                        .querySelector("#dudu")
                        .setAttribute("src", "./gif/dudu/win.gif");
                    document
                        .querySelector("#bubu")
                        .setAttribute("src", "./gif/bubu/lose.gif");
                    // Winboard
                    board.innerText = "DUDU WON! ☝️👉🏻";
                    board.style.color = "rgb(212, 105, 123)";
                    board.classList.add("fun1");
                    board.classList.remove("fun");
                }
                board.style.display = "block";
                // sound
                var audio = new Audio("./win.mp3"); // inbuilt constructor
                audio.play();
                setTimeout(play, 1000);
            } else if (!win() && draw()) {
                // draw
                // gif draw
                document
                    .querySelector("#dudu")
                    .setAttribute("src", "./gif/dudu/draw.gif");
                document
                    .querySelector("#bubu")
                    .setAttribute("src", "./gif/bubu/draw.gif");
                // Winboard
                board.style.display = "block";
                board.innerText = "DRAW !!!  👈🏾👉🏻";
                board.style.color = "green";
                board.style.background = "#f2c14e";
                board.classList.add("fun1");
                board.classList.remove("fun");
                // sound
                var audio = new Audio("./draw.mp3"); // inbuilt constructor
                audio.play();
                setTimeout(play, 4000);
            }
            currPlayer = currPlayer == X ? O : X; // update current player value
        }
    })
);

//draw
function draw() {
    for (var i = 0; i < 9; i++) {
        if (spaces[i] == null) return false;
    }
    return true;
}

// sound effects
function sound(currPlayer) {
    if (currPlayer == X) {
        var audio = new Audio("./1.mp3"); // inbuilt constructor
        audio.play();
    } else {
        var audio = new Audio("./2.mp3"); // inbuilt constructor
        audio.play();
    }
}
function play() {
    mainAudio.play();
}

// winning condition
const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function win() {
    for (const condition of winning) {
        let [a, b, c] = condition;

        if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
            button[a].style.background = "rgba(44, 144, 194, .4)";
            button[b].style.background = "rgba(44, 144, 194, .4)";
            button[c].style.background = "rgba(44, 144, 194, .4)";
            return true;
            // return [a, b, c];
        }
    }
    return false;
}

// reset button function
reset.addEventListener("click", () => {
    spaces.fill(null); // space array set to null
    currPlayer = currPlayer == X ? O : X; // update current player value
    //gif
    document.querySelector("#bubu").setAttribute("src", "./gif/bubu/play.gif");
    document.querySelector("#dudu").setAttribute("src", "./gif/dudu/play.gif");
    // Win Board
    board.innerText = "⚔️Start⚔️ Fighting";
    board.style.color = "red";
    board.classList.add("fun");
    board.classList.remove("fun1");
    // sound
    var audio = new Audio("./reset.mp3"); // inbuilt constructor
    audio.play();
    setTimeout(play, 1000);
    // empty all cells"
    Array.from(button).forEach((item) => {
        item.innerText = "";
        item.style.backgroundColor = "#2d414b";
    });
});
