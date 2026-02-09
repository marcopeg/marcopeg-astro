---
title: "Thy Shall NOT Burn in the Context Provider HELL"
description: "How to structure your React PWA to achieve loose coupling of features and avoid the Context Provider Hell"
pubDate: "2022-01-31T07:16:05.000Z"
updatedDate: "2022-02-10T11:31:17.000Z"
heroImage: "/content/images/2022/01/highway-to-hell-banner.jpeg"
---

In this article, I'm going to propose how to structure a _React PWA_ in a way that not only achieves a [loose coupling](https://en.wikipedia.org/wiki/Loose_coupling) of responsibilities and [_SRP_](https://en.wikipedia.org/wiki/Single-responsibility_principle)_;_ but also streamlines the [_Context Provider_](https://reactjs.org/docs/context.html) definitions making it easier to work with.

* * *

Do you remember the _[Callbacks' Hell](http://callbackhell.com/)_?  
It looked like this:

```js
validateUser(data, (err, data) => {
  if (err) throw 'No way!';
  
  saveUser(data, (err, data) => {
    if (err) throw 'No way!';
    
    reloadUser(data, (err, data) => {
    
      ... you got the gist of it, right?
      
    });
  });
});
```

Callbacks' Hell back in the days before Promises

You could go on forever nesting side effects of asynchronous actions in the Callbacks' Hell. Limitless. Painful. We moved past that situation thanks to two things:

1.  Promises
2.  async/await

That is undoubtedly good news for the dreaded JavaScript community. You know, the one that when it comes to math, 78% of the people are bad at it, and 32% are good.

But then React came along and took over Angular, bringing peace to the Galaxy and Context Providers to the _index.js:_

```js
ReactDOM.render(
  (
    <Auth0Provider>
      <MuiThemeProvider>
        <ReactRouterProvider>
          <ApolloProvider>
            <App />
          </ApolloProvider>
        </ReactRouterProvider>
      </MuiThemeProvider>
    </Auth0Provider>
  ),
  document.getElementById('root')
)
```

Modern React's ContextProviders' Hell

Does this remind you in any way to the **Callbacks' Hell** abovementioned? Indeed it does; this **is just a new kind of Hell** fired up by React's _Context Provider_ pattern – which is a good pattern, by the way.

![](https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/1140x_a10-7_cTC/bob-dylan-u2077188-jpg-1544200128.jpg)

All along the Watchtower – Bob Dylan

## There must be some kind of way outta here

> Said the joker to the thief  
> There's too much confusion  
> I can't get no relief

Bob Dylan – and later on Jimi Hendrix – knew what I'm talking about. This couldn't be it, and we must not add confusion on top of an already confusing world.

[ForrestJS](https://forrestjs.github.io/) offers a small plugin library for Javascript and an ecosystem of ready-to-use packages that wrap famous third-party libraries into composable services.

```js
// 1 - Load the core library:
import forrest from '@forrestjs/hooks';

// 2 - Load stuff that you want to compose:
import { service1 } from '@forrestjs/service1';
import { service2 } from '@forrestjs/service2';

// 3 - Run your App:
forrest.run([service1, service2])
  .then(() => console.log('Your App booted correctly'))
  .catch((err) => console.error('Oooops...', err));
```

The scaffold of a ForrestJS App

When it comes to running a React App, it could be as simple as:

👉 Here you can find a comprehensive step-by-step tutorial that helps you run a React App with ForrestJS: [https://forrestjs.github.io/howto/my-first-react-app/](https://forrestjs.github.io/howto/my-first-react-app/)

Now let's dive deeper into how to structure Application Wrappers.

If you are in a rush, here you can find the complete and commented codebase:

## What is a Context Provider anyway?

A React wrapper is just a component that receives a _children_ property and renders it, among other stuff:

```js
const MyWrapper = ({ children }) => (
  <div>
    <h1>A Title</h1>
    {children}
  </div>
);
```

A straightforward React Wrapper Component

This wrapper simply decorates any children with a static title.  
Not so valuable, right?

Let's look at a slightly more interesting Wrapper Component example and build an Authentication Provider:

```js
// 1. Import dependencies from React
import { createContext, useContext, useState } from "react";

// 2. Create a context
//    https://reactjs.org/docs/context.html
const AuthContext = createContext();

// 3. Create the AuthWrapper that is capable of some
//    kind of state manager that is then stored in the
//    Context as well as some API
const AuthProvider = ({ children, initialUser = null }) => {
  const [user, setUser] = useState(initialUser);

  const auth = {
    user,
    login: setUser,
    logout: () => setUser(null)
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Export a custom React hook that makes it easy to
//    use the Context data and API
export const useAuth = () => useContext(AuthContext);
```

An essential Context Provider that provides Authentication to its inner components tree

The App Component will then be able to access the currently logged in user:

```js
import { useAuth } from "./Auth";

const App = () => {
  const { user } = useAuth();

  return (
    <div>
      Hello <i>{user}</i>
    </div>
  );
};
```

Basic usage of the AuthProvider that we've built

## Getting out of Hell!

Now things get interesting. In a classic React App, you would do something like:

```js
<AuthProvider initialUser={'Luke Skywalker'}>
  <App />
</AuthProvider>
```

Classic ContextProviders' Hell approach

And you would slowly dig your grave into the _ContextWrappers' Hell_.

Thanks to ForrestJS, you can easily describe both _App_ and _AuthWrapper_ as a Feature:

```js
// App.js
export default {
  target: "$REACT_ROOT_COMPONENT",
  handler: { component: App }
};

// Auth.js
export default {
  target: "$REACT_ROOT_WRAPPER",
  handler: {
    component: AuthProvider,
    props: {
      initialUser: "Luke Skywalker"
    }
  }
};
```

ForrestJS packages are just JSON manifests.

Finally, in the App's _index.js_, we can compose our different pieces:

```js
import forrest from "@forrestjs/hooks";

// Import third-party packages:
import reactRoot from "@forrestjs/react-root";

// Import Features from our codebase:
import app from "./App";
import auth from "./Auth";

// Compose your App with services and features:
forrest.run({
  services: [reactRoot],
  features: [app, auth]
}).catch((err) => console.error(`Boot: ${err.message}`));
```

Our final App's manifest using ForrestJS Features

Here you find the complete codebase to this tutorial, heavily commented and ready to be forked and expanded:

Play with the live example on CodeSandbox

## Conclusions

With ForrestJS, we can **transform nested Wrappers into linear** and independently defined components for our Application.

> Of course, this works best when you have multiple _Context Providers_, which is often the case.

Implementing a [loosely coupled approach](https://en.wikipedia.org/wiki/Loose_coupling) is essential and convenient if you are working on a large codebase or with a large team(s) organization.

The practical implications are:

*   Minimize code conflicts because they can only happen in _index.js_ when adding a new Feature
*   Maximize independent work because developer Jane Doe will focus on her Feature folder, likely working in her Feature branch
*   Maximize API-first approach because the interaction between Features happen as [ForrestJS documented extension points](https://forrestjs.github.io/api/create-hook/)