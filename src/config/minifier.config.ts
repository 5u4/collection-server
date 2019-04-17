import { Options } from "html-minifier";

export const minifier: Options = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  minifyURLs: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeEmptyElements: true,
  removeOptionalTags: true,
  removeStyleLinkTypeAttributes: true,
  trimCustomFragments: true
};
