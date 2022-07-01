import { Box, Divider, Link, Text } from '@chakra-ui/react'
import React from 'react'

const IndexPage = () => {
  return (
    <Box w="full">
      <Box maxW="lg" marginX="auto" p="3" gap="3" display="flex" flexDir="column">
        <Text fontWeight="bold" fontSize="20" textAlign="center">Curiosidades sobre o Torneio de Candidatos FIDE 2022</Text>
        <Divider />
        <Text textAlign="center">Hikaru Nakamura é o jogador que efetuou mais lances ( 579 ) e Ian Nepomniachtchi é quem tem menos ( 393 ) </Text>
        <Text textAlign="center">Alireza Firouzja é quem aplicou menos xeques ( 17 ) ao mesmo tempo que tem mais derrotas ( 4 )</Text>
        <Text textAlign="center">Ian Nepomniachtchi é o único que rocou em todas as partidas ( 11 ), enquanto Richard Rapport, em apenas 7</Text>
        <Text textAlign="center">Richard Rapport e Teimour Radjabov empatam em número de lances de peão ( 126 )</Text>
        <Text textAlign="center">Ian Nepomniachtchi tem menos de 43% dos lances de torre de Teimour Radjabov ( 57 x 133 )</Text>
        <Text textAlign="center">A peça favorita de Hikaru Nakamura é o cavalo, ele é o único que tem mais lances de cavalo que de peão ( 150 x 139 )</Text>
        <Text textAlign="center">Richard Rapport é o único que fez mais de 100 lances de bispo ( 127 )</Text>
        <Text textAlign="center">Teimour Radjabov é o jogador que mais empatou ( 8 vezes ) e também o que mais fez lances de dama ( 85 )</Text>
        <Text textAlign="center">Ian Nepomniachtchi é o jogador que mais ganhou ( 5 vitórias ) e o que menos usou o rei ( 16 lances )</Text>
        <Divider />
        <Text textAlign="center">Página atualizada com a rodada 11, dados em planilha disponíveis em: </Text>
        <Link textAlign="center" href="https://1drv.ms/x/s!AlcwiQyX7XlSvyFAOpoOO80fmbAE?e=16tplw">OneDrive</Link>
        <Divider />
        <Text textAlign="center">O programa de extração dos dados e todas as partidas em pgn estão disponíveis no repositório:</Text>
        <Link textAlign="center" href="https://github.com/joaopaulo-kuwano/wispy-rain-6498">GitHub</Link>
        <Text textAlign="center">Favor enviar sugestões para o repositório acima, na guia de pull request ou issues</Text>
      </Box>
    </Box>
  )
}

export default IndexPage