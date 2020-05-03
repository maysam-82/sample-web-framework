# Building Sample Web Framework

## Start

We are going to have two type of classes.

### Model classes:

It is going to handle data, used to represent Users, Blog Posts, Images, ....

### View classes:

Handle HTML and events caused by the user action.

### JSON Server:

This is a third part package that installed via `npm` to setup a server very quickly and easily. It has the ability to receive an information and store it in the plain `JSON` file and serve that information back to us.

`npm i -g json-server`
As soon as installing `json-server` we have to point it to actual `JSON` file or a file that contains some `JSON` data. this file will act as a database.
In editor, create a `JSON` file in main root directory called `db.json`.
inside of this file:

```JSON
{
  "users":[]
}
```

To start up a Json Server:

- Open new terminal window inside project directory.
- Run `json-server -w db.json`

To work with json-server we need to install axios `npm i axios`.
In current terminal run `parcel index.html`.
We have to have two separate terminal running at the one time.
To run both commands properly we can add `scripts` in `package.json` file.

```JSON
"scripts": {
  "start:db": "json-server -w db.json",
  "start:parcel": "parcel index.html"
}
```

and then in terminals run:

- `npm run start:db`
- `npm run start:parcel`
