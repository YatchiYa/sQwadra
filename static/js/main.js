
// *****************           VueJs                     **********************************


// input list  in general list : using vue.js

/*
Vue.component('general-task-list', {

	template:'<div> <slot></slot> </div>'

});

 

new Vue ({

	el: '#ToDos',
	data: {
		newtask: '',
		tasks: []
		},

	methods: {
		addTask() {

			this.tasks.push(this.newtask);
			this.newtask='';		
		}
	},
});



*/ 
// ***************************    Jquery  ******************************





$(document).ready( function()
{


	/* -----------------  Prototype   -----------------------  */

	// Show Edit ToDo tool

	$('#container').on('click','.editItem',showModal);
	$('#modal-ToDos').on('click','.close',closeModal);
	// cancel button in modal ToDos
	$('#modal-ToDos').on('click','.failled',closeModal);




	// Quick Edit Task
	$('#container').on('click','.todo-task-li',startEditing);
	$('#container').on('click','.saveItem','cancelItem',stopediting);
	$('#container').on('click','.cancelItem','saveItem',cancelediting);

	
	//   hiding / showing the different button :   calendar / edititem / delet 

	$('.delete').hide();
	$('.editItem').hide();
	$('#general-task').on('mouseover','li',showOption);
	$('#general-task').on('mouseout','li',hideOption);



	/* allToDos */

	$('#all-Todos').hide();
	$('#ToDos').on('click','.img-all',function(){
		$('#all-Todos').toggle(300);
	});
	$('#all-Todos').on('click','.closeIcon-all',function(){
		$('#all-Todos').hide(300);
	});


	// showing the box of tasks in the All tasks part 
	
	$('#all-Todos').on('click','#title-IU',oth);
	$('#all-Todos').on('click','#title-I',oth);
	$('#all-Todos').on('click','#title-U',oth);
	$('#all-Todos').on('click','#title-NIU',oth);
	$('#all-Todos').on('click','.general-task-title',oth);



  	// set a deadline

 	$( function() {
			    $( ".setDeadline" ).datepicker();
			  } );

	$('.setDeadline').hide();
	$('.TheDeadLine').hide();	
	$('#general-task').on('click','.calendarItem',setDeadline);	
 
	$('.setDeadline').on('keypress', function(event){       /*  13 ->> keycode(button : Entree ) */
		if(event.keyCode === 13){							/* function when you click in keyboard Entree */
			var currentText = $(this).parent().find('.setDeadline').val();
			$(this).parent().find('.TheDeadLine').text(' Due On ' + currentText + ' !');
			$(this).parent().find('.setDeadline').hide();
			$(this).parent().find('.TheDeadLine').show();
			event.preventDefault();
		}
	});


	function confirmDeadline(){

	}


	// deleting todos
	$('#general-task').on('click','.delete',deleteItem);	



	// completing todos 
	$('#ToDos').on('change','.toggle',completeItem);   /* change the boxe of checkbox ( Valid or not) */

	//Reward systeme ! 
	$('#ToDos').on('change','.toggle',rewardItem);   /* Reward System */



	// add a skill
	$("#skills").on('click','.addskills',showaddskill);

	/* ----------------------  Funciton -------------------------  ---------------------------------------------------------*/


	// Show Edit ToDo tool

	function showModal(event){
		$('#modal-ToDos').fadeIn();
		$('.modal_ToDos-List').show();
	}
	
	// close Edit ToDo tool
	function closeModal(event){
		$('#modal-ToDos').fadeOut();
		$('.modal_ToDos-List').fadeOut();
	}


	// Quick Edit Task

	function startEditing(event){

		var searchParent = $(this).parent();  // to get the parent in DOM


		// get the current text
		var currentText = searchParent.find('.todo-task-li').text();  // find stop when she find the first element that e gave in option
		//place it inside the text box
		searchParent.find('.editText').val(currentText);
		//show the text box
		searchParent.find('.editText').show();
		searchParent.find('.saveItem').show();
		searchParent.find('.cancelItem').show();
		//hide the orriginal text
		searchParent.find('.todo-task-li').hide();
	}

	function  stopediting(event){
		var searchParent = $(this).parent();
		//hide the save button
		searchParent.find('.cancelItem').hide();
		$(this).hide();
		var newvalue = searchParent.find('.editText').val();
		//hide the edit box
		searchParent.find('.editText').hide();
		// get the value from the edit box and place it in ou span
		searchParent.find('.todo-task-li').text(newvalue);
		// show our span
		searchParent.find('.todo-task-li').show();
	
	}

	function cancelediting(event){
		var searchParent=$(this).parent();
		// hide the cancel button 
		searchParent.find('.saveItem').hide();
		$(this).hide();
		// hide the save button
		searchParent.find('.saveItem').hide();
		//hide the edit box
		searchParent.find('.editText').hide();
		// show our span
		searchParent.find('.todo-task-li').show();	
	}



	// Modal Editing ----------------------------------------------------------
	function startModalEditing(event){

		var searchParent = $(this).parent();  // to get the parent in DOM

		// get the current text
		var currentText = searchParent.find('.todo-task-li').text();  // find stop when she find the first element that e gave in option
		//place it inside the text box
		
	}

	function  stopeModalditing(event){
		var searchParent = $(this).parent();
		//hide the save button
		searchParent.find('.cancelItem').hide();
		$(this).hide();
		var newvalue = searchParent.find('.editText').val();
		//hide the edit box
		searchParent.find('.editText').hide();
		// get the value from the edit box and place it in ou span
		searchParent.find('.todo-task-li').text(newvalue);
		// show our span
		searchParent.find('.todo-task-li').show();
	
	}

	function canceleModalditing(event){
		var searchParent=$(this).parent();
		// hide the cancel button 
		searchParent.find('.saveItem').hide();
		$(this).hide();
		// hide the save button
		searchParent.find('.saveItem').hide();
		//hide the edit box
		searchParent.find('.editText').hide();
		// show our span
		searchParent.find('.todo-task-li').show();	
	}

		

	// Set Deadline ----------------------------------------------------------
	function setDeadline(event){

		var searchParent = $(this).parent();  // to get the parent in DOM

		searchParent.find('.calendarItem').hide(); //hide the calendar icon and text
		searchParent.find('.setDeadline').show(); // show the input to set a deadline
	}

	// complete todo 
	function completeItem(event){
		$(this).parent().parent().hide(2000);  /* same for the previous one, just here we link it to a classe which can be modified in your css / toggle = click & unclick */
	}

	// reward todo 
	function rewardItem(event){

		$(this).parent().parent().find('.dust-award').css({
			'animation':'prize 2s .7s ease-out both',
			'-webkit-animation' : 'prize 2s .1s ease-out both',
			'z-index':'100000'
		});

		$(this).append('<audio src="../static/multimedia/audio/reward.mp3" autoplay></audio>');
	}


	// delete todo
	function deleteItem(event){  /* name of the function*/
		$(this).parent().parent().remove();  /* same for the previous one, just here we link it to a classe which can be modified in your css / toggle = click & unclick */
	
	}



		
	//  showing options
	function showOption(event){
				$(this).find('.calendarItem').css({
					'opacity':'1'
				});
				$(this).find('.delete').show();
				$(this).find('.editItem').show();
		
			}

	
	// hiding option
	function hideOption(event){
				$(this).find('.calendarItem').css({
					'opacity':'0'
				});
				$(this).find('.delete').hide();
				$(this).find('.editItem').hide();
			}


	// showing the different box in all tasks 
	function oth (event) {
				$(this).next().toggle(400);
	}


	// Drop and drag event

	 	$('.todo-list').draggable({
		containment : 'document',
		cursor : 'move',
		revert: false,
		opacity : 0.6,
		connectWith : '#important_urgent-task'
	}); 
	$('#general-task').disableSelection();



	// add skills function 
	function showaddskill(event){
		$("#adding_skill_container").toggle();
	}



	// dailies part 

	$('#habits').on('click','.front_input_bg',function(){
		$('.front_input_bg').hide();
		$('#Dailies_input').css({
			'opacity':'1'
		});
	});

	/* //hiding the dailies input on click out of the input 

	$('#Grow_playground').on('mouseout','#Grow_playground',function(){
			$('#Dailies_input').css({
				'opacity':'0'
		});
			$('.front_input_bg').show();

		});
	*/


	$('#habits').on('keypress', function(event){
		var currentTextDailies = $(this).parent().find('.dailies_input').val();
		if (event.keyCode === 13){
			event.preventDefault();
			if (currentTextDailies != ""){
				$('.dailies_input').css({
					'opacity':'0'
				});
				$('.dailies_categories').show();
				$('.dailies_categories').css({
					'z-index':'1'
				});
			}
		}
	});


	
// addDailies  form-dailies
	$('.form-dailies').on('click','img',function(event){

		$.ajax({	// calling ajax function 
			data : {
				
				title : $('.dailies_input').val(), // grabing the value of the input Email 
				categorie : $(this).attr('title')
			},
			type : 'POST', // define the method
			url : '/addDailies' // references to the path on github
		}).done(function(data) {	
				$('.dailies-list_d').show(),
				$('.categorie_dailies_d').append(' <img class="img_dailies_list" src="../static/images_skills/health.png"> '),
				$('.title_dailies_d').text(data.title)
			
		});

		event.preventDefault(); // display the function of the submit 

	});








$('.todo-list').on('contextmenu','.todo-task', function(event){
		event.preventDefault();
		$('#menu_li').css({
			'display':'block',
			'top': event.pageX,
			'left': event.pageY
		});
		console.log(event);
	});




	//  Skills testing ***************************************************

	/* for adding a skill

	var countSkills = 0; // counting the number of skills submited

	$('#skills').on('keypress', function(event){
		if (event.keyCode === 13){
			var currentTextSkill = $('.skill_input').val();  // grabbing the value of the input
			$('.addskills').remove();
			$('#list-skills-bar').append('<li class="list-skills-bar ' + currentTextSkill +'"><a href="#' + currentTextSkill +'"> ' + currentTextSkill + '</a></li>');
			$('#list-skills-bar').append('<span class="glyphicon glyphicon-plus addskills"></span>');
			$('.skill_input').val("");
			event.preventDefault();
			$('#skills_bar').append('<div class="bbox" id="'+ currentTextSkill +'"> hyt </div>');
			$("#adding_skill_container").hide();
			countSkills++;
		}
	});

	*/


	/* $('#addItem').on('click',addItem); */            /*  if you use the button submit task version */

	//$('ToDos').on('click','.remove-Menu',deleteItem);
	//$('#task_to-do').on('keypress', function(event){       /*  13 ->> keycode(button : Entree ) */
		//if(event.keyCode === 13){							/* function when you click in keyboard Entree */
		//	addItem();
		//	event.preventDefault();
		//}
	//});

	// showing / hiding ToDos

	//$('#container').on('click','#To-Dos-ref',showToDos);
	//$('#container').on('click','.close',closeToDos);









	// making our list of task

	//function addItem(event){   /* name of the function */
	//	var newToDoText = $('#task_to-do').val();   /*  grabing the value of what we write in the boxe text  and store it in a variable*/
	//	$('#general-task').append('<div class="ListItem"> '+
	//		'<span class="glyphicon glyphicon-calendar calendarItem" ></span>' +
	//		'<span class="ToDoText">' + newToDoText + '</span><input type="text" class="editText"> '+
	//		'<button class="btn btn-success saveItem">save</button> '+
	//		'<button class="btn btn-fail cancelItem">cancel</button>'+
	//		'</div>');     /* add what we already grab in the first funtion to the general boxe + specifying that it's a checkboxe and add an trash icone from the site of bootstrap &&   wwe link all of this to completItem class and deleteItem class */             
	//	$('#task_to-do').val(""); /* clear the boxe task to do to make another task  */
	//}
//


		


	// Pop Up ToDos-Main
/*
	function showToDos(event){
		$('#PopUp-ToDo-list').fadeIn();
		$('#PopUp-ToDo-list-main').show();
	}
	
	function closeToDos(event){
		$('#PopUp-ToDo-list').fadeOut();
		$('#PopUp-ToDo-list-main').fadeOut();
	}
*/

	
	// Menu Option 

	// showing Option Edit / Remove  on li
	//$('.custom-menu').hide();
	//$('#general-task').on('contextmenu',function(event){    // disable the right click function 
		//event.preventDefault();
	//});
	
	// editing when we click in the menu 
	//$('.custom-menu').on('click','#edit-Menu',showModal);
	//$('#general-task').on('contextmenu','.ListItem',ShowMenu);  // the classe : .ListItem is created when e submit a task 
	//$(document).on('click',HideMenu);
	
	function ShowMenu(event){
		$('.custom-menu').toggle(200);
		$('.custom-menu').offset({
			left : event.pageX,
			top  : event.pageY
		});
	}

	function HideMenu(event){
		$('.custom-menu').hide();
	}	


	 // tests  


	// removing
	$('.custom-menu').on('click','#remove-Menu',function (event) {
		var searchParent=$(this).parent();
		var sear = $(searchParent).parent();

		sear.find('lif').remove();
	});


	// try to delete in box ToDos
	
	$('#modal-ToDos').on('click','#edit-ToDos-delete',function(event){
		console.log(event);
	});


});

		










