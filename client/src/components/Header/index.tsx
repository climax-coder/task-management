import logo from "../../assets/tryhackme_logo_full.png"
import cx from "clsx"
import { HeaderStyle } from "../../constants/styles"

const HeaderComponent = () => {
  return (
    <div className={cx(HeaderStyle.container)}>
      <img src={logo} alt="logo" className="w-24 h-12" />
    </div>
  )
}

export default HeaderComponent
