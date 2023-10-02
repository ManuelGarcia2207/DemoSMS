function doGet() {
  return HtmlService
      .createTemplateFromFile('Index')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle('Gestión de riesgos');
}

function entrar(formObject){
  var url = new Array();
  var type = formObject.type;
  url[0] = '';
  url[1] = type;
  url[2] = '';
  
  //entrar
  if(type == 'entra'){
    var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1hPC6uNVL_pjkaXV_kAv87etP6DunAJN2dvq0iEb7aUI/');
    var usr = ss.getSheetByName('Usuarios');
    var d1 = usr.getDataRange().getValues();
    
    for(a1 in d1){
      var z1 = d1[a1];
      if(z1[0] == formObject.user && z1[1] == formObject.pass){
        var d2 = ss.getSheetByName(z1[3]).getDataRange().getValues();
        for(a2 in d2){
          var z2 = d2[a2];
          url[0] += z2[0];
          
          url[2] = ''
          +'<h3>Hola, '+z1[2]+'</h3><input type="hidden" name="myname" id="myname" value="'+z1[2]+'">'
          +'<div class="cur" onclick="aux(),google.script.run.withSuccessHandler(oknuevas2).gnuevas(\'Inicio\');">Logout</div>'
          +'<input type="hidden" name="myuser" id="myuser" value="'+z1[0]+'">'
          +'<input type="hidden" name="qact" id="qact">'
        }
      }
    }
    
    if(url[0] == ''){
      var d2 = ss.getSheetByName('XUser').getDataRange().getValues();
      for(a2 in d2){
        var z2 = d2[a2];
        url[0] += z2[0];
      }
    }
    
  }//entrar
  

  //  Registros
  if(type == 'registro'){
    var ho = SpreadsheetApp.openById('1hPC6uNVL_pjkaXV_kAv87etP6DunAJN2dvq0iEb7aUI').getSheetByName('Registros');
    ho.appendRow([
      formObject.idRep, formObject.datRep, formObject.desc, formObject.area, formObject.hazard, formObject.Hcat,
      formObject.conse, formObject.fac, formObject.iniSev, formObject.iniProb, formObject.iniRis, formObject.alarp, formObject.control,
      formObject.impDat, formObject.resSevRA, formObject.resProb, formObject.resRR, formObject.SCRD, formObject.SCCEfe,
      formObject.SCRL, formObject.AERevDat,'','', formObject.user
    ]);
    
    url[0] = '<center><br><h1>Registro de insidencia enviado</h1></center>';
  }
//  Registros

  //  Registros Usuario
  if(type == 'registroUsr'){
    var ho = SpreadsheetApp.openById('1hPC6uNVL_pjkaXV_kAv87etP6DunAJN2dvq0iEb7aUI').getSheetByName('Registros');
    ho.appendRow([
      formObject.idRep, formObject.datRep, formObject.desc, formObject.area, formObject.hazard, formObject.Hcat,
      formObject.conse, formObject.fac, 'No asignado', '', '', '', '',
      '', '', '', '', '', '',
      '', '','','', formObject.user
    ]);
    
    url[0] = '<center><br><h1>Registro de insidencia enviado</h1></center>';
  }
//  Registros Usuario
  
  return url;
}

function tablaReg(){
  var url = new Array();
  var nReg = 0;
  url[0] = '';

  var ss = SpreadsheetApp.openById('1hPC6uNVL_pjkaXV_kAv87etP6DunAJN2dvq0iEb7aUI').getSheetByName('Registros').getDataRange().getValues();
  for(a1 in ss){
    var ind = ss[a1];
    if(ind[0] != 'Reporte ID'){
      url[0] += ''
      +'<tr>'
      +'<td>'
      +ind[0]
      +'</td>'
      +'<td>'
      +ind[1]
      +'</td>'
      +'<td align="center">'
      +ind[2]
      +'</td>'
      +'<td align="center">'
      +ind[3]
      +'</td>'
      +'<td align="center">'
      +ind[5]
      +'</td>'
      +'<td class="'+ind[8]+'" align="center">'
      +ind[8]
      +'</td>'
      +'</tr>'
      
      nReg ++;
    }
      }
  
  url[0] = ''
  +'<table class="reg" width="90%">'
  +'<tr>'
  +'<th width="15%">'
  +'Report Id'
  +'</th>'
  +'<th width="15%">'
  +'Fecha'
  +'</th>'
  +'<th width="20%">'
  +'Breve Descripción'
  +'</th>'
  +'<th width="15%">'
  +'Área o Departamento'
  +'</th>'
  +'<th width="10%">'
  +'Categoria del Incidente'
  +'</th>'
  +'<th width="15%">'
  +'Nivel de riesgo'
  +'</th>'
  +'</tr>'
  +url[0]
  +'</table>'
  +'<p style="margin-left: 2%;">Total de registros: '+nReg+'</p>'
  +'<input type="hidden" id="rt" value="'+nReg+'" readonly>'
  +'<br><br>'
  
  return url;
}

