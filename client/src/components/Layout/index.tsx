import React from "react"
import { LayoutStyle } from "../../constants/styles"
import cx from "clsx"

const LayoutComponent: React.FC<any> = ({ children }) => {
  return <div className={cx(LayoutStyle.container)}>{children}</div>
}

export default LayoutComponent
