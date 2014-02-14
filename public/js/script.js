$(function() {
	var textarea = $('textarea'),
		clear = $('#clear'),
		submit = $('input');
	submit.click(function(e) {
		e.preventDefault();
		var text = textarea.val();
		if(text.length) {
			console.log("message:", text);
			sendMessage(text);
		} else {
			console.log("empty message");
		}
	});
	clear.click(function(e) {
		e.preventDefault();
		textarea.val('').focus();
	});
	function sendMessage(msg) {
		$.ajax({
			url: '/message',
			type: 'POST', 
			data: {
				message: msg
			},
			success: function() {
				console.log('success', arguments);
			},
			error: function() {
				console.log('error', arguments);
			}
		});
	}
})