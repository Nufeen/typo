import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/typo.ts',
  output: {
    format: 'cjs',
    exports: 'auto',
    dir: 'build',
  },
  plugins: [
    resolve(),
    babel({
      extensions: ['.ts'],
      babelHelpers: 'bundled',
    }),
    typescript(),
  ],
}
