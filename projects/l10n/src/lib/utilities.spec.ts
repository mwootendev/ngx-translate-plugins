import { getBaseLanguage } from './utilities';

describe('utilities', () => {

  describe('getBaseLanguage()', () => {

    it('should be a function', () => {
      expect(getBaseLanguage).toBeTruthy();
      expect(typeof getBaseLanguage).toBe('function');
    });

    it('should return null for a null language code', () => {
      expect(getBaseLanguage(null)).toBeNull();
    });

    it('should return the provided language code when there is no delimited localization', () => {
      expect(getBaseLanguage('en')).toEqual('en');
      expect(getBaseLanguage('FR')).toEqual('FR');
    });

    it('should return the base language for a delimited localization code', () => {
      expect(getBaseLanguage('es-ES')).toEqual('es');
      expect(getBaseLanguage('es_MX')).toEqual('es');
    });

  });

});
