
let employees=[
    {id:1,name:"john",dept:'IT'},
    {id:2,name:"maya",dept:'HR'}
]
const express=require("express")
const app=express()
app.use(express.json())
app.get("/employees",(req,resp)=>{
    resp.json(employees)
})
app.get("/employees/:id",(req,resp)=>{
    let sid=req.params.id
    let s=employees.find((s)=>{return s.id==sid})
    if(s){
        resp.json(s)
    }
    else{
        resp.status(404).json({"message":"Employee record not found"})
    }
})
app.post("/employees",(req,resp)=>{
    let id=req.body.id
    let name=req.body.name
    let dept=req.body.dept
    let e={id:id,name:name,dept:dept}
    employees.push(e)
    resp.status(201).json({"message":"employee record inserted","employees":e})
})
app.put("/employees/:id",(req,resp)=>{
    let sid=req.params.id
    let name=req.body.name
    let dept=req.body.dept
    let e={id:sid,name:name,dept:dept}
    let index=employees.findIndex((e)=>{return e.id==sid})
    if(index!=-1){
        employees[index]=e
        resp.json({"message":"Employee record updated","employees":e})

    }else{
        resp.status(404).json({"message":"Employee record not found"})
    }
})
app.delete("/employees/:id",(req,resp)=>{
    let sid=req.params.id
    let s=employees.find((s)=>{return s.id==sid})
    if(s){
        employees=employees.filter((s)=>{return s.id!=sid})
        resp.json({"message":"employee record deleted"})
    }else{
        resp.status(404).json({"message":"employee not found"})
    }
})
app.listen(3000,()=>{console.log("Server started")})