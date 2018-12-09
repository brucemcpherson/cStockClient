function getLibraryNamespace (library) {
  return this[library];
}
/**
* used to expose memebers of a namespace
* @param {string} namespace name
* @param {method} method name
*/
function exposeRun(namespace, method, argArray) {
  
  var func = namespace ? this[namespace][method] : this[method];
  if (argArray && argArray.length) {
    return func.apply(this, argArray);
  } else {
    return func();
  }
}
/**
 *used to include code in htmloutput
 *@nameSpace Include
 */
var Include = (function (ns) {
  
  /**
  * given an array of .gs file names, it will get the source and return them concatenated for insertion into htmlservice
  * like this you can share the same code between client and server side, and use the Apps Script IDE to manage your js code
  * @param {string[]} scripts the names of all the scripts needed
  * @param {string} [library=""] from a shared library (which has include installed) 
  * @return {string} the code inside script tags
  */
  ns.gs =  function (scripts,library) {
    return library ? 
      getLibraryNamespace(library).Include.gs (scripts) :
      '<script>\n' + scripts.map (function (d) {
        // getResource returns a blob
        return ScriptApp.getResource(d).getDataAsString();
      })
      .join('\n\n') + '</script>\n';
  };

  /**
  * given an array of .html file names, it will get the source and return them concatenated for insertion into htmlservice
  * @param {string[]} scripts the names of all the scripts needed
  * @param {string} [ext] an extension like js if required
  * @return {string} the code inside script tags
  */
  ns.htmlGen = function (scripts, ext,  library) {
    return library ? 
      getLibraryNamespace(library).Include.html (scripts) :
      scripts.map (function (d) {
        return HtmlService.createHtmlOutputFromFile(d+(ext||'')).getContent();
      })
      .join('\n\n');
  };
  
  /**
  * given an array of .html file names, it will get the source and return them concatenated for insertion into htmlservice
  * inserts html style
  * @param {string[]} scripts the names of all the scripts needed
  * @return {string} the code inside script tags
  */
  ns.html = function (scripts,library) {
    return ns.htmlGen (scripts , '' , library);
  };
  
  /**
  * given an array of .html file names, it will get the source and return them concatenated for insertion into htmlservice
  * inserts css style
  * @param {string[]} scripts the names of all the scripts needed
  * @return {string} the code inside script tags
  */
  ns.js = function (scripts,library) {
    return library ? 
      getLibraryNamespace(library).Include.js (scripts) :
      '<script>\n' + ns.htmlGen(scripts,'.js') + '</script>\n';
  };
  
  /**
  * given an array of .html file names, it will get the source and return them concatenated for insertion into htmlservice
  * like this you can share the same code between client and server side, and use the Apps Script IDE to manage your js code
  * @param {string[]} scripts the names of all the scripts needed
  * @return {string} the code inside script tags
  */
  ns.css = function (scripts,library) {
    return library ? 
      getLibraryNamespace(library).Include.css (scripts) :
      '<style>\n' + ns.htmlGen(scripts,'.css') + '</style>\n';
  };
  
  /**
   * append args to be poked into the resolved template
   * @param {object} args
   * @return {string}
   */
  ns.staticArgs = function (args) {
    if (!args.namespace) throw 'Specify a namespace to contain static args';
    return '<script>var ' + args.namespace + '= (function (ns) { ns.params =' + (args.params ? JSON.stringify(args.params): "") + ';return ns;})({});</script>';
  };
  
  return ns;
})(Include || {});






