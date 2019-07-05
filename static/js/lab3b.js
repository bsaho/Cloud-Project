$( document ).ready(function() {
var name =gettCookies ("969TAExplanations");
	



// function strMatcher (str1, str2){

// 	return (str1 < str2 ? -1 : +(str1 > str2));

// }

	refreshProgressBar ();
	if (document.getElementById("Booker")!=null){
		populateBookShelf ();
	}

	$(document).on('click', '.tuff', function(){ 
		var id = $(this).parent().attr("id");
		var strArry=  id.split ("..");
		isbn =strArry[0];
		addToBookShelf (isbn);

 	});

	$(document).on('click', '.endd', function(){ 
		var id = $(this).parent().attr("id");
		var strArry=  id.split ("..");
		isbn =strArry[0];

		deleteOneFromBookShelf (isbn);
		$(this).parent().parent().parent().remove ();


 	});
 	$(document).on('click', '.reads', function(){ 
		var id = $(this).parent().parent().attr("id");
		var strArry=  id.split ("..");
		isbn =strArry[0];
		$.ajax({
		method: "PUT",
		url: "/readadd",
		data: { userInput: encodeURI (isbn) }
		})
		.done(function( msg ) {
	       

			
		})
		 .fail(function() {
	  });


		populateBookShelf ();
		


 	});
 	$(document).on('click', '.readngs', function(){ 
		var id = $(this).parent().parent().attr("id");
		var strArry=  id.split ("..");
		isbn =strArry[0];
		stringg1="reading;" + isbn;
		$.ajax({
		method: "PUT",
		url: "/readingadd",
		data: { userInput: encodeURI (isbn) }
		})
		.done(function( msg ) {
	       

			
		})
		 .fail(function() {
	  });


		populateBookShelf ();

		


 	});
 	$(document).on('click', '.unreads', function(){ 
		var id = $(this).parent().parent().attr("id");
		var strArry=  id.split ("..");
		isbn =strArry[0];
		stringg="unread;" + isbn;
		$.ajax({
		method: "PUT",
		url: "/unreadadd",
		data: { userInput: encodeURI (isbn) }
		})
		.done(function( msg ) {
	      

			
		})
		 .fail(function() {
	  });


		


 	});
 	$(document).on('click', '.endd', function(){ 
		var id = $(this).parent().attr("id");
		var strArry=  id.split ("..");
		isbn =strArry[0];

		deleteOneFromBookShelf (isbn);
		$(this).parent().parent().parent().remove ();



 	});


	$(document).on('click', '.next', function(){ 
		var id = $(this).parent().attr("id");
		var strArry=  id.split ("..");
		isbn =strArry[0];
		vID=strArry[1];
		Title=strArry[2];
		author=strArry[3];
		desc=strArry[4]



		$('.modal-title').html (Title + " by " + author);
		$("#otherBooks").empty ();
		$("#otherBooks").append ("<h1> Book Info: </h1><p>");
		$("#otherBooks").append ("<h4>" + desc + "</h4><p>");




		$.ajax({
		method: "PUT",
		url: "/relatedBooks",
		data: { userInput: vID }
		})
		.done(function( msg3 ) {

		$("#otherBooks").append ("<h1> Related Books: </h1><p>");
		if (msg3.totalItems>4){
		for (i = 0; i<5 ; i++) {
        previewLink=msg3.items[0].volumeInfo.previewLink;
        previewLinkLine="<p><a href="+ previewLink +"> Preview Link</a></p>"

		 title=msg3.items[i].volumeInfo.title;
		 titleString="<a href="+ previewLink +"><h4>" + title + "</h4></a>"
		$("#otherBooks").append (titleString);
		}
		}else {
		$("#otherBooks").append ("<h4> No Related Books Found</h4>");

		}
		$.ajax({
		method: "PUT",
		url: "/reviewquery",
		data: { userInput: isbn }
		})
		.done(function( msg ) {
		$('#otherBooks').append ("<p><h1> NYT Reviews (if available)</h1>");

		for (i = 0; i<10 ; i++) {
		line=JSON.stringify(msg['results'][i]['book_title']);
		author=JSON.stringify(msg['results'][i]['book_author']);
		linee= line + " by " + author;
		link=JSON.stringify(msg['results'][i]['url']);
		desc=JSON.stringify(msg['results'][i]['summary']);


		finalLine="<a href=" + link +" class=\"list-group-item\"><h4 class=\"list-group-item-heading\">"
		+ linee +"</h4><p>" + desc +"</p>" +"</a>" 
			
		$('#otherBooks').append (finalLine);

		}

		})
		.fail(function() {

		});




		})
		.fail(function() {

		});
		$('#moarDetails').modal('show');


 	});

	
	
	$("#BLACKBtn").click (function (){

	  handleCookies (1);
						  
	});
	$("#unreadButton").click (function (){
	setCookies ("readStatus","unread");
			populateBookShelf ();

						  
	});
	$("#allButton").click (function (){
	setCookies ("readStatus","all");
			populateBookShelf ();

						  
	});

	$("#readButton").click (function (){
		setCookies ("readStatus","read");
		populateBookShelf ();
	
	});
	$("#readingButton").click (function (){
		setCookies ("readStatus","reading");
				populateBookShelf ();

	});
	$("#DestroyTable").click (function (){
		
				clearShelf ();						  

		

	});
	$("#REDBtn").click (function (){
			handleCookies (2)
	  });
    $("#RESTput").click(function() {
    	makeRESTcall("PUT");
    });
    $("#BookREST").click(function() {
    	makeReviewCall("PUT");
    });
     $("#shelfREST").click(function() {
    	addToBookShelf("PUT");
    });
    $("#searchRest").click(function() {
    	searchBooks("PUT");
    });
        $("#HFiction").click(function() {
    	makeBestListCall("PUT",1);
    });
           $("#HNFiction").click(function() {
    	makeBestListCall("PUT",2);
    });
                 $("#HAdvice").click(function() {
    	makeBestListCall("PUT",3);
    });
           $("#PFiction").click(function() {
    	makeBestListCall("PUT",4);
    });
           $("#PMass").click(function() {
    	makeBestListCall("PUT",5);
    });

            $("#PNFiction").click(function() {
    	makeBestListCall("PUT",6);
    });
      $("#EFiction").click(function() {
    	makeBestListCall("PUT",7);
    });
            $("#ENFiction").click(function() {
    	makeBestListCall("PUT",8);
    });
                  $("#CFiction").click(function() {
    	makeBestListCall("PUT",9);
    });
    $("#CNFiction").click(function() {
    	makeBestListCall("PUT",10);
    });

	$("#BlueBGRN").click(function() {
		handleCookies (3)


	 });
	$("#GreenBGRN").click(function() {
		handleCookies (4)
	 });

    /* activate the carousel */
$("#modal-carousel").carousel({interval:false});

/* change modal title when slide changes */
$("#modal-carousel").on("slid.bs.carousel", function () {
  $(".modal-title").html($(this).find(".active img").attr("title"));
})

/* when clicking a thumbnail */
$(".row .thumbnail").click(function(){
    var content = $(".carousel-inner");
    var title = $(".modal-title");
  
    content.empty();  
    title.empty();
  
  	var id = this.id;  
    var repo = $("#img-repo .item");
    var repoCopy = repo.filter("#" + id).clone();
    var active = repoCopy.first();
  
    active.addClass("active");
    title.html(active.find("img").attr("title"));
  	content.append(repoCopy);

    // show the modal
  	$("#modal-gallery").modal("show");
});




    

});

