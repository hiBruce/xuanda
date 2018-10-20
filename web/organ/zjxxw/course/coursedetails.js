define(['/static/lib/js/jquery.raty.min.js'],function () {
    $('.star div').raty({
        path: '/static/temp/grade',
        starHalf: 'halfstar.png',
        starOff: 'xin1.png',
        starOn : 'xin.png',
        width:'120px',
        half:true
    });
    $('.halfstar').raty({
        path: '/static/temp/grade',
        starHalf: 'halfstar.png',
        starOff: 'xin1.png',
        starOn : 'xin.png',
        width:'300px',
        half:true,
        size:26,
    });
    $('.halfstar1').raty({
        path: '/static/temp/grade',
        starHalf: 'halfstar.png',
        starOff: 'xin1.png',
        starOn : 'xin.png',
        width:'300px',
        half:true,
        size:18,
    });
})