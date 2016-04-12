// fetch file from the server (used to fetch album json files)
function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText; 
}

// parse URI arguments and return args
function getArgs()
{
	var args = {};
	var query = window.location.search.substring(1).split("&");
	for (var i = 0, max = query.length; i < max; i++)
	{
		if (query[i] === "") // check for trailing & with no param
			continue;
		var param = query[i].split("=");
		args[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
	}
	return args
}

// insert header HTML
function insertHeader()
{
	document.getElementById("header").innerHTML= ' \
<div class="scottHeadStyle"> \
	<div> \
	  <p class="alignleft">D. Scott Williamson</p> \
	  <p class="alignright">Compulsively Creative</p> \
	</div> \
	<div style="clear: both;"></div> \
</div> \
<div class="onePixel"><br></div>\
<div class="scottHeadStyle">\
	&nbsp;&nbsp; &nbsp;Picasa Albums&nbsp;| &nbsp;SOLID Corp.&nbsp;| &nbsp;Morezaic\
</div>'

}
