/* ==========================================================================
   APP5T_Map  –  Módulo de mapa interactivo (Leaflet)
   5 Tierras CRM & GIS
   ========================================================================== */

const APP5T_Map = (function () {
    'use strict';

    // ── State ──────────────────────────────────────────────────────────────
    let map            = null;
    let currentLayer   = null;
    let currentProject = null;
    let selectedFeature = null;
    let labelsGroup    = null;
    let onLoteSelect   = null;
    let projectMarkersGroup = null;

    // ── GPS Geolocation State ─────────────────────────────────────────────
    let userLocationMarker = null;
    let userAccuracyCircle = null;
    let isGpsActive        = false;

    function toggleGpsLocation() {
        if (!map) return;
        const btn = document.getElementById('btn-map-gps');

        if (isGpsActive) {
            if (userLocationMarker) { map.removeLayer(userLocationMarker); userLocationMarker = null; }
            if (userAccuracyCircle) { map.removeLayer(userAccuracyCircle); userAccuracyCircle = null; }
            if (btn) {
                btn.style.backgroundColor = 'var(--card-bg, #1e293b)';
                btn.style.color = '#60a5fa';
                btn.title = 'Mi Ubicación GPS en Terreno';
            }
            isGpsActive = false;
            if (typeof APP5T_Utils !== 'undefined' && APP5T_Utils.showToast) {
                APP5T_Utils.showToast('Ubicación GPS desactivada', 'info');
            }
            return;
        }

        if (!navigator.geolocation) {
            alert('Tu navegador no soporta geolocalización GPS.');
            return;
        }

        if (btn) {
            btn.style.backgroundColor = '#f59e0b';
            btn.style.color = '#ffffff';
        }

        navigator.geolocation.getCurrentPosition(
            function(pos) {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                const acc = pos.coords.accuracy;

                if (!map) return;

                if (userLocationMarker) map.removeLayer(userLocationMarker);
                if (userAccuracyCircle) map.removeLayer(userAccuracyCircle);

                const userIcon = L.divIcon({
                    className: 'gps-user-icon',
                    html: '<div style="width:16px; height:16px; background:#2563eb; border:3px solid #ffffff; border-radius:50%; box-shadow:0 0 12px rgba(37,99,235,0.9);"></div>',
                    iconSize: [16, 16],
                    iconAnchor: [8, 8]
                });

                userAccuracyCircle = L.circle([lat, lng], {
                    radius: acc,
                    color: '#2563eb',
                    fillColor: '#3b82f6',
                    fillOpacity: 0.15,
                    weight: 1
                }).addTo(map);

                userLocationMarker = L.marker([lat, lng], { icon: userIcon }).addTo(map);
                userLocationMarker.bindPopup(`<b>📍 Tu ubicación actual</b><br>Precisión GPS: ±${Math.round(acc)} m`).openPopup();

                map.flyTo([lat, lng], 17);

                if (btn) {
                    btn.style.backgroundColor = '#10b981';
                    btn.style.color = '#ffffff';
                    btn.title = 'GPS Activo - Haz clic para desactivar';
                }
                isGpsActive = true;

                if (typeof APP5T_Utils !== 'undefined' && APP5T_Utils.showToast) {
                    APP5T_Utils.showToast(`Ubicación GPS fijada (Precisión ±${Math.round(acc)}m)`, 'success');
                }
            },
            function(err) {
                if (btn) {
                    btn.style.backgroundColor = 'var(--card-bg, #1e293b)';
                    btn.style.color = '#60a5fa';
                }
                isGpsActive = false;
                let msg = 'No se pudo obtener la ubicación en terreno.';
                if (err.code === 1) msg = 'Permiso de ubicación denegado en el navegador.';
                else if (err.code === 2) msg = 'Ubicación no disponible o sin señal GPS.';
                else if (err.code === 3) msg = 'Tiempo de espera agotado al buscar GPS.';

                alert(msg);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }

    // ── Project centres ────────────────────────────────────────────────────
    const isMobile = window.innerWidth <= 768;
    const CENTERS = {
        'El Copihue':   { 
            lat: -36.120, 
            lng: isMobile ? -71.778 : -71.776, 
            zoom: 16 
        },
        'Las Brisas':   { lat: -36.385, lng: -71.953, zoom: 16 },
        'Los Encinos':  { lat: -36.468, lng: -71.842, zoom: 16 },
        'Los Naranjos': { lat: -36.478, lng: -71.838, zoom: 16 }
    };

    // ── Estado → colour ────────────────────────────────────────────────────
    const COLORS = {
        'Disponible':    'rgba(255, 255, 255, 0.6)',
        'Pendiente':     '#ffdd59',
        'Reservada':     '#d97706',
        'Promesada':     '#3498db',
        'Venta_Directa': '#8b5cf6',   // Púrpura — Aprobada, espera escritura
        'Vendida':       '#2ecc71',
        'Bloqueado':     '#7f8c8d'    // Gris - Bloqueado por gerencia
    };

    function _getColorForEstado(estado) {
        if (!estado) return 'rgba(255, 255, 255, 0.6)';
        const st = String(estado).trim();
        if (COLORS[st]) return COLORS[st];
        const low = st.toLowerCase();
        if (low.includes('promesa') || low.includes('promesad')) return '#3498db';
        if (low.includes('reservad') || low.includes('reserva')) return '#d97706';
        if (low.includes('pendient')) return '#ffdd59';
        if (low.includes('directa')) return '#8b5cf6';
        if (low.includes('vendid') || low.includes('escriturad')) return '#2ecc71';
        if (low.includes('bloquead')) return '#7f8c8d';
        return '#95a5a6';
    }

    // ── Default (unselected) feature style ─────────────────────────────────
    function _defaultStyle(estado) {
        const low = String(estado || '').toLowerCase();
        const isPend = low.includes('pendient');
        const isVD   = low.includes('directa');
        const fillColor = _getColorForEstado(estado);
        return {
            fillColor:   fillColor,
            fillOpacity: isPend ? 0.65 : (isVD ? 0.55 : 0.5),
            weight:      (isPend || isVD) ? 2 : 1.5,
            color:       isPend ? '#ffd32a' : (isVD ? '#7c3aed' : 'rgba(255,255,255,0.6)'),
            opacity:     1,
            dashArray:   isPend ? '3, 4' : (isVD ? '6, 3' : null)
        };
    }

    // ── Highlight style ────────────────────────────────────────────────────
    function _highlightStyle(estado) {
        const low = String(estado || '').toLowerCase();
        const isPend = low.includes('pendient');
        const isVD   = low.includes('directa');
        const fillColor = _getColorForEstado(estado);
        return {
            fillColor:   fillColor,
            fillOpacity: isPend ? 0.8 : (isVD ? 0.75 : 0.7),
            weight:      3,
            color:       '#ffffff',
            opacity:     1,
            dashArray:   isPend ? '3, 4' : (isVD ? '6, 3' : null)
        };
    }

    // ── Deselect the previously selected feature ───────────────────────────
    function _deselectPrevious() {
        if (selectedFeature && selectedFeature.layer) {
            const estado = selectedFeature.data ? selectedFeature.data.estado : 'Disponible';
            selectedFeature.layer.setStyle(_defaultStyle(estado));
        }
        selectedFeature = null;
    }

    // ── Toggle label visibility based on zoom ──────────────────────────────
    function _updateLabelVisibility() {
        if (!map || !labelsGroup) return;
        const zoom = map.getZoom();
        console.log('APP5T_Map: _updateLabelVisibility called. Current Zoom:', zoom);

        // Use CSS class on the map container to toggle labels
        const mapContainer = map.getContainer();
        if (zoom >= 15) {
            mapContainer.classList.add('show-lot-labels');
            // Hide project logo markers when zoomed in
            if (projectMarkersGroup && map.hasLayer(projectMarkersGroup)) {
                map.removeLayer(projectMarkersGroup);
                console.log('APP5T_Map: Zoom >= 15, hiding project logo markers.');
            }
        } else {
            mapContainer.classList.remove('show-lot-labels');
            // Show project logo markers when zoomed out
            if (projectMarkersGroup && !map.hasLayer(projectMarkersGroup)) {
                projectMarkersGroup.addTo(map);
                console.log('APP5T_Map: Zoom < 15, showing project logo markers.');
            }
        }
    }

    // ── Add project logo markers ───────────────────────────────────────────
    function _addProjectLogoMarkers() {
        console.log('APP5T_Map: Initializing project logo markers...');
        if (!map) {
            console.error('APP5T_Map: Map instance is null!');
            return;
        }
        if (!projectMarkersGroup) {
            projectMarkersGroup = L.layerGroup().addTo(map);
            console.log('APP5T_Map: Created projectMarkersGroup layer group and added to map.');
        } else {
            projectMarkersGroup.clearLayers();
            console.log('APP5T_Map: Cleared existing logo markers.');
        }

        const logoUrls = {
            'El Copihue':   '04_RECURSOS/Logos/El%20Copihue.png',
            'Las Brisas':   '04_RECURSOS/Logos/Las%20Brisas.png',
            'Los Encinos':  '04_RECURSOS/Logos/Los%20Encinos.png',
            'Los Naranjos': '04_RECURSOS/Logos/Los%20Naranjos.png'
        };

        const offsets = {
            'Los Encinos':  { lat: 0.007, lng: -0.007 },
            'Los Naranjos': { lat: -0.007, lng: 0.007 }
        };

        Object.keys(CENTERS).forEach(function (name) {
            const centre = CENTERS[name];
            const logoUrl = logoUrls[name];
            const offset = offsets[name] || { lat: 0, lng: 0 };
            const markerLat = centre.lat + offset.lat;
            const markerLng = centre.lng + offset.lng;

            console.log('APP5T_Map: Adding logo marker for', name, 'at lat:', markerLat, 'lng:', markerLng, 'using src:', logoUrl);

            // Create custom Leaflet divIcon with child img tag wrapped in project-logo-inner
            const projectIcon = L.divIcon({
                html: `<div class="project-logo-inner"><img src="${logoUrl}" style="width:100% !important; height:100% !important; object-fit:contain; display:block; max-width:none !important;" onerror="if(!this.dataset.retry){this.dataset.retry=1; this.src=\x27../\x27+this.src;}" /></div>`,
                iconSize: [42, 42],
                iconAnchor: [21, 21],
                className: 'project-map-logo-container'
            });

            // Create marker at offset coordinates (keeps flyTo centered on exact location)
            const marker = L.marker([markerLat, markerLng], { icon: projectIcon });
            
            // Tooltip on hover
            marker.bindTooltip(name, {
                direction: 'top',
                offset: [0, -18],
                className: 'project-logo-tooltip'
            });

            // Click -> zoom/fly to project & sync filters select dropdown
            marker.on('click', function () {
                zoomToProject(name);
                const projSel = document.getElementById('map-project-select');
                if (projSel) {
                    projSel.value = name;
                    projSel.dispatchEvent(new Event('change'));
                }
            });

            projectMarkersGroup.addLayer(marker);
        });
        console.log('APP5T_Map: Added all project logo markers to group. Layer count:', projectMarkersGroup.getLayers().length);
    }

    // ── Resolve project name → project id ──────────────────────────────────
    function _getProjectId(projectName) {
        const proyectos = APP5T_DB.getAll('proyectos');
        const match = proyectos.find(p => p.nombre === projectName);
        return match ? match.id : null;
    }

    // ── Public: init ───────────────────────────────────────────────────────
    function init(containerId, onSelectCallback) {
        onLoteSelect = onSelectCallback || null;

        // Create map
        map = L.map(containerId, {
            zoomControl: false,
            attributionControl: true
        });

        // Tile layers - Multiple options for robustness
        const googleHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            attribution: '&copy; Google', maxZoom: 20
        });
        const googleSat = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            attribution: '&copy; Google', maxZoom: 20
        });
        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap', maxZoom: 19
        });

        googleHybrid.addTo(map); // Default (Google Híbrido)

        L.control.layers({
            "Google Híbrido": googleHybrid,
            "Google Satélite": googleSat,
            "Mapa Simple": osm
        }, null, { position: 'bottomleft' }).addTo(map);

        // Zoom control bottom-right
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // GPS Geolocation button control (bottom-right)
        const gpsControl = L.control({ position: 'bottomright' });
        gpsControl.onAdd = function() {
            const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
            div.innerHTML = `<a href="#" id="btn-map-gps" title="Mi Ubicación GPS en Terreno" style="display:flex; align-items:center; justify-content:center; width:34px; height:34px; background:var(--card-bg, #1e293b); color:#60a5fa; border:1px solid var(--border-color, #334155); border-radius:4px; font-size:1.1rem; text-decoration:none; box-shadow:0 2px 6px rgba(0,0,0,0.4);"><i class="fa-solid fa-crosshairs"></i></a>`;
            div.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleGpsLocation();
            };
            return div;
        };
        gpsControl.addTo(map);

        // Labels layer group
        labelsGroup = L.layerGroup().addTo(map);

        // Default general view (Centro aproximado de los 4 proyectos)
        map.setView([-36.3, -71.8], 9);

        // Zoom change → toggle label visibility
        map.on('zoomend', _updateLabelVisibility);
        _updateLabelVisibility();

        // Popup close event → deselect if it matches the selected lot
        map.on('popupclose', function (e) {
            if (selectedFeature && selectedFeature.layer && typeof selectedFeature.layer.getPopup === 'function' && selectedFeature.layer.getPopup() === e.popup) {
                _deselectPrevious();
            }
        });
    }

    // ── Public: loadAllProjects ────────────────────────────────────────────
    function loadAllProjects() {
        if (!map) return;

        if (currentLayer) {
            map.removeLayer(currentLayer);
            currentLayer = null;
        }
        labelsGroup.clearLayers();
        _deselectPrevious();

        // Add logo markers
        _addProjectLogoMarkers();

        
        const propiedades = APP5T_DB.getAll('propiedades') || [];

        if (propiedades.length === 0) {
            return;
        }

        // Build GeoJSON FeatureCollection
        const features = [];
        propiedades.forEach(function (prop) {
            if (!prop.coordenadas || !prop.coordenadas.coordinates) return;
            
            
            const geom = prop.coordenadas;
            
            let isValid = false;
            try {
                function _isNum(c) {
                    if (Array.isArray(c)) {
                        if (c.length === 0) return false;
                        for (let i=0; i<c.length; i++) {
                            if (!_isNum(c[i])) return false;
                        }
                        return true;
                    }
                    return typeof c === 'number' && isFinite(c);
                }
                isValid = geom && geom.coordinates && _isNum(geom.coordinates);
            } catch(e) {}
            if (!isValid) return;

            features.push({
                type: 'Feature',
                geometry: prop.coordenadas,
                properties: {
                    id:          prop.id,
                    nombre:      prop.nombre,
                    estado:      prop.estado,
                    superficie:  prop.superficie,
                    valor_final: prop.valor_final,
                    id_etapa:    prop.id_etapa,
                    _raw:        prop          // keep full record for callbacks
                }
            });
        });

        const fc = { type: 'FeatureCollection', features: features };

        // Create GeoJSON layer
        currentLayer = L.geoJSON(fc, {
            style: function (feature) {
                return _defaultStyle(feature.properties.estado);
            },
            onEachFeature: function (feature, layer) {
                // Store propiedad id on layer for later lookup
                layer._propiedadId = feature.properties.id;

                // Click handler
                layer.on('click', function () {
                    _deselectPrevious();

                    layer.setStyle(_highlightStyle(feature.properties.estado));
                    layer.bringToFront();

                    selectedFeature = {
                        layer: layer,
                        data:  feature.properties._raw
                    };

                    if (typeof onLoteSelect === 'function') {
                        onLoteSelect(feature.properties._raw);
                    }
                });

                // Permanent tooltip for lot name (CSS-controlled visibility)
                var labelText = String(feature.properties.nombre != null ? feature.properties.nombre : '').replace(/^Lote\s*/i, '');
                layer.bindTooltip(labelText, {
                    permanent:  true,
                    direction:  'center',
                    className:  'lot-label'
                });
            }
        }).addTo(map);

        // Fit bounds to show everything
        try {
            map.fitBounds(currentLayer.getBounds(), { padding: [30, 30] });
        } catch (e) {
            // Fallback
            const def = CENTERS['El Copihue'];
            if (def) map.setView([def.lat, def.lng], 13);
        }

        _updateLabelVisibility();
    }

    // ── Public: zoomToProject ──────────────────────────────────────────────
    function zoomToProject(projectName) {
        if (typeof _deselectPrevious === 'function') _deselectPrevious();
        if (window.APP5T && typeof window.APP5T.clearLoteSelection === 'function') {
            window.APP5T.clearLoteSelection();
        }
        if (!map) return;
        if (projectName === 'todos' || projectName === 'all' || !projectName) {
             if (currentLayer) {
                  try { map.fitBounds(currentLayer.getBounds(), { padding: [30, 30] }); } catch(e){}
             }
             return;
        }
        const centre = CENTERS[projectName];
        if (centre) {
             map.flyTo([centre.lat, centre.lng], centre.zoom, { duration: 1 });
        }
    }

    // ── Public: refreshColors ──────────────────────────────────────────────
    function refreshColors() {
        if (!currentLayer || (typeof currentLayer.getLayers === 'function' && currentLayer.getLayers().length === 0)) {
            loadAllProjects();
            return;
        }

        currentLayer.eachLayer(function (layer) {
            const id = layer._propiedadId;
            if (id == null) return;

            const prop = APP5T_DB.getById('propiedades', id);
            if (!prop) return;

            // Keep selected state untouched
            if (selectedFeature && selectedFeature.layer === layer) {
                layer.setStyle(_highlightStyle(prop.estado));
            } else {
                layer.setStyle(_defaultStyle(prop.estado));
            }

            // Update stored feature properties
            if (layer.feature && layer.feature.properties) {
                layer.feature.properties.estado = prop.estado;
                layer.feature.properties._raw   = prop;
            }
        });
    }

    // ── Public: highlightLote ──────────────────────────────────────────────
    function highlightLote(propiedadId) {
        if (!currentLayer) return;

        _deselectPrevious();

        currentLayer.eachLayer(function (layer) {
            if (layer._propiedadId === propiedadId) {
                const estado = layer.feature ? layer.feature.properties.estado : 'Disponible';
                layer.setStyle(_highlightStyle(estado));
                layer.bringToFront();

                selectedFeature = {
                    layer: layer,
                    data:  layer.feature ? layer.feature.properties._raw : null
                };

                // Pan to feature
                if (layer.getBounds) {
                    map.panTo(layer.getBounds().getCenter());
                } else if (layer.getLatLng) {
                    map.panTo(layer.getLatLng());
                }
            }
        });
    }

    // ── Public: getStatusFilter ────────────────────────────────────────────
    function getStatusFilter() {
        const el = document.getElementById('map-status-filter');
        if (!el) return 'todos';
        return el.value || 'todos';
    }

    // ── Public: applyFilter ────────────────────────────────────────────────
    function applyFilter(statusFilter) {
        if (!currentLayer) return;

        const filterValue = statusFilter || getStatusFilter();

        currentLayer.eachLayer(function (layer) {
            if (!layer.feature) return;

            const estado = layer.feature.properties.estado;
            const visible = (filterValue === 'todos' || estado === filterValue);

            const el = layer.getElement ? layer.getElement() : null;
            if (el) {
                el.style.display = ''; // Force all visible to debug
            }

            // Also toggle the tooltip
            const tooltip = layer.getTooltip ? layer.getTooltip() : null;
            if (tooltip) {
                const tipEl = tooltip.getElement ? tooltip.getElement() : null;
                if (tipEl) {
                    tipel.style.display = ''; // Force all visible to debug
                }
            }
        });
    }

    // ── Public: destroy ────────────────────────────────────────────────────
    function destroy() {
        if (map) {
            map.off();
            map.remove();
            map = null;
        }
        currentLayer    = null;
        currentProject  = null;
        selectedFeature = null;
        labelsGroup     = null;
        onLoteSelect    = null;
        projectMarkersGroup = null;
    }

    function getSelectedLote() {
        return selectedFeature ? selectedFeature.data : null;
    }

    function openPopup(propiedadId, contentEl) {
        if (!map || !currentLayer) return;
        currentLayer.eachLayer(function (layer) {
            if (layer._propiedadId === propiedadId) {
                layer.unbindPopup();
                layer.bindPopup(contentEl, {
                    maxWidth: 300,
                    minWidth: 260,
                    autoPan: true
                }).openPopup();
            }
        });
    }

    // ── Public API ─────────────────────────────────────────────────────────
    var _api = {
        init:          init,
        loadAllProjects: loadAllProjects,
        zoomToProject: zoomToProject,
        refreshColors: refreshColors,
        highlightLote: highlightLote,
        getStatusFilter: getStatusFilter,
        applyFilter:   applyFilter,
        getSelectedLote: getSelectedLote,
        openPopup:     openPopup,
        deselectPrevious: _deselectPrevious,
        toggleGpsLocation: toggleGpsLocation,
        destroy:       destroy,
        COLORS:        COLORS,
        CENTERS:       CENTERS,
        _initialized:  false
    };

    // Expose map instance via getter for invalidateSize
    Object.defineProperty(_api, '_mapInstance', {
        get: function () { return map; }
    });

    return _api;

})();




