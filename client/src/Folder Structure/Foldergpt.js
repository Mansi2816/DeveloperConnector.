// import React, { useState } from 'react'

// const Folder = () => {
//   const [expanded, setExpanded] = useState({})

//   const handleToggle = key => {
//     setExpanded(prev => ({ ...prev, [key]: !prev[key] }))

    
//   }

//   return (
//     <div>
//       <button onClick={() => handleToggle('folderStructure')}>
//         <h1>Folder Structure</h1>
//       </button>

//       {expanded.folderStructure && (
//         <div>
//           <button onClick={() => handleToggle('client')}>
//             <h1>Client</h1>
//           </button>

//           {expanded.client && (
//             <div>
//               <button onClick={() => handleToggle('src')}>
//                 <h2>src</h2>
//               </button>

//               {expanded.src && (
//                 <div>
//                   <button onClick={() => handleToggle('actions')}>
//                     <h3>actions </h3>
//                   </button>
//                   {expanded.actions && (
//                     <div>                    
//                       <h4>alert.js</h4>
//                       <h4>auth.js</h4>
//                       <h4>post.js</h4>
//                       <h4>profile.js</h4>
//                       <h4>types.js</h4>
//                     </div>
                   
//                   )}

//                   <button onClick={() => handleToggle('components')}>
//                     <h3>components</h3>
//                   </button>

//                   {expanded.components && (
//                     <div>
//                       <button onClick={() => handleToggle('auth')}>
//                     <h4>auth</h4>
//                   </button>
//                     {expanded.auth && (
//                       <div>
//                         <h5>Login.js</h5>
//                       <h5>Register.js</h5>
//                       </div>
//                     )}
                      

//                      <button onClick={() => handleToggle('dashboard')}>
//                     <h4>dashboard</h4>
//                   </button> 
//                   {expanded.dashboard && (
//                     <div>
//                        <h5>Dashboard.js</h5>
//                       <h5>DashboardActions.js</h5>
//                       <h5>Education.js</h5>
//                       <h5>Experience.js</h5>
//                     </div>
//                   )}              
                    

//                       <button onClick={() => handleToggle('layout')}>
//                     <h4>layout</h4>
//                   </button>
//                   {expanded.layout && (
//                     <div>
//                       <h5>Alert.js</h5>
//                       <h5>Landing.js</h5>
//                       <h5>Navbar.js</h5>
//                       <h5>Notfound.js</h5>
//                       <h5>Spinner.js</h5>
//                     </div>
//                   )}
                    

//                       <button onClick={() => handleToggle('post')}>
//                     <h4>post</h4>
//                   </button>
//                   {expanded.post && (
//                     <div> <h5>CommentForm.js</h5>
//                     <h5>CommentItem.js</h5>
//                     <h5>Post.js</h5></div>
//                   )}
                     

//                       <button onClick={() => handleToggle('posts')}>
//                     <h4>posts</h4>
//                   </button>
//                   {expanded.posts && (
//                     <div>
//                        <h5>PostForm.js</h5>
//                       <h5>PostItem.js</h5>
//                       <h5>Posts.js</h5>
//                     </div>
//                   )}
                     

//                       <button onClick={() => handleToggle('profile')}>
//                     <h4>profile</h4>
//                   </button>
//                   {expanded.profile && (
//                     <div>
//                        <h5>Profile.js</h5>
//                       <h5>ProfileAbout.js</h5>
//                       <h5>ProfileEducation.js</h5>
//                       <h5>ProfileExperience.js</h5>
//                       <h5>ProfileGithub.js</h5>
//                       <h5>ProfileTop.js</h5>

//                     </div>
//                   )}
                     
//                       <button onClick={() => handleToggle('profileforms')}>
//                     <h4>profile-forms</h4>
//                   </button>
//                   {expanded.profileforms && (
//                     <div>
//                         <h5>AddEducation.js</h5>
//                       <h5>AddExperience.js</h5>
//                       <h5>CreateProfile.js</h5>
//                       <h5>EditProfile.js</h5>
//                     </div>
//                   )}
                     

//                       <button onClick={() => handleToggle('profiles')}>
//                     <h4>profiles</h4>
//                   </button>
//                   {expanded.profiles && (
//                     <div>
//                        <h5>ProfileItem.js</h5>
//                       <h5>Profiles.js</h5>
//                     </div>
//                   )}
                     

//                       <button onClick={() => handleToggle('routing')}>
//                     <h4>routing</h4>
//                   </button>
//                   {expanded.routing && (
//                     <div>
//                        <h5>PrivateRoute.js</h5>
//                       <h5>Routes.js</h5>
//                     </div>
//                   )}
                     
//                     </div>
//                   )}

//                   <button onClick={() => handleToggle('img')}>
//                     <h3>Img</h3>
//                   </button>

//                   <button onClick={() => handleToggle('reducers')}>
//                     <h3>Reducers</h3>
//                   </button>
//                   {expanded.reducers && (
//                     <div>
//                       {' '}
//                       <h4>alert.js</h4>
//                       <h4>auth.js</h4>
//                       <h4>post.js</h4>
//                       <h4>profile.js</h4>
//                       <h4>index.js</h4>
//                     </div>
//                   )}

//                   <button onClick={() => handleToggle('utils')}>
//                     <h3>utils</h3>{' '}
//                   </button>
//                   {expanded.utils && (
//                     <div>
//                       <h4>setAuthToken.js</h4>
//                     </div>
//                   )}

//                   <button onClick={() => handleToggle('index.js')}>
//                     <h3>index.js</h3>{' '}
//                   </button>
//                   <button onClick={() => handleToggle('app.js')}>
//                     <h3>app.js</h3>{' '}
//                   </button>
//                   <button onClick={() => handleToggle('store.js')}>
//                     <h3>store.js</h3>{' '}
//                   </button>
//                 </div>
//               )}

//               <button onClick={() => handleToggle('public')}>
//                 <h2>public</h2>
//               </button>

//               {expanded.public && (
//                 <div>
//                   <h3>index.html</h3>
//                 </div>
//               )}
//             </div>
//           )}

//           <button onClick={() => handleToggle('server')}>
//             <h1>Server</h1>
//           </button>

//           {expanded.server && (
//             <div>
//               <h2>config</h2>
//               <h3>Db.js</h3>
//               <h3>default.json</h3>
//               <h2>middleware</h2>
//               <h3>auth.js</h3>
//               <h2>models</h2>
//               <h3>Posts.js</h3>
//               <h3>Profile.js</h3>
//               <h3>User.js</h3>
//               <h2>Routes/api</h2>
//               <h3>auth.js</h3>
//               <h3>post.js</h3>
//               <h3>profile.js</h3>
//               <h3>users.js</h3>
//               <h2>server.js</h2>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Folder
