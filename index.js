
//Shared------------------------------------------------------------------------------------------

function open_menu(menu_id) {

    HideAllMenus()

    if (menu_id == 'Home_menu') {
        $("#TopNavBar").css("display", "none")
        $("#Home_menu").css("display", "block")
    }
    else {
        $("#TopNavBar").css("display", "flex")
    }

    if (menu_id == 'Resume_menu') {
        $("#Resume_menu").css("display", "block")
    }
    if (menu_id == 'Project_menu') {
        $("#Project_menu").css("display", "block")
        LoadProjects();
    }
    if (menu_id == 'About_menu') {
        $("#About_menu").css("display", "block")
    }
    
}

function HideAllMenus()
{
    $("#Home_menu").css("display", "none")
    $("#Resume_menu").css("display", "none")
    $("#Project_menu").css("display", "none")
    $("#About_menu").css("display", "none")
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


//Home_menu------------------------------------------------------------------------------------------

//Resume_menu------------------------------------------------------------------------------------------

//Project_menu----------------------------------------------------------------------------------------

var HtmlProjectTemplate = `<a href=" / Html / Game / TicTacToe.html" class="DisplayLink">
                                < img class="DisplayImage" src = " %ImageURL% " />
                                <div class="DisplayName"> %Title% </div>
                           </a >`;
var Projects_page_loaded = false;
function LoadProjects() {
    if (Projects_page_loaded) {
        return;
    }
    readTextFile("projects.json?n=1", function (text) {
        var data = JSON.parse(text);
        var ProjectsList = data.Projects;
        for (i in ProjectsList) {
            var project = ProjectsList[i]
           
            $("#ProjectsContainer").append(
                $('<a/>', { 'class': 'DisplayLink', 'href': project.ProjectURL }).append(
                    $('<img/>', { 'src': project.ImageURL, "class": 'DisplayImage', })
                ).append(
                    $('<div/>', { 'class': 'DisplayName' }).text(project.Title)
                )
            );
            
            
            
        }
        Projects_page_loaded = true;
    });
}

//About_menu------------------------------------------------------------------------------------------