'use strict';

exports.calculatePages = function(page,endPage){
    var pages = new Array();
    var start = 1;
    if(page>6){
        start=page-5;
    }

    var j=0;
    for (var i = start; i <= endPage; i++) {
        if(j>=10) break;
        pages[j++]=i;
    }

    return pages;
}

exports.calculateStar = function(rank){
    var stars = new Array();
    for(var i=0;i<5;i++){
        stars[i] = 0;
    }
    var starValue = parseInt(rank/2);
    for(var i=0;i<starValue;i++){
        stars[i] = 2;
    }
    if(rank%2==1){
        stars[starValue]=1;
    }
    return stars;
}
