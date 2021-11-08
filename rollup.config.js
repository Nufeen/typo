import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/typo.ts',
  output: {
    format: 'cjs',
    dir: 'build',
  },
  plugins: [
    resolve(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      extensions: ['.ts'],
      babelHelpers: 'external',
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
        '@babel/preset-typescript',
      ],
      plugins: ['@babel/plugin-external-helpers'],
    }),
    typescript(),
  ],
}
