Client-side storage can be used to store data that is useful for the user (as an example, when an user login in a website and he does not have to do it when he come back).

There are a few options on Client-side storage, as an example we have:

- ### Web Storage
  Domain specific strategy that maintains a website information in a key/value structure. The values must be primitive values valid on JavaScript (Strings, numbers, booleans etc).
    - localStorage: stores the data until it's deleted. Suggested when you want to persist not privacy data about the user (for example, preferences on a website);
    - sessionStorage: stores the data while the user do not close his browser. Suggested when you want to persist information during user session (for example, you can store the uncompleted content of a post on a blog). Once the browser is close, the data is gone.

- ### IndexedDB
  Database that can be used to store data in the browser, but it must be used carefully to not overload user's browser.

- ### Service Workers (offline)
- Cache API