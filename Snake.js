    var c = 1;
	var debut =0;
	const couleurFond="white";
	const couleurBord="black";
    const couleurNourri="red"
	var couleurSerpent="lightgreen";
	const couleurBordSerpent="black";

    var boy =document.getElementById("boy");
    var ctxb = boy.getContext('2d');
	var canv = document.getElementById("mon_canvas");
	var ctx = canv.getContext('2d');

    var gameboy = new Image();
    gameboy.src="gameboy.png";



	ctx.fillStyle = couleurFond;     
    ctx.strokestyle = couleurBord;
    ctx.fillRect(0, 0, canv.width, canv.height);
    ctx.strokeRect(0, 0, canv.width, canv.height);

    var serpent =
    [
    {x:162,y:138},
    {x:150,y:138},
    {x:138,y:138},
    {x:126,y:138},
    {x:114,y:138}
	 ]

	var vitesse =100;
    var vx =0;
    var vy =12;
    
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
    const tete = {x:serpent[0].x + vx, y:serpent[0].y + vy};
    serpent.unshift(tete);
    serpent.pop();
    }


    function go()
    {
    	debut = 1;
    	console.log("s:t");
    }

    function avancer()
    {
    	if (GameOver()) return;
	    setTimeout(function enchainement()
	    {
	    	
			dessiner();
			

			if(debut!=0)
			{
				nettoyer();     
		    	mouvement();
		    	dessiner();

			}
			avancer();
		    
	    },vitesse)
    }

    function controleur(event)
    {
    const flecheHaut = 38;
    const flecheBas = 40;
    const flecheGauche = 37;
    const flecheDroite = 39;
    const flecheTouche = event.keyCode;
    const allerHaut = vy === -12;
    const allerBas = vy === +12;
    const allerGauche = vx === -12;
    const allerDroite = vx === 12;

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
	const collision = serpent[i].x===serpent[0].x && serpent[i].y===serpent[0].y
	if(collision)
	{
	return true 
	}
	}
	const hitLeftWall = serpent[0].x < 0;
    const hitRightWall = serpent[0].x > canv.width ;
    const hitToptWall = serpent[0].y < 0;
    const hitBottomWall = serpent[0].y > canv.height ;

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

    function changerC()
    {
        switch(c)
        {
            case 0:
                couleurSerpent = "lightgreen";
                c++;
                break;
            case 1:
                couleurSerpent = "red";
                c++;
                break;

            case 2:
                couleurSerpent = "black";
                c++;
                break;

            case 3:
                couleurSerpent = "blue";
                c++;
                break;

            case 4:
                couleurSerpent = "purple";
                c++;
                break;

            case 5:
                couleurSerpent = "yellow";
                c++;
                break;

            case 6:
                couleurSerpent = "pink";
                c++;
                break;

            case 7:
                couleurSerpent = "brown";
                c++;
                break;

        }

        if(c==7)
        {
            c=0;
        }
        
    }

	avancer();
 	
