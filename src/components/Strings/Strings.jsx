import React from "react";

const Strings = (props) => {
  return (
    <form className="tbody">
      <button className='td'>{props.num}</button>
      <input maxLength="20" className='td tbody-td' type="text" value={props.name}  onChange={props.onChangeName}  readOnly/>
      <input maxLength="20" className='td tbody-td' type="text" value={props.surname} onChange={props.onChangeSurname} readOnly/>
      <input maxLength="20" className='td tbody-td' type="text" value={props.login} onChange={props.onChangeLogin} readOnly/>
      <button id={props._id} onClick={props.editFoo} className='tbody-btn-edit' type="button">&#9998;</button>
      <button id={props._id} onClick={props.upFoo} className='tbody-btn-up' type="button">&#128190;</button>
      <button id={props._id} onClick={props.deleteFoo} className='tbody-btn-delete' type="button">&#10006;</button>
    </form>
  );
};

export default Strings;
