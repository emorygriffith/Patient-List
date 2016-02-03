var app = app || {};


Parse.initialize("BVRabUTxJBiBlmjrB7czMMEGAUHpNEWe0xqWojf7", "YVlExM39x22WWZ8s3qsG0tvwMGjxCSEvPm7uFHz1");
var Patient = Parse.Object.extend("Patient");


// var query = new Parse.Query(Patient);
// query.find({
//   success: function(results) {
//     console.log(results);
//     $('.page').append("hi " );
//
//   },
//
//   error: function(error) {
//     alert('nooo')
//   }
// });

var PatientList = Backbone.View.extend({
  el: '.page',
  render:function(){
      var that = this;
      var query = new Parse.Query(Patient);
      console.log(query);
      query.find({
        success: function(patients) {
          console.log(patients);

           var obj = {patients};
           var template = _.template($('#patient-list-template').html());
           var html = template(obj);
           that.$el.html(html);


        },

        error: function(error) {
          alert('nooo didnt findddd');
        }

      }); //end find

  }, //end render

  error: function(){
        console.log('There was some error in loading and processing the JSON file');
     }



});

var patientList = new PatientList();
