//jscript for da hoes
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
		return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    /*
    //local storage test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');*/

    //validate bookmark is or isnt null
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmark to array
        bookmarks.push(bookmark);
        // Re -set back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    //clearform
    document.getElementById('myForm').reset();
    
    fetchBookmarks();


    e.preventDefault();
}

//delete bookmark
function deleteBookmark(url) {
    //get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //refetch bookmarks
    fetchBookmarks();
}



//fetch bookmarks
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //build output
    bookmarksResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url

        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>' + name +
            '<a class= "btn btn-default" target="_blank" href="' + url + '">Visit</a> ' +
            '<a onclick="deleteBookmark(\'' + url + '\')" class= "btn btn-danger" href="#">Delete</a> ' +
            '</h3>' +
            '</div>';
    }
}

function validateForm(siteName,siteUrl){
	    if(!siteName || !siteUrl){
    	alert('Yo bro... fill daa form looooozaa');
    	return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('real urls only holmes');
		return false;
	}

	return true;
}