var async = require('async'),
	keystone = require('keystone');

var User = keystone.list('User');

/**
 * List User
 */
exports.list = function(req, res) {
	User.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
    debugger;
    //Eventually add code here to blank out the password hash.
    
		res.apiResponse({
			user: items
		});
		
	});
}

/**
 * Get User by ID
 */
exports.get = function(req, res) {
	User.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse({
			user: item
		});
		
	});
}


/**
 * Create a User
 */
/*
exports.create = function(req, res) {
	
	var item = new User.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			user: item
		});
		
	});
}
*/

/**
 * Get User by ID
 */

exports.update = function(req, res) {
  debugger;
  
  var keystonereq = req.keystone;
	if (!keystonereq.security.csrf.validate(req)) {
		return res.apiError(403, 'invalid csrf');
	}
  
	User.model.findById(req.params.id).exec(function(err, item) {
		debugger;
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				user: item
			});
			
		});
		
	});
}


/**
 * Delete User by ID
 */
/*
exports.remove = function(req, res) {
	User.model.findById(req.params.id).exec(function (err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		item.remove(function (err) {
			if (err) return res.apiError('database error', err);
			
			return res.apiResponse({
				success: true
			});
		});
		
	});
}
*/