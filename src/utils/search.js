/**
 * ^, $, ., *, +, ?, (, ), [, ], {, }, | 문자를 escape합니다.
 *
 * @see https://lodash.com/docs/4.17.15#escapeRegExp
 * @param {string} regex RegExp 문자열
 * @returns escape 처리된 문자열
 *
 */
function escapeRegExp(regex) {
  return regex.replaceAll(/[\^$.*+?()[\]{}|]/g, "\\$&");
}

/**
 * 주어진 문자를 UTF-16 코드로 변환합니다.
 *
 * @param {string} ch 문자
 * @returns 주어진 문자의 UTF-16 코드
 */
const utf16 = (ch) => ch.charCodeAt(0);

/**
 * 초성을 상응하는 음절로 변환합니다.
 *
 * @param {string} ch 초성
 * @returns 음절
 */
function convertInitialToSyllable(ch) {
  /**
   * ㄱ~ㅃ 까지는 종성에서만 사용되는 초성인 겹받침(ㄳ, ㄵ, ㄶ, ㄺ, ㄻ, ㄼ, ㄽ, ㄾ, ㄿ, ㅀ, ㅄ)이 존재하므로 동일한 거리(558)을 가지고 있지 않습니다. 그러므로, 별도로 지정하여 관리해야 합니다.
   *
   * @see https://en.wikipedia.org/wiki/Korean_language_and_computers
   */
  const initial = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ"];
  const syllable = [
    "가",
    "까",
    "나",
    "다",
    "따",
    "라",
    "마",
    "바",
    "빠",
    "사",
  ].map(utf16);
  const initialToSyllable = initial.reduce(
    (obj, init, i) => ({ ...obj, [init]: syllable[i] }),
    {}
  );

  return (
    initialToSyllable[ch] ||
    (utf16(ch) - utf16("ㅅ")) * 588 + initialToSyllable["ㅅ"]
  );
}

/**
 * 한글 일부 음절 혹은 초성을 포함한 음절을 확인할 수 있는 정규표현식을 만들어 반환합니다. 한글이 아니라면 그대로 반환합니다.
 *
 * @param {string} ch 문자
 * @returns 주어진 문자(초성 및 음절)를 포함한 한글을 검색할 수 있는 정규표현식
 */
function koreanRegExp(ch) {
  const offset = utf16("가");
  if (/[가-힣]/.test(ch)) {
    const charCode = utf16(ch) - offset;
    if (charCode % 28 > 0) return ch;
    const begin = Math.floor(charCode / 28) * 28 + offset;
    return `[\\u${begin.toString(16)}-\\u${(begin + 27).toString(16)}]`;
  } else if (/[ㄱ-ㅎ]/.test(ch)) {
    const begin = convertInitialToSyllable(ch);
    return `[${ch}\\u${begin.toString(16)}-\\u${(begin + 587).toString(16)}]`;
  }
  return ch;
}

/**
 * 검색어를 fuzzy 검색이 가능한 정규표현식으로 변환합니다.
 *
 * @param {string} query 검색어
 * @returns fuzzy 검색용 정규표현식
 */
export function fuzzyMatcher(query) {
  return new RegExp(
    query.split("").map(escapeRegExp).map(koreanRegExp).join(".*?"),
    "gi"
  );
}
