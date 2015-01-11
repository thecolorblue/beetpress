module.exports = function(Handlebars) {

var templates = {};

templates["home/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>Welcome to BeetPress!</h1>\n\n<p>This site is for food producers to make all of their products available online. Customers can come here to browse, and producers can use this site to host their product information for sharing on Facebook, Twitter, or any other network.</p>\n\n<p>Check out <a href=\"/products\">what you have setup already</a>.</p>\n";
  });

templates["products/edit"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"panel panel-default\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">Edit: ";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n  </div>\n  <div class=\"panel-body\">\n	<form>\n		<div class=\"form-group\">\n			<label for=\"title\">\n				Title\n			</label>\n			<input id=\"title\"\n				class=\"form-control\"\n				type=\"text\"\n				name=\"title\"\n				value=\"";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n\n			<label for=\"image\">\n				Image url\n			</label>\n			<input id=\"image\"\n				class=\"form-control\"\n				type=\"text\"\n				name=\"image\"\n				value=\"";
  if (stack1 = helpers.image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n\n			<label for=\"description\">\n				Description\n			</label>\n			<textarea id=\"description\"\n				class=\"form-control\"\n				name=\"description\">\n				";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n			</textarea>\n\n			<button class=\"btn btn-default\">submit</button>\n		</div>\n	</form>\n  </div>\n</div>";
  return buffer;
  });

templates["products/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n    ";
  options = {hash:{
    'model_name': ("Product"),
    'model': (depth0)
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.view || depth0.view),stack1 ? stack1.call(depth0, "products/tiny_products", options) : helperMissing.call(depth0, "view", "products/tiny_products", options)))
    + "\n";
  return buffer;
  }

  buffer += "<h1>Products</h1>\n\n<div class=\"list-group\">\n";
  stack1 = helpers.each.call(depth0, depth0.models, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n<div class=\"panel panel-default\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">Create A New Product</h3>\n  </div>\n  <div class=\"panel-body\">\n	<form class=\"form-group\">\n\n      <label for=\"title\">Title</label>\n		<input id=\"title\" class=\"form-control\" type=\"text\" name=\"title\" placeholder=\"title\"/>\n\n      <label for=\"description\">Description</label>\n		<input id=\"description\" class=\"form-control\" type=\"text\" name=\"description\" placeholder=\"description\"/>\n		<button class=\"btn btn-default\">add</button>\n	</form>\n  </div>\n</div>";
  return buffer;
  });

templates["products/show"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>\n  <h3>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n  <p>";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n\n  <a href=\"/products/";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/edit\" class=\"btn btn-default\">edit</a>\n</div>";
  return buffer;
  });

templates["products/tiny_products"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a href=\"/products/";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"list-group-item\">\n	";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    <span class=\"badge\">\n    	<button class=\"remove\">x</button>\n    </span>\n</a>\n";
  return buffer;
  });

templates["user_profile"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li><a href=\"#\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n";
  return buffer;
  });

return templates;

};