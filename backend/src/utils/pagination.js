function sizePerPage(countData, limit, page) {
  const lastPage = Math.ceil(countData / 10);
  const requestedPage = page * limit - 10;
  const offset =
    page > lastPage
      ? lastPage * limit - limit
      : requestedPage <= 0
      ? 0
      : requestedPage;
  return offset;
}

export { sizePerPage };
