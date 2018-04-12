$(document).ready(function(){
	
	//pop up modal PopUp Main Event 

	$('body').on('click','.close',closeMainEvent);
	

// close Main Event Pop Up 
	
	function closeMainEvent(event){
		$('#Main-PopUp').fadeOut();
		$('#Main-PopUp-main').fadeOut();
	}	

	//pop up login 

	$('body').on('click','.login',showMainlog);
	$('body').on('click','.close',closeMainlog);



	function showMainlog(event){
		$('#login-PopUp').fadeIn();
		$('#login-PopUp-main').show();
	}
	
// close login pop up 
	
	function closeMainlog(event){
		$('#login-PopUp').fadeOut();
		$('#login-PopUp-main').fadeOut();
	}	


	//pop up sign Up 

	$('body').on('click','.signup',showMainSignUp);
	$('body').on('click','.close',closeMainSignUp);



	function showMainSignUp(event){
		$('#signUp-PopUp').fadeIn();
		$('#signUp-PopUp-main').show();
	}
	
// close sign Up pop up 
	
	function closeMainSignUp(event){
		$('#signUp-PopUp').fadeOut();
		$('#signUp-PopUp-main').fadeOut();
	}	


	//pop up game 

	$('body').on('click','.home',showMaingame);
	$('body').on('click','.close',closeMaingame);



	function showMaingame(event){
		$('#game-PopUp').fadeIn();
		$('#game-PopUp-main').show();
	}
	

	
	function closeMaingame(event){
		$('#game-PopUp').fadeOut();
		$('#game-PopUp-main').fadeOut();
	}	

//  social pop up 

	$('body').on('click','.request_demo',showMaindemo);
	$('body').on('click','.close',closeMaindemo);

	function showMaindemo(event){
		$('#social-PopUp').fadeIn();
		$('#social-PopUp-main').show();
	}
	
// close social pop up 
	
	function closeMaindemo(event){
		$('#social-PopUp').fadeOut();
		$('#social-PopUp-main').fadeOut();
	}	
	


/* Scrolling href */
$('a[href^="#"]').on('click', function(event) {

    var target = $(this.getAttribute('href'));

    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }

});


	
	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollTop').fadeIn(500);
		} else {
			$('.scrollTop').fadeOut(500);
		}
	});
	
	//Click event to scroll to top
	$('.scrollTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});



	// showing the feeding part
	$('#bottom-sec').on('click','.feedbacks',showfeedsec);
	$('#feedback_sec').on('click','.feed-display',hidefeedsec);

	function showfeedsec (event) {
		$('#feedback_sec').show(400);
		$('#footer-sec').css({
			'top':'690%'
		});
	}
	
	function hidefeedsec(event) {
		$('#footer-sec').css({
			'top':'610%'
		});
		$('#feedback_sec').hide(400);
	}


	$('.we_recruit').bPopup({
            autoClose: 4000 //Auto closes after 1000ms/1sec
        });

	$('#Main-PopUp').hide();
	$('body').on('click','.we_recruit',function(){
		$('#Main-PopUp').show();
	});

	//show delete button on the feedback systeme ! 
	$(".container-feeds").on('mouseover','#feedbacks_list',function(){
		$(this).find('.del-f').css({
					'opacity':'1'
				});
	});
	//hide delete button on the feedback systeme ! 
	$('.container-feeds').on('mouseout','#feedbacks_list',function(){
		$(this).find('.del-f').css({
					'opacity':'0'
				});
	});


	


	// data display : with ajax function 
	$('.form-subsc').on('submit', function(event) { // On submit or keyUp Entrer

		$.ajax({	// calling ajax function 
			data : {
				email : $('.zone-text').val() // grabing the value of the input Email 
			},
			type : 'POST', // define the method
			url : '/subscrib' // references to the path on github
		})
		.done(function(data) {

			if (data.error) { // display the data if error 
				$('.message_sub').text(data.error).show();
			}
			else if (data.success) { // display the data if success 
				$('.message_sub').text(data.success).show();
			}
			else { // display the data if the call is other than Post 
				$('.message_sub').text(data.none).show();
			}
		});

		event.preventDefault(); // display the function of the submit 

	});


});
//  verification sign Up 




