var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
	cloudinary = require('cloudinary'),
    MediaSchema;

/* Schemas */
MediaSchema = new Schema({
  url: String,
  date: { type: Date, default: Date.now }
});

var Media = mongoose.model('Media', MediaSchema);

cloudinary.config({
  cloud_name: process.env.CLOUNDINARY_NAME || 'beetpress',
  api_key: process.env.CLOUNDINARY_KEY,
  api_secret: process.env.CLOUNDINARY_SECRET
});

module.exports = function(req, res) {
    var Product = mongoose.connection.model('Product');

	if(req.files.thumbnail) {
		(new Media())
		.save(function(err, image) {
			if(req.body.product_id) {
				Product.findOneAndUpdate(req.body.product_id, {
					$push: { media: image._id }
				}, function() { console.log(arguments); });
			}
			cloudinary.uploader.upload(req.files.thumbnail.path, function(results) {
				image.url = results.url;
				image.save(function(err, finalImage) {
					res.json(finalImage);
				});
			}, {
				public_id: image._id,
				crop: 'fill',
				width:300,
				height: 300
			});
		});	
	} else {
		res.json({});
	}
}