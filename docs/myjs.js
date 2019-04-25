
//Global Variable Declaration

var margin = {top: 66, right: 110, bottom: 20, left: 188},
    width = document.body.clientWidth - margin.left - margin.right,
    height = 340 - margin.top - margin.bottom,
    innerHeight = height - 2;

var devicePixelRatio = window.devicePixelRatio || 1;
var CommonWeight = 7.69;

var Temp_beityp;   
var Temp_emp;
var Temp_degr;
var Temp_hoefl;
var Temp_ehrl;
var Temp_posemo;
var Temp_negemo;
var Temp_humor;
var Temp_frage;
var Temp_korr;
var Temp_zus;
var Temp_meta;
var Temp_mod;
var FinalValue;

var pxcv;

var color = d3.scaleOrdinal()
.domain(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
.range(["#DB7F85", "#50AB84", "#4C6C86", "#C47DCB", "#B59248", "#DD6CA7", "#E15E5A", "#5DA5B3", "#725D82", "#54AF52", "#954D56", "#8C92E8", "#D8597D", "#AB9C27", "#D67D4B", "#D58323", "#BA89AD", "#357468", "#8F86C2", "#7D9E33", "#517C3F", "#9D5130", "#5E9ACF", "#776327", "#944F7E"]);

var types = {
    "Number": {
        key: "Number",
        coerce: function(d) { return +d; },
        extent: d3.extent,
        within: function(d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
        defaultScale: d3.scaleLinear().range([innerHeight, 0])
    },
    "String": {
        key: "String",
        coerce: String,
        extent: function (data) { return data.sort(); },
        within: function(d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
        defaultScale: d3.scalePoint().range([0, innerHeight])
    },
    "Date": {
        key: "Date",
        coerce: function(d) { return new Date(d); },
        extent: d3.extent,
        within: function(d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
        defaultScale: d3.scaleTime().range([innerHeight, 0])
    }
};

var selected_dimensions; // adding in new var showing selected dims
//alert(dimensions);




selected_dimensions = [


    {
        key: "beityp",
        description: "beityp",
        type: types["String"],
        axis: d3.axisLeft()
        .tickFormat(function(d,i) {

            return d;
        })
    },

    {

        key: "emp",
        description: "emp",
        type: types["String"],
        axis: d3.axisLeft()
        .tickFormat(function(d,i) {

            return d;
        })

    },

    {
        key: "degr",
        description: "degr",
        type: types["String"]/*,
	axis: d3.axisLeft()
      .tickFormat(function(d,i) {
	if ( d == 0)
              return "No degrading " + d;
	if ( d == 1)
              return "Despicable use of comments " + d;
	if ( d == 2)
              return "Despicable treatment of statements " + d;
    if ( d == 3)
              return "Dismissive handling of utterances " + d;
    if ( d == 4)
              return "Despicable treatment of statements by several groups " + d;
	if ( d == 9)
              return "Despicable treatment of statements made by other persons " + d;
	 return d;
      })
*/
    },

    {
        key: "hoefl",
        description: "hoefl",
        type: types["String"]
    },


    {
        key: "ehrl",
        description: "ehrl",
        type: types["String"]
    },

    {
        key: "posemo",
        description: "posemo",
        type: types["String"]
    },


    {
        key: "negemo",
        description: "negemo",
        type: types["String"]
    },




    {
        key: "humor",
        description: "humor",
        type: types["String"]
    },




    {
        key: "frage",
        description: "frage",
        type: types["String"]
    },


    {
        key: "korr",
        description: "korr",
        type: types["String"]
    },



    {
        key: "zus",
        description: "zus",
        type: types["String"]
    },


    {
        key: "meta",
        description: "meta",
        type: types["String"]
    },

    {
        key: "mod",
        description: "mod",
        type: types["String"]
    },

];
console.log(typeof selected_dimensions)
document.getElementById('1a').value = CommonWeight;
function updateTextInput1(val) {
    document.getElementById('1a').value=val; 
    var eventd = 13;
    doit_onkeypress(eventd);
}


document.getElementById('2a').value = CommonWeight; 

function updateTextInput2(val) {
    document.getElementById('2a').value=val; 
}
document.getElementById('3a').value = CommonWeight; 
function updateTextInput3(val) {
    document.getElementById('3a').value=val; 
}
document.getElementById('4a').value = CommonWeight; 
function updateTextInput4(val) {
    document.getElementById('4a').value=val; 
}
document.getElementById('5a').value = CommonWeight; 
function updateTextInput5(val) {
    document.getElementById('5a').value=val; 
}
document.getElementById('6a').value = CommonWeight;
function updateTextInput6(val) {
    document.getElementById('6a').value=val; 
}
document.getElementById('7a').value = CommonWeight; 
function updateTextInput7(val) {
    document.getElementById('7a').value=val; 
}
document.getElementById('8a').value = CommonWeight; 
function updateTextInput8(val) {
    document.getElementById('8a').value=val; 
}
document.getElementById('9a').value = CommonWeight;
function updateTextInput9(val) {
    document.getElementById('9a').value=val; 
}
document.getElementById('10a').value = CommonWeight; 
function updateTextInput10(val) {
    document.getElementById('10a').value=val; 
}
document.getElementById('11a').value = CommonWeight; 
function updateTextInput11(val) {
    document.getElementById('11a').value=val; 
}
document.getElementById('12a').value = CommonWeight; 
function updateTextInput12(val) {
    document.getElementById('12a').value=val; 
}
document.getElementById('13a').value = CommonWeight;
function updateTextInput13(val) {
    document.getElementById('13a').value=val; 
}

var xscale = d3.scalePoint()
.domain(d3.range(selected_dimensions.length))
.range([0, width]);

var yAxis = d3.axisLeft();

var container = d3.select("body").append("div")
.attr("class", "parcoords")
.style("width", width + margin.left + margin.right + "px")
.style("height", height + margin.top + margin.bottom + "px");

var svg = container.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var canvas = container.append("canvas")
.attr("width", width * devicePixelRatio)
.attr("height", height * devicePixelRatio)
.style("width", width + "px")
.style("height", height + "px")
.style("margin-top", margin.top + "px")
.style("margin-left", margin.left + "px");

var ctx = canvas.node().getContext("2d");
ctx.globalCompositeOperation = 'darken';
ctx.globalAlpha = 0.15;

ctx.scale(devicePixelRatio, devicePixelRatio);

//var output = d3.select("body").append("pre");
var selectedkeys = [];
var axes = svg.selectAll(".axis")
.data(selected_dimensions)
.enter().append("g")
.attr("class", function(d) { return "axis " + d.key.replace(/ /g, "_"); })
.attr("transform", function(d,i) { return "translate(" + xscale(i) + ")"; });
//window.document.addEventListener('ukeysent', function(e){
window.document.addEventListener('ukeysent', function(e){
    pxcv = e.detail; 
    svg.remove();
    console.log("pxcvcalled",pxcv);
    svg = container.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    axes = svg.selectAll(".axis")
        .data(selected_dimensions)
        .enter().append("g")
        .attr("class", function(d) { return "axis " + d.key.replace(/ /g, "_"); })
        .attr("transform", function(d,i) { return "translate(" + xscale(i) + ")"; });
    d3.selectAll(".brush").remove();

    clearhilight();
    loaddrawcsv();

});
loaddrawcsv();
function clearhilight(){
    var col1 = document.getElementById("col1");
    var col2 = document.getElementById("col2");
    var col3 = document.getElementById("col3");
    var col4 = document.getElementById("col4");
    var col5 = document.getElementById("col5");
    var inc;
    for (inc = 0; inc < 17; inc++) {
        col1.getElementsByClassName("beityp")[inc].style.fontWeight = "normal";
    }

    for (inc = 0; inc < 3; inc++) {
        col1.getElementsByClassName("emp")[inc].style.fontWeight = "normal";
    }
    for (inc = 0; inc < 6; inc++) {
        col2.getElementsByClassName("degr")[inc].style.fontWeight = "normal";
    }
    for (inc = 0; inc < 2; inc++) {
        col2.getElementsByClassName("hoefl")[inc].style.fontWeight = "normal";
    }
    for (inc = 0; inc < 6; inc++) {
        col2.getElementsByClassName("ehrl")[inc].style.fontWeight = "normal";
    }
    for (inc = 0; inc < 5; inc++) {
        col3.getElementsByClassName("posemo")[inc].style.fontWeight = "normal";
    }
    for (inc = 0; inc < 6; inc++) {
        col3.getElementsByClassName("negemo")[inc].style.fontWeight = "normal";
    }
    for (inc = 0; inc < 2; inc++) {
        col3.getElementsByClassName("humor")[inc].style.fontWeight = "normal";
    }
    for (inc = 0; inc < 5; inc++) {
        col4.getElementsByClassName("frage")[inc].style.fontWeight = "normal";
    }
    for (inc = 0; inc < 3; inc++) {
        col4.getElementsByClassName("korr")[inc].style.fontWeight = "normal";
    }
    for (inc = 0; inc < 3; inc++) {
        col4.getElementsByClassName("zus")[inc].style.fontWeight = "normal";
    }
    for (inc = 0; inc < 5; inc++) {
        col5.getElementsByClassName("meta")[inc].style.fontWeight = "normal";
    }
    for (inc = 0; inc < 4; inc++) {
        col5.getElementsByClassName("mod")[inc].style.fontWeight = "normal";
    }
}
function loaddrawcsv(){

    d3.csv("Comments_Final.csv", function(error, data) {

        if (error) throw error;

        data.forEach(function(d) {
            selected_dimensions.forEach(function(p) {
                d[p.key] = !d[p.key] ? null : p.type.coerce(d[p.key]);


            });

            // truncate long text strings to fit in data table
            for (var key in d) {
                if (d[key] && d[key].length > 35) d[key] = d[key].slice(0,36);
            }
        });


        // type/dimension default setting happens here
        selected_dimensions.forEach(function(dim) {
            if (!("domain" in dim)) {
                // detect domain using dimension type's extent function
                dim.domain = d3_functor(dim.type.extent)(data.map(function(d) { return d[dim.key]; }));
            }
            if (!("scale" in dim)) {
                // use type's default scale for dimension
                dim.scale = dim.type.defaultScale.copy();
            }
            dim.scale.domain(dim.domain);
        });

        var render = renderQueue(draw).rate(30);

        ctx.clearRect(0,0,width,height);
        ctx.globalAlpha = d3.min([1.15/Math.pow(data.length,0.3),1]);
        render(data);

        axes.append("g")
            .each(function(d) {
            var renderAxis = "axis" in d
            ? d.axis.scale(d.scale)  // custom axis
            : yAxis.scale(d.scale);  // default axis
            d3.select(this).call(renderAxis);
        })
            .append("text")
            .attr("class", "title")
            .attr("text-anchor", "start")
            .text(function(d) { return "description" in d ? d.description : d.key; });

        // Add and store a brush for each axis.
        axes.append("g")
            .attr("class", "brush")
            .each(function(d) {
            d3.select(this).call(d.brush = d3.brushY()
                                 .extent([[-10,0], [10,height]])
                                 .on("start", brushstart)
                                 .on("brush", brush)
                                 .on("end", brush)
                                )
        })
            .selectAll("rect")
            .attr("x", -8)
            .attr("width", 26);

        d3.selectAll(".axis.beityp .tick text")
            .style("fill", color);


        //output.text(d3.tsvFormat(data.slice(0,24),["Artikelnr"]));


        function project(d) {
            return selected_dimensions.map(function(p,i) {
                // check if data element has property and contains a value
                if (
                    !(p.key in d) ||
                    d[p.key] === null
                ) return null;

                return [xscale(i),p.scale(d[p.key])];
            });
        };


        function draw(d) {


            if (parseInt(d.ukey) == parseInt(pxcv))
            {
                console.log("pxcvcalled",pxcv);
                ctx.strokeStyle = "#000080";
                ctx.lineWidth = 5;
                ctx.globalAlpha = 1;
                beitypid = "beityp"+d.beityp;
                empid ="emp"+d.emp;
                degrid ="degr"+d.degr; 
                hoeflid ="hoefl"+d.hoefl;
                ehrlid ="ehrl"+d.ehrl; 
                posemoid ="posemo"+d.posemo;
                negemoid ="negemo"+d.negemo;  
                humorid ="humor"+d.humor;
                frageid ="frage"+d.frage;
                korrid ="korr"+d.korr;
                zusid ="zus"+d.zus;
                metaid ="meta"+d.meta;
                modid ="mod"+d.mod;

                document.getElementById(beitypid).style.fontWeight = "bold";
                document.getElementById(empid).style.fontWeight = "bold";
                document.getElementById(degrid).style.fontWeight = "bold";
                document.getElementById(hoeflid).style.fontWeight = "bold";
                document.getElementById(ehrlid).style.fontWeight = "bold";
                document.getElementById(posemoid).style.fontWeight = "bold";
                document.getElementById(negemoid).style.fontWeight = "bold";
                document.getElementById(humorid).style.fontWeight = "bold";
                document.getElementById(frageid).style.fontWeight = "bold";
                document.getElementById(korrid).style.fontWeight = "bold";
                document.getElementById(zusid).style.fontWeight = "bold";
                document.getElementById(metaid).style.fontWeight = "bold";
                document.getElementById(modid).style.fontWeight = "bold";
            }
            else
            {
                ctx.strokeStyle = color(d.beityp);
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.15;
            }

            ctx.beginPath();
            var coords = project(d);


            coords.forEach(function(p,i) {
                // this tricky bit avoids rendering null values as 0
                if (p === null) {
                    // this bit renders horizontal lines on the previous/next
                    // dimensions, so that sandwiched null values are visible
                    if (i > 0) {
                        var prev = coords[i-1];
                        if (prev !== null) {
                            ctx.moveTo(prev[0],prev[1]);
                            ctx.lineTo(prev[0]+6,prev[1]);
                        }
                    }
                    if (i < coords.length-1) {
                        var next = coords[i+1];
                        if (next !== null) {
                            ctx.moveTo(next[0]-6,next[1]);
                        }
                    }
                    return;
                }

                if (i == 0) {
                    ctx.moveTo(p[0],p[1]);
                    return;
                }

                ctx.lineTo(p[0],p[1]);
            });
            ctx.stroke();
        }

        function brushstart() {
            d3.event.sourceEvent.stopPropagation();
        }

        // Handles a brush event, toggling the display of foreground lines.
        function brush() {
            render.invalidate();

            var actives = [];
            svg.selectAll(".axis .brush")
                .filter(function(d) {

                return d3.brushSelection(this);


            })
                .each(function(d) {
                actives.push({
                    dimension: d,
                    extent: d3.brushSelection(this)
                });
            });

            var selected = data.filter(function(d) {
                if (actives.every(function(active) {
                    var dim = active.dimension;
                    // test if point is within extents for each active brush

                    clearhilight();       


                    return dim.type.within(d[dim.key], active.extent, dim);

                })) {
                    return true;

                }
            });
            selected.forEach(function(d){
                
                var test  = selectedkeys.push(d.ukey);
                //var test = "1";
               // mkey = +d.ukey;
                //console.log(mkey);
               
                var event = new CustomEvent('multikeysent', { detail: test })
                window.document.dispatchEvent(event);
                 
               // console.log("mark your ukey: " + evt);

                
                
                beitypid = "beityp"+d.beityp;
                empid ="emp"+d.emp;
                degrid ="degr"+d.degr; 
                hoeflid ="hoefl"+d.hoefl;
                ehrlid ="ehrl"+d.ehrl; 
                posemoid ="posemo"+d.posemo;
                negemoid ="negemo"+d.negemo;  
                humorid ="humor"+d.humor;
                frageid ="frage"+d.frage;
                korrid ="korr"+d.korr;
                zusid ="zus"+d.zus;
                metaid ="meta"+d.meta;
                modid ="mod"+d.mod;

                document.getElementById(beitypid).style.fontWeight = "bold";
                document.getElementById(empid).style.fontWeight = "bold";
                document.getElementById(degrid).style.fontWeight = "bold";
                document.getElementById(hoeflid).style.fontWeight = "bold";
                document.getElementById(ehrlid).style.fontWeight = "bold";
                document.getElementById(posemoid).style.fontWeight = "bold";
                document.getElementById(negemoid).style.fontWeight = "bold";
                document.getElementById(humorid).style.fontWeight = "bold";
                document.getElementById(frageid).style.fontWeight = "bold";
                document.getElementById(korrid).style.fontWeight = "bold";
                document.getElementById(zusid).style.fontWeight = "bold";
                document.getElementById(metaid).style.fontWeight = "bold";
                document.getElementById(modid).style.fontWeight = "bold";



            });
            ctx.clearRect(0,0,width,height);
            ctx.globalAlpha = d3.min([0.85/Math.pow(selected.length,0.3),1]);
            render(selected);


            //output.text(d3.tsvFormat(selected.slice(0,24)));

        }
    });
}



var beitypVal;
var totalWeights;

function doit_onkeypress(event){
    if (event.keyCode == 13 || event.which == 13 || event == 13){
        var tweight1a = parseFloat(document.getElementById("1a").value);
        var tweight2a = parseFloat(document.getElementById("2a").value);
        var tweight3a = parseFloat(document.getElementById("3a").value);
        var tweight4a = parseFloat(document.getElementById("4a").value);
        var tweight5a = parseFloat(document.getElementById("5a").value);
        var tweight6a = parseFloat(document.getElementById("6a").value);
        var tweight7a = parseFloat(document.getElementById("7a").value);
        var tweight8a = parseFloat(document.getElementById("8a").value);
        var tweight9a = parseFloat(document.getElementById("9a").value);
        var tweight10a = parseFloat(document.getElementById("10a").value);
        var tweight11a = parseFloat(document.getElementById("11a").value);
        var tweight12a = parseFloat(document.getElementById("12a").value);
        var tweight13a = parseFloat(document.getElementById("13a").value);
        totalWeights = tweight1a + tweight2a + tweight3a + tweight4a + tweight5a + tweight6a + tweight7a + tweight8a + tweight9a + tweight10a + tweight11a + tweight12a + tweight13a;

        var tempMiss = parseFloat(totalWeights).toFixed(2);
        var ced = 100;
        var tempmissingweight = ced - tempMiss;
        var missingweight = tempmissingweight.toFixed(2)

        var x = document.getElementsByClassName('value');
        //Intilizing the Counter for Check changed calues
        function xyz(){
            console.log("called");
            d3.csv("Comments_Final.csv", function(data) {
                data.forEach(function(d) {

                    d.f_kommtyp = +d.f_kommtyp;
                    d.antw_beityp = +d.antw_beityp;
                    d.ausg_beityp = +d.ausg_beityp;

                    if(d.f_kommtyp == 1)
                    {
                        beityp = d. antw_beityp;
                    }
                    else 
                    {
                        beityp = d.ausg_beityp;
                    }


                    if (beityp == 20 || beityp == 21 || beityp == 211)
                    {
                        beitypVal = 0.0;
                        Temp_beityp =  beitypVal * document.getElementById("1a").value ;
                        //console.log(Temp_beityp);
                    }
                    else if (beityp == 201 || beityp == 213 || beityp == 214 || beityp == 22 ||beityp == 221)
                    {
                        beitypVal = 0.25;
                        Temp_beityp =  beitypVal * document.getElementById("1a").value ;
                        //console.log(Temp_beityp);
                    }
                    else if (beityp == 202 || beityp == 212 || beityp == 223 || beityp == 224 )
                    {
                        beitypVal = 0.50;
                        Temp_beityp =  beitypVal * document.getElementById("1a").value ;
                        //console.log(Temp_beityp);
                    }
                    else 
                    {
                        Temp_beityp =  1 * document.getElementById("1a").value ;
                        //console.log(Temp_beityp);
                    }
                    var Fin1 = parseInt(Temp_beityp)
                    //console.log(Temp_beityp);

                    d.emp = +d.emp

                    if (d.emp == 1 || d.emp == 2 )
                    {
                        empVal = 1.0;
                        Temp_emp =  empVal * document.getElementById("2a").value ;

                    }
                    else 
                    {
                        Temp_emp =  0 * document.getElementById("2a").value ;

                    }

                    //console.log(Temp_emp);



                    d.degr = +d.degr

                    if (d.degr == 1 || d.degr == 2 || d.degr == 3 || d.degr == 4 || d.degr == 9)
                    {
                        degrVal = -1.0;
                        Temp_degr =  degrVal * document.getElementById("3a").value ;

                    }
                    else 
                    {
                        Temp_degr =  0 * document.getElementById("3a").value ;

                    }




                    d.hoefl = +d.hoefl
                    Temp_hoefl =  d.hoefl * document.getElementById("4a").value ;
                    //console.log(Tempantw_hoefl);


                    d.ehrl = +d.ehrl

                    if (d.ehrl == 1 || d.ehrl == 2 || d.ehrl == 3 || d.ehrl == 4 || d.ehrl== 9)
                    {
                        ehrlVal = 1.0;
                        Temp_ehrl =  ehrlVal * document.getElementById("5a").value ;

                    }
                    else 
                    {
                        Temp_ehrl =  0 * document.getElementById("5a").value ;

                    }



                    d.posemo = +d.posemo

                    if (d.posemo == 10 || d.posemo == 11 || d.posemo == 13)
                    {
                        posemoVal = 1.0;
                        Temp_posemo =  posemoVal * document.getElementById("6a").value ;

                    }
                    else 
                    {
                        Temp_posemo =  0 * document.getElementById("6a").value ;

                    }



                    d.negemo = +d.negemo

                    if (d.negemo == 11 || d.negemo == 12 || d.negemo == 13 || d.negemo == 14 || d.negemo== 10)
                    {
                        negemoVal = 1.0;
                        Temp_negemo =  negemoVal * document.getElementById("7a").value ;

                    }
                    else 
                    {
                        Temp_negemo =  0 * document.getElementById("7a").value ;
                        //Temp_negemo =  d.negemo * document.getElementById("7a").value ;
                        //console.log(Tempantw_negemo);

                    }



                    d.humor = +d.humor

                    Temp_humor =  d.humor * document.getElementById("8a").value ;
                    //console.log(Tempantw_humor);


                    d.frage = +d.frage



                    if (d.frage == 10 || d.frage == 11 || d.frage == 12)
                    {
                        frageVal = 1.0;
                        Temp_frage =  frageVal * document.getElementById("9a").value ;

                    }
                    else 
                    {
                        Temp_frage =  0 * document.getElementById("9a").value ;
                        //Temp_frage =  d.ausg_frage * document.getElementById("9a").value ;
                        //console.log(Tempausg_frage);

                    }


                    d.korr = +d.korr
                    Temp_korr =  d.korr * document.getElementById("10a").value ;
                    //console.log(Tempausg_korr);

                    d.zus = +d.zus

                    if (d.zus == 1 || d.zus == 2)
                    {
                        zusVal = 1.0;
                        Temp_zus =  zusVal * document.getElementById("11a").value ;

                    }
                    else 
                    {
                        Temp_zus =  0 * document.getElementById("11a").value ;
                        //Temp_zus =  d.ausg_zus * document.getElementById("11a").value ;
                        //console.log(Tempausg_zus);



                    }

                    d.meta = +d.meta

                    if (d.meta == 10 || d.meta == 11 || d.meta == 12 || d.meta == 20)
                    {
                        metaVal = 1.0;
                        Temp_meta =  metaVal * document.getElementById("12a").value ;

                    }
                    else 
                    {
                        Temp_meta =  0 * document.getElementById("12a").value ;
                        //Temp_meta =  d.meta * document.getElementById("12a").value ;
                        //console.log(Tempausg_meta);


                    }



                    d.mod = +d.mod

                    if (d.mod == 11 )
                    {
                        modVal = 1.0;
                        Temp_mod =  modVal * document.getElementById("13a").value ;

                    }
                    else if (d.mod == 12 )
                    {

                        modVal = -1.0;
                        Temp_mod =  modVal * document.getElementById("13a").value ;

                    }
                    else
                    {
                        Temp_mod =  0 * document.getElementById("13a").value ;
                        //Temp_mod =  d.mod * document.getElementById("13a").value ;
                        //console.log(Tempausg_mod);
                    }


                    /*TotalWeights = document.getElementById("1a").value + document.getElementById("2a").value + document.getElementById("3a").value + document.getElementById("4a").value + document.getElementById("5a").value + document.getElementById("6a").value + document.getElementById("7a").value + document.getElementById("8a").value + document.getElementById("9a").value + document.getElementById("10a").value + document.getElementById("11a").value + document.getElementById("12a").value + document.getElementById("13a").value ; */ 
                    var fin1 = parseInt (Temp_beityp);
                    var fin2 = parseInt (Temp_emp);
                    var fin3 = parseInt (Temp_degr);
                    var fin4 = parseInt (Temp_hoefl);
                    var fin5 = parseInt (Temp_ehrl);
                    var fin6 = parseInt (Temp_posemo);
                    var fin7 = parseInt (Temp_negemo);
                    var fin8 = parseInt (Temp_humor);
                    var fin9 = parseInt (Temp_frage);
                    var fin10 = parseInt (Temp_korr);
                    var fin11 = parseInt (Temp_zus);
                    var fin12 = parseInt (Temp_meta);
                    var fin13 = parseInt (Temp_mod);

                    d.ukey = +d.ukey

                    FinalValue = fin1 + fin2 + fin3 + fin4 + fin5 + fin6 + fin7 + fin8 + fin9 + fin10 + fin11 + fin12 + fin13 ;
                    console.log("publisher" + d.ukey);
                    console.log(FinalValue);




                });

            }); 
        }

        var Tcnt = 0;
        var Valc ;
        for(i = 0; i < x.length; i++) {
            if (x[i].value != "7.69")
            {
                Tcnt = Tcnt + 1;
                Valc = x[i].value;
                ValcIndex = i;
            }
        }

        if (totalWeights == 100 || tempmissingweight == 0.00 )
        {
            xyz();
        }
        else if (Tcnt == 1)
        {   
            for(i = 0; i < x.length; i++) {
                if (x[i].value != Valc)
                {   
                    var TwoBoxVal;
                    TwoBoxVal = 100 - Valc;
                    x[i].value = TwoBoxVal / 12 ;
                    console.log(x[i].value);

                }

            }
            xyz();
        }

        else{
            alert("Please add " + missingweight + " Values are in text box " );
            console.log(missingweight); 
        }
    };       
};  


function d3_functor(v) {
    return typeof v === "function" ? v : function() { return v; };
};
