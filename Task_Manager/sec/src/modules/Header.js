import React from 'react'
import PropTypes, {props} from 'prop-types'
import '../App.css'


const Header = (props) => {
  return (
    <div>
      {props.title}
      <br /><br />
      <div>
      <input type='text' placeholder='Add task' id='inputs'></input><br />
      <span>Date: </span><input type='date' placeholder='Date: ' id='inputs2'></input><br /><br />
      <button onClick={props.onAdding}>Add</button>
      </div>
    </div>
  )
}

export default Header
