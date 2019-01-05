
$(document).ready(function () {
    LoadProjects();
    ShowConstuctionOnHoverUC_Class()
    ShowProjectDescriptionOnHover() 
})

function ShowConstuctionOnHoverUC_Class() {

    var ProjectImageURl;

    $(".UC").hover(
        function () {
            ProjectImageURl = $(this).attr("src")
            $(this).attr("src","../../Images/UnderConstruction.png")
    },
        function () {
            $(this).attr("src", ProjectImageURl)
    })
}

function ShowProjectDescriptionOnHover() {
    $(".DisplayImage").hover(
        function () {
            var x = $(this).position().left;
            var y = $(this).position().top;
            $(this).parent().find(".ProjectDescription").css("left", x + 285)
            $(this).parent().find(".ProjectDescription").css("top", y + 27)

            $(this).parent().find(".ProjectDescription").css("display","inline-block")
        },
        function () {
            $(this).parent().find(".ProjectDescription").css("display", "none")
        })
}


$.getScript("ProjectsData.js", function () {


});

function LoadProjects() {
    for (x in ProjectsData) {

        var project = ProjectsData[x]

        var HtmlProjectLink = $('<a/>', { 'class': 'DisplayLink', 'href': project.ProjectURL })
        var HtmlProjectImage = $('<img/>', { 'src': project.ImageURL, "class": 'DisplayImage', })
        var HtmlProjectName = $('<div/>', { 'class': 'DisplayName' }).text(project.Title)
        var HtmlProjectDescription = $('<div/>', { 'class': 'ProjectDescription' }).text(project.Description)

        if (project.UnderConstruction) {
            HtmlProjectImage = $(HtmlProjectImage).addClass("UC")
        }

        var HtmlProjectIcon = HtmlProjectLink.append(HtmlProjectImage).append(HtmlProjectName)

        if (project.Description != "") {
            HtmlProjectIcon = HtmlProjectIcon.append(HtmlProjectDescription)
        }

        $("#ProjectsContainer").append(
            HtmlProjectIcon
        );
    }
}


