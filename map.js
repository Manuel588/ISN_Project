var canvMap = document.getElementById("jeux");
var ctxMap = canvMap.getContext("2d");

var map1Ouverte =
[
1,2,5,5,35,79,34,5,5,3,4,
10,11,14,14,44,79,43,14,14,12,13,
26,20,74,74,53,47,52,74,74,21,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,33,25,
26,36,47,47,47,47,47,47,47,33,25,
28,29,32,32,32,32,32,32,32,30,31
];



var image =new Image();
image.src ="ISN PROJECT.png";

window.onload = function()
{
	dessinerMap(11,11,map1Ouverte);
	
}

function dessinerMap (nombreCasex,nombreCasey,map)
{
	for (let yMap=0;yMap<nombreCasey;yMap++)
	{
		for(let xMap=0;xMap<nombreCasex;xMap++)
		{
			let numero = (map1Ouverte[((yMap*11)+xMap)]-1);
			let sx =(numero%9)*32;
			let sy =(Math.trunc(numero/9))*32;

			ctxMap.drawImage(image,sx,sy,32,32,xMap*48,yMap*48,48,48); 
			ctxMap.imageSmoothingEnabled = false;
		}
	}
}