function refreshProgressBar (){
	$.ajax({
		method: "PUT",
		url: "/counter",
		data: { userInput: encodeURI ("lol") }
	})
	.done(function( msg ) {
	   console.log ("From Counter")
	   console.log (msg);
       sizeArry=msg.split(';')
       total=parseInt (sizeArry[0]);

       read=parseInt (sizeArry[1]);


       reading=parseInt (sizeArry[2]);

        unread=parseInt (sizeArry[2]);


       readQuotient= Math.floor (read *100/total) ;
       $('.progress').empty();


       readingQuotient =Math.floor (reading *100/total) ;
        unreadQuotient =Math.floor (reading *100/total) ;
       console.log (total);
       

       readString="<div class=\"progress-bar progress-bar-success\" style=\"width: " + readQuotient  +"%\" id=\'readBooks\'><span>" + read + "/" + total + "</div>";
       readingString="<div class=\"progress-bar progress-bar-warning\" style=\"width: " + readingQuotient  +"%\" id=\'readingBooks\'><span>" + reading +"/" + total + "</div>";
       unreadString="<div class=\"progress-bar progress-bar-danger\" style=\"width: " + unreadQuotient  +"%\" id=\'unreadBooks\'><span>" + unread + "/" + total + "</div>";


       $('.progress').append(readString);

       $('.progress').append(readingString);







		
	})
	 .fail(function() {
  });


}

