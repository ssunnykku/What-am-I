function sizePerPage(countData, dataSize, page) {
  const lastPage = Math.ceil(countData / dataSize);
  const requestedPage = page * dataSize - dataSize;
  const offset =
    page > lastPage
      ? lastPage * dataSize - dataSize
      : requestedPage <= 0
      ? 0
      : requestedPage;
  return offset;
}

export { sizePerPage };
