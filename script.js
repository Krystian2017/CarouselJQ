var carouselList = $('#carousel ul');
function changeSlide () {
  function moveFirstSlide() {
    var firstItem = carouselList.find('li:first');
    var lastItem = carouselList.find('li:last');
    lastItem.after(firstItem);
    carouselList.css({marginLeft:0});
  };
  carouselList.animate({'marginLeft':-400}, 500, moveFirstSlide);
};
setInterval(changeSlide, 3000);

$(function(){
        var carousel = $('#carousel ul');
        var carouselChild = carousel.find('li');
        var clickCount = 0;
        var canClick = true;

        itemWidth = carousel.find('li:first').width()+1;

        carousel.width(itemWidth*carouselChild.length);

        refreshChildPosition();

        $('.btnNext').click(function(){
            if(canClick){
                canClick = false;
                clickCount++;
                carousel.stop(false, true).animate({
                    left : '-='+itemWidth
                },300, function(){
                    lastItem = carousel.find('li:first');
                    lastItem.remove().appendTo(carousel);
                    lastItem.css('left', ((carouselChild.length-1)*(itemWidth))+(clickCount*itemWidth));
                    canClick = true;
                });
            }
        });

        $('.btnPrevious').click(function(){
            if(canClick){
                canClick = false;
                clickCount--;
                lastItem = carousel.find('li:last');
                lastItem.remove().prependTo(carousel);

                lastItem.css('left', itemWidth*clickCount);             
                carousel.finish(true).animate({
                    left: '+='+itemWidth
                },300, function(){
                    canClick = true;
                });
            }
        });

        function refreshChildPosition(){
            carouselChild.each(function(){
                $(this).css('left', itemWidth*carouselChild.index($(this)));
            });
        }
});

$('#carousel').fullpage({
    slidesNavigation: true,
    slidesNavPosition: 'bottom',
    controlArrows: false,
    verticalCentered: true,
    paddingTop: '3em',
    paddingBottom: '10px',
    fixedElements: '#header, .footer',
    responsiveWidth: 0,
    responsiveHeight: 0,
});