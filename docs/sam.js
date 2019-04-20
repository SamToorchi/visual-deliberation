window.onload=Upload();
/**  var file = "\\files\\telemetryData.csv"; **/
function Upload() {
    var dirtyNodeData = [];
    var data;
    // var file = evt.target.files[0];
    var file = "content/zeitonline.csv";

    Papa.parse(file, {
        //makes sure the first line is interpreted as a header, not data
        header: true,

        //allows stuff to be typed as their respective primitive types instead of only strings. turned off in this case
        dynamicTyping: true,

        //allows you to define the delimiter if not a default comma
        delimiter: ";",

        //allows you to define a comment line, which would be skipped by the parser
        comments: "//",

        //turns on fastmode, quicker but assumes no quoted fields is present
        fastmode: true,

        download: true,


        /*
                step: function(results){
                    console.log(results.data);
                    generateCode(results.data);

                },
                */
        complete: function(results, file) {
            console.log("Parsing complete:", results, file);
            generateCode(results.data);
        }


    });
    generateCode(dirtyNodeData);

}

function generateCode(dirtyNodeData){

    var generatedHTMLCode = String("");
    var i;
    for (i = 0; i<dirtyNodeData.length; i++){
        if (dirtyNodeData[i].beznr_komm == 9999){
            generatedHTMLCode +="<div data-timeline-node=\"{row:3, eventId:" + dirtyNodeData[i].Gesamtnr+ ", start:\'" + dirtyNodeData[i].relative_date + "\',bdColor: \' " + "#B2B2B0" + " \' " +", callback:'$.openMyEvent()', margin:12, image:'./imgs/quality_3/" + dirtyNodeData[i].quality + ".png', relation:{before: 111111} }\">" + dirtyNodeData[i].ukey + "</div>" +'\n'  ;
        }

        else if (dirtyNodeData[i].beznr_komm == 19999){
            generatedHTMLCode +="<div data-timeline-node=\"{row:3, eventId:" + dirtyNodeData[i].Gesamtnr+ ", start:\'" + dirtyNodeData[i].relative_date + "\',bdColor: \' " + "#B2B2B0" + " \' " +", callback:'$.openMyEvent()', margin:12, image:'./imgs/quality_3/" + dirtyNodeData[i].quality + ".png', relation:{before: 777777} }\">" + dirtyNodeData[i].ukey + "</div>" +'\n'  ;
        }

        else if (dirtyNodeData[i].beznr_komm == 29999){
            generatedHTMLCode +="<div data-timeline-node=\"{row:3, eventId:" + dirtyNodeData[i].Gesamtnr+ ", start:\'" + dirtyNodeData[i].relative_date + "\',bdColor: \' " + "#B2B2B0" + " \' " +", callback:'$.openMyEvent()', margin:12, image:'./imgs/quality_3/" + dirtyNodeData[i].quality + ".png', relation:{before: 1111111} }\">" + dirtyNodeData[i].ukey  + "</div>" +'\n'  ;
        }

        else if (dirtyNodeData[i].beznr_komm == 39999){
            generatedHTMLCode +="<div data-timeline-node=\"{row:3, eventId:" + dirtyNodeData[i].Gesamtnr+ ", start:\'" + dirtyNodeData[i].relative_date + "\',bdColor: \' " + "#B2B2B0" + " \' " +", callback:'$.openMyEvent()', margin:12, image:'./imgs/quality_3/" + dirtyNodeData[i].quality + ".png', relation:{before: 181818} }\">" + dirtyNodeData[i].ukey + "</div>" +'\n'  ;
        }

        else if (dirtyNodeData[i].beznr_komm == 49999){
            generatedHTMLCode +="<div data-timeline-node=\"{row:3, eventId:" + dirtyNodeData[i].Gesamtnr+ ", start:\'" + dirtyNodeData[i].relative_date + "\',bdColor: \' " + "#B2B2B0" + " \' " +", callback:'$.openMyEvent()', margin:12, image:'./imgs/quality_3/" + dirtyNodeData[i].quality + ".png', relation:{before: 232323} }\">" + dirtyNodeData[i].ukey + "</div>" +'\n'  ;
        }

        else if (dirtyNodeData[i].beznr_komm == 59999){
            generatedHTMLCode +="<div data-timeline-node=\"{row:3, eventId:" + dirtyNodeData[i].Gesamtnr+ ", start:\'" + dirtyNodeData[i].relative_date + "\',bdColor: \' " + "#B2B2B0" + " \' " +", callback:'$.openMyEvent()', margin:12, image:'./imgs/quality_3/" + dirtyNodeData[i].quality + ".png', relation:{before: 272727} }\">" + dirtyNodeData[i].ukey  + "</div>" +'\n'  ;
        }


        else {
            generatedHTMLCode +="<div data-timeline-node=\"{ eventId:" + dirtyNodeData[i].Gesamtnr+ ", start:\'" + dirtyNodeData[i].relative_date + "\',bdColor:\'" + "#B2B2B0" + "\', callback:'$.openMyEvent()', margin:12 ,relation:{before:"+ dirtyNodeData[i].beznr_komm   +"}, row:" + dirtyNodeData[i].row_two + ", image:'./imgs/quality_3/" + dirtyNodeData[i].quality + ".png'}\" > "  + dirtyNodeData[i].ukey + "</div>" +'\n'  ;
        }

    }


    $('#htmlresults').val(generatedHTMLCode);

    document.getElementById('demo').innerHTML = generatedHTMLCode;

}



