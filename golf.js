

    var closeCourse;
    var currentCourse;
    var local_obj = {latitude: 40.4436, longitude: - 111.86311, radius: 100};
    var numHoles;
    var numplayers = 4;

    function loadMe() {
        $.post("https://golf-courses-api.herokuapp.com/courses/", local_obj, function (data, status) {
            closeCourse = JSON.parse(data);
            console.log(closeCourse);
            for (let p in closeCourse.courses)
                $(".dropdown-menu").append("<div class='courselist'><a onclick='informationOpening("+ p +", "+ closeCourse.courses[p].id +")'>" + closeCourse.courses[p].name + "</a></div>");
            })
    }

    function informationOpening(index, myid) {
        $("#infoboxstuff").empty().append("<div class='info'>" + closeCourse.courses[index].name + "</div>");
        $("#infoboxstuff").append("<div class='info'>" + closeCourse.courses[index].addr_1 + "</div>");
        $("#infoboxstuff").append("<div class='info'>" + closeCourse.courses[index].city + ', ' + closeCourse.courses[0].state_or_province + "</div>");
        $("#infoboxstuff").append("<div class='info'>" + closeCourse.courses[index].country + "</div>");
        $("#infoboxstuff").append("<div class='info'>" + closeCourse.courses[index].phone + "</div>");
        $("#infoboxstuff").append("<div class='info'><a href='" + closeCourse.courses[index].website + "'>Website</a></div>");
        $("#infoboxstuff").append("<div class='info'><img class='img' src='" + closeCourse.courses[index].thumbnail + "'></div>");
        getCourse(myid);
    }

        function getCourse(courseid) {
            $("#teeselect").html("");
            $.get("https://golf-courses-api.herokuapp.com/courses/" + courseid, function (data, status) {
                currentCourse = JSON.parse(data);
                for (let t in currentCourse.course.tee_types) {
                    var teename = currentCourse.course.tee_types[t].tee_type;
                    console.log(teename);

                    $("#teeselect").append("<option value='" + t + "'>"+ teename +" </option>");
                }
            })

        }


        function buildCard(mytee) {
            numHoles = currentCourse.course.holes;
            console.log(numHoles);
            $(".scourColumn").html("");

            for (let c in numHoles) {
                console.log(mytee);
                 var holepar = currentCourse.course.holes[c].tee_boxes[mytee].par;
                 console.log(holepar);
                $(".scourColumn").append("<div id='golumn" + (Number(c) + 1) + "'class='golumn'><div class='holeheader'><div class='parbox'>"+ (Number(c) + 1) +"</div><div>par " + holepar + "</div></div></div>")

            }
            $(".scourColumn").append("<div class='total golumn'><div class='holeheader'>total</div><div>");
            fillCard();
        }

        function fillCard() {
            console.log("hello");
            for (let n = 1; n <= numplayers; n++) {
                console.log(n);
                $(".playercolumn").append("<div id='pl"+ n +"' class='deleteplayerstyle'><span class='fa fa-minus-circle' onclick='deleteplayer("+ n +")'></span><div class='person' contenteditable='true' >Player"+ n +"</div></div>");
                $(".total").append("<input class='holeinput' id='totalhole"+ n +"'>");
                for (let h = 1; h <= numHoles.length; h++) {
                    $("#golumn" + h).append("<input id='player" + n + "hole" + h + "' type='text' class='holeinput' onkeyup='updatescour("+ n +")' >");
                }
            }

        }

        function deleteplayer(playerId) {

            $("#pl" + playerId).remove();
            for(let h = 1; h <= numHoles.length; h++){
                $("#player"+ playerId + "hole" + h).remove();
                $("#totalhole" + playerId).remove();
            }
        }

        function updatescour(plyrid) {
            var plyrtotal = 0;
            for(let t = 1; t <= numHoles.length; t++){
                console.log(plyrid);
               plyrtotal += Number($("#player"+ plyrid + "hole" + t).val());
            }
            $("#totalhole" + plyrid).val(plyrtotal);
        }








