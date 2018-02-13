import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/typo.js',
  output: {
    format: 'cjs',
    file: 'build/bundle.js',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
};
