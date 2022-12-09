function sizePerPage(countData, dataSize, page) {
  const lastPage = Math.ceil(countData / dataSize);
  const requestedPage = page * dataSize - dataSize;

  if (page > lastPage) {
    const offset = lastPage * dataSize - dataSize;
    return offset;
  } else if (page <= 0) {
    const offset = 0;
    return offset;
  } else {
    const offset = requestedPage;
    return offset;
  }
  // const offset =
  //   page > lastPage
  //     ? lastPage * dataSize - dataSize
  //     : requestedPage <= 0
  //     ? 0
  //     : requestedPage;
  return offset;
}

export { sizePerPage };
