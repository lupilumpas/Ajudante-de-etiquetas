const input1 = document.getElementById("img1");
const input2 = document.getElementById("img2");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const botao = document.getElementById("baixar");
const rotacao1 = -90;
const rotacao2 = -90;
const teste = 3;

// Tamanho da folha A4 (300 DPI)
canvas.width = 2480;
canvas.height = 3508;

// Tamanho exibido na tela
canvas.style.maxHeight = "700px";

// Imagens
let imagem1 = null;
let imagem2 = null;

// ================================
// CONFIGURAÇÕES
// ================================

const etiquetas = {
    Buslog: {

corte1: {
    esquerda: 33 + 3,
    cima: 23,
    direita: 860 + 68,
    baixo: 1325
},

corte2: {
    esquerda: 26,
    cima: 29,
    direita: 26,
    baixo: 429 + 32
},

// IMAGEM 1
pos1: {
    x: 0,
    y: 0,
    largura: 2480,
    altura: 1183
},

// IMAGEM 2
pos2: {
    x: 0,
    y: 1184,
    largura: 2480,
    altura: 2325
},
    },
//------------------------------------------------------------------------------------------------------------------
Jad: {

corte1: {
    esquerda: 33 + 3,
    cima: 23 + 45,
    direita: 860 + 68,
    baixo: 1325
},

corte2: {
    esquerda: 26,
    cima: 29,
    direita: 26,
    baixo: 429 + 32
},

// IMAGEM 1
pos1: {
    x: 0,
    y: 0,
    largura: 2480,
    altura: 1183
},

// IMAGEM 2
pos2: {
    x: 0,
    y: 1184,
    largura: 2480,
    altura: 2325
},
    },
//------------------------------------------------------------------------------------------------------------------
ML: {

corte1: {
    esquerda: 85,
    cima: 79,
    direita: 1660,
    baixo: 94
},

corte2: {
    esquerda: 26,
    cima: 29,
    direita: 26,
    baixo: 429 + 32
},

// IMAGEM 1
pos1: {
    x: 0,
    y: 0,
    largura: 2480,
    altura: 1183
    //largura: 1700,
},

// IMAGEM 2
pos2: {
    x: 0,
    y: 1184,
    largura: 2480,
    altura: 2325
},
        },

//------------------------------------------------------------------------------------------------------------------
    Shoppe: {

corte1: {
    esquerda: 0,
    cima: 2,
    direita: 880,
    baixo: 1305
},

corte2: {
    esquerda: 26,
    cima: 29,
    direita: 26,
    baixo: 429 + 32
},

// IMAGEM 1
pos1: {
    x: 0,
    y: -15,
    largura: 2480,
    altura: 1183
},

// IMAGEM 2
pos2: {
    x: 0,
    y: 1184,
    largura: 2480,
    altura: 2325
},
        },
            Optimus: {

corte1: {
    esquerda: 25,
    cima: 38,
    direita: 860 + 57,
    baixo: 1428
},

corte2: {
    esquerda: 26,
    cima: 29,
    direita: 26,
    baixo: 429 + 32
},

// IMAGEM 1
pos1: {
    x: 0,
    y: 0,
    largura: 2480,
    altura: 1183
},

// IMAGEM 2
pos2: {
    x: 0,
    y: 1184,
    largura: 2480,
    altura: 2325
},
        },
    };
//------------------------------------------------------------------------------------------------------------------
let etiquetaAtual = etiquetas.Buslog;
let corte1 = etiquetaAtual.corte1;
let corte2 = etiquetaAtual.corte2;
let pos1 = etiquetaAtual.pos1;
let pos2 = etiquetaAtual.pos2;
// ================================

input1.addEventListener("change", carregarImagem1);
input2.addEventListener("change", carregarImagem2);

async function carregarImagem1(e){

    const arquivo = e.target.files[0];

    if(!arquivo) return;


    const arrayBuffer = await arquivo.arrayBuffer();


    const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer
    }).promise;


    const pagina = await pdf.getPage(1);


    const viewport = pagina.getViewport({
        scale: teste
    });


    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");


    tempCanvas.width = viewport.width;
    tempCanvas.height = viewport.height;


    await pagina.render({
        canvasContext: tempCtx,
        viewport: viewport
    }).promise;


    imagem1 = new Image();


    imagem1.onload = function(){

        console.log("Imagem 1:", imagem1.width, imagem1.height);

        atualizarCanvas();

    };


    imagem1.src = tempCanvas.toDataURL("image/png");

}

async function carregarImagem2(e){

    const arquivo = e.target.files[0];

    if(!arquivo) return;


    const arrayBuffer = await arquivo.arrayBuffer();


    const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer
    }).promise;


    const pagina = await pdf.getPage(1);


    const viewport = pagina.getViewport({
        scale: teste
    });


    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");


    tempCanvas.width = viewport.width;
    tempCanvas.height = viewport.height;


    await pagina.render({
        canvasContext: tempCtx,
        viewport: viewport
    }).promise;


    imagem2 = new Image();


    imagem2.onload = function(){

        console.log("Imagem 2:", imagem2.width, imagem2.height);

        atualizarCanvas();

    };


    imagem2.src = tempCanvas.toDataURL("image/png");

}

function atualizarCanvas(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(imagem1){

        ctx.save();

ctx.translate(
    pos1.x + pos1.largura / 2,
    pos1.y + pos1.altura / 2
);

ctx.rotate(rotacao1 * Math.PI / 180);

ctx.drawImage(

    imagem1,

    corte1.esquerda,
    corte1.cima,

    imagem1.width - corte1.esquerda - corte1.direita,
    imagem1.height - corte1.cima - corte1.baixo,

    -(
    rotacao1 % 180 === 0 ? pos1.largura : pos1.altura
) / 2,

-(
    rotacao1 % 180 === 0 ? pos1.altura : pos1.largura
) / 2,

rotacao1 % 180 === 0 ? pos1.largura : pos1.altura,

rotacao1 % 180 === 0 ? pos1.altura : pos1.largura

);

ctx.restore();

    }

    if(imagem2){

        ctx.save();

ctx.translate(
    pos2.x + pos2.largura / 2,
    pos2.y + pos2.altura / 2
);

ctx.rotate(rotacao2 * Math.PI / 180);

ctx.drawImage(

    imagem2,

    corte2.esquerda,
    corte2.cima,

    imagem2.width - corte2.esquerda - corte2.direita,
    imagem2.height - corte2.cima - corte2.baixo,

    -(
    rotacao2 % 180 === 0 ? pos2.largura : pos2.altura
) / 2,

-(
    rotacao2 % 180 === 0 ? pos2.altura : pos2.largura
) / 2,

rotacao2 % 180 === 0 ? pos2.largura : pos2.altura,

rotacao2 % 180 === 0 ? pos2.altura : pos2.largura

);

ctx.restore();

    }

    if(imagem1 && imagem2){

        botao.disabled = false;

    }

}

botao.addEventListener("click", () => {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [2480, 3508]
    });

    const imagem = canvas.toDataURL("image/png");

    pdf.addImage(imagem, "PNG", 0, 0, 2480, 3508);

    pdf.save("impressão.pdf");

});

function trocarEtiqueta(){

    etiquetaAtual = etiquetas[document.getElementById("etiqueta").value];

    corte1 = etiquetaAtual.corte1;
    corte2 = etiquetaAtual.corte2;
    pos1 = etiquetaAtual.pos1;
    pos2 = etiquetaAtual.pos2;

    atualizarCanvas();

}