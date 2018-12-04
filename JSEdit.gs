var JSEdit = (function (ns) {
  ns.init = function (elem, options) {
    options = options || {};
    if (!options.mode) options.mode = 'text';
    ns.jsonEditor = new JSONEditor(DomUtils.elem(elem), options);
    return ns;
  };
  ns.set = function (ob) {
    ns.jsonEditor.set (ob);
  };
  ns.get = function () {
    return ns.jsonEditor.get ();
  };
  return ns;
})({});