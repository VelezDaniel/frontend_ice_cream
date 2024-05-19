import logo from "../assets/imgs/helarticologo2.png";
import irlandes from "../assets/imgs/main_products_imgs/irlandes.png";
import aldea from "../assets/imgs/main_products_imgs/aldea.png";
import alpinito from "../assets/imgs/main_products_imgs/alpinito.png";
import andino from "../assets/imgs/main_products_imgs/andino.png";
import azucarada from "../assets/imgs/main_products_imgs/azucarada.png";
import chocoplacer from "../assets/imgs/main_products_imgs/chocoplacer.png";
import bananaespecial from "../assets/imgs/main_products_imgs/bananaespecial.png";
import cocoa from "../assets/imgs/main_products_imgs/cocoa.png";
import cholaocaleño from "../assets/imgs/main_products_imgs/cholaocaleño.png";
import copaminichips from "../assets/imgs/main_products_imgs/copaminichips.png";
import cremosa from "../assets/imgs/main_products_imgs/cremosa.png";
import dandy from "../assets/imgs/main_products_imgs/dandy.png";
import deliciafresas from "../assets/imgs/main_products_imgs/deliciafresas.png";
import deliciamoras from "../assets/imgs/main_products_imgs/deliciamoras.png";
import donjuan from "../assets/imgs/main_products_imgs/donjuan.png";
import dulcetentacion from "../assets/imgs/main_products_imgs/dulcetentacion.png";
import encantocerezas from "../assets/imgs/main_products_imgs/encantocerezas.png";
import exotica from "../assets/imgs/main_products_imgs/exotica.png";
import fantasia from "../assets/imgs/main_products_imgs/fantasia.png";
import gusanito from "../assets/imgs/main_products_imgs/gusanito.png";
import helartico from "../assets/imgs/main_products_imgs/helartico.png";
import himalaya from "../assets/imgs/main_products_imgs/himalaya.png";
import ilusion from "../assets/imgs/main_products_imgs/ilusion.png";
import imperial from "../assets/imgs/main_products_imgs/imperial.png";
import light from "../assets/imgs/main_products_imgs/light.png";
import malteadatropical from "../assets/imgs/main_products_imgs/malteadatropical.png";
import malteadasensacion from "../assets/imgs/main_products_imgs/malteadasensacion.png";
import maracupiña from "../assets/imgs/main_products_imgs/maracupiña.png";
import maxiqueso from "../assets/imgs/main_products_imgs/maxiqueso.png";
import megasplit from "../assets/imgs/main_products_imgs/megasplit.png";
import mixta from "../assets/imgs/main_products_imgs/mixta.png";
import nevadobrevas from "../assets/imgs/main_products_imgs/nevadobrevas.png";
import obsesionchocolate from "../assets/imgs/main_products_imgs/obsesionchocolate.png";
import osito from "../assets/imgs/main_products_imgs/osito.png";
import payasito from "../assets/imgs/main_products_imgs/payasito.png";
import primavera from "../assets/imgs/main_products_imgs/primavera.png";
import salpiconespecial from "../assets/imgs/main_products_imgs/salpiconespecial.png";
import siropedebrownie from "../assets/imgs/main_products_imgs/siropedebrownie.png";
import suspiro from "../assets/imgs/main_products_imgs/suspiro.png";
import tentacionoreo from "../assets/imgs/main_products_imgs/tentacionoreo.png";
import troncopasion from "../assets/imgs/main_products_imgs/troncopasion.png";
import wafleespecial from "../assets/imgs/main_products_imgs/wafleespecial.png";
import wafleexplosion from "../assets/imgs/main_products_imgs/wafleexplosion.png";
import waflemariposa from "../assets/imgs/main_products_imgs/waflemariposa.png";
import waflesencillo from "../assets/imgs/main_products_imgs/waflesencillo.png";
import waflesentimientomora from "../assets/imgs/main_products_imgs/waflesentimientomora.png";
import wafletradicional from "../assets/imgs/main_products_imgs/wafletradicional.png";

const ProductImgBuilder = (imgName) => {
  let returnImg;
  switch (imgName) {
		case "himalaya":
			returnImg = himalaya;
			break;
		case "helartico":
			returnImg = helartico;
			break;
		case "irlandés":
			returnImg = irlandes;
			break;
		case "primavera":
			returnImg = primavera;
			break;
		case "la aldea":
			returnImg = aldea;
			break;
		case "andino":
			returnImg = andino;
			break;
		case "light":
			returnImg = light;
			break;
		case "azucarada":
			returnImg = azucarada;
			break;
		case "delicias de fresa":
			returnImg = deliciafresas;
			break;
		case "don juan":
			returnImg = donjuan;
			break;
		case "waffle especial":
			returnImg = wafleespecial;
			break;
		case "waffle tradicional":
			returnImg = wafletradicional;
			break;
		case "waffle sencillo":
			returnImg = waflesencillo;
			break;
		case "waffle mariposa":
			returnImg = waflemariposa;
			break;
		case "waffle explosion":
			returnImg = wafleexplosion;
			break;
		case "waffle sentimiento de mora":
			returnImg = waflesentimientomora;
			break;
		case "exótica":
			returnImg = exotica;
			break;
		case "nevado de brevas":
			returnImg = nevadobrevas;
			break;
		case "encanto de cereza":
			returnImg = encantocerezas;
			break;
		case "maxiqueso":
			returnImg = maxiqueso;
			break;
		case "la cremosa":
			returnImg = cremosa;
			break;
		case "tronco de pasión":
			returnImg = troncopasion;
			break;
		case "mixta":
			returnImg = mixta;
			break;
		case "imperial":
			returnImg = imperial;
			break;
		case "maracupiña":
			returnImg = maracupiña;
			break;
		case "delicias de mora":
			returnImg = deliciamoras;
			break;
		case "cocoa":
			returnImg = cocoa;
			break;
		case "tentación de oreo":
			returnImg = tentacionoreo;
			break;
		case "banana especial":
			returnImg = bananaespecial;
			break;
		case "mega split":
			returnImg = megasplit;
			break;
		case "salpicon especial":
			returnImg = salpiconespecial;
			break;
		case "malteada tropical":
			returnImg = malteadatropical;
			break;
		case "dulce tentación":
			returnImg = dulcetentacion;
			break;
		case "copa minichips":
			returnImg = copaminichips;
			break;
		case "suspiro":
			returnImg = suspiro;
			break;
		case "sirope de brownie":
			returnImg = siropedebrownie;
			break;
		case "gusanito":
			returnImg = gusanito;
			break;
		case "alpinito":
			returnImg = alpinito;
			break;
		case "payasito":
			returnImg = payasito;
			break;
		case "osito":
			returnImg = osito;
			break;
		case "malteada sensación":
			returnImg = malteadasensacion;
			break;
		case "cholao caleño":
			returnImg = cholaocaleño;
			break;
		case "chocoplacer":
			returnImg = chocoplacer;
			break;
		case "dandy":
			returnImg = dandy;
			break;
		case "ilusión":
			returnImg = ilusion;
			break;
		case "obsesión de chocolate":
			returnImg = obsesionchocolate;
			break;
		case "fantasía":
			returnImg = fantasia;
			break;
		default:
			returnImg = logo;
	}
	return returnImg;
}

export default ProductImgBuilder