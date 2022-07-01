const pgnParser = require('pgn-parser')
const fs = require("fs")
const path = require("path")

function isCastle(move) {
  return move.includes("O-O")
}

function isCheck(move) {
  return move.includes("+")
}

function isRookMove(move) {
  return move[0] === "R"
}

function isBishopMove(move) {
  return move[0] === "B"
}

function isKnightMove(move) {
  return move[0] === "N"
}

function isQueenMove(move) {
  return move[0] === "Q"
}

function isKingMove(move) {
  return move[0] === "K"
}

function isPawnMove(move) {
  return move[0] === "a"
    || move[0] === "b" || move[0] === "c"
    || move[0] === "d" || move[0] === "e"
    || move[0] === "f" || move[0] === "g"
    || move[0] === "h"
}

function searchWhitePlayerName(headers) {
  const filter = headers.filter(e => e.name === "White")
  if (!filter.length) return "Unkmon"
  return filter[0].value
}

function searchBlackPlayerName(headers) {
  const filter = headers.filter(e => e.name === "Black")
  if (!filter.length) return "Unkmon"
  return filter[0].value
}

function sumStats (current, actual) {
  return {
    name: actual.name,
    moves: current.moves + actual.moves,
    check: current.check + actual.check,
    castle: current.castle + actual.castle,
    pawn: current.pawn + actual.pawn,
    rook: current.rook + actual.rook,
    knight: current.knight + actual.knight,
    bishop: current.bishop + actual.bishop,
    queen:  current.queen + actual.queen,
    king: current.king + actual.king,
    victories: current.victories + actual.victories,
    defeats: current.defeats + actual.defeats,
    draws: current.draws + actual.draws,
    games: current.games + actual.games
  }
}

