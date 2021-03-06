module.exports = function(Handlebars) {

var templates = {};

templates["home/about"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<p>Pear Market is a website for small food producers to help promote their products online.</p>\n\n<p>Check out <a href=\"/products\">what is available</a>.</p>\n\n";
  });

templates["home/confirmation"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>\n	<h4>Thanks for your order</h4>\n</div>";
  });

templates["home/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>Welcome to BeetPress!</h1>\n\n<p>This site is for food producers to make all of their products available online. Customers can come here to browse, and producers can use this site to host their product information for sharing on Facebook, Twitter, or any other network.</p>\n\n<p>Check out <a href=\"/products\">what you have setup already</a>.</p>\n\n";
  });

templates["products/checkout"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
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
    + "</p>\n\n  <hr/>\n\n  <form name=\"contactForm\">\n    <h4>Contact Information</h4>\n    <div class=\"form-group\">\n      <label>\n        Name\n        <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"your name\"/>\n      </label>\n    </div>\n    <div class=\"form-group\">\n      <label>\n        Phone Number\n        <input type=\"number\" class=\"form-control\" id=\"phone\" placeholder=\"(000)000-0000\"/>\n      </label>\n    </div>\n    <div class=\"form-group\">\n      <label>\n        Email Address\n        <input type=\"email\" class=\"form-control\" id=\"email\"/>\n      </label>\n    </div>\n    <button type=\"submit\" id=\"submit\" class=\"btn btn-default\">Submit</button>\n  </form>\n</div>";
  return buffer;
  });

templates["products/create"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <option val=\"";
  if (stack1 = helpers.username) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.username; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n    ";
  return buffer;
  }

  buffer += "<form class=\"form-group\">\n\n    <label for=\"title\">Title</label>\n  <input id=\"title\" class=\"form-control\" type=\"text\" name=\"title\" placeholder=\"title\"/>\n\n  <label for=\"description\">Description</label>\n  <input id=\"description\" class=\"form-control\" type=\"text\" name=\"description\" placeholder=\"description\"/>\n\n  <label for=\"producer\">Producer</label>\n  <select name=\"producer\" id=\"producer\">\n  	";
  stack1 = helpers.each.call(depth0, depth0.models, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>  \n  \n  <button class=\"btn btn-default\">add</button>\n</form>\n";
  return buffer;
  });

templates["products/edit"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<div>\n				<img url=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n			</div>\n			";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<li data-index=\"";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n					<input type=\"text\" name=\"name\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.value),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n					<input type=\"text\" name=\"description\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.value),stack1 == null || stack1 === false ? stack1 : stack1.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n				</li>\n			";
  return buffer;
  }

  buffer += "<div class=\"panel panel-default\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">Edit: ";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n  </div>\n  <div class=\"panel-body\">\n	<form>\n		<div class=\"form-group\">\n			<label for=\"title\">\n				Title\n			</label>\n			<input id=\"title\"\n				class=\"form-control\"\n				type=\"text\"\n				name=\"title\"\n				value=\"";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n\n			<label for=\"image\">\n				Image file\n			</label>\n			<input id=\"image\"\n				class=\"form-control\"\n				type=\"file\"\n				name=\"image\"\n				value=\"";
  if (stack1 = helpers.image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n			<button class=\"submit-image\">upload</button>\n\n			<label for=\"image\">\n				Image url\n			</label>\n			<input id=\"image\"\n				class=\"form-control\"\n				type=\"text\"\n				name=\"imageUrl\"\n				value=\"";
  if (stack1 = helpers.image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n			";
  stack1 = helpers.each.call(depth0, depth0.media, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			<label for=\"description\">\n				Description\n			</label>\n			<textarea id=\"description\"\n				class=\"form-control\"\n				name=\"description\">";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</textarea>\n\n			<ul>\n			";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.forEach || depth0.forEach),stack1 ? stack1.call(depth0, depth0.ingredients, options) : helperMissing.call(depth0, "forEach", depth0.ingredients, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n			</ul>\n			<button class=\"add-ingredient\" type=\"cancel\">add ingredient</button>\n\n			<br/>\n			<button class=\"btn btn-default submit\" type=\"submit\">submit</button>\n		</div>\n	</form>\n  </div>\n</div>";
  return buffer;
  });

templates["products/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n      <div class=\"list-group-item col-sm-6 col-md-4\">\n      ";
  options = {hash:{
    'model_name': ("Product"),
    'model': (depth0)
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.view || depth0.view),stack1 ? stack1.call(depth0, "products/tiny_products", options) : helperMissing.call(depth0, "view", "products/tiny_products", options)))
    + "\n      </div>\n  ";
  return buffer;
  }

  buffer += "<div class=\"jumbotron product-header\">\n  <div class=\"container\">\n    <h3 class=\"center-title\">Products</h3>\n  </div>\n</div>\n<!-- List group -->\n<div class=\"list-group\">\n  <!--/stories-->\n  ";
  stack1 = helpers.each.call(depth0, depth0.models, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "          \n  <!--/stories-->\n</div>";
  return buffer;
  });

