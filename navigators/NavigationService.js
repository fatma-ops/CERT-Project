let reloadListFunction = null;

export function setReloadListFunction(func) {
  reloadListFunction = func;
}

export function getReloadListFunction() {
  return reloadListFunction;
}
