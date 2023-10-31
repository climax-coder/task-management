import React from "react"
import { ButtonStyle } from "../../constants/styles"
import cx from "clsx"

const PrimaryButton: React.FC<any> = (props) => {
  return (
    <button className={cx(ButtonStyle.PrimaryButton)} onClick={props.handleAdd}>
      {props.varient}
    </button>
  )
}

export default PrimaryButton
