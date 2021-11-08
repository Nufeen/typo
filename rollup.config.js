import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

export default {
  input: 'src/typo.ts',
  output: {
    format: 'cjs',
    file: 'build/bundle.js',
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
  ],
}
