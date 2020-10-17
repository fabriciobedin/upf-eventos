// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');


// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
const storage  = require('firebase-admin');
admin.initializeApp();

exports.addParticipante = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const nome = req.query.nome;
  const email = req.query.email;
  const eventoId = req.query.eventoId;

  eventosRef = admin.firestore().collection('Eventos');


  dados = await eventosRef.doc(eventoId)
  .collection('Participantes')
  .add({"nome":nome,"email":email});
  
  res.json({"dado":'Participante adicionado com sucesso'})

});

exports.onCreateParticipante = functions.firestore
    .document('/Eventos/{eventoId}/Participantes/{participanteId}')
    .onCreate(async (snap, context) => {

      const eventoId = context.params.eventoId
      const participanteId = context.params.participanteId

      const participante = snap.data();
      participante.uuid = participanteId;

      console.log(participante);
      if(participante.email && participante.nome && participante.uuid)
      {
      evento = await buscarEvento(eventoId);
      evento.uuid = eventoId;
      console.log(evento)
      await enviarCracha(evento,participante)
      }

      return participante;
      // perform desired operations ...
    });

// Cloud Firestore under the path /messages/:documentId/original
async function enviarCracha(evento,participante)
{

  codigo = await criarPdf(participante,evento);

  functions.logger.log('Arquivo gerado, enviando email ');

  await sleep(3000);

  var nodemailer = require('nodemailer');
  var remetente = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'smtp.gmail.com',
    port: 465,
    secure: true, auth:{ user: 'eventosupf@gmail.com', pass:'upfeventos2k20'} });

    var emailASerEnviado = {
      from: 'eventosupf@gmail.com',
      to: participante.email,
      subject: 'Cracha para o evento - '+participante.nome,
      text: 'Olá '+participante.nome+' segue em anexo o crachá referente ao evento',
      attachments: [{'filename': 'Cracha.pdf', 'path': 'https://storage.googleapis.com/upf-eventos.appspot.com/'+codigo+'.pdf'}]
      };

       //res.json({result: `Email enviado com sucesso`});

       remetente.sendMail(emailASerEnviado, function(error){
         if (error) {
           res.json({result: `Erro ao enviar email. ${error}`});
         } else {
         res.json({result: `Email enviado com sucesso`});
       }
     });


  };

  async function criarPdf(participante,evento)
  {
    functions.logger.log('Criando Pdf para o participante '+participante.nome);
    functions.logger.log('Evento '+evento.uuid);

    const {Storage} = require('@google-cloud/storage');
    const storage = new Storage();
    const bucket = storage.bucket('upf-eventos.appspot.com');
    let codigo = evento.uuid+'|'+participante.uuid;
    const myPdfFile = bucket.file(codigo+'.pdf');

    var PDFDocument = require('pdfkit');
    doc = new PDFDocument();

    const stream = doc.pipe(myPdfFile.createWriteStream());

    //cria logo upf
    var logo = getLogoUpf();
    var buffer = new Buffer(logo, 'base64');
    doc.image(buffer, 10, 10, {height: 55});

    doc.fontSize(17).text(evento.descricao, 10, 70);
    doc.fontSize(12).text('Participante: ', 10, 90);
    doc.fontSize(17).text(participante.nome, 10, 110);

    // Criação e adição do QRCODE ao PDF
    qrcode = await createQrCode(codigo)
    var buffer = new Buffer(qrcode.split(',')[1] ||'', 'base64');
    doc.image(buffer, 10, 130, {height: 120});
    doc.fontSize(10).text(codigo, 10, 250);

    functions.logger.log('O cdigo é '+codigo);
    doc.end();
    return codigo;
  }

  exports.pdf = functions.https.onRequest(async (req, res) => {


    const {Storage} = require('@google-cloud/storage');
    const storage = new Storage();
    const bucket = storage.bucket('upf-eventos.appspot.com');
    const nome = 'upf-eventos.appspot.com';

    const myPdfFile = bucket.file('cracha.pdf'); //TODO: gerar nome de acordo com o participante

    var PDFDocument = require('pdfkit');
    var fs=require('fs');
    doc = new PDFDocument();



    const stream = doc.pipe(myPdfFile.createWriteStream());

    //cria logo upf
    var logo = getLogoUpf();
    var buffer = new Buffer(logo, 'base64');
    doc.image(buffer, 10, 10, {height: 55});

    doc.fontSize(17).text('Evento: Evento A', 10, 70); // TODO: Carregar dado do Participante
    doc.fontSize(17).text('Participante: Igor Oliveira Vilneck', 10, 90);

    //QRCODE
     qrcode = await createQrCode('teste')
     var buffer = new Buffer(qrcode.split(',')[1] ||'', 'base64');
     doc.image(buffer, 10, 110, {height: 120});

    doc.fontSize(12).text('EventoA|1huas8726491', 10, 250);
    doc.end();

    res.json({result: 'Sucesso ao gerar PDF'});



 });

 function getLogoUpf()
 {
   return "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";
 }

/* Função exposta para testar a criação do qr code*/
exports.generateQrCode = functions.https.onRequest(async (req, res) => {
  let qrcode;
  this.qrcode = await createQrCode('teste')

  res.json({result: this.qrcode});

  });

/* FUNÇÃO PARA CRIAR QR CODE DE ACORDO COM PARAMETRO PASSADO */
async function createQrCode(text)
{
  var QRCode = require('qrcode')
  return await QRCode.toDataURL(text,{type:'terminal'})
}

/* função para buscar dados de um participante */
async function buscarParticipante(participanteId)
{
  functions.logger.log('Buscando Participante '+participanteId);

  const promise = admin.firestore().doc('participantes/'+participanteId).get();

  let data = await promise.then(snapshot =>{
    const data = snapshot.data()
    return data;
  })
  return data;
}

exports.buscarParticipante = functions.https.onRequest(async (req, res) => {

  const participanteId = req.query.participanteId; // busca o parametro participanteId da url

  data = await buscarParticipante(participanteId);

  res.send(data);
});
/* função para buscar dados de um evento */
async function buscarEvento(eventoId)
{
  functions.logger.log('Buscando Evento '+eventoId);

  const promise = admin.firestore().doc('Eventos/'+eventoId).get();

  let data = await promise.then(snapshot =>{
    const data = snapshot.data()
    return data;
  })
  return data;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
