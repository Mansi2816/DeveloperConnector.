import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
const ProfileItem = ({profile:{
    user: {_id,name,avatar},
    status,
    company,
    location,
    skills
}}) => {
  return (
    <div className='profile bg-light'>
        <img src={avatar} alt='' className='round-img'/>
   <div>
    <h2 className='text-primary'>{name}</h2>
    <p>{status}</p>
    <p><strong>Company: </strong>{company}</p>
    <p><strong>Location: </strong>{location}</p>
    <p><strong>Skills: </strong>{skills.join(', ')}</p>
    <Link to={`/profile/${_id}`} className='btn btn-primary'>View Profile</Link>
   </div>
   <ul>
{skills.slice(0,4).map((skill,index) => (
    <li key={index} className='text-primary'>
        <i className='fas fa-check'></i> {skill}
    </li>  ))
    }

   </ul>
    </div>
  )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem