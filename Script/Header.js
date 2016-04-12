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
	&nbsp;&nbsp;&nbsp;Albums&nbsp;|&nbsp;SOLID Corp.&nbsp;|&nbsp;Morezaic&nbsp;|&nbsp;About\
</div>'

}

function onLoadMain() {
	insertHeader();
}

function onLoadAlbums() {
	insertHeader();
	
	var json_obj = JSON.parse(Get("albums.json"));
	albums=json_obj.album.length;

	contentHTML="<div class=\"title\">Albums</div>";
	for (i=0;i<albums; ++i)
	{
		json= json_obj.album[i];
		imageBlock='<a href="album.html?a='+json+'">'+json+'</a><br>'
		contentHTML += imageBlock;
	} 
	document.getElementById("content").innerHTML=contentHTML;
}

function onLoadAlbum() {
	insertHeader();
	args=getArgs();
	json=args["a"];
	
	albumJson=json+".json";
	var json_obj = JSON.parse(Get(albumJson));
	albumTitle= json_obj.albumData.title;
	images=json_obj.media.length;
	albumHTML="<div class=\"title\">"+albumTitle+"</div>";
	albumHTML+="<div class=\"count\">("+images+" images)</div><br>";
	albumHTML+="<br>";
	for (i=0;i<images; ++i)
	{
		title= json_obj.media[i].title;
		urlDownload= json_obj.media[i].url;
		description=json_obj.media[i].description;
		urlThumb=urlDownload;
		urlThumb = urlDownload.replace('s0-d','s200-c');
		urlFullsize=urlDownload;
		urlFullsize=urlDownload.replace('s0-d','s0-c');
		//console.log("this is the title name: "+title);
		imageBlock="";
		//imageBlock += title+'<br>';
		imageBlock += '<a href="'+urlFullsize+'">'
		imageBlock += '<img src="'+urlThumb+'"\>'
		imageBlock += '</a><br>'
		imageBlock += "<div class=\"desc\">"+description+'</div><br>';
		imageBlock += '<br>';
		albumHTML += imageBlock;
	} 
	document.getElementById("content").innerHTML=albumHTML;
}

