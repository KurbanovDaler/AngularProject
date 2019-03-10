$(document).ready(function () {
    //your code here
    // alert("lol");
    var rgb = $('.box2').css('backgroundColor');
    console.log(rgb);
    var colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    var brightness = 1;

    var r = colors[1];
    var g = colors[2];
    var b = colors[3];

    var ir = Math.floor((255-r)*brightness);
    var ig = Math.floor((255-g)*brightness);
    var ib = Math.floor((255-b)*brightness);
    console.log(ir);
    console.log(ig);
    console.log(ib);
    $('.event_name').css('color', 'rgb('+ir+','+ig+','+ib+')');
});