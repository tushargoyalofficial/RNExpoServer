'use strict'

/**
 * Module dependencies.
 */
import lodash from 'lodash'
import glob from 'glob'

const { isArray, union, isString } = lodash
const all = await import('./env/all.js')
const defaultEnv = await import('./env/' + process.env.NODE_ENV + '.js') || {}

/**
 * Load app configurations
 */
let Config = {};
Config = Object.assign({}, all, defaultEnv)

export default Config

/**
 * Get files by glob patterns
 */
export function getGlobbedFiles (globPatterns, removeRoot) {
  // For context switching
  const _this = this

  // URL paths regex
  const urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i')

  // The output array
  let output = []

  // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
  if (isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = union(output, _this.getGlobbedFiles(globPattern, removeRoot))
    })
  } else if (isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns)
    } else {
      let files = glob(globPatterns, { sync: true })

      if (removeRoot) {
        files = files.map(function (file) {
          return file.replace(removeRoot, '')
        })
      }

      output = union(output, files)
    }
  }

  return output
}
