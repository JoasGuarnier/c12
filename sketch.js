var fundo, fundoImg1, fundoImg2;
var botao, botaoImg;
var fundo, fundoImg1, fundoImg2, fundoImg3
var botao, botaoImg;
var coe, coeImg;
var macaImg, folhaImg, flarImg, obj;
var estado = "inicio";
var objetos; 
var num = 0;
var chaoInv;
var velocidade = 10;
var musica;

function preload(){
  fundoImg1 = loadImage("fundo1.jpg");
  fundoImg2 = loadImage("garden.png");
  coeImg = loadImage("rabbit.png");
  macaImg = loadImage("apple.png");
  folhaImg = loadImage("leaf.png");
  flarImg = loadImage("orangeLeaf.png");
  botaoImg = loadImage("botao.png");
  fundoImg3 = loadImage("yl.png");
  musica = loadSound("som-de-rio-e-passaros-da-floresta.mp3")
}

function setup(){
  musica.setVolume(0.1)
  musica.loop();
  
  // fundo
  createCanvas(400,400);
  fundo = createSprite(200,200,400,400);
  fundo.addImage(fundoImg1); 
  fundo.scale = 0.7;

  // coelho
  coe = createSprite(200,340,50,50);
  coe.addImage(coeImg);
  coe.scale = 0.08  ;
  coe.visible = false;

  // botao
  botao = createSprite(200,200,80,40);
  botao.addImage(botaoImg);
  botao.scale = 0.2;

  chaoInv = createSprite(200,420,400,20)

  objetos = createGroup();
}

function draw(){
  background(0);
  if(mouseIsOver(botao)){
    botao.scale = 0.4;
  } else {
    botao.scale = 0.2;
  }
  
  if(mousePressedOver(botao)){
    estado = "jogo";
    fundo.addImage(fundoImg2);
    fundo.scale = 0.95;
    botao.visible = false;
    botao.x = 1000;
    coe.visible = true; 
  }

  drawSprites();
  if(estado == "jogo"){
  textFont("Times New Roman");
  textSize(30)
  fill("#aa1a00")
  text("pontos: " + num, 100, 100);
  gerarFolhas();
  }

  moveCoelho();
  fimDeJogo();
}

function moveCoelho(){
  coe.x = mouseX
}

function gerarFolhas(){
 if(frameCount % 80 == 0){
   obj = createSprite(Math.round(random(10, 390)), -30, 20, 20);
   obj.velocityY = velocidade;
   objetos.add(obj)
   obj.scale = 0.06;
   obj.lifetime = 70;
   var opcao = Math.round(random(50,52));
   switch(opcao){
     case 50 : obj.addImage(macaImg);
     break;
     case 51 : obj.addImage(folhaImg);
     break;
     case 52 : obj.addImage(flarImg);
     break;
     default:break;
   } 
  velocidade++;
 }
}

function fimDeJogo(){
  if(coe.isTouching(objetos)){
    num++;
    objetos.destroyEach();
  }

  if(objetos.isTouching(chaoInv)){
    estado = "fim"
  }

  if(estado == "fim"){
    coe.visible = false;
    fundo.addImage(fundoImg3)  
  }  
}