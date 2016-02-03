

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
  render: function(patients){
    var obj = {patients};
    var template = _.template($('#edit-patient-template').html());
    var html = template(obj);
    this.$el.html(html);
  },
  events: {
    'submit .edit-patient-form': 'savePatient'
  },
  savePatient: function(ev){
    var patientDetails = $(ev.currentTarget).serializeObject();
    console.log(patientDetails);
    var patient = new Patient();
    patient.save(patientDetails, function(){
      success: console.log(patient);
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
    'new': 'editPatient'
  }
});

var router = new Router();
router.on('route:home', function(){
  patientList.render();
});
router.on('route:editPatient', function(){
  editPatient.render();
  console.log('show user form');
});


//-------Start History------//
Backbone.history.start();
