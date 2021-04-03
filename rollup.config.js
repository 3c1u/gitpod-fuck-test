import rollupTypescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import commonJs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

const isProduction = process.env.NODE_ENV === 'production'

export default {
  input: 'src/index.tsx',
  plugins: [
    rollupTypescript({
      cacheDir: '.rollup.tscache',
    }),
    // https://github.com/facebook/yoga/issues/798
    ...(isProduction
      ? [
          {
            name: 'replace-code',
            transform(code, id) {
              if (!/nbind/.test(id)) return
              code = code.replace(
                '_a = _typeModule(_typeModule),',
                'var _a = _typeModule(_typeModule);'
              )
              return {
                code,
                map: { mappings: '' },
              }
            },
          },
          json(),
          commonJs(),
          resolve(),
        ]
      : []),
  ],
  output: {
    dir: 'dist',
    format: 'cjs',
  },
}
