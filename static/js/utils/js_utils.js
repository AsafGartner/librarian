JSUtils = {
  assert: function(bool, errorMessage) {
    if (!bool) {
      throw new Error(errorMessage);
    }
  }
};
