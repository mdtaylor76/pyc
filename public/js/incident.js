/* global $ */
$(document).ready(function() {
    
    //locationData();
    //bodypartData();
    //behaviorData();
    //recoveryData();
    //studentData();
    populate();
    supportData();
    //triggerData();
    //nextData();
    //planData();
    
    $('#incidentType').on("change", function() {
        let type = $('#incidentType').val();
        
    });
    
    
    async function populate() {
        let sections = ["location", "bodypart", "behavior", "recovery", "student", "possibletrigger", "nextsteps", "supportplan"];
        
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
/*
            if (section == 'student') {
                $("#student").append(`<option value="${i.studentID}"> ${i.first} ${i.last} </option>`);
            }
            else {
                $(`#${section}`).append(`<option value="${i.id}"> ${i.description} </option>`);
            }
*/
        });
    }

/*    
    async function locationData() {

        let url = `/api/location`;
        let response = await fetch(url);
        let data = await response.json();
          
        data.forEach( function(i) {
            //console.log(i);
            //console.log(`<option value="${i.id}"> ${i.description} </option>`);
            $("#location").append(`<option value="${i.id}"> ${i.description} </option>`);
        });
    }
    
    async function bodypartData() {

        let url = `/api/bodypart`;
        let response = await fetch(url);
        let data = await response.json();
          
        data.forEach( function(i) {
            //console.log(i);
            //console.log(`<option value="${i.id}"> ${i.description} </option>`);
            $("#bodypart").append(`<option value="${i.id}"> ${i.description} </option>`);
        });
    }

    async function behaviorData() {

        let url = `/api/behavior`;
        let response = await fetch(url);
        let data = await response.json();
          
        data.forEach( function(i) {
            //console.log(i);
            //console.log(`<option value="${i.id}"> ${i.description} </option>`);
            $("#behavior").append(`<option value="${i.id}"> ${i.description} </option>`);
        });
    }

    async function recoveryData() {

        let url = `/api/recovery`;
        let response = await fetch(url);
        let data = await response.json();
          
        data.forEach( function(i) {
            //console.log(i);
            //console.log(`<option value="${i.id}"> ${i.description} </option>`);
            $("#recovery").append(`<option value="${i.id}"> ${i.description} </option>`);
        });
    }

    async function studentData() {

        let url = `/api/student`;
        let response = await fetch(url);
        let data = await response.json();
          
        data.forEach( function(i) {
            //console.log(i);
            //console.log(`<option value="${i.studentID}"> ${i.first} ${i.last} </option>`);
            $("#student").append(`<option value="${i.studentID}"> ${i.first} ${i.last} </option>`);
        });
    }
*/    
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
    
    async function planData() {

        let url = `/api/supportplan`;
        let response = await fetch(url);
        let data = await response.json();
          
        data.forEach( function(i) {
            console.log(i.description);
            console.log(`<input type="checkbox" name="plan[]" value="${i.id}"> <label for=#support"> ${i.description} </label>`);
            $("#plan").append(`<input type="checkbox" name="plan[]" value="${i.id}"> <label for=#plan"> ${i.description} </label>`);
        });
    }

    async function nextData() {

        let url = `/api/nextsteps`;
        let response = await fetch(url);
        let data = await response.json();
          
        data.forEach( function(i) {
            console.log(i.description);
            console.log(`<input type="checkbox" name="next[]" value="${i.id}"> <label for=#support"> ${i.description} </label>`);
            $("#nextsteps").append(`<input type="checkbox" name="next[]" value="${i.id}"> <label for=#next"> ${i.description} </label>`);
        });
    }

    async function triggerData() {

        let url = `/api/possibletrigger`;
        let response = await fetch(url);
        let data = await response.json();
          
        data.forEach( function(i) {
            console.log(i.description);
            console.log(`<input type="checkbox" name="trigger[]" value="${i.id}"> <label for=#support"> ${i.description} </label>`);
            $("#trigger").append(`<input type="checkbox" name="trigger[]" value="${i.id}"> <label for=#trigger"> ${i.description} </label>`);
        });
    }
}); //document