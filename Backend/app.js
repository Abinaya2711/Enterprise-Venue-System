const express=require('express')
const app=express()
const mysql=require('mysql2')
const cors=require('cors')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const bodyparser=require('body-parser')
const nodemailer=require('nodemailer')
const PORT=3500;

app.use(cors())
app.use(express.json())
app.use(bodyparser.json())

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Kapil@1362005',
    database:'halldb'
})
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the Mysql database.');
});

app.get('/data',(req,res)=>{
    const sql=`SELECT * FROM people`
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).send("Database insert failed");
        }
        res.status(200).json({
            message:'Successfully fetched',
            data:result
          });
    })
})


app.post('/add-people',async(req,res)=>{
    const {newname,email,role,password}=req.body;
    const hashpassword= await bcrypt.hash(password,10)
    const sql= `INSERT INTO people (name,email,role,password) VAlUES (?,?,?,?)`
    db.query(sql, [newname,email,role,hashpassword], (err, result) => {
        if (err) {
          console.log("Insert error:", err);
          return res.status(500).send("Database insert failed");
        }
        res.status(200).json({ message: 'Flavor added', result });
      });
})

app.delete('/delete/:id',(req,res)=>{
    const [id]=req.params.id
    const sql=`DELETE FROM people WHERE id= ?`
    db.query(sql,[id],(err,result)=>{
        if(err){
            console.log("Error",err)
            return res.status(500).send("Error in delete")
        }
        res.status(200).json({
            message:"successfully deleted",
            result
        });
    })
})



app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    const sql= `SELECT * FROM people WHERE email= ? `
    db.query(sql,[email],async(err,result)=>{
        if(err){
            console.log("There is an erro in backend",err)
            return res.status(500).send("There is an error")

        }
        if(result.length==0){
            return res.status(401).send("Invalid email or password");
        }
        const user=result[0]
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
        return res.status(401).send("Invalid email or password");
        }
        res.status(200).json({
            message:'successfully loged in',
            result
        })
    })
})


app.post('/forgotpassword',(req,res)=>{
    const{email}=req.body
    const sql=`SELECT * FROM people WHERE email=?`
    db.query(sql,[email],async(err,result)=>{
        if(err){
            console.log("There is an error",err);
        }
        const user=result[0]
        const token=jwt.sign({id:user.id},'secretKey',{expiresIn:'20m'})
        const resetLink=`http://localhost:3000/newpassword/${token}`
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'kapilravi03@gmail.com',       
            pass: 'gjfj zsxi rfzj myss'       
            }
      });
      await transporter.sendMail({
        to: email,
        subject: "Password Reset",
        html: `<a href="${resetLink}">Click here to reset your password</a>`
      });
    
      res.json({ message: 'Reset link sent' });

    })

})
app.post('/newpassword/:token',async(req,res)=>{
    const { token } = req.params;
    const { newPassword } = req.body;

    const decoded=jwt.verify(token, 'secretKey')
        const userId = decoded.id;
        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error hashing password' });
            }

            db.query('UPDATE people SET password = ? WHERE id = ?', [hashedPassword, userId], (err, result) => {
                if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Failed to reset password' });
                }

                res.json({ message: 'Password reset successful' });
            });
        });
  
});


app.listen(PORT,()=>{
    console.log("listening port number 3500")
})