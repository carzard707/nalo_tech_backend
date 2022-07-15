const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const mysql = require('mysql');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const { resourceLimits } = require('worker_threads');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/',router);

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"ca72a7.d",
    database:"nalo_tech",
})

db.connect((err)=>{
    if(err){
        console.log(err) ;
    }else{
        console.log('connection successful');
    }
});


router.post('/createNewPhoneNumber', (req, res)=>{
    let phoneNumber = req.body.phoneNumber;
    let userName = req.body.userName;
    db.query(`insert into phonenumbers (PhoneNumber, UserName) values ('${phoneNumber}', '${userName}')`,(err,result)=>{
        if(err){
            console.log(err);
            res.status(422).send(err);
        }else{
            res.status(201).send('Phone number has been successfully created!');
        }
    });

});

router.delete('/deletePhoneNumber', (req, res)=>{
    let phoneNumberID = req.body.phoneNumberID;
    db.query(`delete from phonenumbers where NumberID = ${phoneNumberID}`,(err,result)=>{
        if(err){
            console.log(err);
            res.status(422).send(err);
        }else{
            if(result['affectedRows']==0){
                res.send('Phone number does not exist!');
            }else{
                res.status(200).send('Phone number has been successfully deleted!');

            }
        }
    });

});

router.get('/fetchPhoneNumber', (req, res)=>{
    let {phoneNumberID} = req.query;
    db.query(`select PhoneNumber from phonenumbers where NumberID = ${phoneNumberID}`,(err,result)=>{
        if(err){
            console.log(err);
            res.status(422).send(err);
        }else{
            if(result.length==0){
                res.send('Phone number does not exist!');
            }else{
                console.log(result[0].PhoneNumber);
                res.status(200).send(result[0].PhoneNumber);

            }
        }
    });

});

router.post('/editNumber',(req,res)=>{
    let oldNumber = req.body.oldNumber;
    let newNumber = req.body.newNumber;
    console.log(`${oldNumber}  ${newNumber}`);
    db.query(`update phonenumbers set PhoneNumber = '${newNumber}' where PhoneNumber = '${oldNumber}'`,(err, result)=>{
        if(err){
            console.log(err);
            res.status(422).send('Error occurred, please try again!');
        }else{
            if(result['affectedRows']==0){
                res.send('Phone number does not exist!');
            }else{
                res.status(200).send(`Phone number has been successfully edited to ${newNumber}!`);

            }
        }

    });
});

router.post('/addCSVNumbers', upload.single('numbers'), function (req, res, next) {
    console.log("Received file " + req.file.originalname);
    let counter  = 0;
    let src = fs.createReadStream(req.file.path);
    let dest = fs.createWriteStream('uploads/' + req.file.originalname);
    src.pipe(dest);
    src.on('end', function() {
    	fs.unlinkSync('uploads/' + req.file.originalname);
        const readable = fs.createReadStream(req.file.path);

        readable.pipe(csv({})).on('data', (data)=> {

            readable.pause();               
            
            db.query(`insert into phonenumbers (PhoneNumber, UserName) values ('${data['PhoneNumber']}','${data['UserName']}')`,(err, result)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(`Added ${data['UserName']}: ${data['PhoneNumber']}`);
                }
            });

            readable.resume();

        }).on('end', ()=>{
            // console.log(results);
        });
    	res.status(201).send('received ' + req.file.originalname);
    });
    src.on('error', function(err) { res.send('Something went wrong!'); });

    
})

router.get('/getAllPhoneNumbers', (req, res) => {
   let { page } = req.query ;
   let totalNumberOfrecords;
   const resultsPerPage = 20;
   if(!page){
    page = 1;
   }
   db.query('select * from phonenumbers',(err, res1)=>{
    if(err){
        console.log(err);
    }else{
        totalNumberOfrecords = res1.length;
    }

   });

   const skip = (page - 1 ) * resultsPerPage;

   sql = `select * from phonenumbers limit ${skip},${resultsPerPage}`;
   db.query(sql,(err, result)=>{
    if(err){
        res.send(err);
    }else{
        res.send({'result':result, 'totalNumberOfPages':Math.ceil((totalNumberOfrecords/resultsPerPage))});
    }

   })

   
   


});




//listen for requests
app.listen(3030);