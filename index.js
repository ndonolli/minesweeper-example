$(document).ready(function() {
function makeBoard(n, bombRate) {
    // creates n * n board of array vectors
    // @param {n} int Specify demension
    // @param {bombRate} float Probability of bombs

    var board = [];

    function init() {
        // initializes board and randomizes bombs
        for (var i = 0; i < n; i++) {
            board.push([]);
            for (var j = 0; j < n; j++) {
                let isBomb = Math.random() < bombRate ? false : true;
                let $space = $('<td>').data({
                    bomb: isBomb,
                    clicked: false,
                });
                board[i].push($space);
            }
        }
    }

    function initAdjacent() {
        // traverces and calls getAdjacent() for each piece,
        // storing adjacent in piece object
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                board[i][j].adjacent = board.getAdjacent(i, j);
            }
        }
    }

    board.clickPiece = function(i, j) {
        this[i][j].clicked = true;
    }

    board.getAdjacent = function(i, j) {
        let adjacent = 0;
        // top adjacent
        for (let x = j - 1; x < j + 2; x++) {
            try {
                // this has to be accessed like board[i+1][x].data().bomb
                if (board[i-1][x].bomb) adjacent++; // top
                if (board[i+1][x].bomb) adjacent++; // bottom
            } catch(e) {
                // console.error(e);
                continue;
            }
        }
        // left and right adjacent
        try {
            if (board[i][j-1].bomb) adjacent++;
        } catch(e) {
            // console.error(e);
        }
        try {
            if (board[i][j+1].bomb) adjacent++;
        } catch(e) {
            // console.error(e);
        }

        return adjacent;
    }

    init();
    initAdjacent();
    return board;
}

const board = makeBoard(5, .20);

function generateGrid( rows, cols ) {
    var $grid = $('<table>');
    for ( row = 1; row <= rows; row++ ) {
        $grid.append($('<tr>')) 
        for ( col = 1; col <= cols; col++ ) {      
            $grid.append($('<td>'));
        }
    }
    return $grid;
}

$( "#tableContainer" ).append( generateGrid( 5, 5) );

$( "td" ).click(function() {
    var index = $( "td" ).index( this );
    var row = Math.floor( ( index ) / 5) + 1;
    var col = ( index % 5 ) + 1;
    $( "span" ).text( "That was row " + row + " and col " + col );
    $( this ).css( 'background-color', 'red' );
});

// end of onReady
});