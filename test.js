function doAsyncOp () {
  return asynchronousOperation().then(function(val) {
    console.log(val);
    return val;
  });
};