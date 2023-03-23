'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.isNameContinue =
  exports.isNameStart =
  exports.isLetter =
  exports.isDigit =
  exports.isWhiteSpace =
    void 0;
/**
 * ```
 * WhiteSpace ::
 *   - "Horizontal Tab (U+0009)"
 *   - "Space (U+0020)"
 * ```
 * @internal
 */
function isWhiteSpace(code) {
  return code === 0x0009 || code === 0x0020;
}
exports.isWhiteSpace = isWhiteSpace;
/**
 * ```
 * Digit :: one of
 *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
 * ```
 * @internal
 */
function isDigit(code) {
  return code >= 0x0030 && code <= 0x0039;
}
exports.isDigit = isDigit;
/**
 * ```
 * Letter :: one of
 *   - `A` `B` `C` `D` `E` `F` `G` `H` `I` `J` `K` `L` `M`
 *   - `N` `O` `P` `Q` `R` `S` `T` `U` `V` `W` `X` `Y` `Z`
 *   - `a` `b` `c` `d` `e` `f` `g` `h` `i` `j` `k` `l` `m`
 *   - `n` `o` `p` `q` `r` `s` `t` `u` `v` `w` `x` `y` `z`
 * ```
 * @internal
 */
function isLetter(code) {
  return (
    (code >= 0x0061 && code <= 0x007a) || // A-Z
    (code >= 0x0041 && code <= 0x005a) // a-z
  );
}
exports.isLetter = isLetter;
/**
 * ```
 * NameStart ::
 *   - Letter
 *   - `_`
 * ```
 * @internal
 */
function isNameStart(code) {
  return isLetter(code) || code === 0x005f;
}
exports.isNameStart = isNameStart;
/**
 * ```
 * NameContinue ::
 *   - Letter
 *   - Digit
 *   - `_`
 * ```
 * @internal
 */
function isNameContinue(code) {
  return isLetter(code) || isDigit(code) || code === 0x005f;
}
exports.isNameContinue = isNameContinue;
