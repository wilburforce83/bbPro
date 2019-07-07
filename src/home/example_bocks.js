//catch errorsin promises

.catch(function (error) {

    let string = error.message;
    let position = string.indexOf(`{`);
    let message = string.slice(0, position - 1);
    //var pos = string.indexOf('{')-1
    // var message = string.substring(0,pos);
    console.log(message);
    // console.log(position);
    document.getElementById('notifyme').insertAdjacentHTML("afterbegin",
        '<p style="color:#755505">' + message + '</p>');

})