const gamesDir = [
  path.join("candidates", "1", "Caruana, Fabiano_vs_Nakamura, Hikaru_2022.06.17.pgn"),
  path.join("candidates", "1", "Ding, Liren_vs_Nepomniachtchi, Ian_2022.06.17.pgn"),
  path.join("candidates", "1", "Duda, Jan-Krzysztof_vs_Rapport, Richard_2022.06.17.pgn"),
  path.join("candidates", "1", "Radjabov, Teimour_vs_Firouzja, Alireza_2022.06.17.pgn"),

  path.join("candidates", "2", "Duda, Jan-Krzysztof_vs_Ding, Liren_2022.06.18.pgn"),
  path.join("candidates", "2", "Nakamura, Hikaru_vs_Radjabov, Teimour_2022.06.18.pgn"),
  path.join("candidates", "2", "Nepomniachtchi, Ian_vs_Caruana, Fabiano_2022.06.18.pgn"),
  path.join("candidates", "2", "Rapport, Richard_vs_Firouzja, Alireza_2022.06.18.pgn"),

  path.join("candidates", "3", "Caruana, Fabiano_vs_Duda, Jan-Krzysztof_2022.06.19.pgn"),
  path.join("candidates", "3", "Ding, Liren_vs_Rapport, Richard_2022.06.19.pgn"),
  path.join("candidates", "3", "Firouzja, Alireza_vs_Nakamura, Hikaru_2022.06.19.pgn"),
  path.join("candidates", "3", "Radjabov, Teimour_vs_Nepomniachtchi, Ian_2022.06.19.pgn"),

  path.join("candidates", "4", "Ding, Liren_vs_Caruana, Fabiano_2022.06.21.pgn"),
  path.join("candidates", "4", "Duda, Jan-Krzysztof_vs_Radjabov, Teimour_2022.06.21.pgn"),
  path.join("candidates", "4", "Nepomniachtchi, Ian_vs_Firouzja, Alireza_2022.06.21.pgn"),
  path.join("candidates", "4", "Rapport, Richard_vs_Nakamura, Hikaru_2022.06.21.pgn"),

  path.join("candidates", "5", "Caruana, Fabiano_vs_Rapport, Richard_2022.06.22.pgn"),
  path.join("candidates", "5", "Firouzja, Alireza_vs_Duda, Jan-Krzysztof_2022.06.22.pgn"),
  path.join("candidates", "5", "Nakamura, Hikaru_vs_Nepomniachtchi, Ian_2022.06.22.pgn"),
  path.join("candidates", "5", "Radjabov, Teimour_vs_Ding, Liren_2022.06.22.pgn"),

  path.join("candidates", "6", "Firouzja, Alireza_vs_Caruana, Fabiano_2022.06.23.pgn"),
  path.join("candidates", "6", "Nakamura, Hikaru_vs_Ding, Liren_2022.06.23.pgn"),
  path.join("candidates", "6", "Nepomniachtchi, Ian_vs_Duda, Jan-Krzysztof_2022.06.23.pgn"),
  path.join("candidates", "6", "Radjabov, Teimour_vs_Rapport, Richard_2022.06.23.pgn"),

  path.join("candidates", "7", "Caruana, Fabiano_vs_Radjabov, Teimour_2022.06.25.pgn"),
  path.join("candidates", "7", "Ding, Liren_vs_Firouzja, Alireza_2022.06.25.pgn"),
  path.join("candidates", "7", "Duda, Jan-Krzysztof_vs_Nakamura, Hikaru_2022.06.25.pgn"),
  path.join("candidates", "7", "Rapport, Richard_vs_Nepomniachtchi, Ian_2022.06.25.pgn"),

  path.join("candidates", "8", "Firouzja, Alireza_vs_Radjabov, Teimour_2022.06.26.pgn"),
  path.join("candidates", "8", "Nakamura, Hikaru_vs_Caruana, Fabiano_2022.06.26.pgn"),
  path.join("candidates", "8", "Nepomniachtchi, Ian_vs_Ding, Liren_2022.06.26.pgn"),
  path.join("candidates", "8", "Rapport, Richard_vs_Duda, Jan-Krzysztof_2022.06.26.pgn"),

  path.join("candidates", "9", "Caruana, Fabiano_vs_Nepomniachtchi, Ian_2022.06.27.pgn"),
  path.join("candidates", "9", "Ding, Liren_vs_Duda, Jan-Krzysztof_2022.06.27.pgn"),
  path.join("candidates", "9", "Firouzja, Alireza_vs_Rapport, Richard_2022.06.27.pgn"),
  path.join("candidates", "9", "Radjabov, Teimour_vs_Nakamura, Hikaru_2022.06.27.pgn"),

  path.join("candidates", "10", "Duda, Jan-Krzysztof_vs_Caruana, Fabiano_2022.06.29.pgn"),
  path.join("candidates", "10", "Nakamura, Hikaru_vs_Firouzja, Alireza_2022.06.29.pgn"),
  path.join("candidates", "10", "Nepomniachtchi, Ian_vs_Radjabov, Teimour_2022.06.29.pgn"),
  path.join("candidates", "10", "Rapport, Richard_vs_Ding, Liren_2022.06.29.pgn"),

  path.join("candidates", "11", "Caruana, Fabiano_vs_Ding, Liren_2022.06.30.pgn"),
  path.join("candidates", "11", "Firouzja, Alireza_vs_Nepomniachtchi, Ian_2022.06.30.pgn"),
  path.join("candidates", "11", "Nakamura, Hikaru_vs_Rapport, Richard_2022.06.30.pgn"),
  path.join("candidates", "11", "Radjabov, Teimour_vs_Duda, Jan-Krzysztof_2022.06.30.pgn"),
]

