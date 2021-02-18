/* global $ */
$(document).ready(function() {
    
    locationData();
    bodypartData();
    behaviorData();
    recoveryData();
    studentData();
    supportData();
    triggerData();
    nextData();
    planData();
    
    $('#incidentType').on("change", function() {
        let type = $('#incidentType').val();
        
    });
    
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

        let url = `/api/plan`;
        let response = await fetch(url);
        let data = await response.json();
          
        data.forEach( function(i) {
            console.log(i.description);
            console.log(`<input type="checkbox" name="plan[]" value="${i.id}"> <label for=#support"> ${i.description} </label>`);
            $("#plan").append(`<input type="checkbox" name="plan[]" value="${i.id}"> <label for=#plan"> ${i.description} </label>`);
        });
    }

    async function nextData() {

        let url = `/api/next`;
        let response = await fetch(url);
        let data = await response.json();
          
        data.forEach( function(i) {
            console.log(i.description);
            console.log(`<input type="checkbox" name="next[]" value="${i.id}"> <label for=#support"> ${i.description} </label>`);
            $("#next").append(`<input type="checkbox" name="next[]" value="${i.id}"> <label for=#next"> ${i.description} </label>`);
        });
    }

    async function triggerData() {

        let url = `/api/trigger`;
        let response = await fetch(url);
        let data = await response.json();
          
        data.forEach( function(i) {
            console.log(i.description);
            console.log(`<input type="checkbox" name="trigger[]" value="${i.id}"> <label for=#support"> ${i.description} </label>`);
            $("#trigger").append(`<input type="checkbox" name="trigger[]" value="${i.id}"> <label for=#trigger"> ${i.description} </label>`);
        });
    }
}); //document