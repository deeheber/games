import jest from 'jest-mock'
import { getComputerChoice, calculateWinner } from './utils.js'

describe('Rock paper scissors utils', () => {
  // Don't spam console.logs to test output
  jest.spyOn(console, 'log').mockImplementation(() => {})

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  describe('Get Computer Choice', () => {
    it('should choose rock', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789)
      const result = getComputerChoice()

      expect(result).toBe('rock')
    })

    it('should choose paper', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.6666666666)
      const result = getComputerChoice()

      expect(result).toBe('paper')
    })

    it('should choose scissors', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.88888888777)
      const result = getComputerChoice()

      expect(result).toBe('scissors')
    })
  })

  describe('Calculate Winner', () => {
    it('should tie', () => {
      const result1 = calculateWinner('rock', 'rock')
      const result2 = calculateWinner('paper', 'paper')
      const result3 = calculateWinner('scissors', 'scissors')

      expect(result1).toBe('tie')
      expect(result2).toBe('tie')
      expect(result3).toBe('tie')
    })

    it('should win (user)', () => {
      const result1 = calculateWinner('paper', 'rock')
      const result2 = calculateWinner('rock', 'scissors')
      const result3 = calculateWinner('scissors', 'paper')

      expect(result1).toBe('user')
      expect(result2).toBe('user')
      expect(result3).toBe('user')
    })

    it('should lose (user)', () => {
      const result1 = calculateWinner('rock', 'paper')
      const result2 = calculateWinner('scissors', 'rock')
      const result3 = calculateWinner('paper', 'scissors')

      expect(result1).toBe('computer')
      expect(result2).toBe('computer')
      expect(result3).toBe('computer')
    })
  })
})
