import Recipe from '../../../models/Recipe';

describe('The recipe model should be a set of functions, such that:', () => {

  let recipe;

  beforeEach(() => {
    recipe = new Recipe();
  });

  it('Should have a newRecipe method that resets all observable values.', () => {

  });

  // it('Should have a function updateObject that throws an error when passed no arguments', () => {
  //   expect(() => {
  //     updateObject();
  //   }).toThrow();
  // });
  //
  // it('updateObject should return an object with a single key value pair, if no object is passed in', () => {
  //   const fooBar = {
  //     foo: 'bar',
  //   };
  //   expect(updateObject(fooBar)).toEqual({foo: 'bar'});
  // });
  //
  // it('updateObject should return an object with an additional key value pair, if an object with keys is passed in', () => {
  //   const fooBarTest = {
  //     foo: 'bar',
  //     trill: 'dad',
  //   };
  //   const fooBar = {
  //     foo: 'bar',
  //   };
  //   expect(updateObject({trill: 'dad'}, fooBar)).toEqual(fooBarTest);
  // });
  //
  // it('updateObject should allow deep nested updates', () => {
  //   const fooBarTest = {
  //     foo: 'bar',
  //     trills: {
  //       trill: 'dad'
  //     }
  //   };
  //   const fooBar = {
  //     foo: 'bar',
  //   };
  //   const trills = {
  //     trills: {
  //       trill: 'dad',
  //     }
  //   };
  //   expect(updateObject(trills, fooBar)).toEqual(fooBarTest);
  // })
});
