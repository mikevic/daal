(function() {
  exports.test = function(req, res) {
    return res.render('index', {
      title: 'TEST'
    });
  };

}).call(this);
