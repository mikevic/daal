(function() {
  var db, mongoose, tnepModel, tnepSchema;

  mongoose = require('mongoose');

  db = mongoose.connect('mongodb://localhost/daal');

  tnepSchema = new mongoose.Schema({
    epid: String,
    tnid: String,
    HomeMC: String,
    HostMC: String,
    ReDate: String,
    prog: String
  }, {
    collection: 'tnep'
  });

  tnepModel = db.model('tnep', tnepSchema);

  exports.index = function(req, res) {
    return tnepModel.count({}, function(err, c) {
      console.log('Count is ' + c);
      return res.render('index', {
        data: c,
        title: "Visual Daal"
      });
    });
  };

  exports.raw = function(req, res) {
    return tnepModel.find({}, function(err, list_data) {
      return res.render('raw', {
        list_data: list_data,
        title: "DAAL Raw Data"
      });
    });
  };

  exports.mcrankings = function(req, res) {
    var mode, prog, prog_col;
    switch (req.params.prog) {
      case "igip":
        prog = "Global Internship";
        mode = "Incoming";
        break;
      case "ogip":
        prog = "Global Internship";
        mode = "Outgoing";
        break;
      case "ogcdp":
        prog = "Global Community Development";
        break;
      case "igcdp":
        prog = "Global Community Development";
    }
    if (mode === 'Outgoing') {
      prog_col = 'HomeMC';
    } else {
      prog_col = 'HostMC';
    }
    return tnepModel.distinct(prog_col, {
      'prog': prog
    }, function(err, mcs) {
      mcs.sort(function(a, b) {
        return b.length - a.length;
      });
      return res.render('mcrankings', {
        rankings: mcs,
        title: "MC Rankings"
      });
    });
  };

  exports.lcrankings = function(req, res) {
    var mode, prog, prog_col;
    switch (req.params.prog) {
      case "igip":
        prog = "Global Internship";
        mode = "Incoming";
        break;
      case "ogip":
        prog = "Global Internship";
        mode = "Outgoing";
        break;
      case "ogcdp":
        prog = "Global Community Development";
        break;
      case "igcdp":
        prog = "Global Community Development";
    }
    if (mode === 'Outgoing') {
      prog_col = 'HomeLC';
    } else {
      prog_col = 'HostLC';
    }
    return tnepModel.distinct(prog_col, {
      'prog': prog
    }, function(err, lcs) {
      lcs.sort(function(a, b) {
        return b.length - a.length;
      });
      return res.render('lcrankings', {
        rankings: lcs,
        title: "LC Rankings"
      });
    });
  };

}).call(this);