function deleteFromBookshelf (isbn){


	$.ajax({
		method: "PUT",
		url: "/delete",
		data: { userInput: encodeURI (isbn) }
	})
	.done(function( msg ) {
       $('#gallery').empty();
       populateBookShelf ();


		
	})
	 .fail(function() {
  });



}
function handleCookies (choice){
	if (choice==1){
		$("body").css ({"background-color":"black"});
		setCookies ("969bg","black");
		setCookies ("969TAExplanations",true);
		setCookies ("969BasicExpl",true);
		setCookies ("969Pointless",true);
		$("#TAExplanations").show();
		$("#BasicExpl").show();
		$("#Pointless").show();
 
		
		
	}else if (choice==2){
		$("body").css ({"background-color":"red"});
		setCookies ("969bg","red");
		setCookies ("969TAExplanations",false);
		setCookies ("969BasicExpl",false);
		setCookies ("969Pointless",false);
		$("#TAExplanations").hide();
		$("#BasicExpl").hide();
		$("#Pointless").hide();

		
	}else if (choice==3){
		$("body").css ({"background-color":"red"});
		setCookies ("969bg","red");
		setCookies ("969TAExplanations",true);
		setCookies ("969BasicExpl",true);
		setCookies ("969Pointless",true);
		$("#TAExplanations").show();
		$("#BasicExpl").show();
		$("#Pointless").show();
		
		
	}else if (choice==4){
		$("#TAExplanations").hide();
		$("#BasicExpl").hide();
		$("#Pointless").hide();
		$("body").css ({"background-color":"black"});
		setCookies ("969bg","black");
		setCookies ("969TAExplanations",false);
		setCookies ("969BasicExpl",false);
		setCookies ("969Pointless",false);
		
		
	}else{
		
		
	}
	checkCookie ("PUT");

}
function clearShelf (){

	
	/*
		jQuery ajax does not send undefined data, so GET and DEL
		are sent without any params when userInputValue is not
		initialized.
	*/
	
	$.ajax({
		method: "PUT",
		url: "/wipe",
		data: { userInput: encodeURI (userInputValue) }
	})
	.done(function( msg ) {
       $('#gallery').empty();


		
	})
	 .fail(function() {
  });


}

function changeBG (methodType){
	
	
}
function setCookies (cname,cvalue){
	var date= new Date ();
	date.setTime(date.getTime() + (60*60*24));
	var checkDate=date.toUTCString ();
	var expires="expires=" +date.toUTCString ();
	document.cookie= cname + "=" + cvalue +"; ";
}
function getCookies (){
	
	var color=$("#TAExplanations").is(":visible");
	//	.getElementById ("siteWrapper").style.backgroundColor;
	string="969TAExplanations=" + color;
	document.cookie=string;
}
function setVisibleCookies (cname,realName){
	var width = gettCookies (cname);
	if (width=="true"){
		$("#" + realName).show ();
		$("#TAExplanations").show();
	}
	else {
		$("#"+realName).hide ();
	}

	return;
	
}
function setColorCookies (){
	var width = gettCookies ("969bg");
	$("body").css ({"background-color":width});


	
	
}

