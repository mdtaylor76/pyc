/* global $ */
$(document).ready(function() {
    
    populate();
//    supportData();

    $('#incidentType').on("change", function() {
        let type = $('#incidentType').val();
        
    });
    
    
    async function populate() {
        let sections = ["location", "bodypart", "behavior", "recovery", "student", "possibletrigger", "nextsteps", "supportplan", "support"];
        
        sections.forEach( function(i) {
            console.log(i);
            getData(i);
        });
    }
    
    async function getData(section) {

        let url = `/api/data?section=${section}`;
        console.log(url);
        
        let response = await fetch(url);
        let data = await response.json();
        
        data.forEach( function(i) {
            //console.log(i);
            //console.log(`<option value="${i.id}"> ${i.description} </option>`);
            switch (section) {
                case 'student':
                    console.log("Student Section");
                    $("#student").append(`<option value="${i.studentID}"> ${i.first} ${i.last} </option>`);
                    break;
                case 'location':
                case 'bodypart':
                case 'behavior':
                case 'recovery':
                    $(`#${section}`).append(`<option value="${i.id}"> ${i.description} </option>`);
                    break;
                case 'support':
                case 'supportplan':
                case 'nextsteps':
                case 'possibletrigger':
                    $(`#${section}`).append(`<input type="checkbox" name="${section}[]" value="${i.id}"> <label for=#${section}> ${i.description} </label>`);
                    break;
                    
            }
        });
    }


    async function supportData() {

        let url = `/api/support`;
        let response = await fetch(url);
        let data = await response.json();
          
        data.forEach( function(i) {
            console.log(i.description);
            console.log(`<input type="checkbox" name="support[]" value="${i.id}"> <label for=#support"> ${i.description} </label>`);
            $("#supportWorks").append(`<input type="checkbox" name="support[]" value="${i.id}"> <label for=#support"> ${i.description} </label>`);
        });
    }
    

}); //document