(function(root, mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS
    if (typeof define == "function" && define.amd) return define([ "exports" ], mod); // AMD
    mod(root.apiDocs2Tern || (root.apiDocs2Tern = {})); // Plain browser env
})(this,function(exports) {
  "use strict";
  
  // https://github.com/angular/protractor/blob/master/lib/element.js#L6
  var WEB_ELEMENT_FUNCTIONS = ['click', 'sendKeys', 'getTagName', 'getCssValue', 'getAttribute', 'getText',
                               'getSize', 'getLocation', 'isEnabled', 'isSelected', 'submit', 'clear',
                               'isDisplayed', 'getOuterHtml', 'getInnerHtml', 'getId'];
  
  var Generator = exports.Generator = function(options) {
    this.options = options;
  };
  
  Generator.prototype.process = function(apiDoc) {
    var ternDef = {
      "!name" : "protractor",
      "!define" : {}
    };    
    this.visitDoc(apiDoc, ternDef);
    return ternDef;
  };

  Generator.prototype.visitDoc = function(apiDoc, ternDef) { 
    // Iterate over all items
    for ( var i = 0; i < apiDoc.items.length; i++) {
      var apiItem = apiDoc.items[i];
      this.visitItem(apiItem, apiDoc, ternDef);
    }
  }
  
  Generator.prototype.visitItem = function(apiItem, apiDoc, ternDef) {
	var protractorType = apiItem.name;
	var parent = ternDef["!define"];
	
	// !proto
	if (protractorType.indexOf('ProtractorBy.prototype') != -1) {
		getTernClass('ProtractorBy.prototype', parent)["!proto"] = "WebdriverBy.prototype";
	} else if (protractorType.indexOf('WebdriverBy.prototype') != -1) {
		getTernClass('WebdriverBy.prototype', parent)["!proto"] = "webdriver.By";
	} else if (protractorType.indexOf('Protractor.prototype') != -1) {
		getTernClass('Protractor.prototype', parent)["!proto"] = "webdriver.WebDriver.prototype";
	}
	
	// Copy WebElements functions
	if (protractorType.indexOf('ElementArrayFinder.prototype') != -1) {
		copyWebElementFunctions('ElementArrayFinder.prototype', parent);
	} else if (protractorType.indexOf('ElementFinder.prototype') != -1) {
		copyWebElementFunctions('ElementFinder.prototype', parent);
	}
	
	var ternClass = getTernClass(protractorType, parent), ternClassToUpdate = ternClass;
	var alias = apiItem.alias;
    if (alias && protractorType.indexOf('.prototype') == -1) {
      var names = alias.split('.'), parent = ternDef;
      var type = '';
      for (var i = 0; i < names.length; i++) {
        var aliasName = names[i], name = aliasName, index = aliasName.indexOf('(');
        if (index != -1) aliasName = name.substring(0, index);
        var ternClass = parent[aliasName];
        if (!ternClass) {
          ternClass = {};
          parent[aliasName] = ternClass;
        }
        parent = ternClass;
        if (i == names.length - 1 && index != -1) {
        	type = 'fn(';
        	var params = name.substring(index + 1, name.indexOf(')', index));
        	if (params == 'locator') {
        		type += params; 
        		type += ': ';
        		type += '+webdriver.Locator';        		
        	}
        	type += ')';
        	type +=' -> ';
        }
      }
      parent["!type"] =  type + '+' + protractorType;
      ternClassToUpdate = parent;
    } else {
    	if (apiItem.params || apiItem.returns) {
    		var type = "fn(";
    		if (apiItem.params) {
    			for (var i = 0; i < apiItem.params.length; i++) {
					var p = apiItem.params[i];
					if (i > 0) type +=", ";
					type += p.name;
					if (p.type.optional) type += "?";
					type += ": ";
					type+= getTernType(p.type);
				}
    		}
    		type += ")";
    		if (apiItem.returns) {
    			type += " -> ";
				type += getTernType(apiItem.returns.type);
    		}
    		ternClass["!type"] = type;
    	}
    } 
	if (apiItem.description) ternClassToUpdate["!doc"] =  apiItem.description;
	ternClassToUpdate["!url"] = "http://angular.github.io/protractor/#/api?view=" + protractorType;	
	
  }
  
  var copyWebElementFunctions = function(proto, parent) {
	var ternClass = getTernClass(proto, parent);
	for (var i = 0; i < WEB_ELEMENT_FUNCTIONS.length; i++) {
		var fnName = WEB_ELEMENT_FUNCTIONS[i], type = "webdriver.WebElement.prototype." + fnName;
		ternClass[fnName] = {
		  "!type" : type		
		};	
	}
  }
  
  var getTernClass = function(className, parent) {
    var name = className;
    if (className.indexOf('.') != -1) {
      var names = className.split('.'), length = names.length -1;
      for (var i = 0; i < length; i++) {
        parent = getTernClass(names[i], parent);
      }
      name = names[length];
    }
    
    var ternClass = parent[name];
    if (!ternClass) {
      ternClass = {};
      parent[name] = ternClass;
      /*var yuiClass = yuiDoc.classes[name];
      if (yuiClass) {
        // !type
        var type = null; //getType(yuiClass, yuiDoc);
        if (type)
          ternClass["!type"] = type;
        // !proto
        //if (yuiClass["extends"])
        //  ternClass["!proto"] = "TODO" ;//getClassName(yuiClass["extends"], yuiDoc);
        // !doc
       // if (yuiClass.description)
        //  ternClass["!doc"] = yuiClass.description;
        // !url
        //ternClass["!url"] = "TODO"; //getURL(options.baseURL, className);
      }*/
    }    
    return ternClass;
  }
  
  var getTernType = function(protractorType) {
	  switch(protractorType.type) {		  
		  case "FunctionType":
			  var type = "fn(";			  
			  var params = protractorType.params;
			  if (params) {
			    for (var i = 0; i < params.length; i++) {
			    	if (i > 0) type += ", ";
			    	type += "arg";
			    	type += i;
			    	type += ": ";
					type+= getTernType(params[i]);
			    }
			  }
			  type += ")";
			  var result = protractorType.result;
			  if (result) {
				  type += " -> ";
				  type += getTernType(result);
			  }
			  return type;
		  case "NameExpression":
			  switch(protractorType.name) {
				  case "number":
					  return "number";
				  case "string":
					  return "string";
			  }
			  return "+" + protractorType.name;
		  case "AllLiteral":
			  return "?";
		  case "TypeApplication":
			  if (protractorType.expression.name == 'Array') {
				var type = "[";
				type+= protractorType.applications[0].name;
				type += "]";
				return type;
			  }			  
			  return "?";		
		  case "TypeUnion":		
			  return getTernType(protractorType.elements[0]);
		  case "RecordType":
			  return "?";
		default:
			console.log(protractorType.type)
	  }
  }
  
  
  
  
  
  
  
    
  var createModuleInfos = function(dataObjects, options) {
    var infos = {};
    // Iterate over all classes
    var moduleNames = Object.keys(dataObjects);    
    // For each class generate output
    for(var i = 0; i < moduleNames.length; i++) {
      var moduleName = moduleNames[i];
      // The meta data object
      var entries = dataObjects[moduleName];
      for(var j = 0; j < entries.length; j++) {
        var entry = entries[j];
        if(isClass(entry, options)) {
          var className = entry.ctx.string.replace("()", "");
          infos[className] = moduleName.replace(/\//g, '_') + '.' + className;
        }
      }
    }
    return infos;
  }
  
  Generator.prototype.visitModuleMetaData = function(entries, moduleName, ternModule) {
      var options = this.options;
      for(var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if(isClass(entry, options)) {
          var className = entry.ctx.string.replace("()", ""), ternClass = {};
          // !type
          var type = this.getTernClassType(entry, moduleName, className, null, false);
          // !url
          var url = options.getURL ? options.getURL(moduleName, className, null) : null;
          // !doc
          var doc = getFullDescription(entry);          
          ternClass = createTernDefItem(ternModule, className, type, null, url, doc);
          
          // loop for entries
          for(var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            if(isFunction(entry)) {
              this.visitFunction(entry, moduleName, className, ternClass);
            } else if(isClassConstant(entry)) {
              this.visitClassConstant (entry, ternClass);
            } else {
              var property = getProperty(entry, options);              
              if (property) {
                var ternPrototype = this.getTernClassPrototype(ternClass, moduleName, className);
                this.visitProperty (property, ternPrototype);
              }
            }
          }
        }
      }
    }

    Generator.prototype.visitFunction = function(entry, moduleName, className, ternClass) {
      var options = this.options;
      var methodName = entry.ctx.name, staticMethod = isStaticMethod(entry);
      var ternMethod = {};
      // !type
      var type = this.getTernClassType(entry, moduleName, className, methodName, staticMethod);
      // !effect
      var effects = this.getTernEffects(moduleName, className, methodName, staticMethod);      
      // !url
      var url = options.getURL ? options.getURL(moduleName, className, methodName) : null;
      // !doc
      var doc = getFullDescription(entry);
      var ternClassOrPrototype = ternClass;
      if (!staticMethod) {
        ternClassOrPrototype = this.getTernClassPrototype(ternClass, moduleName, className);
      }
      createTernDefItem(ternClassOrPrototype, methodName, type, effects, url, doc);
    }

    Generator.prototype.visitProperty = function(property, ternClass) {
      var name = null, type = "?", effects = null, url = null, doc = null;
      if (property.ctx) {
        name = property.ctx.name;
        // !type
        var info = this.moduleInfos[name];
        if (info) type = info;
        // !doc
        doc = getFullDescription(property);
      } else {
        name = property.string;
      }
      if (name) {
        createTernDefItem(ternClass, name, type, effects, url, doc);
      }
    }

    var createTernDefItem = function(parent, name, type, effects, url, doc) {
      var item = parent[name] = {};
      if (type) item["!type"] = type;
      if (effects) item["!effects"] = effects;
      if (url) item["!url"] = url;
      if (doc && doc != '') item["!doc"] = doc;
      return item;
    }
    
    Generator.prototype.visitClassConstant = function(entry, ternClass) {

    }
    
    Generator.prototype.getTernClassPrototype = function(ternClass, moduleName, className) {
      var ternPrototype = ternClass["prototype"], options = this.options;
      if (!ternPrototype) {
        ternPrototype = {};
        ternClass["prototype"] = ternPrototype;
        if (options.getProto) {
          var ternProto = options.getProto(moduleName, className);
          if (ternProto) ternPrototype["!proto"] = ternProto;
        }
      }    
      return ternPrototype;
    }
    
    Generator.prototype.getTernEffects = function(moduleName, className, methodName, staticMethod) {
      var options = this.options;
      if (options.getEffects) return options.getEffects(moduleName, className, methodName);
    }
    
    Generator.prototype.getTernClassType = function(entry, moduleName, className, methodName, staticMethod) {
      var options = this.options, moduleInfos = this.moduleInfos;
      var t = options.getType ? options.getType(moduleName, className, methodName, staticMethod) : null;
      if (t) return t;
      var type = 'fn(', tags = entry.tags, nbParams = 0, returnType = null;
      for(var k = 0; k < tags.length; k++) {
        var tag = tags[k];
        if(tag.type == 'param') {
          if (nbParams) type+= ', ';
          var isOptional = tag.name.charAt(0) == '[', name = (isOptional ? tag.name.substring(1, tag.name.length - 1) : tag.name);
          var index = name.indexOf('(');
          if (index != -1) name = name.substring(0, index);
          index = name.indexOf('.');
          if (index != -1) name = name.substring(0, index);
          type+= name;
          if (isOptional) type+='?';
          type+=': ';
          type+=getTernType(tag, moduleInfos);
          nbParams++;
        } else if(tag.type == 'return') {
          returnType = getTernType(tag, moduleInfos);
        }
      }
      type+= ')';
      if (returnType) {
        type+=' -> ';
        type+=returnType;
      }
      return type;
    }
    
    //Helper methods used in the rendering
    var isClass = function(entry, options) {
      if (options.isClass) return options.isClass(entry);      
      var tags = entry.tags;
      for(var k = 0; k < tags.length; k++) {
        if(tags[k].type == 'class') return true;
      }    
      return false;
    }
    
    var isFunction = function(entry) {
      // If we have a context
      if(entry.ctx != null 
        && (entry.ctx.type == 'method' || entry.ctx.type == 'function')
        && entry.isPrivate == false
        /*&& entry.tags.length >= 1
        && (entry.tags[0].type == 'param' || entry.tags[0].type == 'return')*/) {
        return true;
      }
      return false;
    }
    
    var isStaticMethod = function(entry) {
      return entry.ctx != null
             && entry.ctx.receiver != null 
             && entry.ctx.receiver != "this";
    }
    
    var getProperty = function(entry, options) {
      if (options.isProperty) return options.isProperty(entry);
      if (entry.ctx && entry.ignore != true && entry.ctx.type == 'property') {
        return entry;
      }
      var tags = entry.tags;    
      for(var k = 0; k < tags.length; k++) {
        var tag = tags[k];
        if (tag.visibility == false) return null;
        if(tag.type == 'property') return tag;
      }    
      return null;    
    }
    
    var isClassConstant = function(entry) {
      var tags = entry.tags;    
      for(var k = 0; k < tags.length; k++) {
        if(tags[k].type == 'classconstant') return true;
      }    
      return false;    
    }
    
    var getFullDescription = function(entry) {
      // Get full description and clean it
      var fullDescription = entry.description.summary;
      fullDescription = fullDescription.replace(/\<pre\>\<code\>/g, ".. code-block:: javascript\n\n   ")
        .replace(/\<\/code\>\<\/pre\>/g, "")
        .replace(/\<h2\>|\<\/h2\>/g, "**")
        .replace(/\<p\>/g, "\n\n")
        .replace(/\<\/p\>/g, "")
        .replace(/&lt;/g, "<")
        .replace(/\<strong\>|\<\/strong\>/g, "**")
        .replace(/\<em\>|\<\/em\>/g, "*")
        .replace(/\<br[ ]*\>|\<\/br[ ]*\>|\<br[ ]*\/\>/g, "\n");
      return fullDescription;
    }
    
    var getTernTypeOLD = function(tag, moduleInfos) {
      var types = tag.types;
      for (var k = 0; k < types.length; k++) {
        var originalType = types[k];
        if (!originalType) return null;
        var type = originalType.toLowerCase();
        switch(type) {
        case 'function':
          return 'fn()';
        case 'array':
          return '[?]';        
        case 'boolean':
          return 'bool'; 
        case 'string':
        case 'number':
          return type;         
        case 'object':
          return '+Object';
        case 'null':
          return null;
        default:
          var info = moduleInfos[originalType];
          if (info) return '+' + info;
        }
      }
      return "?";
    }
    
});  