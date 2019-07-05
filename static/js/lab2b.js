$( document ).ready(function() {
    console.log( "ready!" );
    
   
    
    $("#RESTput").click(function() {
    	console.log("PUT");
    	makeRESTcall("GET");
    });
    
  
});

function makeRESTcall(methodType){
	
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
		
		url: "/static",

		data: { userInput: userInputValue }
		
		//data: { data:  $('#userInput').val(); }
	})
	.done(function(  msg) {
		//alert( "Data Saved: " + msg );
		// length = Object.keys(msg).length
		// var obj = $.parseJSON(msg)
		// var data= obj.response
		msg2=JSON.stringify (msg['response']['docs'][0]);
		alert (msg2);


		$('#REST-modal-body').html(msg2);
		$('#REST-modal').modal('show');

		
	});
}