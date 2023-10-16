import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import File from './component/File';
// import ReactDOM from 'react-dom';
import Navbar from './component/Navbar'
import Signup from './component/Signup'
import Login from './component/Login'
// import Feed from './Components/Feed'
import Response from './component/Response'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import NotFound from './Components/NotFound'
// import PrivateRoute from './component/privateRoute';
import Home from './component/Home';
import ItemPage from './component/ItemPage';
import Feed from './component/Feed'
import MyListings from './component/MyListings'
import FoundItem from './component/FoundItem';
import PostItem from './component/PostItem';
// import { ToastProvider } from 'react-toast-notifications';
// window.OneSignal = window.OneSignal || [];
// const OneSignal = window.OneSignal;
function App()
{
  // useEffect(()=>{
  //   OneSignal.push(()=> {
  //     OneSignal.init(
  //       {
  //         appId: "fe13c665-7830-497e-9a3f-27a523840baf", //STEP 9
      
  //       welcomeNotification: {
  //         "title": "One Signal",
  //         "message": "Thanks for subscribing!",
  //       } 
  //     },
        
  //     );
  //   });
  // },[])
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/feed' element={<Feed/>}  />
        <Route path='/mylistings'  element={<MyListings/>}  />
        <Route path='/responses' element={<Response/>}  />
        <Route path='/postitem' element={<PostItem/>}  />
        <Route path='/inputfile' element={<File/>}  />
        <Route path='/itempage/:itemId' element={<ItemPage/>}  />
        {/* <ToastProvider autoDismiss={true} placement={"bottom-right"}> */}
        {/* <Route path='/:item'  element={ItemPage}  /> */}
        {/* </ToastProvider> */}
      </Routes>
    </BrowserRouter>
    </>

  )
}

export default App;