var ab;
ab=1; 


$.openMyEvent = function(event) {



    console.log('openEvent - event clicked...');
    console.info($('.timeline-node.active').data());
    console.log($('.timeline-node.active'));
    $('.timeline-node.active').attr('title');
    //console.log().css("transform", "scale(1.5)");
    $('.timeline-node.active').css("border-color", "blue");

    function mark($node){
        if($node.length >=1){

            $.each($node, function(index, value){
                console.log(value);
                var i = $(value).attr('id').replace('evt-', '') ;
                console.log('nochmal');
                var $liste = $('.timeline-node[data-relay-before=' + i + ']');
                console.log('Länge der ersten Liste: ' + $liste.length);
                console.log($liste);
                /*$liste.addClass('active');*/
                $liste.css("transform", "scale(1.5)");
                $liste.css("border-color", "blue");
                $('.timeline-node').attr("data-relay-linecolor", "#3CCF70");
                mark($liste);
            })
        } 
    }

    function test ($node){

        var $beforeNode = $('#evt-' + $node.data('relayBefore'));
        if ( $node.data('relayBefore') > 0 ) {
            var $beforeNode = $('#evt-' + $node.data('relayBefore'));
            if ( $beforeNode.length > 0 ) {
                $beforeNode.css("transform", "scale(1.5)");
                $beforeNode.css("border-color", "blue");
                test($beforeNode);
            }
        }

    };



    test($('.timeline-node.active'));
    mark($('.timeline-node.active'));

    var sel = $('.timeline-node.active').attr('title');


    /*
                markyourukey($ukey);
                $ukey = var pxcv; 


                function markyourukey($ukey){


                console.log("mark your ukey: " + $ukey);

                }
                */


    /*

                function markmyukey(...){

                conlose.log("mark my ukey: " + ... );
                $... .css("transform", "scale(1.5)");
                $... .css("border-color", "blue");

                }

                */


};

