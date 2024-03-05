import NavBar from "../components/navbar/NavBar";
import Banner from "../components/banner/banner";
import MainProducts from "../components/main_products/MainProducts";
import Footer from "../components/footer/Footer";

function HomePage() {

  return (
    <div>
      <NavBar/>
      <Banner/>
      <MainProducts/>
      <Footer/>
    </div>
  )
}

export default HomePage;