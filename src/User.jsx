
import './App.css';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import logo from './img/businessman.png';
import { useState,useEffect } from 'react';
import axios from 'axios';
import './Register.css';
import './User.css';

function User() {

    const navigate=useNavigate();

    const[data,setData]=useState([]);

    const[product,setProduct]=useState([]);
      
    const user=JSON.parse(localStorage.getItem("data"));

    async function getuser1(){
        const res2 =await axios.get(`http://localhost:8080/find/user/${user.email}`);
        
             setData(res2.data)
        }
           
     useEffect( ()=>{
         getuser1();
     },[])


      function logout(){
            navigate("/");
      }


     async function getProducts(){
            const products= await axios.get("https://fakestoreapi.com/products");
            setProduct(products.data)
            console.log(products);
      }

      useEffect(()=>{
          getProducts();
      },[])



  return (
    <div className="Register">
          <nav>
            
            <div class="nav-com1">
              
              <span>User: {data.name}</span>
              <button onClick={logout} className="link1">log out</button>

            </div>
            <img src={logo}></img>
        
         </nav>
          
          <h1>WLCOME TO USER DASHBOARD</h1> 

          <div class="container-prod">
         { 
            
             product.map((prod)=>{
               
               return  <div class="card">
                     <div class="img"><img src={prod.image}/></div> 
                      <h4>{prod.title}</h4>
                      <div class="card-price">

                      <span>Price :₹ {prod.price}</span>
                      <button>Buy Now</button>
                      </div>
                      
                </div>

           
            })

             
            
         }
          </div> 
         

        
          
               
         
          </div>
  );
}

export default User;
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);