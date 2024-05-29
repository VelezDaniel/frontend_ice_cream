import logo from "../assets/imgs/helarticologo2.png";
// * ------------------------------------------
// ** COMPRESSED IMGS ** //
// * ----------------------------------------
import irlandes from "../assets/imgs/imgs_compressed/irlandes.png";
import aldea from "../assets/imgs/imgs_compressed/aldea.png";
import alpinito from "../assets/imgs/imgs_compressed/alpinito.png";
import andino from "../assets/imgs/imgs_compressed/andino.png";
import azucarada from "../assets/imgs/imgs_compressed/azucarada.png";
import chocoplacer from "../assets/imgs/imgs_compressed/chocoplacer.png";
import bananaespecial from "../assets/imgs/imgs_compressed/bananaespecial.png";
import cocoa from "../assets/imgs/imgs_compressed/cocoa.png";
import cholaocaleño from "../assets/imgs/imgs_compressed/cholaocaleño.png";
import copaminichips from "../assets/imgs/imgs_compressed/copaminichips.png";
import cremosa from "../assets/imgs/imgs_compressed/cremosa.png";
import dandy from "../assets/imgs/imgs_compressed/dandy.png";
import deliciafresas from "../assets/imgs/imgs_compressed/deliciafresas.png";
import deliciamoras from "../assets/imgs/imgs_compressed/deliciamoras.png";
import donjuan from "../assets/imgs/imgs_compressed/donjuan.png";
import dulcetentacion from "../assets/imgs/imgs_compressed/dulcetentacion.png";
import encantocerezas from "../assets/imgs/imgs_compressed/encantocerezas.png";
import exotica from "../assets/imgs/imgs_compressed/exotica.png";
import fantasia from "../assets/imgs/imgs_compressed/fantasia.png";
import gusanito from "../assets/imgs/imgs_compressed/gusanito.png";
import helartico from "../assets/imgs/imgs_compressed/helartico.png";
import himalaya from "../assets/imgs/imgs_compressed/himalaya.png";
import ilusion from "../assets/imgs/imgs_compressed/ilusion.png";
import imperial from "../assets/imgs/imgs_compressed/imperial.png";
import light from "../assets/imgs/imgs_compressed/light.png";
import malteadatropical from "../assets/imgs/imgs_compressed/malteadatropical.png";
import malteadasensacion from "../assets/imgs/imgs_compressed/malteadasensacion.png";
import maracupiña from "../assets/imgs/imgs_compressed/maracupiña.png";
import maxiqueso from "../assets/imgs/imgs_compressed/maxiqueso.png";
import megasplit from "../assets/imgs/imgs_compressed/megasplit.png";
import mixta from "../assets/imgs/imgs_compressed/mixta.png";
import nevadobrevas from "../assets/imgs/imgs_compressed/nevadobrevas.png";
import osito from "../assets/imgs/imgs_compressed/osito.png";
import obsesionchocolate from "../assets/imgs/imgs_compressed/obsesionchocolate.png";
import payasito from "../assets/imgs/imgs_compressed/payasito.png";
import primavera from "../assets/imgs/imgs_compressed/primavera.png";
import salpiconespecial from "../assets/imgs/imgs_compressed/salpiconespecial.png";
import salpiconhelado from "../assets/imgs/imgs_compressed/salpiconhelado.png";
import siropedebrownie from "../assets/imgs/imgs_compressed/siropedebrownie.png";
import suspiro from "../assets/imgs/imgs_compressed/suspiro.png";
import tentacionoreo from "../assets/imgs/imgs_compressed/tentacionoreo.png";
import troncopasion from "../assets/imgs/imgs_compressed/troncopasion.png";
import wafleespecial from "../assets/imgs/imgs_compressed/wafleespecial.png";
import wafleexplosion from "../assets/imgs/imgs_compressed/wafleexplosion.png";
import waflemariposa from "../assets/imgs/imgs_compressed/waflemariposa.png";
import waflesencillo from "../assets/imgs/imgs_compressed/waflesencillo.png";
import waflesentimientomora from "../assets/imgs/imgs_compressed/waflesentimientomora.png";
import wafletradicional from "../assets/imgs/imgs_compressed/wafletradicional.png";
import sabortropical from "../assets/imgs/imgs_compressed/sabortropical.png";
import superconcha from "../assets/imgs/imgs_compressed/superconcha.png";
import bahia from "../assets/imgs/imgs_compressed/bahia.png";
import miniwafer from "../assets/imgs/imgs_compressed/miniwafer.png";
import melocotonfresascrema from "../assets/imgs/imgs_compressed/melocotonfresascrema.png";
import dalmata from "../assets/imgs/imgs_compressed/dalmata.png";
import golochips from "../assets/imgs/imgs_compressed/golochips.png";
import milofrio from "../assets/imgs/imgs_compressed/milofrio.png";
import cervezamichelada from "../assets/imgs/imgs_compressed/cervezamichelada.png";
import sodalimon from "../assets/imgs/imgs_compressed/sodalimon.png";
import jugomangoleche from "../assets/imgs/imgs_compressed/jugomangoleche.png";
// dos veces c/u ya es uno es en leche y el otro en agua
import jugoguanabana from "../assets/imgs/imgs_compressed/jugoguanabana.png";
import jugomangoagua from "../assets/imgs/imgs_compressed/jugomangoagua.png";
import jugoluloagua from "../assets/imgs/imgs_compressed/jugoluloagua.png";
import jugoluloleche from "../assets/imgs/imgs_compressed/jugoluloleche.png";
import jugomaracuyaagua from "../assets/imgs/imgs_compressed/jugomaracuyaagua.png";
import jugomaracuyaleche from "../assets/imgs/imgs_compressed/jugomaracuyaleche.png";
import jugomoraleche from "../assets/imgs/imgs_compressed/jugomoraleche.png";

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
