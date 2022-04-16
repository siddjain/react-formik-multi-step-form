// https://www.pluralsight.com/guides/react-typescript-module-create
// https://medium.com/@lucksp_22012/3-options-to-compile-typescript-to-js-rollup-tsc-babel-3319977a6946
// import typescript from "rollup-plugin-typescript2";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
//import commonjs from "@rollup/plugin-commonjs";
import json from '@rollup/plugin-json';
import pkg from "./package.json";
import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';

export default {
  input: "src/index.ts",
  output: [  
    {
      file: pkg.module,
      format: "es",     // https://www.rollupjs.org/guide/en/#outputformat
      exports: "named", // https://www.rollupjs.org/guide/en/#outputexports
      sourcemap: true
    },
    {
      file: pkg.main,
      format: "commonjs", // https://www.rollupjs.org/guide/en/#outputformat
      exports: "named",   // https://www.rollupjs.org/guide/en/#outputexports
      sourcemap: true
    }
  ],
  plugins: [
    external(),
//    resolve(),     // A Rollup plugin which locates modules using the Node resolution algorithm, for using third party modules in node_modules
    typescript({
        include: ["src/**/*.ts*"],  // A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should operate on. By default all .ts and .tsx files are targeted.
        exclude: ["node_modules", "dist", "lib"] // A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should ignore. By default no files are ignored.
    }),  // The plugin loads any compilerOptions from the tsconfig.json file by default. Passing options to the plugin directly overrides those options    
    babel({
        babelHelpers: 'bundled',
        include: "./src/**/*.js", // A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should operate on.
        presets: ['@babel/env', '@babel/preset-react'] // https://stackoverflow.com/a/52885295/147530         
    }),
    json(),
    terser()
  ]
};
