const pgnParser = require('pgn-parser');

const fs = require("fs")
const path = require("path")

const dir = path.join("candidates", "3", "Caruana, Fabiano_vs_Duda, Jan-Krzysztof_2022.06.19.pgn")
const file = fs.readFileSync(dir, "utf-8")

const [result] = pgnParser.parse(file)

function isCastle (move) {
  return move.includes("O-O")
}

function isCheck (move) {
  return move.includes("+")
}

function isRookMove (move) {
  return move[0] === "R"
}

function isBishopMove (move) {
  return move[0] === "B"
}

function isKnightMove (move) {
  return move[0] === "N"
}

function isQueenMove (move) {
  return move[0] === "Q"
}

function isKingMove (move) {
  return move[0] === "K"
}

function isPawnMove (move) {
  return move[0] === "a" 
    || move[0] === "b" || move[0] === "c" 
    || move[0] === "d" || move[0] === "e" 
    || move[0] === "f" || move[0] === "g" 
    || move[0] === "h"
}

function searchWhitePlayerName (headers) {
  const filter = headers.filter(e => e.name === "White")
  if (!filter.length) return "Unkmon"
  return filter[0].value
}

function searchBlackPlayerName (headers) {
  const filter = headers.filter(e => e.name === "Black")
  if (!filter.length) return "Unkmon"
  return filter[0].value
}

const moves_white = result.moves.filter(e => e.move_number)
const moves_black = result.moves.filter(e => !e.move_number)

console.log("result :", result.result)
console.log("white player: ", searchWhitePlayerName(result.headers))
console.log("black player: ", searchBlackPlayerName(result.headers))

console.log('moves white: ', moves_white.length)
console.log('moves black: ', moves_black.length)

console.log('checks white: ', moves_white.map(e => isCheck(e.move)).filter(e => e).length)
console.log('checks black: ', moves_black.map(e => isCheck(e.move)).filter(e => e).length)

console.log('castle white: ', moves_white.map(e => isCastle(e.move)).filter(e => e).length)
console.log('castle black: ', moves_black.map(e => isCastle(e.move)).filter(e => e).length)

console.log('pawn white: ', moves_white.map(e => isPawnMove(e.move)).filter(e => e).length)
console.log('pawn black: ', moves_black.map(e => isPawnMove(e.move)).filter(e => e).length)

console.log('rook white: ', moves_white.map(e => isRookMove(e.move)).filter(e => e).length)
console.log('rook black: ', moves_black.map(e => isRookMove(e.move)).filter(e => e).length)

console.log('knight white: ', moves_white.map(e => isKnightMove(e.move)).filter(e => e).length)
console.log('knight black: ', moves_black.map(e => isKnightMove(e.move)).filter(e => e).length)

console.log('bishop white: ', moves_white.map(e => isBishopMove(e.move)).filter(e => e).length)
console.log('bishop black: ', moves_black.map(e => isBishopMove(e.move)).filter(e => e).length)

console.log('queen white: ', moves_white.map(e => isQueenMove(e.move)).filter(e => e).length)
console.log('queen black: ', moves_black.map(e => isQueenMove(e.move)).filter(e => e).length)

console.log('king white: ', moves_white.map(e => isKingMove(e.move)).filter(e => e).length)
console.log('king black: ', moves_black.map(e => isKingMove(e.move)).filter(e => e).length)
