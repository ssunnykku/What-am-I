function sizePerPage(countData, dataSize, page) {
  const lastPage = Math.ceil(countData / dataSize);
  const requestedPage = (page - 1) * dataSize;
  if (page <= 0) {
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
}

export { sizePerPage };
