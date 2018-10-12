Client-side storage can be used to store data that is useful for the user (as an example, when an user login in a website and he does not have to do it when he come back).

There are a few options on Client-side storage, as an example we have:

- ### Web Storage
    - localStorage: stores the data until it's deleted
    - sessionStorage: stores the data while the user do not close his browser

- ### IndexedDB
  Database that can be used to store data in the browser, but it must be used carefully to not overload user's browser.

- ### Service Workers (offline)
- Cache API