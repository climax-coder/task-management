import React from "react"
import { IconButtonProps } from "../../constants/types"
import { ButtonStyle } from "../../constants/styles"
import cx from "clsx"

const IconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <button className={cx(ButtonStyle.IconButton)} onClick={props.handleClick}>
      {props.children}
      {props.varient}
    </button>
  )
}

export default IconButton