templates["products/show"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <img class=\"product-main-img img-circle\" src=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.media),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <h4><small>contains:<small></h4>\n      <div class=\"list-group\">\n      ";
  stack1 = helpers.each.call(depth0, depth0.ingredients, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    \n      </div>\n      ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <a href=\"#\" class=\"list-group-item\">\n          <h4 class=\"list-group-item-heading\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n          ";
  stack1 = helpers['if'].call(depth0, depth0.description, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </a>\n      ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<p class=\"list-group-item-text\">";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <img src=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"center-image img-rounded img-responsive\" alt=\"Responsive image\">\n    ";
  return buffer;
  }

  buffer += "<div class=\"jumbotron product-header\">\n  <div class=\"container\">\n    <h3 class=\"center-title\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.media),stack1 == null || stack1 === false ? stack1 : stack1[0]), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    <div class=\"btn-group product-actions left visible-xs\" role=\"group\" aria-label=\"...\">\n      <button class=\"btn btn-disabled product-action\">$";
  if (stack2 = helpers.price) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.price; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</button>\n      <a href=\"/checkout/";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"btn btn-default product-action\">buy it</a>\n    </div>\n\n    <div class=\"btn-group product-actions right hidden-xs\" role=\"group\" aria-label=\"...\">\n      <button class=\"btn btn-disabled product-action\">$";
  if (stack2 = helpers.price) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.price; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</button>\n      <a href=\"/checkout/";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"btn btn-default product-action\">buy it</a>\n    </div>  </div>\n</div>\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-xs-5 product-ingredients\">\n      ";
  stack2 = helpers['if'].call(depth0, depth0.ingredients, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n    <div class=\"col-xs-7\">\n      <p class=\"well well-sm\">";
  if (stack2 = helpers.description) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.description; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</p>\n    </div>    \n  </div>\n</div>\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-xs-12 col-sm-6 col-md-4\">\n    ";
  stack2 = helpers.each.call(depth0, depth0.media, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n  </div>\n</div>\n<div class=\"jumbotron product-header\">\n  <div class=\"container\">\n    <h5><small>brought to you by:</small></h5>\n    <h4 class=\"center-title\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.producer),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\n  </div>\n</div>\n";
  return buffer;
  });

templates["products/tiny_products"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1);
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <img class=\"product-main-img img-circle\" src=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.media),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n      ";
  return buffer;
  }

  buffer += "<a href=\"/"
    + escapeExpression(((stack1 = ((stack1 = depth0.producer),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\n  <div class=\"row\">\n  \n    <div class=\"col-xs-8\">\n      <h3>";
  if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</h3>\n      <br>\n      <small class=\"text-muted\">\n        $";
  if (stack2 = helpers.price) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.price; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + ",";
  stack2 = helpers.each.call(depth0, depth0.ingredients, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </small>\n    </div>\n    <div class=\"col-xs-4\">\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.media),stack1 == null || stack1 === false ? stack1 : stack1[0]), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n  </div>\n</a>\n";
  return buffer;
  });

templates["stores/create"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"panel panel-default\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">Edit: ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n  </div>\n  <div class=\"panel-body\">\n	<form name=\"createStore\">\n		<div class=\"form-group\">\n			<label for=\"name\">\n				Name\n			</label>\n			<input id=\"name\"\n				class=\"form-control\"\n				type=\"text\"\n				name=\"name\"\n				value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n\n			<label for=\"email\">\n				Email\n			</label>\n			<input id=\"email\"\n				class=\"form-control\"\n				type=\"text\"\n				name=\"email\"\n				value=\"";
  if (stack1 = helpers.email) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.email; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n\n			<label for=\"username\">\n				Username\n			</label>\n			<input id=\"username\"\n				class=\"form-control\"\n				type=\"text\"\n				name=\"username\"\n				value=\"";
  if (stack1 = helpers.username) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.username; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n\n			<button class=\"btn btn-default\">submit</button>\n		</div>\n	</form>\n  </div>\n</div>";
  return buffer;
  });

templates["stores/edit"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"panel panel-default\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">Edit: ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n  </div>\n  <div class=\"panel-body\">\n	<form>\n		<div class=\"form-group\">\n			<label for=\"name\">\n				Name\n			</label>\n			<input id=\"name\"\n				class=\"form-control\"\n				type=\"text\"\n				name=\"name\"\n				value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n\n			<label for=\"email\">\n				Email\n			</label>\n			<input id=\"email\"\n				class=\"form-control\"\n				type=\"text\"\n				name=\"email\"\n				value=\"";
  if (stack1 = helpers.email) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.email; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n\n			<label for=\"username\">\n				Username\n			</label>\n			<input id=\"username\"\n				class=\"form-control\"\n				type=\"text\"\n				name=\"username\"\n				value=\"";
  if (stack1 = helpers.username) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.username; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n\n			<button class=\"btn btn-default\">submit</button>\n		</div>\n	</form>\n  </div>\n</div>";
  return buffer;
  });

templates["stores/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

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

function program3(depth0,data) {
  
  
  return "\n\n";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n              ";
  options = {hash:{
    'model_name': ("Product"),
    'model': (depth0)
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.view || depth0.view),stack1 ? stack1.call(depth0, "products/tiny_products", options) : helperMissing.call(depth0, "view", "products/tiny_products", options)))
    + "\n          ";
  return buffer;
  }

  buffer += "<h1>Products</h1>\n\n<div class=\"list-group\">\n";
  stack1 = helpers.each.call(depth0, depth0.models, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n<div class=\"clearfix\"></div>\n";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  if (stack1 = helpers.user) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.user; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.user) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"row\">\n    <div class=\"col-md-12\"> \n      <div class=\"panel\">\n        <div class=\"panel-body\">\n          <!--/stories-->\n          ";
  stack1 = helpers.each.call(depth0, depth0.models, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "          \n          <!--/stories-->\n          <a href=\"/\" class=\"btn btn-primary pull-right btnNext\">More <i class=\"glyphicon glyphicon-chevron-right\"></i></a>\n        </div>\n      </div>\n      <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n          <h3 class=\"panel-title\">Create A New Product</h3>\n        </div>\n        <div class=\"panel-body\">\n        <form class=\"form-group\">\n\n          <label for=\"name\">Title</label>\n          <input id=\"name\" class=\"form-control\" type=\"text\" name=\"name\" placeholder=\"name\"/>\n\n          <label for=\"email\">Title</label>\n          <input id=\"email\" class=\"form-control\" type=\"text\" name=\"email\" placeholder=\"email\"/>\n\n          <button class=\"btn btn-default\">add</button>\n        </form>\n        </div>\n      </div>\n    </div><!--/col-12-->\n  </div>";
  return buffer;
  });

templates["stores/show"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\n  <p><img src=\"url\"/></p>\n  ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <a href=\"/products/";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/edit\" class=\"btn btn-default\">edit</a>\n  ";
  return buffer;
  }

  buffer += "<div>\n  <h3>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n  <p>";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n  ";
  stack1 = helpers.each.call(depth0, depth0.media, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.owner || depth0.owner),stack1 ? stack1.call(depth0, depth0, options) : helperMissing.call(depth0, "owner", depth0, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>";
  return buffer;
  });

