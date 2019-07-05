$( document ).ready(function() {
    console.log( "ready!" );
    
    $("#Search").click(function() {
    	console.log("Search");
    	sendSearchString("Search");
    });
    
  
});

function sendSearchString (methodType){
	
	var userInputValue;
	
	if(methodType == "Search" ){
		userInputValue = $('#userInput').val();
	}
	
	/*
		jQuery ajax does not send undefined data, so GET and DEL
		are sent without any params when userInputValue is not
		initialized.
	*/
	
	$.ajax({
		method: methodType,
		url: "/data",
		data: { userInput: userInputValue }
	})
	.done(function( msg ) {
		//alert( "Data Saved: " + msg );
		$('#REST-modal-body').html(msg);
		$('#REST-modal').modal('show');
	});
}