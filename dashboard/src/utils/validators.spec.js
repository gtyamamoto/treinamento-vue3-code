import { validateEmptyAndEmail, validateEmptyAndMinLength3 } from './validators'

describe('Validator utils', () => {
  describe('3 or more letters validator', () => {
    it('should give error when empty value', () => {
      expect(validateEmptyAndMinLength3()).toBe('*Este campo é obrigatório')
    })
    it('should give error when less than 3 character', () => {
      expect(validateEmptyAndMinLength3('22')).toBe('*Este campo precisa de no mínimo 3 caracteres')
    })
    it('should return true when have more or equal than 3 char', () => {
      expect(validateEmptyAndMinLength3('2244')).toBeTruthy()
    })
  })

  describe('Email validator', () => {
    it('should give error when empty value', () => {
      expect(validateEmptyAndEmail()).toBe('*Este campo é obrigatório')
    })
    it('should give error when its invalid email', () => {
      expect(validateEmptyAndEmail('22@coco@coco.com')).toBe('*Este campo precisa ser um e-mail')
    })
    it('should return true when its a valid email', () => {
      expect(validateEmptyAndEmail('test@test.com')).toBeTruthy()
    })
  })
})
