import { useState } from "react";

export function Input({
  type = "text",
  name = "",
  placeholder = "",
  label = "",
  description = "",
  error = "",
  emptyErr = "",
  disabled,
  required,
  minLength,
  variant = "default",
  size = 250,
  radius = 4,
  withIcon = null,
  radioVariants,
  onBlurOut,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  const styles = {
    width: `${size}px`,
    borderRadius: `${radius}px`,
  };

  const onBlur = (e) => {
    if (e.target.required && !e.target.value && emptyErr) {
      setErrorMessage("Поле обязательно к заполнению");
    } else {
      setErrorMessage("");
    }
    onBlurOut(e);
  };

  return (
    <label className="input-field">
      <p className="label">
        {label ? label : ""}
        {required && <sup className="required">*</sup>}
      </p>

      {type !== "radio" && description && (
        <p className="description">{description}</p>
      )}

      {type === "radio" && radioVariants && (
        <div className="radio-items">
          {radioVariants.map((el, idx) => (
            <label className="radio description" key={idx}>
              <input type={type} name={name} onChange={onBlur} value={el} />
              {el}
            </label>
          ))}
        </div>
      )}

      {type !== "radio" && (
        <div className={withIcon ? "with-icon" : ""}>
          {withIcon && withIcon}
          <input
            className={variant}
            style={styles}
            type={type}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            onBlur={onBlur}
            minLength={minLength}
          />
        </div>
      )}
      {emptyErr && <p className="error">{errorMessage}</p>}
      {error && <p className="error">{error}</p>}
    </label>
  );
}
