Parse.initialize("BVRabUTxJBiBlmjrB7czMMEGAUHpNEWe0xqWojf7", "YVlExM39x22WWZ8s3qsG0tvwMGjxCSEvPm7uFHz1");
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

var patientList = new PatientList();


//---------------ROUTES--------------//
var Router = Backbone.Router.extend({
  routes: {
    '': 'home'
  }
});

var router = new Router();
router.on('route:home', function(){
  patientList.render();
});



//-------Start History------//
Backbone.history.start();
