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
import salpiconhelado from "../assets/imgs/main_products_imgs/salpiconhelado.png";
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
import sabortropical from "../assets/imgs/main_products_imgs/sabortropical.png";
import superconcha from "../assets/imgs/main_products_imgs/superconcha.png";
import bahia from "../assets/imgs/main_products_imgs/bahia.png";
import miniwafer from "../assets/imgs/main_products_imgs/miniwafer.png";
import melocotonfresascrema from "../assets/imgs/main_products_imgs/melocotonfresascrema.png";
import dalmata from "../assets/imgs/main_products_imgs/dalmata.png";
import golochips from "../assets/imgs/main_products_imgs/golochips.png";
import milofrio from "../assets/imgs/main_products_imgs/milofrio.png";
import cervezamichelada from "../assets/imgs/main_products_imgs/cervezamichelada.png";
import sodalimon from "../assets/imgs/main_products_imgs/sodalimon.png";
import jugomangoleche from "../assets/imgs/main_products_imgs/jugomangoleche.png";
// dos veces c/u ya es uno es en leche y el otro en agua
import jugoguanabana from "../assets/imgs/main_products_imgs/jugoguanabana.png";
import jugomangoagua from "../assets/imgs/main_products_imgs/jugomangoagua.png";
import jugoluloagua from "../assets/imgs/main_products_imgs/jugoluloagua.png";
import jugoluloleche from "../assets/imgs/main_products_imgs/jugoluloleche.png";
import jugomaracuyaagua from "../assets/imgs/main_products_imgs/jugomaracuyaagua.png";
import jugomaracuyaleche from "../assets/imgs/main_products_imgs/jugomaracuyaleche.png";
import jugomoraleche from "../assets/imgs/main_products_imgs/jugomoraleche.png";

const ProductImgBuilder = (imgName) => {
	let returnImg;
	switch (imgName) {
		case "jugo de mora en agua":
			returnImg = jugomoraleche;
			break;
		case "jugo de mora en leche":
			returnImg = jugomoraleche;
			break;
		case "jugo de maracuya en leche":
			returnImg = jugomaracuyaleche;
			break;
		case "jugo de maracuya en agua":
			returnImg = jugomaracuyaagua;
			break;
		case "jugo de lulo en leche":
			returnImg = jugoluloleche;
			break;
		case "jugo de lulo en agua":
			returnImg = jugoluloagua;
			break;
		case "jugo de borojó en leche":
			returnImg = logo;
			break;
		case "jugo de borojó en agua":
			returnImg = logo;
			break;
		case "jugo de guanabana en leche":
			returnImg = jugoguanabana;
			break;
		case "jugo de guanabana en agua":
			returnImg = jugoguanabana;
			break;
		case "jugo de mango en leche":
			returnImg = jugomangoleche;
			break;
		case "jugo de mango en agua":
			returnImg = jugomangoagua;
			break;
		case "refrescante limón soda":
			returnImg = sodalimon;
			break;
		case "cerveza michelada":
			returnImg = cervezamichelada;
			break;
		case "milo frio":
			returnImg = milofrio;
			break;
		case "golochips":
			returnImg = golochips;
			break;
		case "dalmata":
			returnImg = dalmata;
			break;
		case "melocoton y fresas con crema":
			returnImg = melocotonfresascrema;
			break;
		case "mini wafer":
			returnImg = miniwafer;
			break;
		case "bahia":
			returnImg = bahia;
			break;
		case "superconcha":
			returnImg = superconcha;
			break;
		case "sabor tropical":
			returnImg = sabortropical;
			break;
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
		case "delicias de fresas":
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
		case "waffle explosión":
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
			case "salpicon con helado":
			returnImg = salpiconhelado;
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
		case "malteada sensacion":
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
};

export default ProductImgBuilder;
