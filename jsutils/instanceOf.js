'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.instanceOf = void 0;
const inspect_js_1 = require('./inspect.js');
/**
 * A replacement for instanceof which includes an error warning when multi-realm
 * constructors are detected.
 * See: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
 * See: https://webpack.js.org/guides/production/
 */
exports.instanceOf =
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  globalThis.process?.env.NODE_ENV === 'production'
    ? function instanceOf(value, constructor) {
        return value instanceof constructor;
      }
    : function instanceOf(value, constructor) {
        if (value instanceof constructor) {
          return true;
        }
        if (typeof value === 'object' && value !== null) {
          // Prefer Symbol.toStringTag since it is immune to minification.
          const className = constructor.prototype[Symbol.toStringTag];
          const valueClassName =
            // We still need to support constructor's name to detect conflicts with older versions of this library.
            Symbol.toStringTag in value
              ? value[Symbol.toStringTag]
              : value.constructor?.name;
          if (className === valueClassName) {
            const stringifiedValue = (0, inspect_js_1.inspect)(value);
            throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
          }
        }
        return false;
      };