import React, { useState } from "react";
import "./PasswordShowHide.css";

const PasswordShowHide = ({ field, form }:any) => {
  const [showHidePassword, changeShowHidePassword] = useState(false);
  const hasError = form.touched[field.name] && form.errors[field.name];

  return (
    <div className="input-container">
      <i
        className={hasError ? "icon-error icon" : "fa fa-key icon"}
        onClick={() => changeShowHidePassword(!showHidePassword)}
      >
        i
      </i>
      <input
        type={showHidePassword ? "text" : "password"}
        {...field}
        className={hasError ? "input-error input-field" : "input-field"}
        placeholder="Password"
      />
    </div>
  );
};

export default PasswordShowHide;
