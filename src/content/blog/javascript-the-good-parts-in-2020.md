---
title: "JavaScript: the Good Parts in 2020"
description: "This is a personal list of the stuff that I like about JavaScript and that I believe should be used today."
pubDate: "2020-10-27T23:00:00.000Z"
updatedDate: "2021-11-03T09:23:12.000Z"
heroImage: "/content/images/2021/11/js.png"
---

“JavaScript: the good parts” is a book by Douglas Crockford that made it big in 2008 as the world began to realize that web development and, particularly, **_front-end_ technologies** were here to stay.

In the book, Douglas focuses on aspects of the language that we can use **to write clean code that runs fast**: JavaScript for the Enterprise.

This is my reviewed version of it, adjourned to 2020 because a whole lot of things have changed in the last 12 years.

> Less is More  
> — Ludwig Mies van der Rohe

## Constants

[Constants](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) are [_block-scoped_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block) variables whose **reference can not be mutated**.  
If you try to change their reference, you will get an exception:

```js
const name = 'John';

try {
  name = 'Luca';
}
catch (err) {
  console.log('You can NOT mutate a constant!');
  console.log(err);
}
```

Constants let the [JavaScript engine](https://v8.dev/) to run critical optimization while building the assembly out of your source code.

[Click here to read a good article about constants.](https://medium.com/dailyjs/use-const-and-make-your-javascript-code-better-aac4f3786ca1)

### 👉 It’s easy to use default values for constants:

```js
// ❌ bad way, using variables:
let foo = doSomething();
if (!foo) {
  foo = 'default value';
}

// ✅ good way, using constants:
const foo = doSomething() || 'default value';
```

### 👉 You get even more control with [Ternary Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator):

```js
const result = doSomething();
const foo = (result === null)
  ? 'default value'
  : result;
```

### 👉 Mind that `value` and `reference` is a different thing:

```js
// ❌ bad: this tries to change the constant's reference:
const foo = 'xxx';
foo = 'yyy'; 

// ✅ good: "foo" reference remains unchanged:
const foo = {
  key: 'xxx'
};
foo.key = 'yyy';
```

[Click here to read a good article about “value vs reference”.](https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0)

## Strict Equality

[Strict Equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) ensures faster comparison by enforcing type check.

```js
// ❌ bad way, using loose equality:
//    those examples will yield "true" even if it's 
//    quite obvious that it is not what we expect:lear that 
console.log(1 == "1");
console.log(1 == true);
console.log(0 == false);
console.log(0 == "");
console.log(null == undefined);

// ✅ good way, using strict equality:
//    the same comparison will now yield a correct "false" result:
console.log(1 === "1");
console.log(1 === true);
console.log(0 === false);
console.log(0 === "");
console.log(null === undefined);
```

## Template Literals

```js
const name = 'John';
const surname = 'Doe';

console.log(`hello ${name} ${surname}`);
```

[MDN: Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

## Arrow Functions

```js
const fn = () => {};
```

[Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) are a relatively newly introduced syntax to create functions. It’s natively supported in NodeJS since version 4.4.5 and by all major browsers excluding IE.

> With this syntax,  
> you can build just a function

There is no `this` so you can’t fall into the temptation of creating constructors. And there is no runtime scope, so you can’t mess with it using `call`, `apply` or `bind`. It is also [very complicated to implement recursion with arrow functions](https://stackoverflow.com/questions/25228394/how-do-i-write-an-arrow-function-in-es6-recursively). Although recursion is not a bad thing at all, it is often misused and ends up in memory issues, so it is not a bad thing that it is really difficult to implement it with arrow functions ;-)

### 👉 Single argument syntax

A function that takes just one argument can skip the `()` around it:

```js
// Single argument:
const sayHi = name => {
  console.log(`hi, ${name}`)
};
sayHi('John');

// Multiple arguments

const sayHi = (name, surname) => {
  console.log(`hi, ${name} ${surname}`)
};
sayHi('John', 'Doe);
```

### 👉 Single instruction syntax

A function that does just one thing, can omit `{}` and has an implicit `return statement`:

```js
const sum = (a, b) => a + b;
console.log(sum(2, 4))
```

### 👉 Returning Objects

Be careful with the meaning of `{}` when you want to return an object:

```js
// ❌ bad way, here the curly brackets are interpreted as
//    the function's body:
const makeObject = (key, val) => { key: val};

// ✅ good way, wrap your object so to make it an explicit reference:
const makeObject = (key, val) => ({ key: val});
```

### 👉 Arguments Default Values

An argument can define a default value:

```js
const calculateAge = (dateOfBirth, today = new Date()) => {
  const diff_ms = today.getTime() - dateOfBirth.getTime();
  const age_dt = new Date(diff_ms);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
};

console.log(`You are ${calculateAge(new Date("1946-06-02"))} years old`);
console.log(`You were ${calculateAge(new Date("1946-06-02"), new Date("2010"))} years old in 2010`);
```

### 👉 Function Composition

It’s very easy to tap into [Function Composition](https://en.wikipedia.org/wiki/Function_composition_\(computer_science\)) and [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle):

```js
const ensureDate = (value) => (value instanceof Date ? value : new Date(value));
const dateDiff = (d1, d2) => ensureDate(d1).getTime() - ensureDate(d2).getTime();
const dateYears = (date) => Math.abs(date.getUTCFullYear() - 1970);
const calculateAge = (dateOfBirth, today = new Date()) => dateYears(new Date(dateDiff(today, dateOfBirth)));

console.log(`You are ${calculateAge(new Date("1946-06-02"))} years old`);
console.log(`You were ${calculateAge(new Date("1946-06-02"), new Date("2010"))} years old in 2010`);
```

### 👉 Currying

And it’s also easy to [curry](https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983) and [thunk](https://en.wikipedia.org/wiki/Thunk):

```js
// Generic thunk to sum numbers:
const add = a => b => a + b;

// Specialized function that increase a number:
const inc = add(1);

console.log(inc(1));
console.log(inc(10));
```

### 👉 Avoid Switch Operators

It’s definitely easy to **avoid switch operators** using [Function Composition](https://en.wikipedia.org/wiki/Function_composition_\(computer_science\)) and [Early Returns](https://medium.com/better-programming/are-early-returns-any-good-eed4b4d03866):

```js
// ❌ bad way, using conditionals:
let foo = null;
let res = doSomething();

if (res === 'a') {
  foo = 'option 1';
} else if (res === 'b') {
  foo = 'option 2';
} else {
  foo = 'no choice';
}

// ❌ bad way, using switch:
let foo = null;
swith (doSomething()) {
  case 'a':
    foo = 'option 1';
    break;
  case 'b':
    foo = 'option 2';
    break;
  default:
    foo = 'no choice';
}

// ✅ good way, using Function Composition & Return First:
const getChoice = (res) => {
  if (res === "a") return "option 1";
  if (res === "b") return "option 2";
  return "no choice";
};

const foo = getChoice(doSomething()) || 'default value';
```

## IIFE: Immediately Invoked Function Expression

The [immediately Invoked Function Expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) is a neat syntax that leverages the fact that you can wrap any piece of code with `()` in order **to retrieve the reference** to it. While this is not really useful with _symbols_ and _primitives_, it gets extremely in handy with _objects_:

```js
const italianToday = (() => {
  const pad = (v) => String(v).padStart(2, 0);
  const today = new Date();
  const day = pad(today.getDate());
  const month = pad(today.getMonth() + 1);
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
})();

console.log(italianToday);
```

Used properly, **_IIFE_ prevents you to pollute the scope with support variables** and eventually lets you write cleaner and more declarative code.

## Destructuring Assignment

The [Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) allows to export symbols into the current block:

```js
const payload = {
  name: 'John',
  surname: 'Doe',
  dateOfBirth: '1946-06-02'
}

const { name, surname } = payload;

console.log(`name: ${name}`);
console.log(`surname: ${surname}`);
```

### 👉 Importing Modules

It is particularly useful when importing only parts of a module:

```js
// With classic NodeJS style:
const { useMemo, useEffect } = require('react');

// With ES6 modules:
import { useMemo, useEffect } from 'react';
```

### 👉 Fulfill Open/Close

And you can use it to implement the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle):

```js
// ❌ bad way, using positional arguments with default values:
const doSomething = (a = 1, b = 2, c = 3) => a + b + c;
console.log(doSomething());
console.log(doSomething(5, 5, 5));

// ✅ good way, using destructuring assignment and defaults:
const doSomething = ({ a = 1, b = 2, c = 3 } = {}) => a + b + c;
console.log(doSomething());
console.log(doSomething({ a: 5, b: 5, c: 5 }));
```

The first implementation uses **positional arguments** so if you need to add a new argument to enrich the function’s capability you have 2 choices:

1.  just append the new argument at the end of the list
2.  refactor all the code that uses this function

There are also some other disadvantages of using positional arguments such as **you can not skip middle arguments**.

The second implementation uses the **destructuring assignment** in order to create a map of `key:value` that makes it possible:

1.  the caller can provide arguments in any order
2.  the caller can specify only part of the arguments, the rest will default
3.  adding a new argument (with a default value) won’t break existing code

[Click here to read a good article about “named arguments vs positional arguments”](https://blog.bitsrc.io/javascript-why-named-arguments-are-better-than-positional-arguments-9b15ab3155ef)

### 👉 Rename Properties

You can rename properties while destructuring:

```js
const payload = {
  first: "John",
  last: "Doe"
};

const { first: name, last: surname } = payload;

console.log(`${name} ${surname}`);
```

### 👉 Nested Destructuring

You can also nest destructuring assignments:

```js
const payload = {
  name: {
    first: "John",
    last: "Doe"
  },
  address: {
    city: "Malmö",
    country: "Sweden"
  }
};

const {
  name: { first: name },
  address: { city }
} = payload;

console.log(`${name} lives in ${city}`);
```

### 👉 With Arrays

Destructuring Assignment **works with arrays as well**:

```js
const payload = ['one', 'two', 'three'];

// Destructure the first two items:
const [ first, second ] = payload;

console.log(`first: ${first}`);
console.log(`second: ${second}`);
```

## Array API

Lists are ubiquitous nowadays and the good old `for ... do` is gone. Instead, you should consider using the [Array API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) that, in composition with the **arrow functions** make your code more expressive and readable.

> Javascript engines like [V8](https://v8.dev/) are also able to seriously optimize the exeution of chained Array API.

```js
const jsStuff = [{
  operator: 'switch',
  isAnyGood: false
}, {
  operator: 'var',
  isAnyGood: false
}, {
  operator: 'for',
  isAnyGood: false
}, {
  operator: 'const',
  isAnyGood: true
}, {
  operator: '...',
  isAnyGood: true
}];

// ❌ bad way, using variables and FOR Loops:
let theGoodPart = [];
for (let item of jsStuff) {
  if (true === item.isAnyGood) {
    theGoodPart.push(item);
  }
}

// ✅ good way, using Array API and Function Composition:
const isGood = (item) => (true === item.isAnyGood);
const operatorOnly = (item) => item.operator;
const theGoodPart = jsStuff
  .filter(isGood)
  .map(operatorOnly);
```

## Rest Operator

The [rest operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) is a sweet tool to collect “whatever else” from a Javascript object.

### 👉 Use it in combination with the Destructuring Assignment:

```js
const payload = {
  name: 'John',
  surname: 'Doe',
  dateOfBirth: '1946-06-02',
  hobbies: ['paragliding', 'sailing']
};

// Extract information and collect the remaining keys into "other"
const { name, surname, ...other } = payload;

console.log(other);
```

## 👉 Use it to collect a function’s arguments into an array:

```js
const foo = (a, b, ...args) => {
  console.log(`a: ${a}`);
  console.log(`b: ${b}`);

  // Log all the other arguments:
  args.forEach((arg, idx) => console.log(`${idx}: ${arg}`));
}

foo('a', 'b', 'c', 'd', 'e');
```

## Spread Operator

The [Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) lets you quickly build [shallow copies](https://medium.com/@serdarkabaoglu/shallow-copying-cloning-objects-in-javascript-ee8e0f1c1058) of objects:

```js
const payload = {
  name: 'John',
  surname: 'Doe',
  dateOfBirth: '1781-06-30',
  hobbies: ['paragliding', 'sailing']
};

const shallowCopy = {
  ...payload,
  dateOfBirth: '1946-06-02',
  married: true
}
```

### 👉 Nested Spread Operator

You can nest spread operator to achieve a _manual deep copy_:

```js
const payload = {
  info: {
    first: "John",
    last: "Doe"
    address: {
      city: "Malmö",
      country: "Sweden"
    }
  },
  hobbies: ['paragliding', 'sailing']
};

// This is not going to look good for deeply nested objects...
// https://www.npmjs.com/package/clone-deep
const shallowCopy = {
  ...payload,
  info: { 
    ...payload.info,
    address: { ...payload.info.address }
  },
  hobbies: [ ...payload.hobbies ],
}
```

## Promises

[Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) are ways to streamline what once was referred to as [the callback hell](http://callbackhell.com/).

Any asynchronous code could be wrapped up and served as a Promise:

```js
const doSomething = () => console.log('do something...');

// ❌ bad way, using callbacks:
setTimeout(doSomething, 1000);

// ✅ good way, wrap the asynchronous code with a promise:
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// then use the Promised based asynchronous utility:
delay(1000).then(doSomething);
```

For this little example, it may seem to be an overcomplication… but if you try to do something more complex like putting together multiple asynchronous and callback-based functions it will make much more sense:

```js
// Some ludicrous but asynchronous functions:
const delayedSum = (a, b, next) => setTimeout(() => next(a + b), 10);
const delayedMulti = (a, b, next) => setTimeout(() => next(a * b), 10);
const delayedDivision = (a, b, next) => setTimeout(() => next(a / b), 10);

// ❌ bad way, callback hell:
delayedSum(1, 1, (result) => {
  delayedMulti(result, 2, (result) => {
    delayedDivision(result, 2, (result) => {
      console.log(`(1 + 1) * 2 / 2 = ${result}`);
    });
  });
});
```

This thing with nested callbacks can go on forever when you deal with multiple database lookups, HTTP requests, or File System interactions.

Here is a small utility that uses [Arrow Functions](/2020/javascript-the-good-parts#arrow-functions), [Rest Operator](/2020/javascript-the-good-parts#rest-operator), and [Currying](https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983) to **transform any callback-based function into a promise-based** one:

```js
const promisify = (fn) => (...args) =>
  new Promise((resolve, reject) =>
    fn(...args, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  );
```

With this utility, we can easily transform our functions to Promises:

```js
// ✅ good way, wrap the asynchronous code with a promise:
const delayedSumP = promisify(delayedSum);
const delayedMultiP = promisify(delayedMulti);
const delayedDivisionP = promisify(delayedDivision);
```

And finally, use them in a nice Promise chain:

```js
// ✅ good way, use Promise.resolve() to start a Promise chain:
Promise.resolve()
  .then(() => delayedSumP(1, 1))
  .then((result) => delayedMultiP(result, 2))
  .then((result) => delayedDivisionP(result, 2))
  .then((result) => console.log(`(1 + 1) * 2 / 2 = ${result}`));
```

## Async / Await

The [`async / await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) is just a simpler syntax around [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

We can easily rewrite the last example as:

```js
// 👉 "await" must be used inside an "async" function
const doTheJob = async () => {
  const r1 = await delayedSumP(1, 1);
  const r2 = await delayedMultiP(r1, 2);
  return delayedDivisionP(r2, 2);
}

// 👉 an "async" function always return a promise:
doTheJob()
  .then(result => console.log(`(1 + 1) * 2 / 2 = ${result}`))
  .catch(error => `Could not do the math: ${error.message}`);
```

👉 You can use `try / catch` in combination with `async / await`:

```js
(async () => {
  try {
    const result = await doTheJob();
    console.log(`(1 + 1) * 2 / 2 = ${result}`);
  }
  catch (error) {
    console.log(`Could not do the math: ${error.message}`);
  }
})();
```

In the end, `async / await` it’s just syntactic sugar around a Promise and lets you write your code in a procedural style that is easier on the eye.

## Error Handling

Error handling is definitely Javascript’s Achille’s knee. Tools like [VSCode](https://code.visualstudio.com/), [Chrome’s DevTools](https://developers.google.com/web/tools/chrome-devtools), and [source-maps](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) make our life less painful, still, Javascript error management is not great compared to other languages.

Here are a few tips to **improve your developer’s experience** in Javascript when it comes to errors and debugging.

### 👉 Save Often:

> If you save after one single LOC change and get an error, you know for sure that the bug lies within that single line of code.

When you do backend you can use tools like [Nodemon](https://nodemon.io/) to live-reload your code every time you save a file (if it gets slow, it is a good indicator you are doing something wrong with your application).

In the modern frontend, it’s common to leverage on [live-reload](http://livereload.com/) and [hot module replacement](https://webpack.js.org/guides/hot-module-replacement/) to apply code changes on save. If this process slows down, it is even more critical that you figure out what are you doing wrong, as loading performances in the frontend are paramount!

### 👉 Use TDD and Jest:

[Test-Driven Development](https://en.wikipedia.org/wiki/Test-driven_development) is not just a QA tool, it is the most useful **active development tool EVER**.

Unit testing using [Jest](https://jestjs.io/) is unbelievably fast. You can consider unit testing as **abstract programmatic silent breakpoints**. Your code goes through as many breakpoints as you may need, and an alarm goes off in case any expectation is not met.

E2E testing is similar, and you can still use [Jest](https://jestjs.io/) to run it. But in this case, your programmatic breakpoints are **state aware** and you can check for real-time execution.

To me, it’s almost unthinkable to develop an API without TDD nowadays.

### 👉 Throw Specific Errors

One of the few info that the Javascript engine spits out when things go south is the error name:

```js
try {
  throw new Error("foobar");
} catch (err) {
  console.log(`Error name: ${err.name}`);       // -> Error
  console.log(`Error message: ${err.message}`); // -> foobar
}
```

You may want to carefully choose a specific Javascript error that helps to represent the failing situation:

```js
const vote = (age, value) => {
  if (age < 18) {
    throw new RangeError('You must be 18 years old.')
  }

  return callYourVotingAPI(value);
}
```

In this example, we apply a simple age-based validation rule and we throw a specific error that clearly communicates what’s going wrong.

In JavaScript there are a few specialized errors:

*   Error
*   EvalError
*   RangeError
*   ReferenceError
*   SyntaxError
*   TypeError
*   URIError

### 👉 Throw Custom Errors

Even better than specialized errors, custom errors!

```js
// Define a custom error by extending an existing error type:
class RequiredMinAgeError extends RangeError {
  constructor(message = "You must be 18 years old.") {
    super(message);
    this.name = "RequiredMinAgeError";
  }
}

// Throw your custom error type
try {
  throw new RequiredMinAgeError();
} catch (err) {
  console.log(`Error name: ${err.name}`);
  console.log(`Error message: ${err.message}`);

  // The error is an istance of the custom error and its ancestors:
  console.log(err instanceof RequiredMinAgeError); // -> true
  console.log(err instanceof RangeError);          // -> true
  console.log(err instanceof Error);               // -> true

  // But it is NOT an instance of other specialized errors
  console.log(err instanceof EvalError);           // -> false
  console.log(err instanceof ReferenceError);      // -> false
  console.log(err instanceof SyntaxError);         // -> false
  console.log(err instanceof TypeError);           // -> false
  console.log(err instanceof URIError);            // -> false
}
```

Some cool stuff about custom errors:

*   You can provide meaningful error names
*   You can define a default value for the error message
*   You can decorate them with any other properties you may need

[Click here for a cool guide to error handling.](https://www.valentinog.com/blog/error/)

## Try / Catch

One thing is sure in life: errors happen. The [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) statement helps to take ownership of runtime errors and handle them programmatically.

### 👉 Avoid Tedious Conditionals

In modern web development, you can use `try...catch` to simplify tedious checks like:

```js
// ❌ bad way, using tedious checks:
let val = null;
if (myObject.k1 && myObject.k1.k2 && myObject.k1.k2.k3) {
  val = myObject.k1.k2.k3;
}

// ✅ good way, using try...catch:
let val = null;
try {
  val = myObject.k1.k2.k3;
} catch () {
  val = null;
}

// 😎 cool way, with const, immediate expression & arrow functions:
const val = (() => {
  try {
    return myObject.k1.k2.k3;
  } catch () {
    return null;
  }
})();
```

### 👉 Check HTTP Errors

Let’s say that you want to build a nice function `fetch()` that wraps the famous library `axios`, and - **for the purpose of better error handling** - you also want to throw some custom errors in case things go south:

```js
// Import AXIOS library:
// https://www.npmjs.com/package/axios
const axios = require("axios");

/**
 * Define some custom errors as explained in the earlier paragraph:
 */ 

class FetchError extends Error {
  constructor(originalError) {
    super(originalError.message);
    this.name = "FetchError";
    this.originalError = originalError;
  }
}

class RequestError extends FetchError {
  constructor(...params) {
    super(...params);
    this.name = "RequestError";
  }
}

class ResponseError extends FetchError {
  constructor(...params) {
    super(...params);
    this.name = "ResponseError";
  }
}

class NotFoundError extends ResponseError {
  constructor(...params) {
    super(...params);
    this.name = "NotFoundError";
  }
}
```

The piece of code where you do the error handling is quite simple to identify:

```js
const fetch = async (url) => {
  try {
    const { data: { title } } = await axios.get(url);
    return `Todo: ${title}`;
  } catch (err) {
    // --->
    // HANDLE ERROR HERE!
    // <--- 
  }
};
```

Without `try...catch` you may need to resolve to nested conditionals which is quite a poor way to handle this problem:

```js
/**
 * ❌ bad way, using nested conditionals:
 */

} catch (err) {
  if (err.response) {
    if (err.response.status === 404) {
      throw new NotFoundError(err);
    }
    throw new ResponseError(err);
  }
  if (err.request) {
    throw new RequestError(err);
  }
  throw new FetchError(err);
}
```

But you can make a clever utilization of `try...catch` and [SRP](https://en.wikipedia.org/wiki/Single-responsibility_principle) and build a function that identifies which error to throw in a more readable way:

```js
/**
 * ✅ good way, using try...catch and SRP:
 */

// Specialized function that identifies the error thrown by Axios:
const getFetchError = (err) => {
  // Test for a Request error:
  try {
    if (err.response.status === 404) {
      return new NotFoundError(err);
    }
    return new ResponseError(err);
  } catch (err) {}

  // Test for a Response error:
  try {
    if (err.request) {
      return new RequestError(err);
    }
  } catch (err) {}

  // Fallback on a generic error:
  return new FetchError(err);
};

// Here goes the entire `fetch()` implementation:
const fetch = async (url) => {
  try {
    const { data: { title } } = await axios.get(url);
    return `Todo: ${title}`;
  } catch (err) {
    throw getFetchError(err);
  }
};
```

Even if for this simplistic example the “good way” means writing more code, we still achieve:

1.  better readability
2.  better unit testing  
    (as we can test the `getFetchError()` function in complete isolation.)
3.  fulfillment of SRP

## Conclusions

**JavaScript is a good language.**  
It simply has too much legacy that you should really avoid 😉.