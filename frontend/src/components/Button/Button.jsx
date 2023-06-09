import "./Button.css"

const   Button = (props) => {
  return (
    <button {...props} className={`button`}>{props.children}</button>
  )
}

export default Button