function makeReviewCall(methodType){
	
	var userInputValue;
	
	if(methodType == "PUT" || methodType == "POST"){
		userInputValue = $('#userInput').val();
	}
	
	/*
		jQuery ajax does not send undefined data, so GET and DEL
		are sent without any params when userInputValue is not
		initialized.
	*/
	
	$.ajax({
		method: methodType,
		url: "/reviewquery",
		data: { userInput: userInputValue }
	})
	.done(function( msg ) {
        $('#REST-modal-body').empty ();
		for (i = 0; i<10 ; i++) {
		line=JSON.stringify(msg['results'][i]['book_title']);
		author=JSON.stringify(msg['results'][i]['book_author']);
		linee= line + " by " + author;
		link=JSON.stringify(msg['results'][i]['url']);
		desc=JSON.stringify(msg['results'][i]['summary']);


		finalLine="<a href=" + link +" class=\"list-group-item\"><h4 class=\"list-group-item-heading\">"
		 + linee +"</h4><p>" + desc +"</p>" +"</a>" 
		
		 $('#REST-modal-body').append (finalLine);
		 $('#REST-modal').modal('show');
		}
		
	})
	 .fail(function() {
  });
}
function populateBookShelf (){
	refreshProgressBar ();
	console.log ("Lol");
	
	userInputValue=gettCookies ("readStatus");
	$.ajax({
		method: "PUT",
		url: "/allShelf",
		data: { userInput: encodeURI (userInputValue) }
	})
	.done(function( msg ) {
		$('#gallery').empty ();
		console.log ("lel");
		console.log (msg);

		var str= msg;
		var strArry=  str.split (";");
		var size= strArry.length;
		console.log ("Limema")
		console.log (str);
		for (i=0;i<size;i++){
			if (strArry[i].length>9){
				addToBookShelf (strArry[i]);
			}
		}
		
	})
	 .fail(function() {
  });

}


function searchBooks(methodType){
	
	var userInputValue;
	
	if(methodType == "PUT" || methodType == "POST"){
		userInputValue = $('#userInput').val();
	}else {
		userInputValue=methodType;
		methodType="PUT"
	}
	/*
		jQuery ajax does not send undefined data, so GET and DEL
		are sent without any params when userInputValue is not
		initialized.
	*/
	var picURL;
	$.ajax({
		method: methodType,
		url: "/googlequery",
		data: { userInput: encodeURI(userInputValue) }
	})
	.done(function( msg ) {
 		$('#galleria').empty ();
		for (i = 0; i<10 ; i++) {
			// errorCheck=msg.localeCompare("Error")
			if ("Error" != msg ) {
			id=msg.items[i].volumeInfo.industryIdentifiers[0].identifier;
			volumeID=msg.items[0].id;
			desc=msg.items[0].volumeInfo.description;
	        title=msg.items[0].volumeInfo.title;
	        author =msg.items[0].volumeInfo.authors[0];
			format="<div class=\"marx panel panel-primary col-lg-3 col-md-4 col-xs-6 thumb\"  id=\"" + id + ".." + volumeID + ".." + title +".." + author +".." + desc + "\">  <div class=\"panel-heading\"><h3 class=\"panel-title\">" 
			format2="</h3></div>  <div class=\"panel-image\">"
			format3 ="</div>"
			buttonFormat="<button class=\"next btn btn-success\">View More Info</button>"

			buttonFormat2="<button class=\"tuff btn btn-success\" id=\"i" + i +"id" +"\">Add to Shelf</button></div>"
			picURL=msg.items[i].volumeInfo.imageLinks.thumbnail;
			// 	divStart="<div class=\"panel panel-primary col-lg-3 col-md-4 col-xs-6 thumb\">"
			// 	divMiddle="<div class=\"panel-image\">"
			divImge= "<img src=" + picURL + "class=\"img-responsive center-block\" />"

			title=msg.items[i].volumeInfo.title;
			author=msg.items[i].volumeInfo.authors[0];

			finalLine=format + title + " by " +author  + format2 + divImge+ format3 + buttonFormat + buttonFormat2;
		stringg="unread;" + id;
		setCookies ("readStatus",stringg);

			 $('#galleria').append (finalLine);}

		}
      
		})
		
	
	 .fail(function() {
  });
}
function deleteOneFromBookShelf(methodType){
	
	var userInputValue;
	
	if(methodType == "PUT" || methodType == "POST"){
		userInputValue = $('#userInput').val();
	}else {
		userInputValue=methodType;
		methodType="PUT"
	}
	/*
		jQuery ajax does not send undefined data, so GET and DEL
		are sent without any params when userInputValue is not
		initialized.
	*/
	var picURL;
	$.ajax({
		method: methodType,
		url: "/shelfdelete",
		data: { userInput: encodeURI(userInputValue) }
	})
	.done(function( msg ) {
        //$('#gallery').empty ();
		// for (i = 0; i<10 ; i++) {
	$.ajax({
		method: methodType,
		url: "/picdelete",
		data: { userInput: encodeURI(userInputValue) }
		})
		.done(function( msg2 ) {
		 
		})
		 .fail(function() {
	  });

		
	})
	 .fail(function() {
  });
	 
}


