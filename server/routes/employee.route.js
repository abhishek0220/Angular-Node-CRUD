const express = require('express');
const employeeRoute = express.Router();

var admin = require("firebase-admin");
var serviceAccount = require("../key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://todoapp-38cf9.firebaseio.com"
})
var db = admin.database()
var ref = db.ref("Employee");
console.log("connected")

employeeRoute.route('/create').post((req, res) => {
    console.log("here")

    var name = req.body.name
    var phone = req.body.phone
    var email = req.body.email
    var design = req.body.design
    var uid = req.body.uid
    if(name && phone && email && design && uid){
        var usersRef = ref.child("users");
        usersRef.child(uid).set({
            name : name,
            phone: phone,
            email : email,
            design : design 
        }, function(error) {
            if (error) {
                res.send("Data could not be saved." + error);
            } else {
                console.log("--------saved")
                res.send("Data saved successfully.");
            }
        });
    }else{
        console.log("not valid")
        res.send("Pls pass all details")
    }
});
employeeRoute.route('/').get((req, res) => {
    ref.once("value", function(snapshot) {
        res.send(snapshot.child(`users`).val());
    }, function (errorObject) {
        res.send("The read failed: " + errorObject.code);
    });  
})
employeeRoute.route('/user/:id').get((req,res) => {
    var usersRef = ref.child("users");
    ref.once("value", function(snapshot) {
        res.send(snapshot.child(`users/${req.params.id}`).val());
    }, function (errorObject) {
        res.send("The read failed: " + errorObject.code);
    });  
})
employeeRoute.route('/user/:id').delete((req,res) => {
    var userRef = ref.child(`users/${req.params.id}`);
    userRef.remove().then( function(error){
        if (error) {
            res.send("Data could not be deleted." + error);
        } else {
            res.send("Data deleted successfully.");
        }
    }) 
})
module.exports = employeeRoute;