mongoose = require 'mongoose'
db = mongoose.connect 'mongodb://localhost/daal'
tnepSchema = new mongoose.Schema {epid : String, tnid : String, HomeMC : String, HostMC : String, ReDate : String, prog : String}, {collection : 'tnep'}
tnepModel = db.model 'tnep', tnepSchema 

exports.index = (req, res) ->
	tnepModel.count {}, (err, c)->
		console.log('Count is ' + c);
		res.render 'index', {data : c, title : "Visual Daal"}

exports.raw = (req, res) ->
	tnepModel.find {}, (err, list_data)->
		res.render 'raw', {list_data : list_data, title : "DAAL Raw Data"}

exports.mcrankings = (req, res) ->
	switch req.params.prog
		when "igip"
			prog="Global Internship"
			mode="Incoming"
		when "ogip"
			prog="Global Internship"
			mode="Outgoing"
		when "ogcdp"
			prog="Global Community Development"
		when "igcdp"
			prog="Global Community Development"
	if mode == 'Outgoing'
		prog_col = 'HomeMC'
	else
		prog_col = 'HostMC'
	tnepModel.distinct prog_col, {'prog' : prog}, (err, mcs) ->
		mcs.sort (a,b) ->
			return b.length - a.length
		res.render 'mcrankings', {rankings : mcs, title : "MC Rankings"}

exports.lcrankings = (req, res) ->
	switch req.params.prog
		when "igip"
			prog="Global Internship"
			mode="Incoming"
		when "ogip"
			prog="Global Internship"
			mode="Outgoing"
		when "ogcdp"
			prog="Global Community Development"
		when "igcdp"
			prog="Global Community Development"
	if mode == 'Outgoing'
		prog_col = 'HomeLC'
	else
		prog_col = 'HostLC'
	tnepModel.distinct prog_col, {'prog' : prog}, (err, lcs) ->
		lcs.sort (a,b) ->
			return b.length - a.length
		res.render 'lcrankings', {rankings : lcs, title : "LC Rankings"}