
var GameBoard = Create2DArray(3);

var WhoesTurn = "x";

var GameBoardManipulate

$(document).ready(function () {
    var GameBoard = document.getElementById("TicTacToeBoard");
    GameBoardManipulate = GameBoard.getContext("2d");

    GameBoardManipulate.lineWidth = 10;
    GameBoardManipulate.moveTo(200, 0);
    GameBoardManipulate.lineTo(200, 600);
    GameBoardManipulate.stroke();

    GameBoardManipulate.moveTo(400, 0);
    GameBoardManipulate.lineTo(400, 600);
    GameBoardManipulate.stroke();

    GameBoardManipulate.moveTo(0, 200);
    GameBoardManipulate.lineTo(600, 200);
    GameBoardManipulate.stroke();

    GameBoardManipulate.moveTo(0, 400);
    GameBoardManipulate.lineTo(600, 400);
    GameBoardManipulate.stroke();
   
})

function ChangeTurn() {

    if (WhoesTurn == "x") {
        WhoesTurn = "o";
        $("#XTurnIndicator").text("");
        $("#OTurnIndicator").text("IT'S YOUR TURN!");
    }
    else if (WhoesTurn == "o") {
        WhoesTurn = "x";
        $("#XTurnIndicator").text("IT'S YOUR TURN!")
        $("#OTurnIndicator").text("")
    }
}

var IsMarkedArray = [];

function IsMarked(id) {
    if (IsMarkedArray.includes(id)) {
        return true;
    }
    else {
        IsMarkedArray.push(id);
        return false;
    }
}

var FreezedGameWhoesTurn;
var TurnCount = 0;

function CheckForWinner() {
    FreezedGameWhoesTurn = WhoesTurn;
    WhoesTurn = "";
    
    if (CheckRows(GameBoard)) {
        return;
    }
    else if (CheckColums(GameBoard)) {
        return;
    }
    else if (CheckDiagonal(GameBoard))
    {
        return;
    }
    else if (TurnCount == 9) {
        Cats();
        return;
    }

    WhoesTurn = FreezedGameWhoesTurn;
}

function Cats() {
    $("#XTurnIndicator").text("Cat's");
    $("#OTurnIndicator").text("Cat's");
}

function Win(Player, Line, Posistion) {

    if (Player == "x") {
        $("#XTurnIndicator").text("YOU WIN!!!");
        $("#OTurnIndicator").text("");
    }
    else if (Player == "o") {
        $("#XTurnIndicator").text("");
        $("#OTurnIndicator").text("YOU WIN!!!");
    }
    DrawWinLine(Line, Posistion);
    
}

function DrawWinLine(Line, Position) {

}


function CheckRows(Array2D) {
    for (var i = 0; i < 3; i++) {
        var XAmount = 0;
        var OAmount = 0;
        for (var j = 0; j < 3; j++) {
            if (Array2D[i][j] == "x") {
                XAmount++;
            }
            else if (Array2D[i][j] == "o") {
                OAmount++;
            }
            if (XAmount == 3) {
                Win("x", "Row", j + 1);
                return true;
            }
            else if (OAmount == 3) {
                Win("o", "Row", j + 1);
                return true;
            }
        }
    }
    return false;
}

function CheckColums(Array2D) {

    for (var i = 0; i < 3; i++) {
        var XAmount = 0;
        var OAmount = 0;
        for (var j = 0; j < 3; j++) {
            if (Array2D[j][i] == "x") {
                XAmount++;
            }
            else if (Array2D[j][i] == "o") {
                OAmount++;
            }
            if (XAmount == 3) {
                Win("x", "Column", j + 1);
                return true;
            }
            else if (OAmount == 3) {
                Win("o", "Column", j + 1);
                return true;
            }
        }
    }
    return false;
}

function CheckDiagonal(Array2D) {

    if ((Array2D[1][1] != null && Array2D[1][1] != "") && Array2D[0][0] == Array2D[1][1] && Array2D[1][1] == Array2D[2][2]) {
        Win(Array2D[1][1], "Diagonal", 1);
        return true;
    }
    else if ((Array2D[1][1] != null && Array2D[1][1] != "") && Array2D[2][0] == Array2D[1][1] && Array2D[1][1] == Array2D[0][2]) {
        Win(Array2D[1][1], "Diagonal", 1);
        return true;
    } 
    return false;
}

function MarkSquare(Element) {

    var id = $(Element).attr("id")

    if (!IsMarked(id))
    {
        if (WhoesTurn == "x") {
            TurnCount++;
            ChangeTurn();
            DrawX(id);
            MarkGameBoard(id, "x")
            CheckForWinner()
        }
        else if (WhoesTurn == "o") {
            TurnCount++;
            ChangeTurn();
            DrawO(id);
            MarkGameBoard(id, "o")
            CheckForWinner()
        }
    }
}

function MarkGameBoard(ID,MarkType) {
    if (ID == "TLSquare") {
        GameBoard[0][0] = MarkType;
    }
    else if (ID == "TMSquare") {
        GameBoard[0][1] = MarkType;
    }
    else if (ID == "TRSquare") {
        GameBoard[0][2] = MarkType;
    }
    else if (ID == "MLSquare") {
        GameBoard[1][0] = MarkType;
    }
    else if (ID == "MMSquare") {
        GameBoard[1][1] = MarkType;
    }
    else if (ID == "MRSquare") {
        GameBoard[1][2] = MarkType;
    }
    else if (ID == "BLSquare") {
        GameBoard[2][0] = MarkType;
    }
    else if (ID == "BMSquare") {
        GameBoard[2][1] = MarkType;
    }
    else if (ID == "BRSquare") {
        GameBoard[2][2] = MarkType;
    }
}


function DrawX(SquareID) {
    var canvas = document.getElementById(SquareID);
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(185, 185);
    ctx.lineWidth = 7;
    ctx.stroke();
    ctx.moveTo(10, 185);
    ctx.lineTo(185, 10);
    ctx.lineWidth = 7;
    ctx.stroke();
}

function DrawO(SquareID) {
    var canvas = document.getElementById(SquareID);
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(95, 94, 75, 0, 2 * Math.PI);
    ctx.lineWidth = 7;
    ctx.stroke();
    
}

function RestartGame() {
    Fill2DArray(GameBoard, 3, 3);
    WhoesTurn = FreezedGameWhoesTurn;
    TurnCount = 0;
    ClearAllSquare();
    if (WhoesTurn == "x") {
        $("#XTurnIndicator").text("IT'S YOUR TURN!");
        $("#OTurnIndicator").text("");
    }
    else if (WhoesTurn == "o") {
        $("#XTurnIndicator").text("");
        $("#OTurnIndicator").text("IT'S YOUR TURN!");
    }
}

function Create2DArray(rows) {
    var arr = [];

    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }

    return arr;
}

function ClearAllSquare() {
    for (var i = IsMarkedArray.length - 1; i >= 0; i--) {
        ClearCanvas(IsMarkedArray[i]);
        IsMarkedArray.pop();
    }
}

function ClearCanvas(SquareID) {
    var canvas = document.getElementById(SquareID);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function Fill2DArray(Array, row, col) {

    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            Array[i][j] = "";
        }
    }
}




