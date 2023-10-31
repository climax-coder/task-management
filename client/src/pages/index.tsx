import LayoutComponent from "../components/Layout"
import HeaderComponent from "../components/Header"
import MainComponent from "../components/Main"

const HomePage = () => {
  return (
    <LayoutComponent>
      <HeaderComponent />
      <MainComponent />
    </LayoutComponent>
  )
}

export default HomePage