function addToBookShelf(methodType){
	console.log ("Adding");
	
	var userInputValue;

	console.log (userInputValue);
	if(methodType == "PUT" || methodType == "POST"){
		userInputValue = $('#userInput').val();
	}else {
		userInputValue=methodType;
		methodType="PUT";
	}
	/*
		jQuery ajax does not send undefined data, so GET and DEL
		are sent without any params when userInputValue is not
		initialized.
	*/
	console.log ("Shelf query");
	var picURL;
	$.ajax({
		method: methodType,
		url: "/shelfquery",
		data: { userInput: encodeURI(userInputValue) }
	})
	.done(function( msg ) {
		console.log (msg);
		console.log ("Time to get photos");
        //$('#gallery').empty ();
		// for (i = 0; i<10 ; i++) {
		$.ajax({
			method: methodType,
			url: "/picquery",
			data: { userInput: encodeURI(userInputValue) }
			})
			.done(function( msg2 ) {
				console.log ("Save");
				console.log (msg2);
			// errorCheck=msg2.localeCompare("Error")
			if ("Error" != msg2 ) {
			id=msg2.items[0].volumeInfo.industryIdentifiers[0].identifier;
			volumeID=msg2.items[0].id;
			desc=msg2.items[0].volumeInfo.description;


			picURL=JSON.stringify(msg2['items'][0]['volumeInfo']['imageLinks']['thumbnail']);
			divStart="<div class=\"panel panel-primary col-lg-3 col-md-4 col-xs-6 thumb\" id=\"" + id +".." + volumeID +"\">"
			divMiddle="<div class=\"panel-body\">"
			divImge= "<img src=" + picURL + "class=\"img-responsive center-block\" />"
	        divMiddleEnd="<div class=\"panel-image\">" +divImge + "<label for=\"toggle-4\"></label></div>"
	        category=JSON.stringify(msg2['items'][0]['volumeInfo']['industryIdentifiers']['categories']);
	        title=msg2.items[0].volumeInfo.title;
	        author =msg2.items[0].volumeInfo.authors[0];
	        categoryLine= "<p>" + category +"</p>"
	        previewLink=JSON.stringify(msg2['items'][0]['volumeInfo']['previewLink']);
	        previewLinkLine="<p><a href="+ previewLink +"> Preview Link</a></p>"
	  	 	heading= "<div class=\"panel-heading\"><h3 class=\"panel-title\">" + title + " by " + author + "</h3></div>"
			buttonFormat="<button class=\"next btn btn-success\">View More Info</button>"

			buttonFormat2="<button class=\"endd btn btn-danger\">Delete from DB</button>"
	        midButtonFormat="<div class=\"btn-group\"><a class=\"reads btn btn-xs btn-success\" href=\"#\">Read</a><a class=\"readngs btn btn-xs btn-warning\" href=\"#\">Reading</a><a class=\"unreads btn btn-xs btn-danger\" href=\"#\">Unread</a></div></div>"


	        reviewCount=JSON.stringify (msg['books'][0]['average_rating']); 
	        goodReadsRating= "<p> Average GoodReads Rating: " +reviewCount +"</p>"
	        finalLine=divStart+ heading + divMiddle +divMiddleEnd +   "<div class=\"panel-body\" id=\"" + id + ".." + volumeID + ".." + title + ".." + author + ".." + desc + "\">"   + goodReadsRating + previewLinkLine + buttonFormat  +buttonFormat2+midButtonFormat; 
			 $('#gallery').append (finalLine);
			 }


			
			 
			})
			 .fail(function() {
			 	console.log ("Failed, totally");
		  });
		// divStart="<div class=\"panel panel-default col-lg-3 col-md-4 col-xs-6 thumb\">"
		// divMiddle="<div class=\"panel-image\"><div class=\"panel panel-default col-lg-3 col-md-4 col-xs-6 thumb\">"
  //       divMiddleEnd="<div class=\"panel-image\"><label for=\"toggle-4\"></label></div>" 
        
  //       reviewCount=JSON.stringify (msg['books'][0]['average_rating']);
  //       finalLine=divStart+ divMiddle +divMiddleEnd + "<div class=\"panel-body\">" + "<h4>Ratings Data From Goodreads</h4><p> Average rating: " +reviewCount+ "</p></div>"; 
     //$('#gallery').empty ();
		// for (i = 0; i<10 ; i++) {
	

			// line=JSON.stringify(msg['results'][i]['book_title']);
		// author=JSON.stringify(msg['results'][i]['book_author']);
		// linee= line + " by " + author;
		// link=JSON.stringify(msg['results'][i]['url']);
		// desc=JSON.stringify(msg['results'][i]['summary']);


		// finalLine="<a href=" + link +" class=\"list-group-item\"><h4 class=\"list-group-item-heading\">"
		//  + linee +"</h4><p>" + desc +"</p>" +"</a>" 
		//Working="<div class=\"col-lg-12\"><h1 class=\"page-header\">Thumbnail2 Gallery</h1></div>";
		
	})
	 .fail(function() {
	 	console.log ("Failed before photos");
  });
}
function gettCookies (cname){
	var name= cname + "=";
	var ca= document.cookie.split(';');
	for (var i=0;i<ca.length;i++){
		var c=ca[i];
		while (c.charAt(0)==' ') c=c.substring (1);
		if (c.indexOf(name)==0) return c.substring (name.length,c.length);
		}
	return "";
	}
	
