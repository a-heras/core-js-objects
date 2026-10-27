/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */
function shallowCopy(obj) {
  const result = {};
  return Object.assign(result, obj);
}

/**
 * Merges array of objects into a single object. If there are overlapping keys, the values
 * should be summed.
 *
 * @param {Object[]} objects - The array of objects to merge
 * @return {Object} - The merged object
 *
 * @example
 *    mergeObjects([{a: 1, b: 2}, {b: 3, c: 5}]) => {a: 1, b: 5, c: 5}
 *    mergeObjects([]) => {}
 */
function mergeObjects(objects) {
  return objects.reduce((acc, obj) => {
    const entries = Object.entries(obj);
    for (let i = 0; i < entries.length; i += 1) {
      const key = entries[i][0];
      const value = entries[i][1];
      acc[key] = (acc[key] || 0) + value;
    }
    return acc;
  }, {});
}

/**
 * Removes a properties from an object.
 *
 * @param {Object} obj - The object from which to remove the property
 * @param {string[]} keys - The keys of the properties to remove
 * @return {Object} - The object with the specified key removed
 *
 * @example
 *    removeProperties({a: 1, b: 2, c: 3}, ['b', 'c']) => {a: 1}
 *    removeProperties({a: 1, b: 2, c: 3}, ['d', 'e']) => {a: 1, b: 2, c: 3}
 *    removeProperties({name: 'John', age: 30, city: 'New York'}, ['age']) => {name: 'John', city: 'New York'}
 */
function removeProperties(obj, keys) {
  const result = {};
  Object.assign(result, obj);
  for (let i = 0; i < keys.length; i += 1) {
    delete result[keys[i]];
  }
  return result;
}

/**
 * Compares two source objects. Returns true if the objects are equal and false otherwise.
 * There are no nested objects.
 *
 * @param {Object} obj1 - The first object to compare
 * @param {Object} obj2 - The second object to compare
 * @return {boolean} - True if the objects are equal, false otherwise
 *
 * @example
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 2}) => true
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 3}) => false
 */
function compareObjects(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (let i = 0; i < keys1.length; i += 1) {
    const key = keys1[i];
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) return false;
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
}

/**
 * Checks if the source object is empty.
 * Returns true if the object contains no enumerable own properties, false otherwise.
 *
 * @param {Object} obj - The object to check
 * @return {boolean} - True if the object is empty, false otherwise
 *
 * @example
 *    isEmptyObject({}) => true
 *    isEmptyObject({a: 1}) => false
 */
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Makes the source object immutable by preventing any changes to its properties.
 *
 * @param {Object} obj - The source object to make immutable
 * @return {Object} - The immutable version of the object
 *
 * @example
 *    const obj = {a: 1, b: 2};
 *    const immutableObj = makeImmutable(obj);
 *    immutableObj.a = 5;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    delete immutableObj.a;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    immutableObj.newProp = 'new';
 *    console.log(immutableObj) => {a: 1, b: 2}
 */
function makeImmutable(obj) {
  return Object.freeze(obj);
}

/**
 * Returns a word from letters whose positions are provided as an object.
 *
 * @param {Object} lettersObject - An object where keys are letters and values are arrays of positions
 * @return {string} - The constructed word
 *
 * @example
 *    makeWord({ a: [0, 1], b: [2, 3], c: [4, 5] }) => 'aabbcc'
 *    makeWord({ H:[0], e: [1], l: [2, 3, 8], o: [4, 6], W:[5], r:[7], d:[9]}) => 'HelloWorld'
 */
function makeWord(lettersObject) {
  const keys = Object.keys(lettersObject);
  let maxPos = -1;
  for (let i = 0; i < keys.length; i += 1) {
    const positions = lettersObject[keys[i]];
    for (let j = 0; j < positions.length; j += 1) {
      if (positions[j] > maxPos) maxPos = positions[j];
    }
  }
  const result = new Array(maxPos + 1);
  for (let i = 0; i < keys.length; i += 1) {
    const positions = lettersObject[keys[i]];
    for (let j = 0; j < positions.length; j += 1) {
      result[positions[j]] = keys[i];
    }
  }
  return result.join('');
}

/**
 * There is a queue for tickets to a popular movie.
 * The ticket seller sells one ticket at a time strictly in order and give the change.
 * The ticket costs 25. Customers pay with bills of 25, 50, or 100.
 * Initially the seller has no money for change.
 * Return true if the seller can sell tickets, false otherwise
 *
 * @param {number[]} queue - The array representing the bills each customer pays with
 * @return {boolean} - True if the seller can sell tickets to everyone, false otherwise
 *
 * @example
 *    sellTickets([25, 25, 50]) => true
 *    sellTickets([25, 100]) => false (The seller does not have enough money to give change.)
 */
