    var c = 1;
	var debut =0;
    var reco=0;
	const couleurFond="white";
	const couleurBord="black";
    const couleurNourri="black"
	var couleurSerpent="lightgreen";
	const couleurBordSerpent="black";
    var bug ;
    var score =0;
    var boy =document.getElementById("boy");
    var ctxb = boy.getContext('2d');
	var canv = document.getElementById("mon_canvas");
	var ctx = canv.getContext('2d');
    var tab =document.getElementById("tabScore");
    var ctxTab=tab.getContext('2d');
    var hard=document.getElementById('hardMode');
    var cHard=hard.getContext('2d');


    var gameboy = new Image();
    gameboy.src="gameboy.png";



	ctx.fillStyle = couleurFond;     
    ctx.strokestyle = couleurBord;
    ctx.fillRect(0, 0, canv.width, canv.height);
    ctx.strokeRect(0, 0, canv.width, canv.height);

    ctxTab.fillStyle = "white";
    ctxTab.fillRect(0,0,tab.width,tab.height)

    cHard.fillStyle="white";
    cHard.fillRect(0,0,hard.width,hard.height);



    var serpent =
    [
    {x:180,y:144},
    {x:168,y:144},
    {x:156,y:144},
    {x:144,y:144},
    {x:132,y:144},
    {x:120,y:144},
    {x:108,y:144}
	 ]

	var vitesse =120;
    var vx =12;
    var vy =0;
    
    document.addEventListener("keydown", controleur);

    function corpDuSerpent(partieDuSerpent)
    {
    ctx.fillStyle = couleurSerpent;
    ctx.strokestyle = couleurBordSerpent;

    ctx.fillRect(partieDuSerpent.x,partieDuSerpent.y,12,12);
    ctx.strokeRect(partieDuSerpent.x,partieDuSerpent.y,12,12);
    }

    function dessiner()
    {
    serpent.forEach(corpDuSerpent);
    }

    function nettoyer()
    {
    ctx.fillStyle="white";
    ctx.strokestyle="black";	
    ctx.fillRect(0, 0, canv.width, canv.height);
    ctx.strokeRect(0, 0, canv.width, canv.height);
    }

    function mouvement()
    {
    var tete = {x:serpent[0].x + vx, y:serpent[0].y + vy};
    var mange = serpent[0].x==foodX && serpent[0].y==foodY;
    serpent.unshift(tete);
    if(mange)
    {
    Cnourriture();
    score++;
    }
    else
    {
    serpent.pop();
    }
    }


    function go()
    {
    	debut = 1;
        reco = 1;
        SAD();
    }

    function avancer()
    {
    	if (GameOver()) 
        {
            vitesse = 120;
            return;
        }

	    setTimeout(function enchainement()
	    {
            bug = 0;
	    	if(score==10)
            {
                MAHM();
                vitesse=50;
            }
			dessiner();
            couleurManager();
            scoreManagement();
            Dhard();
			if(debut!=0)
			{
				nettoyer();     
		    	mouvement();
		    	dessiner();
                dessinerN();
			}
			avancer();
		    
	    },vitesse
        )
    }

    function Recommencer()
    {
        vx = 12;
        vy = 0;
        score = 0;
        debut=0;
        vitesse = 120;
        GameOver();
        MAHE();
        serpent =
        [
        {x:180,y:144},
        {x:168,y:144},
        {x:156,y:144},
        {x:144,y:144},
        {x:132,y:144},
        {x:120,y:144},
        {x:108,y:144}
        ]

        scoreManagement();

        if(reco==1)
        {
        nettoyer();
        avancer();
        }              
    }

    function controleur(event)
    {
    const flecheHaut = 38;
    const flecheBas = 40;
    const flecheGauche = 37;
    const flecheDroite = 39;
    const flecheTouche = event.keyCode;
    const allerHaut = vy === -12;
    const allerBas = vy === 12;
    const allerGauche = vx === -12;
    const allerDroite = vx === 12;

//pour pas pouvoir changer de direction 2 fois en moins de 100 ms
    if(bug==1)
    return;

    bug = 1;

    if(flecheTouche === flecheHaut && !allerBas)
    {
    vy = -12;
    vx = 0;
    }

    if(flecheTouche === flecheBas && !allerHaut)
    {
    vy = 12;
    vx = 0;
	}

	if(flecheTouche === flecheGauche && !allerDroite)
	{
	vy = 0;
	vx = -12;
	}

	if(flecheTouche === flecheDroite && !allerGauche)
	{
	vy = 0;
	vx = 12;
	}

	}

	function GameOver ()
	{
	for (var i =4 ; i<serpent.length ; i++)
	{
	var collision = serpent[i].x===serpent[0].x && serpent[i].y===serpent[0].y
	if(collision)
	{
	return true ;
	}
	}

    
    for (var j =0;j<serpent.length;j++)
    {
	var hitLeftWall = serpent[j].x < 0;
    var hitRightWall = serpent[j].x > canv.width - 12 ;
    var hitToptWall = serpent[j].y < 0;
    var hitBottomWall = serpent[j].y > canv.height - 12 ;
    
    if(hitLeftWall)
    {
    return true;
    }
    if(hitRightWall)
    {
    return true;
    }
    if(hitToptWall)
    {
    return true  ;
    }
    if(hitBottomWall)
    {
    return true;
    }
    }
    }
	
    function changerC()
    {
        switch(c)
        {
            case 0:
                couleurSerpent = "lightgreen";
                break;

            case 1:
                couleurSerpent = "red";
                break;

            case 2:
                couleurSerpent = "black";
                break;

            case 3:
                couleurSerpent = "blue";
                break;

            case 4:
                couleurSerpent = "purple";
                break;

            case 5:
                couleurSerpent = "yellow";
                break;

            case 6:
                couleurSerpent = "pink";
                break;

            case 7:
                couleurSerpent = "brown";
                break;
        }
        
    }

    function couleurManager ()
    {
        if (c==8)
        {
            c=0;
        }
        if (c==-1)
        {
            c=7;
        }
        changerC();
    }

    function Cplus()
    {
        c = c+1;
    }

    function Cmoins()
    {
        c = c-1;
    }

    function Lconsole()
    {
        document.getElementById('div1').classList.remove('versLeBas');
        document.getElementById('div1').classList.add('animation');
        Recommencer(); 
    }

    function enlever()
    {
        document.getElementById('div1').classList.remove('animation');
        document.getElementById('div1').classList.add('versLeBas');
        SAG();
    }

    function SAG()
    {
        document.getElementById('tabScore').classList.remove('scoreAnimd');
        document.getElementById('tabScore').classList.add('scoreAnimg');
    }

    function SAD()
    {    
        document.getElementById('tabScore').classList.remove('scoreAnimg');
        document.getElementById('tabScore').classList.add('scoreAnimd');
    }

    function random(nmbCase)
    {
        return (Math.round(Math.random()*(10^100000000))%nmbCase);
    }

    function Cnourriture ()
    {
        foodX =((random(23)+1)*12)-12;
        foodY =((random(23)+1)*12)-12;
        
        serpent.forEach(function verification(partie){
            var erreur = partie.x==foodX && partie.y==foodY;

            if (erreur)
            {
                Cnourriture();
            }
            
        })
    }

    function dessinerN()
    {
        ctx.fillStyle="black";
        ctx.strokestyle="black";
        ctx.fillRect(foodX,foodY,12,12);
        ctx.strokeRect(foodX,foodY,12,12);
    }
    
    function Dscore()
    {
    ctxTab.font = "50px Arial";
    ctxTab.fillStyle = "#0095DD";
    if (score<10)
    ctxTab.fillText(score, 13, 43);
    else
    ctxTab.fillText(score, -2, 43);

    }

    function Dhard()
    {
    cHard.font = "30px Arial";
    cHard.fillStyle = "red";
    cHard.fillText("Hard mode", 40, 23);
    }
    
    function Nscore()
    {
        ctxTab.fillStyle="white";
        ctxTab.fillRect(0,0,tab.width,tab.height);
    }

    function scoreManagement()
    {
        Nscore();
        Dscore();
    }
    function MAHM()
    {
        document.getElementById('hardMode').classList.add('mah');
    }

    function MAHE()
    {
         document.getElementById('hardMode').classList.remove('mah');
    }
    
	avancer();
    Cnourriture();


    
 	