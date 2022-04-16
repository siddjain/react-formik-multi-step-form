# README

This package provides some helper methods and classes to create multi-steps forms in React using Formik library.
The main class in the package is `FormikStepper`. Here is a [demo](https://codesandbox.io/s/multi-step-form-demo-9x135b)
using this package to create a multi-step form.

When you use this package in your app, you have to install all the dependencies declared under `peerDependencies`
in `package.json`. Note: please set `GENERATE_SOURCEMAP=false` as follows in your `package.json`:

```
"scripts": {
    "start": "GENERATE_SOURCEMAP=false react-scripts start",
    "build": "GENERATE_SOURCEMAP=false react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
```

otherwise you will get some [warnings](https://stackoverflow.com/questions/70599784/failed-to-parse-source-map) saying `Unable to parse source map`.

Rest of the document is for me - developer of the project

## Init 

Below are commands I used to init the project. These commands don't need to be run if you are cloning the repo.

```
$ npm init
```

```
$ npm i typescript ts-node nodemon --save-dev
```

```
$ npx tsc --init
```

## Build 

```
npm i
```

will both install all dependencies and build the project. `dist` directory will contain the built project.
To just build the project (e.g., once you have installed the dependencies) run:

```
npm run build
```

## Test

Next we need to test it locally before publishing to NPM. For this pack the project first:

```
npm pack
```

This will pack all the files declared under `files` in `package.json` and generate a tarball `siddjain-react-formik-multi-step-form-0.1.0.tgz`.
Copy over this tarball to the test project which will use this package.

Then install the tar by running:

```
$ npm i siddjain-react-formik-multi-step-form-0.1.0.tgz
```

Now you can use this package in the test project.

## Publish

Once you have tested, publish the package to NPM by running:

```
$ npm publish --access public
```

See [this](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)

## Notes

I tried to use rollup to build the project without success. Ran into many issues and finally gave up after [this](https://github.com/wojtekmaj/react-datetimerange-picker/issues/54).

## LICENSE

[MIT](LICENSE.txt)