function gnuevas(app){
  var url = new Array();
  url[0] = '';
  url[1] = app
  url[2] = ''
  
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1hPC6uNVL_pjkaXV_kAv87etP6DunAJN2dvq0iEb7aUI/');
  var d1 = ss.getSheetByName(app).getDataRange().getValues();
  for(a1 in d1){
    var z1 = d1[a1];
    url[0] += z1[0];
  }
  
  return url;
}

function tablaUsr(name){
  var url = new Array();
  var nReg = 0;
  url[0] = '';

  var ss = SpreadsheetApp.openById('1hPC6uNVL_pjkaXV_kAv87etP6DunAJN2dvq0iEb7aUI').getSheetByName('Registros').getDataRange().getValues();
  for(a1 in ss){
    var ind = ss[a1];
    if(ind[23] == name){
      url[0] += ''
      +'<tr>'
      +'<td>'
      +ind[0]
      +'</td>'
      +'<td>'
      +ind[1]
      +'</td>'
      +'<td align="center">'
      +ind[2]
      +'</td>'
      +'<td align="center">'
      +ind[3]
      +'</td>'
      +'<td align="center">'
      +ind[5]
      +'</td>'
      +'<td class="'+ind[8]+'" align="center">'
      +ind[8]
      +'</td>'
      +'</tr>'
      
      nReg ++;
    }
      }
  
  url[0] = ''
  +'<table class="reg" width="90%">'
  +'<tr>'
  +'<th width="15%">'
  +'Report Id'
  +'</th>'
  +'<th width="15%">'
  +'Fecha'
  +'</th>'
  +'<th width="20%">'
  +'Breve Descripción'
  +'</th>'
  +'<th width="15%">'
  +'Área o Departamento'
  +'</th>'
  +'<th width="10%">'
  +'Categoria del Incidente'
  +'</th>'
  +'<th width="15%">'
  +'Nivel de riesgo'
  +'</th>'
  +'</tr>'
  +url[0]
  +'</table>'
  +'<p style="margin-left: 2%;">Total de registros: '+nReg+'</p>'
  +'<input type="hidden" id="rt" value="'+nReg+'" readonly>'
  +'<br><br>'
  
  return url;
}

function gnuevas(app){
  var url = new Array();
  url[0] = '';
  url[1] = app
  url[2] = ''
  
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1hPC6uNVL_pjkaXV_kAv87etP6DunAJN2dvq0iEb7aUI/');
  var d1 = ss.getSheetByName(app).getDataRange().getValues();
  for(a1 in d1){
    var z1 = d1[a1];
    url[0] += z1[0];
  }
  
  return url;
}

function lasgraf(divLl){
  var ID = '1vF-cmm1hr69qqPHeirW0a7uk-E4nCOgttk3e1yEkPhc';
  var url = new Array();
  url[0] = '';
  url[39] = divLl;
  
  
  url[0] = ''
      +'<iframe src="https://docs.google.com/spreadsheets/d/'+ID+'/htmlembed/sheet?headers=false&gid=103996611" width="78%" height="480px">'
      +'</iframe>';
  
  return url;
}

/* Parte para la implementación del mapa */
function consulta() {
  var url = new Array();
  
  var ss = SpreadsheetApp.openById('1hPC6uNVL_pjkaXV_kAv87etP6DunAJN2dvq0iEb7aUI');
  var ho = ss.getSheetByName('Registros');
  var d1 =ho.getDataRange().getValues();
  
  var count = 0;
  url[0] = '';
  
  for(a1 in d1){
    var z1 = d1[a1];
    if(z1[0] != 'Reporte ID' && z1[0] != ''){
      var another = ''
                   +'<input type="hidden" id="lat['+count+']" value="'+z1[21]+'" readonly>'
                   +'<input type="hidden" id="lon['+count+']" value="'+z1[22]+'" readonly>'
      url[0] += another
      count++;
    }
  }
  
  url[0] += '<input type="hidden" id="total" value="'+count+'" readonly>';
  
  return url;
}

function consultaUsr(name) {
  var url = new Array();
  
  var ss = SpreadsheetApp.openById('1hPC6uNVL_pjkaXV_kAv87etP6DunAJN2dvq0iEb7aUI');
  var ho = ss.getSheetByName('Registros');
  var d1 =ho.getDataRange().getValues();
  
  var count = 0;
  url[0] = '';
  
  for(a1 in d1){
    var z1 = d1[a1];
    if(z1[23] == name){
      var another = ''
                   +'<input type="hidden" id="lat['+count+']" value="'+z1[21]+'" readonly>'
                   +'<input type="hidden" id="lon['+count+']" value="'+z1[22]+'" readonly>'
      url[0] += another
      count++;
    }
  }
  
  url[0] += '<input type="hidden" id="total" value="'+count+'" readonly>';
  
  return url;
}
