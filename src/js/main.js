$(document).ready(function(){ 

  $(".reviews_wrapper").owlCarousel({
    items: 1,
    dotData: true,
    nav: true,
    navText: ["<img src='../img/arrowLeft.png'>","<img src='../img/arrowRight.png'>"],
    responsiveClass: true,
    loop: true
  });

  // act_timer();

  // // count down timer
  // function act_timer(){
  // 	if(!(minutes_s=='00' && seconds_s=='00')){
  // 		seconds_s--;
  // 		if(seconds_s==-01){seconds_s=59; minutes_s=minutes_s-1;}
  // 		else minutes_s=minutes_s;
  // 		if(seconds_s<=9) seconds_s="0" + seconds_s;
  // 		minutes_sh = minutes_s;
  // 		if(minutes_s < 10) minutes_sh = '0'+ minutes_s;
  // 		$('#time').html("<span>"+hour_s+"</span><span>"+minutes_sh+"</span><span>"+seconds_s+"</span>");
  // 		setTimeout("act_timer()", 1000);
  // 	} else {
  // 		if($('#time').css('display')=='inline-block'){
  // 			$('#time').css('display','none');
  // 			setTimeout("act_timer()", 200);
  // 		} else {
  // 			$('#time').css('display','inline-block');
  // 			setTimeout("act_timer()", 1000);
  // 		}
  // 	}
  // }

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow = tomorrow.toISOString().slice(0,10); 
  $("#time")
  .countdown(tomorrow, function(event) {
    $(this).text(
      event.strftime('%H:%M:%S')
    );
  });

    $("#time2")
    .countdown(tomorrow, function(event) {
      $(this).text(
        event.strftime('%H:%M:%S')
        );
    });

});