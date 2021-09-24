# login-service



This repository contains the auth API of "ion-vue" project that features user authorization and user registration.

<!-- [Live site](https://thinklikeadesigner.github.io/news-explorer-frontend/) -->




<!-- http://api.morning-paper.students.nomoreparties.site -->


Installation
------------

All you need to do is clone this repository

```
git clone https://github.com/thinklikeadesigner/news-explorer-api.git

```

<!-- ### [](https://github.com/werein/react#keep-it-up-to-date)Keep it up to date -->

Track this repo

```
git remote add upstream https://github.com/thinklikeadesigner/news-explorer-api.git
```

Get the latest version and apply onto your stack

```
git fetch upstream
git merge upstream/master

```

[](https://github.com/werein/react#running)Running
--------------------------------------------------

Application has very few dependencies, so it's most probably very easy to understand when you scan through the code, but there is at least few steps you should know

To start this application server in development mode run command below and open your app on `http://localhost:3000`

```source-js
npm run dev
```

Another thing you should take into account is that this application is protected by auth, so you will have to "sign up" by making a ```POST``` request on [Postman](https://www.postman.com/) with a name, email, and password at ```http://localhost:3000/signup```, and then making a ```POST``` request at ```http://localhost:3000/signin``` with the same name and password. I'm not sure but I think you have to have Postman downloaded locally to see your localhost requests. The second post should return a token that you can save using [Postman's auth feature](https://learning.postman.com/docs/sending-requests/authorization/#bearer-token) under "Bearer token". After that you are free to use the rest of the endpoints.

```javascript
// POST /signup

// example

{
"name": "john",
"email": "john@email.com",
"password": "password"
}


// POST /signin

{
"email": "john@email.com",
"password": "password"
}
