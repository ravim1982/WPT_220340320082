
const express = require('express');
const app = express();
const mysql= require('mysql2');

app.use(express.static('abc'));

//whether you want nested objects support  or not

let parameter={
host:'localhost',
user:'root',
password:'cdac',
database:'nodejs',
port:3306
}

const con=mysql.createConnection(parameter);



app.get('/getid', function (req, res) {
	console.log("server reading blur event ");
	let input={bookid:req.query.bookid,bookname:req.query.bookname,price:req.query.price}
	let output={status:false,detail:{bookid:0,bookname:"",price:0}}

	con.query('select * from book where bookid=?', [input.bookid], (err,rows) => {
	 if (err) {
		console.log("not able to read blur event",+err);
		 
	 } else {
			  if(rows.length>0){
				 console.log("updated sucessfully");
				 output.status=true;
				 output.detail=rows[0];
				
			  }
		 
			else{
			   console.log("not updated sucessfully");  

			}
	 
	 
	 }
	   res.send(output);

	 });

 });

app.get('/update', function (req, res) {
       console.log("server reading input ");
	   let input={bookid:req.query.bookid,bookname:req.query.bookname,price:req.query.price}
       let output={status:false,detail:{bookid:0,bookname:"",price:0}}

	   con.query('update book set bookname= ? ,price = ? where bookid = ?', [input.bookname,input.price,input.bookid], (err,rows) => {
        if (err) {
           console.log("error accoured server side",+err);
			
        } else {
                 if(rows.affectedRows>0){
                    console.log("updated sucessfully");
					output.status=true;
					output.detail.bookid=rows[0];
					output.detail.bookname=rows[0];
					output.detail.price=rows[0];
                 }
			
               else{
				  console.log("not updated sucessfully");  

			   }
		
		
		}
	      res.send(output);

		});

	});


app.listen(8081, function () {
    console.log("server listening at port 8081...");
});