## Set up

```
$ npm init
```

```
$ npm i typescript ts-node nodemon --save-dev
```

npx tsc --init

## Debug Notes

In `peerDependencies` I have declared `"react": "^17.x.x"`. This is necessary and if I declare
`"react": ">=17.0.0"` I get this error while running `npm i`:

```
$ npm i
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: @siddjain/react-formik-multi-step-form@0.1.0
npm ERR! Found: react@18.0.0
npm ERR! node_modules/react
npm ERR!   peer react@">=17.0.0" from the root project
npm ERR!   peer react@">=16.14.0" from react-bootstrap@2.2.3
npm ERR!   node_modules/react-bootstrap
npm ERR!     peer react-bootstrap@">=2.0.0" from the root project
npm ERR!   2 more (react-dom, draft-js)
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer react@"0.13.x || 0.14.x || ^15.0.0-0 || 15.x.x || ^16.0.0-0 || ^16.x.x || ^17.x.x" from react-draft-wysiwyg@1.14.7
npm ERR! node_modules/react-draft-wysiwyg
npm ERR!   peer react-draft-wysiwyg@">=1.14.7" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See /home/siddjain/.npm/eresolve-report.txt for a full report.
```