templates["stores/tiny_products"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\n    <span class=\"badge\">\n    	<button class=\"remove\">x</button>\n    </span>\n    ";
  }

  buffer += "<a href=\"/store/";
  if (stack1 = helpers.username) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.username; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"list-group-item col-md-4 col-xs-12\">\n  <div class=\"row\">    \n    <br>\n    <div class=\"col-md-2 col-sm-3 text-center\">\n      <a class=\"story-title\" href=\"#\"><img alt=\"\" src=\"http://api.randomuser.me/portraits/thumb/men/58.jpg\" style=\"width:100px;height:100px\" class=\"img-circle\"></a>\n    </div>\n    <div class=\"col-md-10 col-sm-9\">\n      <h3>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n      <div class=\"row\">\n        <div class=\"col-xs-9\">\n          <h4><span class=\"label label-default\">97thfloor.com</span></h4><h4>\n          <small style=\"font-family:courier,'new courier';\" class=\"text-muted\">2 hours ago  • <a href=\"#\" class=\"text-muted\">Read More</a></small>\n          </h4></div>\n        <div class=\"col-xs-3\"></div>\n      </div>\n      <br><br>\n    </div>\n    ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.owner || depth0.owner),stack1 ? stack1.call(depth0, depth0, options) : helperMissing.call(depth0, "owner", depth0, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </div>\n  <hr>\n</a>\n";
  return buffer;
  });

return templates;

};