function sellTickets(queue) {
  let count25 = 0;
  let count50 = 0;
  for (let i = 0; i < queue.length; i += 1) {
    const bill = queue[i];
    if (bill === 25) {
      count25 += 1;
    } else if (bill === 50) {
      if (count25 === 0) return false;
      count25 -= 1;
      count50 += 1;
    } else if (bill === 100) {
      if (count50 > 0 && count25 > 0) {
        count50 -= 1;
        count25 -= 1;
      } else if (count25 >= 3) {
        count25 -= 3;
      } else {
        return false;
      }
    }
  }
  return true;
}

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.getArea = function getArea() {
  return this.width * this.height;
};

/**
 * Returns the JSON representation of specified object
 *
 * @param {Object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { height: 10, width: 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {Object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 */
function fromJSON(proto, json) {
  return Object.assign(Object.create(proto), JSON.parse(json));
}

/**
 * Sorts the specified array by country name first and city name
 * (if countries are equal) in ascending order.
 *
 * @typedef {{
 * country: string,
 * city: string
 * }} GeoEntity
 *
 * @param {GeoEntity[]} arr
 * @return {GeoEntity[]}
 *
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 *    ]
 */
function sortCitiesArray(arr) {
  return arr.sort((a, b) => {
    if (a.country < b.country) return -1;
    if (a.country > b.country) return 1;
    if (a.city < b.city) return -1;
    if (a.city > b.city) return 1;
    return 0;
  });
}

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @typedef {{
 * country: string,
 * city: string
 * }} GeoEntity
 *
 * @param {GeoEntity[]} array
 * @param {(item: GeoEntity) => string} keySelector
 * @param {(item: GeoEntity) => string} valueSelector
 * @return {Map<string, string[]>}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ],
 *     item => item.country,
 *     item => item.city
 *   )
 *            =>
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"],
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
  const map = new Map();
  for (let i = 0; i < array.length; i += 1) {
    const key = keySelector(array[i]);
    const value = valueSelector(array[i]);
    if (map.has(key)) {
      map.get(key).push(value);
    } else {
      map.set(key, [value]);
    }
  }
  return map;
}

/**
 * Css selectors builder
 */

const cssSelectorBuilder = (() => {
  const order = [
    'element',
    'id',
    'class',
    'attr',
    'pseudoClass',
    'pseudoElement',
  ];

  const createSelector = () => {
    const parts = [];
    const counts = { element: 0, id: 0, pseudoElement: 0 };

    const checkOrder = (type) => {
      const currentIndex = order.indexOf(type);
      for (let i = 0; i < parts.length; i += 1) {
        const prevIndex = order.indexOf(parts[i].type);
        if (prevIndex > currentIndex) {
          throw new Error(
            'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
          );
        }
      }
    };

    const addPart = (type, value, single) => {
      checkOrder(type);
      if (single && counts[type] > 0) {
        throw new Error(
          'Element, id and pseudo-element should not occur more than one time inside the selector'
        );
      }
      parts.push({ type, value });
      counts[type] += 1;
    };

    const api = {
      stringify() {
        let result = '';
        for (let i = 0; i < parts.length; i += 1) {
          result += parts[i].value;
        }
        return result;
      },

      element(value) {
        addPart('element', value, true);
        return this;
      },

      id(value) {
        addPart('id', `#${value}`, true);
        return this;
      },

      class(value) {
        addPart('class', `.${value}`, false);
        return this;
      },

      attr(value) {
        addPart('attr', `[${value}]`, false);
        return this;
      },

      pseudoClass(value) {
        addPart('pseudoClass', `:${value}`, false);
        return this;
      },

      pseudoElement(value) {
        addPart('pseudoElement', `::${value}`, true);
        return this;
      },
    };

    return api;
  };

  return {
    element(value) {
      return createSelector().element(value);
    },

    id(value) {
      return createSelector().id(value);
    },

    class(value) {
      return createSelector().class(value);
    },

    attr(value) {
      return createSelector().attr(value);
    },

    pseudoClass(value) {
      return createSelector().pseudoClass(value);
    },

    pseudoElement(value) {
      return createSelector().pseudoElement(value);
    },

    combine(selector1, combinator, selector2) {
      return {
        stringify() {
          return `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
        },
      };
    },
  };
})();

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
