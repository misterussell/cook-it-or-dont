//
// take the complication off state.
// when something is updated that specific part of a recipe object needs to be updated
// when a field is updated a function for that part of the object is invoked.

// const _pipe = (a, b) => (...args) => b(a(...args));
// const pipe = (...fns) => fns.reduce(_pipe);
// const initiateSeed = pipe(generateGenState, generateNextGenState, setNextGenState);
// iniateSeed(2)

export function updateObject(keyVal, object = {}) {
  if (typeof keyVal !== 'object') {
    throw new Error('Key: Value pair must be defined.');
  }
  return Object.freeze({
    ...keyVal,
    ...object
  });
}

export default { updateObject };
