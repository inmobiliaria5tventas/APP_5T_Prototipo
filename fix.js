const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/usuario/Documents/RODRIGO/GEOCONECTA/5TIERRAS/APP_5T/EXPORTs/APP_5T_Prototipo';
const files = ['index.html', ...fs.readdirSync(path.join(dir, 'js')).map(f => 'js/'+f)];

files.forEach(f => {
    let p = path.join(dir, f);
    if (!fs.statSync(p).isFile() || (!p.endsWith('.js') && !p.endsWith('.html'))) return;
    let content = fs.readFileSync(p, 'utf8');
    
    const reps = [
      [/Gestin/g, 'Gestión'], [/Administracin/g, 'Administración'], [/Configuracin/g, 'Configuración'],
      [/Accin/g, 'Acción'], [/Acciones/g, 'Acciones'], [/Mdulo/g, 'Módulo'],
      [/Catlogo/g, 'Catálogo'], [/Catǭlogo/g, 'Catálogo'], [/Auditora/g, 'Auditoría'],
      [/Informacin/g, 'Información'], [/Direccin/g, 'Dirección'], [/Aprobacin/g, 'Aprobación'],
      [/Condicin/g, 'Condición'], [/\bs\b/g, 'sí'], [/\bS\b/g, 'Sí'],
      [/\best\b/g, 'está'], [/\bEst\b/g, 'Está'], [/\bdas\b/g, 'días'],
      [/\bDas\b/g, 'Días'], [/\bMs\b/g, 'Más'], [/\bms\b/g, 'más'],
      [/\bxito\b/g, 'éxito'], [/\bXITO\b/g, 'ÉXITO'], [/ltimo/g, 'Último'],
      [/ltima/g, 'Última'], [/Trmino/g, 'Término'], [/Prximo/g, 'Próximo'],
      [/prximo/g, 'próximo'], [/Prximos/g, 'Próximos'], [/prximos/g, 'próximos'],
      [/invǭlida/g, 'inválida'], [/MǸdica/g, 'Médica'], [/Diseadora/g, 'Diseñadora'],
      [/Agrnomo/g, 'Agrónomo'], [/Odontloga/g, 'Odontóloga'], [/Muoz/g, 'Muñoz'],
      [/Cǭceres/g, 'Cáceres'], [/Matas/g, 'Matías'], [/Henrquez/g, 'Henríquez'],
      [/Gmez/g, 'Gómez'], [/Sebastiǭn/g, 'Sebastián'], [/Hernǭn/g, 'Hernán'],
      [/\?ngeles/g, 'Ángeles'], [/ngeles/g, 'Ángeles'], [/Chillǭn/g, 'Chillán'],
      [/Concepcin/g, 'Concepción'], [/Arǭnguiz/g, 'Aránguiz'], [/Pea/g, 'Peña'],
      [/Alarcn/g, 'Alarcón'], [/AndrǸs/g, 'Andrés'],
      [/ubicacin/g, 'ubicación'], [/Precisin/g, 'Precisión'],
      [/ǟ/g, 'í'], [/Ǹ/g, 'é'], [/ǭ/g, 'á'], [/\uFFFD/g, '']
    ];
    
    reps.forEach(r => {
      content = content.replace(r[0], r[1]);
    });

    fs.writeFileSync(p, content, 'utf8');
    console.log('Fixed:', f);
});
