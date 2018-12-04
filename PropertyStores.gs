/**
 * use this to access property stores from client side
 * @namespace PropertyStores
 */
var PropertyStores = (function (ns) {
  
  ns.settings = {};
  
  function makeService (service) {
    
    return {
      store:service,
      get: function (key) {
        var r = this.store.getProperty (key);
        try {
          var ob = r ? JSON.parse(r) : null;
        }
        catch (err) {
          var ob = r;
        }
        return ob;
      },
      set: function (key , ob) {
        this.store.setProperty (key , JSON.stringify(ob));
        return ob;
      }
    };
  }
  
  ns.init = function (ps) {
    ns.settings.props = {
        script: makeService (ps.getScriptProperties()),
        doc: makeService (ps.getDocumentProperties()),
        user: makeService (ps.getUserProperties())
      };
    return ns;
  };

  
  /**
   * get an item from a given store
   * @param {string} store name (script|doc|user)
   * @return {*} the value
   */
  ns.get = function (store , key) {    
    return ns.settings.props[store].get(key);
  };
  
  ns.set = function (store , key, ob) {    
    return ns.settings.props[store].set(key , ob);
  };
  return ns;
})({});
