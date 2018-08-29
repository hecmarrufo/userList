$( document ).ready(function() {
    $.ajax({
        url: 'https://randomuser.me/api/?results=20',
        dataType: 'json',
        success: function(data) {
            fill(data.results);
        }
    });
});
function fill(obj){
    for (x in obj){
        $("#people").append('<div class="person" id="'+x+'"><div class="pic"><img src="'+
            obj[x]['picture']['medium']+'"/></div><div class="info">'+
            obj[x]['name']['first'].capitalize()+' '+
            obj[x]['name']['last'].capitalize()+'<br><span class="smallData">'+
            obj[x]['cell']+'<br>'+
            obj[x]['location']['street']+'</span></div></div>');
    }
    $(".person").click(function() {
        $('#flexbox').wrap('<div class="blur-all">');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        $("#full-data").slideDown("slow");
        fillFData(obj[this.id]);
    });
}
function fillFData(obj) {
    $(".infoFD").remove();
    const fullName= obj.name.title.capitalize()+", "+obj.name.first.capitalize()+" "+obj.name.last.capitalize();
    const date = new Date(obj.dob.date);
    const dob = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
    const Rdate = new Date(obj.registered.date);
    const registeredDate = (Rdate.getMonth()+1)+"/"+Rdate.getDate()+"/"+Rdate.getFullYear();
    const address = obj.location.street.capitalize()+", "+obj.location.state.capitalize()+" "+obj.location.city.capitalize();
    $("#full-data").append('<div class="infoFD"><img id="fullPic" src="'+obj.picture.large+'"/><div class="fullName">'+
        fullName+'</div><div class="titles">Personal info: </div><div class="fullData"><span>Date of Birth: </span>'+
        dob+'</div><div class="fullData"><span>Age: </span>'+
        obj.dob.age+' years old</div><div class="fullData"><span>Gender: </span>'+
        obj.gender+'</div><div class="fullData"><span>Nationality: </span>'+
        obj.nat+'</div><div class="fullData"><span>Address: </span>'+
        address+'</div><div class="fullData"><span>PostCode: </span>'+
        obj.location.postcode+'</div><hr><div class="titles">Coordinates: </div><div class="fullData"><span>Latitude: </span>'+
        obj.location.coordinates.latitude+'</div><div class="fullData"><span>Longitude: </span>'+
        obj.location.coordinates.longitude+'</div><div class="fullData"><span>Timezone: </span>'+
        obj.location.timezone.description+'</div><div class="fullData"><span>Offset: </span>'+
        obj.location.timezone.offset+'</div><hr><div class="titles">Contact: </div><div class="fullData"><span>E-mail: </span>'+
        obj.email+'</div><div class="fullData"><span>Cell phone number: </span>'+
        obj.cell+'</div><div class="fullData"><span>Landline: </span>'+
        obj.phone+'</div><hr><div class="titles">Account data: </div><div class="fullData"><span>Username: </span>'+
        obj.login.username+'</div><div class="fullData"><span>Password: </span>'+
        obj.login.password+'</div><div class="fullData"><span>Been a member for: </span>'+
        obj.registered.age+' years</div><div class="fullData"><span>Member Since: </span>'+
        registeredDate+'</div><hr><div class="fullData"><span>Id: </span>'+
        obj.id.name+'</div><div class="fullData"><span>Value: </span>'+
        obj.id.value+'</div><div class="fullData"></div></div>'
    );
    /*    function iterator(obj) {
            for (y in obj) {
                if (jQuery.type(obj[y])==='string'){
                    $("#full-data").append('<div class="infoFD">'+obj[y]+'</div>');
                }else if (jQuery.type(obj[y])==='object'){
                    iterator(obj[y]);
                }
            }
        }
        iterator(obj);*/
    $('#back').click(function() {
        $('#full-data').slideUp('slow');
        $('#flexbox').unwrap();
        $('#people').find(':hidden').show();
        $('#noOne').hide();
        $('#filter').val('');
    });
}
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
$( "#filter" ).keyup(function() {
    $('.person').hide();
    let textico = $('#filter').val().toUpperCase();
    $('.person:contains("'+textico+'")').show();
    if($('div.person').find( ":visible" ).length <= 0){
        $('#noOne').show();
    }else
        $('#noOne').hide();
});
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};