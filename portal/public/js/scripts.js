$(function(){
	var zpos = $('.aptconsr').offset().top+20;

	$('.roomitem').on("click",function(){
		$('.roomslay').addClass('hide');
	  	$('.roomaply').removeClass('hide');
	  	$("html,body").animate({scrollTop:zpos}, 300);
		return false;

	});

	$('.backlist').on("click",function(){
		$('.roomslay').removeClass('hide');
	  	$('.roomaply').addClass('hide');
		return false;
	});

})

$(window).scroll(function(){
	var tpos = $('.aptconsw').offset().top;
      if($(window).scrollTop()>tpos+100){
          $('.fixedtab').addClass('fixed')
      }else{
          $('.fixedtab').removeClass('fixed')
      }
})

$(".fixedtab a").click(function(){
    var href = $(this).attr("href");
    var pos = $(href).offset().top;
    $("html,body").animate({scrollTop:pos-'30'}, 300);
    return false;
});

$(".fixedtab a").click(function(){
    var href = $(this).attr("href");
    var pos = $(href).offset().top;
    $("html,body").animate({scrollTop:pos-'30'}, 300);
    return false;
});


$(".h-search").on("click", function(e){

    if($("#Advanced2").hasClass("hide")) {

        $("#Advanced").removeClass('hide');

        $(document).one("click", function () {
            $("#Advanced").addClass('hide');
        });
        e.stopPropagation();
    }
});
$("#Advanced").on("click", function(e){
    e.stopPropagation();
});


//tab
$('.tabtw li').mouseover(function(){TabSelect('.tabtw li','.tabcons ul','cur',$(this));return false});$('.tabtw li').eq(0).mouseover('mouseover');
function TabSelect(tab,con,addClass,obj) {
    var $_self = obj;
    var $_nav = $(tab);
    $_nav.removeClass(addClass),
	$_self.addClass(addClass);
    var $_index = $_nav.index($_self);
    var $_con = $(con);
    $_con.hide(),
	$_con.eq($_index).show();
}
