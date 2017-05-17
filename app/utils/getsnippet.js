

/**
 * Get the code snippet from a file.
 * @param {string} relativePath
 * @returns {Promise<string>}
 */
function getSnippet(relativePath) {
  return fetch(relativePath).then((response) => response.text());
}

module.exports = getSnippet;
