////////////////============================JUKEBOX==================================////////////////////////////////////////////////
function jukeBox(){
	this.players = [];
	this.tracks = [];
	this.currentSong = 0;
	this.SC = SC;
	this.SC.initialize({
		client_id: 'fd4e76fc67798bfa742089ed619084a6',
	});
};

jukeBox.prototype.pauseAudio = function(){
	this.players[this.currentSong].pause();
}

jukeBox.prototype.playAudio = function(){
	var that = this;
	if( this.players[this.currentSong] ) {
		this.players[this.currentSong].play();
	} else {
		SC.stream("/tracks/" + that.tracks[that.currentSong].id).then(function(song){
			that.players[that.currentSong] = song;
			song.play();
			that.updateInfo();
		});
	}
}

jukeBox.prototype.stopAudio = function(){
	this.players[this.currentSong].pause();
	this.players[this.currentSong].seek(0);	
}

jukeBox.prototype.nextAudio = function(){
    this.currentSong += 1;
    if( this.currentSong >= this.tracks.length){
      this.currentSong = 0;
    }
    this.playAudio();
}

jukeBox.prototype.updateInfo = function(){
var tracks = this.tracks
var currentSong = this.currentSong
var title = document.getElementById("title")
var artistlink = document.getElementById("artistlink")
var tracklink = document.getElementById("tracklink")
var description = document.getElementById("description")
var genre = document.getElementById("genre")
var releaseyear = document.getElementById("releaseyear")
var artwork = document.getElementById("artwork")
title.innerHTML = tracks[currentSong].title;
artistlink.innerHTML = "<a href=\"" + tracks[currentSong].user.permalink_url + "\">" + tracks[currentSong].user.permalink_url + "</a>";
tracklink.innerHTML = "<a href=\"" + tracks[currentSong].permalink_url + "\">" + tracks[currentSong].permalink_url + "</a>";
description.innerHTML = tracks[currentSong].description;
genre.innerHTML = tracks[currentSong].genre;
releaseyear.innerHTML = tracks[currentSong].release_year;
artwork.innerHTML =	"<img src=\"" + tracks[currentSong].artwork_url + "\" />";
}

jukeBox.prototype.searchTracks =function(){
	var that = this;
	var elInput = document.getElementById("search");	
	SC.get("/tracks",{
		q: elInput.value
	}).then(function(response){
		console.log(response);
		that.tracks = response;
		that.players = [];
		that.playAudio();
	});			
};

var jukeBox = new jukeBox()


document.getElementById("pause").addEventListener("click",function(event){
	jukeBox.pauseAudio();          	
});

document.getElementById("play").addEventListener("click",function(event){
	jukeBox.playAudio();          	
});

document.getElementById("stop").addEventListener("click",function(event){   	
	jukeBox.stopAudio();            	
});

document.getElementById("next").addEventListener("click",function(event){
	jukeBox.nextAudio();

});

document.getElementById("search").addEventListener("change", function(event){
	jukeBox.searchTracks();
		// setTimeout(function(){
		// 	jukeBox.updateInfo(); 
		// },2000);   	
});








