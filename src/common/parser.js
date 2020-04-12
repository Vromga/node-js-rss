function parser(url, query, body) {
  return `[url:] ${url}, [params:] ${
    !query.params ? 'none' : query.params
  }, [body:] ${JSON.stringify(body)}`;
}

module.exports = parser;
