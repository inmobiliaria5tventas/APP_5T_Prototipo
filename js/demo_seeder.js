/**
 * DEMO_GEOCONECTA - Enhanced Multi-Project Marketing Scenario Generator
 * Pobla masivamente los 4 proyectos (Copihue, Brisas, Encinos, Naranjos) con datos comerciales,
 * estados visuales en mapa, aprobaciones, cuotas y métricas.
 */
window.APP5T_DemoSeeder = (function() {
  'use strict';

  function cargarEscenarioMarketing() {
    const pfx = 'demo5t_';

    // 1. Clientes Realistas (Pool de 20 clientes)
    const clientes = [
      { id: 1, rut: '14.303.773-8', nombres: 'Pedro', apellidos: 'Caro Alarcón', telefono: '+56 9 8452 1190', email: 'p.caro@gmail.com', comuna: 'Chillán', profesion: 'Comerciante', estado_cliente: 'Activo', id_vendedor: 1, fecha_ingreso: '2026-07-15' },
      { id: 2, rut: '15.420.331-2', nombres: 'Rodrigo', apellidos: 'Valenzuela Silva', telefono: '+56 9 9123 4481', email: 'rodrigo.valenzuela@gmail.com', comuna: 'Concepción', profesion: 'Empresario', estado_cliente: 'Activo', id_vendedor: 1, fecha_ingreso: '2026-06-20' },
      { id: 3, rut: '14.882.109-K', nombres: 'Marcela Paz', apellidos: 'Carrasco Morales', telefono: '+56 9 7341 9022', email: 'marcela.carrasco@abogados.cl', comuna: 'Santiago', profesion: 'Abogada', estado_cliente: 'Activo', id_vendedor: 2, fecha_ingreso: '2026-08-02' },
      { id: 4, rut: '16.711.902-4', nombres: 'Claudio', apellidos: 'Aránguiz Peña', telefono: '+56 9 6554 3110', email: 'c.aranguiz@ingenieros.cl', comuna: 'Chillán', profesion: 'Ingeniero Civil', estado_cliente: 'Activo', id_vendedor: 3, fecha_ingreso: '2026-05-10' },
      { id: 5, rut: '17.334.890-5', nombres: 'Valentina', apellidos: 'Silva Morales', telefono: '+56 9 8812 0034', email: 'dra.valentina.silva@clinica.cl', comuna: 'San Carlos', profesion: 'Médica Cirujana', estado_cliente: 'Activo', id_vendedor: 1, fecha_ingreso: '2026-04-18' },
      { id: 6, rut: '13.901.442-8', nombres: 'Felipe', apellidos: 'Morales Soto', telefono: '+56 9 5214 7799', email: 'felipe.morales.arch@gmail.com', comuna: 'Concepción', profesion: 'Arquitecto', estado_cliente: 'Activo', id_vendedor: 2, fecha_ingreso: '2026-07-28' },
      { id: 7, rut: '18.120.774-1', nombres: 'Daniela', apellidos: 'Fuentes Rivas', telefono: '+56 9 9901 2345', email: 'daniela.fuentes.diseno@gmail.com', comuna: 'Los Ángeles', profesion: 'Diseñadora Industrial', estado_cliente: 'Activo', id_vendedor: 3, fecha_ingreso: '2026-08-10' },
      { id: 8, rut: '15.890.123-9', nombres: 'Andrés', apellidos: 'Bravo Tapia', telefono: '+56 9 7788 1234', email: 'andres.bravo.agro@gmail.com', comuna: 'Talca', profesion: 'Ingeniero Agrónomo', estado_cliente: 'Activo', id_vendedor: 1, fecha_ingreso: '2026-03-25' },
      { id: 9, rut: '16.234.567-8', nombres: 'Camila', apellidos: 'Rojas Navarrete', telefono: '+56 9 8123 9900', email: 'camila.rojas@gmail.com', comuna: 'Santiago', profesion: 'Odontóloga', estado_cliente: 'Activo', id_vendedor: 2, fecha_ingreso: '2026-06-12' },
      { id: 10, rut: '12.456.789-0', nombres: 'Gonzalo', apellidos: 'Pinto Vera', telefono: '+56 9 6345 8811', email: 'gpinto@construccion.cl', comuna: 'Chillán', profesion: 'Constructor Civil', estado_cliente: 'Activo', id_vendedor: 3, fecha_ingreso: '2026-05-18' },
      { id: 11, rut: '17.890.112-3', nombres: 'Javiera', apellidos: 'Muñoz Cáceres', telefono: '+56 9 9456 1234', email: 'javiera.munoz@empresa.cl', comuna: 'Concepción', profesion: 'Contadora Auditora', estado_cliente: 'Activo', id_vendedor: 1, fecha_ingreso: '2026-07-05' },
      { id: 12, rut: '15.678.901-2', nombres: 'Matías', apellidos: 'Lagos Henríquez', telefono: '+56 9 7654 3290', email: 'matias.lagos@gmail.com', comuna: 'Chillán', profesion: 'Profesor Universitario', estado_cliente: 'Activo', id_vendedor: 2, fecha_ingreso: '2026-04-30' },
      { id: 13, rut: '13.567.890-K', nombres: 'Patricia', apellidos: 'Salazar Gómez', telefono: '+56 9 8899 0011', email: 'patricia.salazar@notaria.cl', comuna: 'San Carlos', profesion: 'Notaria', estado_cliente: 'Activo', id_vendedor: 3, fecha_ingreso: '2026-08-14' },
      { id: 14, rut: '18.901.234-5', nombres: 'Sebastián', apellidos: 'Castillo Vega', telefono: '+56 9 9012 3456', email: 'scastillo.tech@gmail.com', comuna: 'Santiago', profesion: 'Desarrollador Software', estado_cliente: 'Activo', id_vendedor: 1, fecha_ingreso: '2026-06-01' },
      { id: 15, rut: '16.901.345-6', nombres: 'Loreto', apellidos: 'Valenzuela Rivas', telefono: '+56 9 7123 4567', email: 'loreto.valenzuela@salud.cl', comuna: 'Chillán', profesion: 'Enfermera', estado_cliente: 'Activo', id_vendedor: 2, fecha_ingreso: '2026-05-22' },
      { id: 16, rut: '14.123.456-7', nombres: 'Hernán', apellidos: 'Garrido Ortiz', telefono: '+56 9 6789 0123', email: 'hernan.garrido@transporte.cl', comuna: 'Los Ángeles', profesion: 'Transportista', estado_cliente: 'Activo', id_vendedor: 3, fecha_ingreso: '2026-03-10' }
    ];

    // 2. Vendedores
    const vendedores = [
      { id: 1, rut: '11.111.111-1', nombre: 'Manuel Matus', cargo: 'Ejecutivo de Ventas', telefono: '+56 9 8765 4321', email: 'manuel.matus@5tierras.cl', estado: 'Activo', fecha_ingreso: '2026-01-10' },
      { id: 2, rut: '12.222.222-2', nombre: 'Claudia Riquelme', cargo: 'Ejecutiva Senior', telefono: '+56 9 9876 5432', email: 'claudia.riquelme@5tierras.cl', estado: 'Activo', fecha_ingreso: '2026-02-01' },
      { id: 3, rut: '13.333.333-3', nombre: 'Ignacio Paredes', cargo: 'Consultor Terrenos', telefono: '+56 9 7654 3210', email: 'ignacio.paredes@5tierras.cl', estado: 'Activo', fecha_ingreso: '2026-03-15' }
    ];

    // 3. Proyectos
    const proyectos = [
      { id: 1, nombre_proyecto: 'El Copihue', nombre: 'El Copihue', ubicacion: 'Sector Copihue', comuna: 'Chillán', coordenadas_centro: { lat: -36.120, lng: -71.776 }, estado_proyecto: 'Activo', nro_etapas: 1 },
      { id: 2, nombre_proyecto: 'Las Brisas', nombre: 'Las Brisas', ubicacion: 'Sector Las Brisas', comuna: 'Chillán', coordenadas_centro: { lat: -36.385, lng: -71.953 }, estado_proyecto: 'Activo', nro_etapas: 1 },
      { id: 3, nombre_proyecto: 'Los Encinos', nombre: 'Los Encinos', ubicacion: 'Sector Los Encinos', comuna: 'Chillán', coordenadas_centro: { lat: -36.468, lng: -71.842 }, estado_proyecto: 'Activo', nro_etapas: 1 },
      { id: 4, nombre_proyecto: 'Los Naranjos', nombre: 'Los Naranjos', ubicacion: 'Sector Los Naranjos', comuna: 'Chillán', coordenadas_centro: { lat: -36.478, lng: -71.838 }, estado_proyecto: 'Activo', nro_etapas: 1 }
    ];

    // 4. Carga base de propiedades desde GeoJSON si están disponibles o desde localStorage
    let props = [];
    try {
      props = JSON.parse(localStorage.getItem(pfx + 'propiedades') || '[]');
    } catch(e) { props = []; }

    if (!props.length && typeof APP5T_DB !== 'undefined') {
      try {
        APP5T_DB.init();
        props = JSON.parse(localStorage.getItem(pfx + 'propiedades') || '[]');
      } catch(e) {}
    }

    // Mapas de estados y asignaciones para distribución rica y visual
    // Reglas por proyecto:
    // P1 (Copihue, ~28 lotes)
    // P2 (Las Brisas, ~25 lotes)
    // P3 (Los Encinos, ~24 lotes)
    // P4 (Los Naranjos, ~30 lotes)

    const negs = [];
    const ctas = [];
    let negIdCounter = 1;
    let ctaIdCounter = 1;

    // Helper para actualizar lote en array y generar negociación / cuenta corriente
    function configurarLote(idProy, nroLote, estado, cliIndex, vendId, options = {}) {
      // Buscar el lote por id_proyecto y nro_lote
      let p = props.find(x => Number(x.id_proyecto) === Number(idProy) && (String(x.nro_lote) === String(nroLote) || String(x.nombre) === 'Lote ' + nroLote || String(x.nombre) === String(nroLote)));
      
      const valorBase = (idProy === 2 || idProy === 4) ? 18000000 + (Number(nroLote) * 350000) : 33000000 + (Number(nroLote) * 450000);
      
      if (!p) {
        // Crear si no existía en GeoJSON
        p = {
          id: (idProy * 100) + Number(nroLote),
          id_proyecto: idProy,
          id_etapa: idProy,
          nro_lote: String(nroLote),
          nombre: 'Lote ' + nroLote,
          superficie: 5000 + (Number(nroLote) * 25),
          precio_lista: valorBase,
          valor_final: valorBase,
          estado: estado
        };
        props.push(p);
      } else {
        p.estado = estado;
        p.precio_lista = valorBase;
        p.valor_final = valorBase;
      }

      // Aplicar propiedades adicionales
      Object.assign(p, options);

      // Si no es Disponible, creamos una negociación
      if (estado !== 'Disponible') {
        const cliente = clientes[(cliIndex - 1) % clientes.length];
        const pieMonto = options.pie || Math.round(valorBase * 0.15);
        const saldo = valorBase - pieMonto;
        const nCuotas = options.nro_cuotas || 12;
        const vCuota = Math.round(saldo / nCuotas);
        
        let estAvance = 'Aprobado';
        if (estado === 'Pendiente') estAvance = 'Solicitada';

        const negItem = {
          id: negIdCounter++,
          id_propiedad: p.id,
          id_cliente: cliente.id,
          id_vendedor: vendId,
          valor_final: valorBase,
          pie: pieMonto,
          nro_cuotas: nCuotas,
          valor_cuota: vCuota,
          forma_pago: (options.pie === valorBase) ? 'Contado' : 'Cuotas',
          estado_avance: estAvance,
          estado_escrituracion: options.estado_escrituracion || (estado === 'Vendida' ? 'Autorizada' : 'Pendiente'),
          fecha_negociacion: options.fecha_reserva || '2026-07-15',
          ficha_abogado_generada: !!options.ficha_abogado_generada,
          autorizado_promesa: !!options.autorizado_promesa,
          promesa_firmada: !!options.promesa_firmada,
          ficha_escritura_generada: !!options.ficha_escritura_generada,
          autorizado_escriturar: options.autorizado_escriturar || 'NO',
          notas: options.notas || `Trámite comercial Lote ${nroLote}`
        };
        negs.push(negItem);

        // Si está en Promesada o Vendida, generar cuotas en cuenta corriente
        if (estado === 'Promesada' || estado === 'Vendida') {
          const totalCuotasGenerar = (options.pie === valorBase) ? 1 : Math.min(nCuotas, 12);
          const cuotasPagadas = (estado === 'Vendida') ? totalCuotasGenerar : (options.cuotasPagadas || 3);

          for (let c = 1; c <= totalCuotasGenerar; c++) {
            const isPag = c <= cuotasPagadas;
            const mesNum = Math.min(12, 3 + c);
            const mesStr = mesNum < 10 ? '0' + mesNum : String(mesNum);
            ctas.push({
              id: ctaIdCounter++,
              id_negociacion: negItem.id,
              id_propiedad: p.id,
              id_cliente: cliente.id,
              nro_cuota: c,
              monto_cuota: (options.pie === valorBase) ? valorBase : vCuota,
              fecha_vencimiento: `2026-${mesStr}-15`,
              fecha_pago: isPag ? `2026-${mesStr}-14` : null,
              monto_pagado: isPag ? ((options.pie === valorBase) ? valorBase : vCuota) : 0,
              estado_cuota: isPag ? 'Pagada' : (c === cuotasPagadas + 1 ? 'Por Vencer' : 'Pendiente')
            });
          }
        }
      }
    }

    // ==========================================
    // 1. PROYECTO: EL COPIHUE (ID 1)
    // ==========================================
    configurarLote(1, 1, 'Disponible', 1, 1);
    configurarLote(1, 2, 'Vendida', 8, 1, { fecha_reserva: '2026-03-10', fecha_promesa: '2026-03-25', fecha_escritura: '2026-05-18', autorizado_escriturar: 'SI' });
    configurarLote(1, 3, 'Vendida', 14, 2, { fecha_reserva: '2026-04-12', fecha_promesa: '2026-04-28', fecha_escritura: '2026-06-15', autorizado_escriturar: 'SI' });
    configurarLote(1, 4, 'Promesada', 4, 3, { fecha_reserva: '2026-06-10', fecha_promesa: '2026-06-28', promesa_firmada: true, cuotasPagadas: 3 });
    configurarLote(1, 5, 'Disponible', 1, 1);
    configurarLote(1, 6, 'Reservada', 9, 2, { fecha_reserva: '2026-08-18', ficha_abogado_generada: true, notas: '[FICHA_ABOGADO:GENERADA] Ficha lista para firma notarial Copihue.' });
    configurarLote(1, 7, 'Disponible', 1, 1);
    configurarLote(1, 8, 'Promesada', 12, 1, { fecha_reserva: '2026-06-15', fecha_promesa: '2026-07-02', promesa_firmada: true, cuotasPagadas: 2 });
    configurarLote(1, 9, 'Disponible', 1, 1);
    configurarLote(1, 10, 'Pendiente', 16, 3, { fecha_reserva: '2026-08-28', notas: 'Transferencia de reserva recibida $3.500.000.' });
    configurarLote(1, 11, 'Disponible', 1, 1);
    configurarLote(1, 12, 'Vendida', 5, 2, { fecha_reserva: '2026-05-02', fecha_promesa: '2026-05-20', fecha_escritura: '2026-07-10', autorizado_escriturar: 'SI' });
    configurarLote(1, 14, 'Vendida', 8, 1, { fecha_reserva: '2026-04-10', fecha_promesa: '2026-04-28', fecha_escritura: '2026-06-20', autorizado_escriturar: 'SI' });
    configurarLote(1, 15, 'Disponible', 1, 1);
    configurarLote(1, 16, 'Promesada', 6, 2, { fecha_reserva: '2026-07-05', fecha_promesa: '2026-07-22', promesa_firmada: true, cuotasPagadas: 1 });
    configurarLote(1, 17, 'Disponible', 1, 1);
    configurarLote(1, 18, 'Disponible', 1, 1);

    // ==========================================
    // 2. PROYECTO: LAS BRISAS (ID 2)
    // ==========================================
    configurarLote(2, 1, 'Disponible', 1, 1);
    configurarLote(2, 2, 'Disponible', 1, 1);
    configurarLote(2, 3, 'Vendida', 10, 3, { fecha_reserva: '2026-05-12', fecha_promesa: '2026-05-30', fecha_escritura: '2026-07-15', autorizado_escriturar: 'SI' });
    configurarLote(2, 4, 'Vendida', 11, 1, { fecha_reserva: '2026-05-18', fecha_promesa: '2026-06-05', fecha_escritura: '2026-07-22', autorizado_escriturar: 'SI' });
    configurarLote(2, 5, 'Disponible', 1, 1);
    configurarLote(2, 6, 'Disponible', 1, 1);
    configurarLote(2, 7, 'Vendida', 5, 1, { fecha_reserva: '2026-06-10', fecha_promesa: '2026-06-25', fecha_escritura: '2026-08-15', ficha_escritura_generada: true, estado_escrituracion: 'Pendiente', notas: '[FICHA_ESCRITURA:GENERADA] 100% Pagado. Pendiente firma de escritura.' });
    configurarLote(2, 8, 'Disponible', 1, 1);
    configurarLote(2, 9, 'Pendiente', 1, 1, { fecha_reserva: '2026-08-28', notas: 'Cliente solicitó reserva con transferencia de $3.000.000 comprobante adjunto.' });
    configurarLote(2, 10, 'Disponible', 1, 1);
    configurarLote(2, 11, 'Disponible', 1, 1);
    configurarLote(2, 12, 'Reservada', 2, 1, { fecha_reserva: '2026-08-20', ficha_abogado_generada: true, notas: '[FICHA_ABOGADO:GENERADA] Ficha legal redactada por Notaría Chillán.' });
    configurarLote(2, 13, 'Promesada', 14, 2, { fecha_reserva: '2026-07-08', fecha_promesa: '2026-07-25', promesa_firmada: true, cuotasPagadas: 2 });
    configurarLote(2, 14, 'Disponible', 1, 1);
    configurarLote(2, 15, 'Promesada', 15, 2, { fecha_reserva: '2026-07-14', fecha_promesa: '2026-08-01', promesa_firmada: true, cuotasPagadas: 1 });
    configurarLote(2, 16, 'Vendida', 8, 3, { fecha_reserva: '2026-04-20', fecha_promesa: '2026-05-10', fecha_escritura: '2026-06-30', autorizado_escriturar: 'SI' });
    configurarLote(2, 22, 'Promesada', 6, 2, { fecha_reserva: '2026-07-01', fecha_promesa: '2026-07-20', promesa_firmada: true, cuotasPagadas: 4 });

    // ==========================================
    // 3. PROYECTO: LOS ENCINOS (ID 3)
    // ==========================================
    configurarLote(3, 1, 'Disponible', 1, 1);
    configurarLote(3, 2, 'Disponible', 1, 1);
    configurarLote(3, 3, 'Reservada', 7, 3, { fecha_reserva: '2026-08-22', ficha_abogado_generada: false, notas: 'Aprobada por Gerencia. Pendiente emisión de ficha legal.' });
    configurarLote(3, 4, 'Disponible', 1, 1);
    configurarLote(3, 5, 'Pendiente', 3, 2, { fecha_reserva: '2026-08-27', notas: 'Reserva VIP Los Encinos Etapa 1.' });
    configurarLote(3, 6, 'Disponible', 1, 1);
    configurarLote(3, 7, 'Disponible', 1, 1);
    configurarLote(3, 8, 'Disponible', 1, 1);
    configurarLote(3, 9, 'Promesada', 4, 3, { fecha_reserva: '2026-07-10', fecha_promesa: '2026-07-28', promesa_firmada: true, cuotasPagadas: 2 });
    configurarLote(3, 10, 'Vendida', 13, 2, { fecha_reserva: '2026-06-05', fecha_promesa: '2026-06-20', fecha_escritura: '2026-08-05', autorizado_escriturar: 'SI' });
    configurarLote(3, 11, 'Vendida', 2, 1, { fecha_reserva: '2026-06-12', fecha_promesa: '2026-06-30', fecha_escritura: '2026-08-12', autorizado_escriturar: 'SI' });
    configurarLote(3, 12, 'Disponible', 1, 1);
    configurarLote(3, 13, 'Promesada', 9, 2, { fecha_reserva: '2026-07-18', fecha_promesa: '2026-08-04', promesa_firmada: true, cuotasPagadas: 1 });
    configurarLote(3, 14, 'Vendida', 10, 3, { fecha_reserva: '2026-05-15', fecha_promesa: '2026-06-02', fecha_escritura: '2026-07-20', autorizado_escriturar: 'SI' });

    // ==========================================
    // 4. PROYECTO: LOS NARANJOS (ID 4)
    // ==========================================
    configurarLote(4, 1, 'Disponible', 1, 1);
    configurarLote(4, 2, 'Disponible', 1, 1);
    configurarLote(4, 3, 'Disponible', 1, 1);
    configurarLote(4, 4, 'Pendiente', 15, 2, { fecha_reserva: '2026-08-29', notas: 'Solicitud de reserva con comprobante adjunto Naranjos.' });
    configurarLote(4, 5, 'Promesada', 11, 1, { fecha_reserva: '2026-07-18', fecha_promesa: '2026-08-05', promesa_firmada: true, cuotasPagadas: 1 });
    configurarLote(4, 6, 'Promesada', 12, 3, { fecha_reserva: '2026-07-20', fecha_promesa: '2026-08-08', promesa_firmada: true, cuotasPagadas: 1 });
    configurarLote(4, 7, 'Disponible', 1, 1);
    configurarLote(4, 8, 'Reservada', 14, 1, { fecha_reserva: '2026-08-24', ficha_abogado_generada: true, notas: '[FICHA_ABOGADO:GENERADA] Ficha legal emitida Los Naranjos.' });
    configurarLote(4, 9, 'Disponible', 1, 1);
    configurarLote(4, 10, 'Vendida', 16, 2, { fecha_reserva: '2026-04-15', fecha_promesa: '2026-05-02', fecha_escritura: '2026-06-25', autorizado_escriturar: 'SI' });
    configurarLote(4, 18, 'Vendida', 5, 1, { fecha_reserva: '2026-05-02', fecha_promesa: '2026-05-20', fecha_escritura: '2026-07-10', autorizado_escriturar: 'SI' });
    configurarLote(4, 19, 'Disponible', 1, 1);
    configurarLote(4, 20, 'Vendida', 13, 3, { fecha_reserva: '2026-06-08', fecha_promesa: '2026-06-25', fecha_escritura: '2026-08-10', autorizado_escriturar: 'SI' });

    // 5. Guardar todas las tablas actualizadas en demo5t_
    localStorage.setItem(pfx + 'clientes', JSON.stringify(clientes));
    localStorage.setItem(pfx + 'vendedores', JSON.stringify(vendedores));
    localStorage.setItem(pfx + 'proyectos', JSON.stringify(proyectos));
    localStorage.setItem(pfx + 'propiedades', JSON.stringify(props));
    localStorage.setItem(pfx + 'negociaciones', JSON.stringify(negs));
    localStorage.setItem(pfx + 'cuenta_corriente', JSON.stringify(ctas));

    console.log('[DEMO_SEEDER] Escenario masivo de marketing cargado para los 4 proyectos!');

    // Refrescar mapa y vistas en vivo
    if (typeof APP5T_Map3D !== 'undefined' && APP5T_Map3D._is3DActive) { try { APP5T_Map3D.syncLotColors(); } catch(e){} }
    if (typeof APP5T_Map !== 'undefined') {
      try { APP5T_Map.loadAllProjects(); } catch(e) {}
    }
    if (typeof refreshAll === 'function') {
      try { refreshAll(); } catch(e) {}
    }
        if (typeof _renderAprobaciones === 'function') {
      try { _renderAprobaciones(); } catch(e) {}
    }
    if (typeof _renderLeads === 'function') {
      try { _renderLeads(); } catch(e) {}
    }
    if (typeof APP5T_Utils !== 'undefined' && APP5T_Utils.showToast) {
      APP5T_Utils.showToast('🚀 Los 4 proyectos han sido poblados masivamente con datos comerciales y espaciales.', 'success');
    }
  }

  function resetearDemo() {
    const pfx = 'demo5t_';
    const tables = ['clientes', 'vendedores', 'proyectos', 'etapas', 'propiedades', 'directorio', 'negociaciones', 'cuenta_corriente', 'tramites', 'documentos', 'auditoria'];
    tables.forEach(t => {
      localStorage.removeItem(pfx + t);
    });
    if (typeof APP5T_DB !== 'undefined' && typeof APP5T_DB.init === 'function') {
      APP5T_DB.init();
    }
    if (typeof APP5T_Map3D !== 'undefined' && APP5T_Map3D._is3DActive) { try { APP5T_Map3D.syncLotColors(); } catch(e){} }
    if (typeof APP5T_Map !== 'undefined') {
      try { APP5T_Map.loadAllProjects(); } catch(e) {}
    }
    if (typeof refreshAll === 'function') {
      try { refreshAll(); } catch(e) {}
    }
        if (typeof _renderAprobaciones === 'function') {
      try { _renderAprobaciones(); } catch(e) {}
    }
    if (typeof _renderLeads === 'function') {
      try { _renderLeads(); } catch(e) {}
    }
    if (typeof APP5T_Utils !== 'undefined' && APP5T_Utils.showToast) {
      APP5T_Utils.showToast('🔄 Demo restablecida a valores base.', 'info');
    }
  }

  return {
    cargarEscenarioMarketing,
    resetearDemo
  };
})();