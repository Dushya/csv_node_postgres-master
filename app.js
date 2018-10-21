var csv = require('csv');
var fs = require('fs');
const pool = require('./pgdb'); 
var obj = csv();

pool.connect(function(err){
    if(err)
    {
        console.log(err);
    }
});

function MyCSV(policyID,statecode,country,point_latitude,point_longitude,line) {
this.policyID = policyID;
this.statecode = statecode;
this.country = country;
this.statecode = statecode;
this.country = country;
this.point_latitude = point_latitude;
this.point_longitude = point_longitude;
}; 

// Define the MyCSV object with parameterized constructor, this will be used for storing the data read from the csv into an array of MyCSV. You will need to define each field as shown above


// MyData array will contain the data from the CSV file and it will be sent to the clients request over HTTP. 
obj.from.path('./FL_insurance.csv', { delimiter :'|' }).to.array(function (data) {
for (var index = 0; index < data.length; index++) {
 console.log(data.length);
 
 let policyID = data[index][0];
 let statecode = data[index][1];
 let country = data[index][2];
 let point_latitude = data[index][3];
 let point_longitude = data[index][4];
 let line = data[index][5];
 let construction = 'success'; 

 pool.query("INSERT INTO public.\"FL_insurance_sample\"(\"policyID\", statecode, country, point_latitude, point_longitude, line, construction) \
            VALUES($1, $2, $3, $4, $5, $6, $7)", [policyID, statecode, country, point_latitude, point_longitude, line, construction], function(err){
      if(err)
                {
                    console.log(err);
                }
            });
console.log("----");
}

}).on("end", function(){
    console.log("Job is done!");
}).on("error", function(err){
    console.log(err);
});