function sizePerPage(countData, limit, page) {
  const lastPage = Math.ceil(countData / limit);
  const requestedPage = page * limit - limit;
  const offset =
    page > lastPage
      ? lastPage * limit - limit
      : requestedPage <= 0
      ? 0
      : requestedPage;
  return offset;
}

export { sizePerPage };