function deleteCookies (){
	document.cookie="969bg= ; expires=Thu, 8 Dec 2019 12:00:00 UTC; "
	document.cookie="969TAExplanations= ; expires=Thu, 8 Dec 2019 12:00:00 UTC; "
	document.cookie="969BasicExpl= ; expires=Thu, 8 Dec 2019 12:00:00 UTC; "
	document.cookie="969Pointless= ; expires=Thu, 8 Dec 2019 12:00:00 UTC; "
	document.cookie="rr969bg= ; expires=Thu, 8 Dec 2019 12:00:00 UTC; "
	document.cookie="r969bg= ; expires=Thu, 8 Dec 2019 12:00:00 UTC; "

}
function returnToDefault (){
	$("body").css ({"background-color":"red"});
	setCookies ("969bg","red");
	setCookies ("969TAExplanations",false);
	setCookies ("969BasicExpl",false);
	setCookies ("969Pointless",false);
	$("#TAExplanations").hide();
	$("#BasicExpl").hide();
	$("#Pointless").hide();

}
function checkCookie (methodType){
	var cookieValue;
	
	if(methodType == "PUT" || methodType == "POST"){
		cookieValue=document.cookie;
		$.ajax({
			   method: "PUT",
			   url: "/cookie",
			   data: { cookieVal: cookieValue }
			   })
		.done(function( msg ) {
			  if (msg=="pass=FAIL"){
			  deleteCookies ();
			  //document.cookie="pass=; expires=Thu, 8 Dec 2013 12:00:00 UTC; ";
			  y=document.cookie;
			  returnToDefault ();
			  x=document.cookie;
			  }else {
			  goodCookie=document.cookie;
			  //document.cookie=goodCookie;
			  }
			  })
	 .fail(function() {
		   });
		
	}
}
function makeBestListCall(methodType, choice){
	
	var userInputValue;
	
	if(choice==1){
		userInputValue = "hardcover-fiction";
	}else if (choice==2){
		userInputValue = "hardcover-nonfiction";

	}else if (choice==3){
		userInputValue = "hardcover-advice";

	}else if (choice==4){
		userInputValue = "trade-fiction-paperback";

	}else if (choice==5){
		userInputValue = "mass-market-paperback";

	}else if (choice==6){
		userInputValue = "paperback-nonfiction";

	}else if (choice==7){
		userInputValue = "e-book-fiction";

	}else if (choice==8){
		userInputValue = "e-book-nonfiction";

	}else if (choice==9){
		userInputValue = "combined-print-and-e-book-fiction";

	}else if (choice==10){
		userInputValue = "combined-print-and-e-book-nonfiction";

	}
	
	/*
		jQuery ajax does not send undefined data, so GET and DEL
		are sent without any params when userInputValue is not
		initialized.
	*/
	
	$.ajax({
		method: methodType,
		url: "/bestlist",
		data: { userInput: userInputValue }
	})
	.done(function( msg ) {
        $('#REST-modal-body').empty ();
		for (i = 0; i<10 ; i++) {
		line=msg.results.books[i].title;
		author=msg.results.books[i].author;
		linee= line + " by " + author;
		link=msg.results.books[i].amazon_product_url;
		weeks=msg.results.books[i].weeks_on_list;
		desc=msg.results.books[i].description;
		isbn=msg.results.books[i].primary_isbn10;
		// console.log (isbn);


		finalLine="<div id=\"" + isbn +"\"><a href=" + link +" class=\"list-group-item\"><span class=\"badge\">"+ weeks +"</span><h4 class=\"list-group-item-heading\">" 
		 + linee +"</h4><p>" + desc +"</p>" +"</a><button class=\"tuff btn btn-success\" id=\"i" + i +"id" +"\">Add to Shelf</button></div>" 

		
		 $('#REST-modal-body').append (finalLine);
		 $('#REST-modal').modal('show');
		}
		
	})
	 .fail(function() {
  });
}


function makeRESTcall(methodType){
	
	var userInputValue;
	
	if(methodType == "PUT" || methodType == "POST"){
		userInputValue = $('#userInput').val();
		ui=document.getElementById('userInput');
		uip=    ui.parentNode;
		var id = $("#userInput").parent().attr("id");


	}
	
	/*
		jQuery ajax does not send undefined data, so GET and DEL
		are sent without any params when userInputValue is not
		initialized.
	*/
	
	$.ajax({
		method: methodType,
		url: "/data",
		data: { userInput: encodeURI (userInputValue) }
	})
	.done(function( msg ) {
        $('#REST-modal-body').empty ();
		for (i = 0; i<10 ; i++) {
		line=msg.response.docs[i].headline.main;
		link=msg.response.docs[i].web_url;
		snippet=msg.response.docs[i].snippet;
		finalLine="<a href=" + link +" class=\"list-group-item\"><h4 class=\"list-group-item-heading\">" + 
		line + "</h4>" + "<p>" +snippet +"</p>" +"</a>" 		
		 $('#REST-modal-body').append (finalLine);
		 $('#REST-modal').modal('show');
		}
		
	})
	 .fail(function() {
  });
}