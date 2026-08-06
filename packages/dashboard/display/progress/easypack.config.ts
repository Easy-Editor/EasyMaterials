/**
 * @easy-editor/easypack configuration
 * @type {import('@easy-editor/easypack').EasypackConfig}
 */
export default {
  preset: 'material',
  output: {
    esm: true,
    cjs: true,
    umd: true,
    minify: true,
    types: false,
  },
  dev: {
    port: 5001,
  },
  css: {
    scopedName: 'em_progress__[local]___[hash:base64:5]',
  },
}