$(function (event) {

    $('#one').click(function() {
        ab+=2;
        $("#myTimeline").timeline('render', {minGridPer:ab});
        $("#myTimeline").on("afterRender.timeline", function(){

            x = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 420px; top: -30px; padding: 2px;">Article 1: Merkel speaks out against national ceilings</span>');
            xx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 520px; top: -30px; padding: 2px;">Article 7: Seehofer wants to limit asylum to 200,000 refugees per year</span>');
            xxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 400px; top: -30px; padding: 2px;">Article 11: Merkel rejects Seehofers upper limit</span>');
            xxxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 380px; top: -30px; padding: 2px;">Article 18: Limitation is not immediately unethical</span>');
            xxxxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 380px; top: -30px; padding: 2px;">Article 23: CSU no longer wants an upper limit</span>');
            xxxxxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 480px; top: -30px; padding: 2px;">Article 27: CSU provides condition for government participation</span>');
            document.getElementById('evt-111111').innerHTML = x;
            document.getElementById('evt-777777').innerHTML = xx;
            document.getElementById('evt-1111111').innerHTML = xxx;
            document.getElementById('evt-181818').innerHTML = xxxx;
            document.getElementById('evt-232323').innerHTML = xxxxx;
            document.getElementById('evt-272727').innerHTML = xxxxxx;
        });
    });


    $('#two').click(function() {
        ab-=1;
        $("#myTimeline").timeline('render', {minGridPer:ab});
        $("#myTimeline").on("afterRender.timeline", function(){
            x = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 420px; top: -30px; padding: 2px;">Article 1: Merkel speaks out against national ceilings</span>');
            xx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 520px; top: -30px; padding: 2px;">Article 7: Seehofer wants to limit asylum to 200,000 refugees per year</span>');
            xxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 400px; top: -30px; padding: 2px;">Article 11: Merkel rejects Seehofers upper limit</span>');
            xxxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 380px; top: -30px; padding: 2px;">Article 18: Limitation is not immediately unethical</span>');
            xxxxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 380px; top: -30px; padding: 2px;">Article 23: CSU no longer wants an upper limit</span>');
            xxxxxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 480px; top: -30px; padding: 2px;">Article 27: CSU provides condition for government participation</span>');
            document.getElementById('evt-111111').innerHTML = x;
            document.getElementById('evt-777777').innerHTML = xx;
            document.getElementById('evt-1111111').innerHTML = xxx;
            document.getElementById('evt-181818').innerHTML = xxxx;
            document.getElementById('evt-232323').innerHTML = xxxxx;
            document.getElementById('evt-272727').innerHTML = xxxxxx;
        });

    });



    $("#myTimeline").timeline({
        type: 'point',
        scale: 'days',
        startDatetime: '2015-11-20 00:00',
        rows: 18,
        rangeAlign: 'left',
        range: 2,
        minuteInterval: 1,
        minGridPer: ab
    });

    $("body").on('dblclick', function() {
        console.log('double click geht');
        var $i = $('.timeline-node.active').attr('id');
        console.log("das aktive node:" + $('.timeline-node.active').attr('id'));

        $("#myTimeline").timeline('render', {rangeAlign:'current'});
        $("#myTimeline").on("afterRender.timeline", function(){
            x = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 420px; top: -30px; padding: 2px;">Article 1: Merkel speaks out against national ceilings</span>');
            xx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 520px; top: -30px; padding: 2px;">Article 7: Seehofer wants to limit asylum to 200,000 refugees per year</span>');
            xxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 400px; top: -30px; padding: 2px;">Article 11: Merkel rejects Seehofers upper limit</span>');
            xxxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 380px; top: -30px; padding: 2px;">Article 18: Limitation is not immediately unethical</span>');
            xxxxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 380px; top: -30px; padding: 2px;">Article 23: CSU no longer wants an upper limit</span>');
            xxxxxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 480px; top: -30px; padding: 2px;">Article 27: CSU provides condition for government participation</span>');
            document.getElementById('evt-111111').innerHTML = x;
            document.getElementById('evt-777777').innerHTML = xx;
            document.getElementById('evt-1111111').innerHTML = xxx;
            document.getElementById('evt-181818').innerHTML = xxxx;
            document.getElementById('evt-232323').innerHTML = xxxxx;
            document.getElementById('evt-272727').innerHTML = xxxxxx;
        });


        setTimeout(function(){ 
            var targetId = '#' + $i;
            console.log("targetId:" + targetId);
            var posX = $(targetId).offset().left;
            console.log('PosX: ' + posX);

            if ( (posX - $('.timeline-body').width() / 2) > ($(window).width() - $('.timeline-body').width() + 2100) ) {
                var mov = $(window).width() - $('.timeline-body').width() + 2400;
                console.log('mov: ' + mov);


                $('.timeline-body').animate({
                    scrollLeft: mov }, 2000);

            }


            else{
                console.log('else!!!')
                var mov = posX - $('.timeline-body').width() / 2;

                $('.timeline-body').animate({
                    scrollLeft: mov }, 2000);

            }

        }, 3000);



    });




    $("#myTimeline").on("afterRender.timeline", function(){
        x = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 420px; top: -30px; padding: 2px;">Article 1: Merkel speaks out against national ceilings</span>');
        xx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 520px; top: -30px; padding: 2px;">Article 7: Seehofer wants to limit asylum to 200,000 refugees per year</span>');
        xxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 400px; top: -30px; padding: 2px;">Article 11: Merkel rejects Seehofers upper limit</span>');
        xxxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 380px; top: -30px; padding: 2px;">Article 18: Limitation is not immediately unethical</span>');
        xxxxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 380px; top: -30px; padding: 2px;">Article 23: CSU no longer wants an upper limit</span>');
        xxxxxx = String('<span style="border: black solid 2px; position: absolute;  color: black; min-width: 480px; top: -30px; padding: 2px;">Article 27: CSU provides condition for government participation</span>');

        document.getElementById('evt-111111').innerHTML = x;
        document.getElementById('evt-777777').innerHTML = xx;
        document.getElementById('evt-1111111').innerHTML = xxx;
        document.getElementById('evt-181818').innerHTML = xxxx;
        document.getElementById('evt-232323').innerHTML = xxxxx;
        document.getElementById('evt-272727').innerHTML = xxxxxx;

        // usage bootstrap's popover
        $('.timeline-node').each(function(){
            if ( $(this).data('toggle') === 'popover' ) {
                $(this).attr( 'title', $(this).text() );
                $(this).popover({
                    trigger: 'hover'
                });
            }
        });
    });

});