gamesDir.forEach(dir => {

  const file = fs.readFileSync(dir, "utf-8")

  const [result] = pgnParser.parse(file)

  const moves_white = result.moves.filter(e => e.move_number)
  const moves_black = result.moves.filter(e => !e.move_number)

  const whiteStats = {
    name: searchWhitePlayerName(result.headers),
    moves: moves_white.length,
    check: moves_white.map(e => isCheck(e.move)).filter(e => e).length,
    castle: moves_white.map(e => isCastle(e.move)).filter(e => e).length,
    pawn: moves_white.map(e => isPawnMove(e.move)).filter(e => e).length,
    rook: moves_white.map(e => isRookMove(e.move)).filter(e => e).length,
    knight: moves_white.map(e => isKnightMove(e.move)).filter(e => e).length,
    bishop: moves_white.map(e => isBishopMove(e.move)).filter(e => e).length,
    queen:  moves_white.map(e => isQueenMove(e.move)).filter(e => e).length,
    king: moves_white.map(e => isKingMove(e.move)).filter(e => e).length,
    victories: result.result === "1-0" ? 1 : 0,
    defeats: result.result === "0-1" ? 1 : 0,
    draws: result.result === "1/2-1/2" ? 1 : 0,
    games: 1
  }

  const blackStats = {
    name: searchBlackPlayerName(result.headers),
    moves: moves_black.length,
    check: moves_black.map(e => isCheck(e.move)).filter(e => e).length,
    castle: moves_black.map(e => isCastle(e.move)).filter(e => e).length,
    pawn: moves_black.map(e => isPawnMove(e.move)).filter(e => e).length,
    rook: moves_black.map(e => isRookMove(e.move)).filter(e => e).length,
    knight: moves_black.map(e => isKnightMove(e.move)).filter(e => e).length,
    bishop: moves_black.map(e => isBishopMove(e.move)).filter(e => e).length,
    queen:  moves_black.map(e => isQueenMove(e.move)).filter(e => e).length,
    king: moves_black.map(e => isKingMove(e.move)).filter(e => e).length,
    victories: result.result === "0-1" ? 1 : 0,
    defeats: result.result === "1-0" ? 1 : 0,
    draws: result.result === "1/2-1/2" ? 1 : 0,
    games: 1
  }

  let data = JSON.parse( fs.readFileSync("data.json", "utf-8") )
  
  if (whiteStats.name === "Duda, Jan-Krzysztof") data = {...data, duda: sumStats(data.duda, whiteStats)}
  else if (whiteStats.name === "Ding, Liren") data = {...data, ding: sumStats(data.ding, whiteStats)}
  else if (whiteStats.name === "Nakamura, Hikaru") data = {...data, nakamura: sumStats(data.nakamura, whiteStats)}
  else if (whiteStats.name === "Radjabov, Teimour") data = {...data, radja: sumStats(data.radja, whiteStats)}
  else if (whiteStats.name === "Nepomniachtchi, Ian") data = {...data, nepo: sumStats(data.nepo, whiteStats)}
  else if (whiteStats.name === "Caruana, Fabiano") data = {...data, caruana: sumStats(data.caruana, whiteStats)}
  else if (whiteStats.name === "Rapport, Richard") data = {...data, rapport: sumStats(data.rapport, whiteStats)}
  else if (whiteStats.name === "Firouzja, Alireza") data = {...data, firouza: sumStats(data.firouza, whiteStats)}

  if (blackStats.name === "Duda, Jan-Krzysztof") data = {...data, duda: sumStats(data.duda, blackStats)}
  else if (blackStats.name === "Ding, Liren") data = {...data, ding: sumStats(data.ding, blackStats)}
  else if (blackStats.name === "Nakamura, Hikaru") data = {...data, nakamura: sumStats(data.nakamura, blackStats)}
  else if (blackStats.name === "Radjabov, Teimour") data = {...data, radja: sumStats(data.radja, blackStats)}
  else if (blackStats.name === "Nepomniachtchi, Ian") data = {...data, nepo: sumStats(data.nepo, blackStats)}
  else if (blackStats.name === "Caruana, Fabiano") data = {...data, caruana: sumStats(data.caruana, blackStats)}
  else if (blackStats.name === "Rapport, Richard") data = {...data, rapport: sumStats(data.rapport, blackStats)}
  else if (blackStats.name === "Firouzja, Alireza") data = {...data, firouza: sumStats(data.firouza, blackStats)}

  fs.writeFileSync("data.json", JSON.stringify(data))

})

