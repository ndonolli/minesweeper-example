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
                let isBomb = Math.random() > bombRate ? false : true;
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
                board[i][j].data().adjacent = board.getAdjacent(i, j);
            }
        }
    }

    board.clickPiece = function(i, j) {
        this[i][j].data().clicked = true;
    }

    board.getAdjacent = function(i, j) {
        let adjacent = 0;
        // top adjacent
        for (let x = j - 1; x < j + 2; x++) {
            try {
                // this has to be accessed like board[i+1][x].data().bomb
                if (board[i-1][x].data().bomb) adjacent++; // top
                if (board[i+1][x].data().bomb) adjacent++; // bottom
            } catch(e) {
                // console.error(e);
                continue;
            }
        }
        // left and right adjacent
        try {
            if (board[i][j-1].data().bomb) adjacent++;
        } catch(e) {
            // console.error(e);
        }
        try {
            if (board[i][j+1].data().bomb) adjacent++;
        } catch(e) {
            // console.error(e);
        }

        return adjacent;
    }

    init();
    initAdjacent();
    console.log(board)
    return board;
}

const board = makeBoard(5, .20);

function generateGrid(board) {
    var $grid = $('<table>');
    board.forEach(elems => {
        let $row = $('<tr>');
        $row.append(elems);
        $grid.append($row);
    })
    return $grid;
}

$("#tableContainer").append(generateGrid(board));

function _handleClick(self) {
    let space = $(self).data();
    let txt = space.bomb ? 'bomb' : space.adjacent;
    $(self).text(txt);
    if (space.bomb) $(self).addClass('bomb')
    space.clicked = true;
}

function bombGoBoom() {
    // bomb go boom 
    $('td').each(function(i, space) {
        _handleClick(space);
    })
}


$( "td" ).click(function() {
    _handleClick(this)
    if ($(this).data().bomb) bombGoBoom();
});

// end of onReady
});