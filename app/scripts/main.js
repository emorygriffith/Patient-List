

//---PARSE DB CONFIG-----//
Parse.initialize("BVRabUTxJBiBlmjrB7czMMEGAUHpNEWe0xqWojf7", "YVlExM39x22WWZ8s3qsG0tvwMGjxCSEvPm7uFHz1");


//------Snippets-------//
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


//-------------MODELS-----------------------//
var Patient = Parse.Object.extend("Patient");


//--------------VIEWS------------------//
var PatientList = Backbone.View.extend({
  el: '.page',
  render:function(){
      var that = this;
      var query = new Parse.Query(Patient);
      query.find({
        success: function(patients) {
           var obj = {patients};
           var template = _.template($('#patient-list-template').html());
           var html = template(obj);
           that.$el.html(html);
        },
        error: function(error) {
          alert('Could not fetch the JSON from Parse server');
        }
      }); //end find
  }, //end render
  error: function(){
        console.log('There was some error in loading and processing the JSON file');
     }
});



var EditPatient = Backbone.View.extend({
  el: '.page',
  render: function(options){
    var that = this;
    //conditional --> if patient.id present, render view with their info, else blank
    if (options.id) {
        var id = options.id;
        var query = new Parse.Query(Patient);
        query.get(id, {
          success: function(patient){
            //template logic
            var obj = {patient: patient};
            var template = _.template($('#edit-patient-template').html());
            var html = template(obj);
            that.$el.html(html);
          }
        });

    } else {
        //template logic
        var obj = {patient: null};
        var template = _.template($('#edit-patient-template').html());
        var html = template(obj);
        this.$el.html(html);
    }



  },
  events: {
    'submit .edit-patient-form': 'savePatient'
  },
  savePatient: function(ev){
    var patientDetails = $(ev.currentTarget).serializeObject();
    console.log(patientDetails);
    var patient = new Patient();
    patient.save(patientDetails, function(){
      router.navigate('',{trigger:true});
    });
    return false;
  }
});

var patientList = new PatientList();
var editPatient = new EditPatient();




//---------------ROUTES--------------//
var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'new': 'editPatient',
    'edit/:id': 'editPatient'
  }
});

var router = new Router();
router.on('route:home', function(){
  patientList.render();
});
router.on('route:editPatient', function(id){
  editPatient.render({id: id});
});


//-------Start History------//
Backbone.history.start();
