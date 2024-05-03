import NavBar from "../components/navbar/NavBar";
import Banner from "../components/banner/banner";
import ComponentCarousel from "../components/carousel/Carousel";
import Footer from "../components/footer/Footer";

function HomePage() {
  return (
    <div>
      <NavBar/>
      <Banner/>
      <ComponentCarousel/>
      <Footer/>
    </div>
  )
}
export default HomePage;