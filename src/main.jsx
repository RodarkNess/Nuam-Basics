import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowRight, Bell, Check, ChevronDown, Clock3, CloudUpload,
  Download, FileCheck2, FileText, Filter, HelpCircle, LayoutDashboard,
  LockKeyhole, LogOut, Menu, MoreHorizontal, Plus, Search, ShieldCheck,
  SlidersHorizontal, UploadCloud, UserRound, UsersRound, X
} from 'lucide-react';
import './styles.css';

const records = [
  { id: 'DJ-2024-00482', rut: '76.***.***-2', issuer: 'Banco de Chile', year: '2024', country: 'Chile', type: 'Declaración jurada', status: 'Validado', date: '12 oct 2024', amount: '$18.450.000' },
  { id: 'DJ-2024-00481', rut: '96.***.***-8', issuer: 'LarrainVial S.A.', year: '2024', country: 'Chile', type: 'Certificado emisor', status: 'Pendiente', date: '10 oct 2024', amount: '$9.820.000' },
  { id: 'DJ-2023-00317', rut: '76.***.***-2', issuer: 'BCI Corredor de Bolsa', year: '2023', country: 'Chile', type: 'Declaración jurada', status: 'Validado', date: '08 oct 2024', amount: '$12.600.000' },
  { id: 'DJ-2024-00479', rut: '77.***.***-4', issuer: 'Credicorp Capital', year: '2024', country: 'Perú', type: 'Declaración jurada', status: 'En revisión', date: '05 oct 2024', amount: '$6.340.000' }
];

const approvals = [
  { title: 'Entrega de respaldo · Fiscalización SII', ref: 'REQ-2024-018', owner: 'Camila Rojas', records: '12 documentos', time: 'Hace 18 min', priority: 'Alta' },
  { title: 'Conciliación de certificados · Octubre', ref: 'REQ-2024-017', owner: 'Javier Soto', records: '8 documentos', time: 'Hace 2 h', priority: 'Media' },
  { title: 'Solicitud de respaldo histórico', ref: 'REQ-2024-014', owner: 'Valentina Díaz', records: '4 documentos', time: 'Ayer', priority: 'Baja' }
];

function Logo({ light = false }) {
  return <div className={`logo ${light ? 'logo-light' : ''}`}><span className="logo-mark">n</span><span>nuam</span></div>;
}

function Login({ onLogin }) {
  const [step, setStep] = useState('credentials');
  const [email, setEmail] = useState('rodrigo.carrasco56@inacapmail.cl');
  const [password, setPassword] = useState('Admin1234*');
  const [error, setError] = useState('');
  return <main className="login-page">
    <section className="login-art">
      <Logo light />
      <div className="art-copy">
        <span className="eyebrow">GESTIÓN TRIBUTARIA</span>
        <h1>Tu información,<br /><em>siempre segura.</em></h1>
        <p>Centraliza, gestiona y recupera tus respaldos tributarios con trazabilidad de extremo a extremo.</p>
        <div className="security-pills"><span><ShieldCheck size={15} /> Protección desde el origen</span><span><LockKeyhole size={15} /> Datos cifrados</span></div>
      </div>
      <div className="art-footer">© 2024 nuam · Plataforma segura</div>
    </section>
    <section className="login-card-wrap">
      <div className="login-card">
        <div className="mobile-logo"><Logo /></div>
        <div className="login-heading"><span className="step-label">{step === 'credentials' ? '01 / 02' : '02 / 02'}</span><h2>{step === 'credentials' ? 'Bienvenido de vuelta' : 'Verificación en dos pasos'}</h2><p>{step === 'credentials' ? 'Ingresa tus credenciales para continuar.' : 'Ingresa el código enviado a tu dispositivo registrado.'}</p></div>
        {step === 'credentials' ? <form onSubmit={e => { e.preventDefault(); if (email !== 'rodrigo.carrasco56@inacapmail.cl' || password !== 'Admin1234*') { setError('El correo o la contraseña no coinciden con un usuario registrado.'); return; } setError(''); setStep('mfa'); }}>
          <label>Correo corporativo<input type="email" placeholder="nombre@empresa.com" value={email} onChange={e => setEmail(e.target.value)} required /></label>
          <label>Contraseña <a href="#">¿La olvidaste?</a><input type="password" placeholder="Ingresa tu contraseña" value={password} onChange={e => setPassword(e.target.value)} required /></label>
          {error && <div className="form-error">{error}</div>}
          <button className="primary full" type="submit">Continuar <ArrowRight size={17} /></button>
        </form> : <form onSubmit={e => { e.preventDefault(); onLogin(); }}>
          <div className="otp-row">{[0, 1, 2, 3, 4, 5].map(i => <input key={i} maxLength="1" inputMode="numeric" autoFocus={i === 0} aria-label={`Dígito ${i + 1}`} />)}</div>
          <p className="muted center">El código expira en <strong>04:52</strong></p>
          <button className="primary full" type="submit">Verificar acceso <ShieldCheck size={17} /></button>
          <button className="text-button full" type="button" onClick={() => setStep('credentials')}><ArrowLeft size={15} /> Volver a credenciales</button>
        </form>}
        <div className="login-note"><LockKeyhole size={14} /> Tu sesión estará protegida y se cerrará por inactividad.</div>
      </div>
      <p className="login-help"><HelpCircle size={14} /> ¿Necesitas ayuda? Contacta a <a href="#">Soporte nuam</a></p>
    </section>
  </main>;
}

function Sidebar({ screen, setScreen, onLogout }) {
  const items = [['dashboard', 'Resumen', LayoutDashboard], ['records', 'Calificaciones', FileText], ['upload', 'Carga masiva', UploadCloud], ['approvals', 'Aprobaciones', FileCheck2]];
  return <aside className="sidebar">
    <div className="sidebar-top"><Logo /><button className="icon-btn menu-btn"><Menu size={19} /></button></div>
    <div className="workspace"><div className="avatar">CR</div><div><strong>Corredora nuam</strong><small>Operador tributario</small></div><ChevronDown size={16} /></div>
    <nav><span className="nav-caption">MENÚ PRINCIPAL</span>{items.map(([id, label, Icon]) => <button key={id} className={screen === id ? 'active' : ''} onClick={() => setScreen(id)}><Icon size={18} /><span>{label}</span>{id === 'approvals' && <b>3</b>}</button>)}<span className="nav-caption nav-lower">GESTIÓN</span><button onClick={() => setScreen('audit')} className={screen === 'audit' ? 'active' : ''}><ShieldCheck size={18} /><span>Auditoría</span></button><button onClick={() => setScreen('users')} className={screen === 'users' ? 'active' : ''}><UsersRound size={18} /><span>Usuarios y roles</span></button></nav>
    <div className="sidebar-bottom"><div className="security-status"><span className="status-dot" /> <span><strong>Todo protegido</strong><small>Última revisión: hoy, 09:42</small></span></div><button className="logout" onClick={onLogout}><LogOut size={16} /> Cerrar sesión</button></div>
  </aside>;
}

function Header({ title, subtitle, onMenu }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  return <header className="topbar"><button className="mobile-menu icon-btn" onClick={onMenu}><Menu size={20} /></button><div><h1>{title}</h1><p>{subtitle}</p></div><div className="top-actions"><div className="popover-wrap"><button className="icon-btn" onClick={() => setNotificationsOpen(!notificationsOpen)} aria-label="Mostrar alertas"><Bell size={19} /><i /></button>{notificationsOpen && <div className="popover notifications"><strong>Alertas</strong><p><ShieldCheck size={14} /> Integridad verificada en 3 documentos</p><p><Clock3 size={14} /> Tienes 3 aprobaciones pendientes</p><button className="link-button" onClick={() => setNotificationsOpen(false)}>Marcar como leídas</button></div>}</div><div className="popover-wrap"><button className="top-user" onClick={() => setUserOpen(!userOpen)}><div className="avatar small">RC</div><span>Rodrigo Carrasco <small>Operador tributario</small></span><ChevronDown size={15} /></button>{userOpen && <div className="popover user-menu"><strong>Rodrigo Carrasco</strong><small>rodrigo.carrasco56@inacapmail.cl</small><button onClick={() => window.alert('Perfil protegido por MFA.')}>Mi perfil</button><button onClick={() => window.alert('Preferencias guardadas localmente en esta demo.')}>Preferencias</button><button onClick={() => window.location.reload()}>Cerrar sesión</button></div>}</div></div></header>;
}

function Dashboard({ setScreen, setSelected }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Todos');
  const filtered = useMemo(() => records.filter(r => (filter === 'Todos' || r.status === filter) && Object.values(r).join(' ').toLowerCase().includes(query.toLowerCase())), [query, filter]);
  return <><Header title="Resumen" subtitle="Jueves, 17 de octubre de 2024 · Buenos días, Carlos" /><div className="page-content">
    <div className="welcome-row"><div><span className="eyebrow dark">VISTA GENERAL</span><h2>Tu operación tributaria</h2></div><button className="primary" onClick={() => setScreen('upload')}><Plus size={17} /> Nueva carga</button></div>
    <div className="stat-grid"><div className="stat-card"><span className="stat-icon blue"><FileText size={18} /></span><span className="stat-label">Registros totales</span><strong>1.284</strong><small className="positive">↑ 12,4% <em>vs. mes anterior</em></small></div><div className="stat-card"><span className="stat-icon yellow"><Clock3 size={18} /></span><span className="stat-label">Pendientes de revisión</span><strong>18</strong><small className="neutral">Requieren atención</small></div><div className="stat-card"><span className="stat-icon green"><ShieldCheck size={18} /></span><span className="stat-label">Integridad verificada</span><strong>99,8%</strong><small className="positive">↑ 0,3% <em>últimos 30 días</em></small></div><div className="stat-card"><span className="stat-icon purple"><Download size={18} /></span><span className="stat-label">Descargas este mes</span><strong>247</strong><small className="neutral">18 hoy</small></div></div>
    <div className="section-heading"><div><h3>Registros recientes</h3><p>Últimas calificaciones tributarias actualizadas</p></div><button className="link-button" onClick={() => setScreen('records')}>Ver todos <ArrowRight size={15} /></button></div>
    <div className="table-card"><div className="table-toolbar"><div className="searchbox"><Search size={17} /><input placeholder="Buscar por RUT, emisor o ID..." value={query} onChange={e => setQuery(e.target.value)} /></div><div className="filter-tabs">{['Todos', 'Validado', 'Pendiente'].map(f => <button className={filter === f ? 'selected' : ''} key={f} onClick={() => setFilter(f)}>{f}</button>)}</div><button className="filter-btn" onClick={() => setFilter(filter === 'Todos' ? 'Pendiente' : 'Todos')}><SlidersHorizontal size={16} /> Filtrar <span>{filter === 'Todos' ? '2' : '1'}</span></button></div><RecordTable rows={filtered} onSelect={r => { setSelected(r); setScreen('detail'); }} /></div>
    <div className="bottom-grid"><div className="activity-card"><div className="section-heading compact"><div><h3>Actividad reciente</h3><p>Eventos de seguridad y operación</p></div><button className="icon-btn" onClick={() => window.alert('No hay más eventos recientes.')}><MoreHorizontal size={18} /></button></div>{[['Descarga verificada', 'DJ-2024-00482 · hace 12 min', 'green'], ['Nueva carga procesada', 'Carga_tributaria_oct.csv · hace 1 h', 'blue'], ['Acceso de sesión', 'Inicio de sesión exitoso · hace 3 h', 'purple']].map(([a,b,c]) => <div className="activity" key={a}><span className={`activity-dot ${c}`}><Check size={12} /></span><div><strong>{a}</strong><small>{b}</small></div><ChevronDown size={14} className="activity-arrow" /></div>)}</div><div className="integrity-card"><div className="section-heading compact"><div><h3>Salud del sistema</h3><p>Estado de tus documentos</p></div><ShieldCheck className="green-icon" size={20} /></div><div className="progress-label"><span>Integridad de archivos</span><strong>99,8%</strong></div><div className="progress"><span /></div><div className="integrity-footer"><span><i className="status-dot" /> 1.281 verificados</span><span><i className="status-dot warn" /> 3 en revisión</span></div></div></div>
  </div></>;
}

function RecordTable({ rows, onSelect }) {
  const [open, setOpen] = useState(null);
  return <div className="table-scroll"><table><thead><tr><th>ID / RUT</th><th>Emisor</th><th>Ejercicio</th><th>Tipo de documento</th><th>Estado</th><th>Actualizado</th><th /></tr></thead><tbody>{rows.map(r => <tr key={r.id} onClick={() => onSelect(r)}><td><strong>{r.id}</strong><small>{r.rut}</small></td><td>{r.issuer}</td><td>{r.year}</td><td>{r.type}</td><td><span className={`badge ${r.status === 'Validado' ? 'success' : r.status === 'Pendiente' ? 'warning' : 'info'}`}><i />{r.status}</span></td><td>{r.date}</td><td><div className="row-menu"><button className="row-action" onClick={e => { e.stopPropagation(); setOpen(open === r.id ? null : r.id); }}><MoreHorizontal size={17} /></button>{open === r.id && <div className="popover row-popover"><button onClick={e => { e.stopPropagation(); onSelect(r); }}>Ver detalle</button><button onClick={e => { e.stopPropagation(); window.alert(`Se preparó la descarga de ${r.id}.`); }}>Descargar</button></div>}</div></td></tr>)}</tbody></table>{!rows.length && <div className="empty">No se encontraron registros con esos filtros.</div>}</div>;
}

function Detail({ record, setScreen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <><Header title="Detalle de calificación" subtitle="Registros / Calificaciones / Detalle" /><div className="page-content detail-page"><button className="back-link" onClick={() => setScreen('dashboard')}><ArrowLeft size={15} /> Volver a registros</button><div className="detail-title"><div><div className="title-line"><h2>{record?.id || 'DJ-2024-00482'}</h2><span className="badge success"><i /> Validado</span></div><p>Última actualización: 12 de octubre de 2024 por Rodrigo Carrasco</p></div><div className="detail-actions"><div className="popover-wrap"><button className="secondary" onClick={() => setMenuOpen(!menuOpen)}><MoreHorizontal size={17} /> Más acciones</button>{menuOpen && <div className="popover action-menu"><button onClick={() => window.alert('Registro marcado para revisión.')}>Marcar para revisión</button><button onClick={() => window.print()}>Imprimir ficha</button></div>}</div><button className="primary" onClick={() => window.alert(`Descarga verificada: ${record?.id || 'DJ-2024-00482'}`)}><Download size={16} /> Descargar respaldo</button></div></div><div className="detail-grid"><div className="main-detail"><div className="content-card"><div className="card-title"><div><h3>Información de la calificación</h3><p>Datos principales del registro tributario</p></div><button className="link-button" onClick={() => window.alert('Edición habilitada para el perfil Operador.')}>Editar <ArrowRight size={14} /></button></div><div className="field-grid">{[['RUT contribuyente', record?.rut || '76.***.***-2'], ['Emisor', record?.issuer || 'Banco de Chile'], ['Ejercicio tributario', record?.year || '2024'], ['País', record?.country || 'Chile'], ['Tipo de documento', record?.type || 'Declaración jurada'], ['Monto total', record?.amount || '$18.450.000']].map(([a,b]) => <div className="detail-field" key={a}><span>{a}</span><strong>{b}</strong></div>)}</div></div><div className="content-card"><div className="card-title"><div><h3>Factores tributarios</h3><p>Valores asociados al ejercicio 2024</p></div><span className="muted">CLP</span></div><div className="factor-list">{[['Factor de actualización', '1,045'], ['Crédito por impuesto', '$2.180.000'], ['Retención aplicada', '$845.500']].map(([a,b]) => <div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div></div></div><div className="detail-side"><div className="document-card"><div className="doc-preview"><FileText size={38} /><span>PDF</span></div><h3>Declaración_jurada_2024.pdf</h3><p>Documento original · 2,4 MB</p><div className="hash"><ShieldCheck size={14} /><span>Hash SHA-256 verificado</span><Check size={14} /></div><button className="secondary full" onClick={() => window.alert('Hash SHA-256 verificado. Descarga autorizada.')}><Download size={16} /> Descargar documento</button></div><div className="content-card timeline-card"><div className="card-title"><div><h3>Historial de cambios</h3><p>Trazabilidad del registro</p></div></div><div className="timeline">{[['Registro creado', 'Rodrigo Carrasco · 12 oct, 09:41'], ['Documento verificado', 'Sistema · 12 oct, 09:42'], ['Carga aprobada', 'María Pérez · 12 oct, 10:03']].map(([a,b], i) => <div className="timeline-item" key={a}><span className={i === 2 ? 'timeline-dot current' : 'timeline-dot'}>{i === 2 && <Check size={10} />}</span><div><strong>{a}</strong><small>{b}</small></div></div>)}</div></div></div></div></div></>;
}

function Upload({ setScreen }) {
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const validate = () => { if (!file || file.size > 25 * 1024 * 1024) { window.alert('Selecciona un archivo válido de máximo 25 MB.'); return; } window.alert(`Archivo ${file.name} validado: 100% de filas aptas para cargar.`); setScreen('dashboard'); };
  return <><Header title="Carga masiva" subtitle="Calificaciones / Nueva carga" /><div className="page-content narrow-page"><button className="back-link" onClick={() => setScreen('dashboard')}><ArrowLeft size={15} /> Volver al resumen</button><div className="screen-heading"><span className="eyebrow dark">IMPORTAR DATOS</span><h2>Carga una nueva fuente</h2><p>Validaremos tus datos antes de incorporarlos al sistema.</p></div><div className="upload-layout"><div><div className={`dropzone ${drag ? 'drag' : ''}`} onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={e => { e.preventDefault(); setDrag(false); setFile(e.dataTransfer.files[0]); }}><input type="file" accept=".csv,.xlsx,.pdf" onChange={e => setFile(e.target.files[0])} />{file ? <><div className="upload-icon success-bg"><Check size={24} /></div><h3>{file.name}</h3><p>{(file.size / 1024 / 1024).toFixed(2)} MB · Listo para validar</p><button className="text-button" onClick={() => setFile(null)}><X size={14} /> Quitar archivo</button></> : <><div className="upload-icon"><CloudUpload size={25} /></div><h3>Arrastra tu archivo aquí</h3><p>o <strong>selecciona desde tu equipo</strong></p><small>Formatos permitidos: .XLSX, .CSV, .PDF · Máximo 25 MB</small></>}</div><div className="upload-actions"><button className="secondary" onClick={() => setScreen('dashboard')}>Cancelar</button><button className="primary" disabled={!file} onClick={validate}>Validar archivo <ArrowRight size={16} /></button></div></div><div className="upload-info"><h3>Antes de cargar</h3>{[['01', 'Revisa el formato', 'Asegúrate de que las columnas coincidan con la plantilla.'], ['02', 'Protege tus datos', 'Nunca incluyas contraseñas o información no solicitada.'], ['03', 'Valida y confirma', 'Podrás revisar los errores antes de guardar.']].map(([n,a,b]) => <div className="info-step" key={n}><span>{n}</span><div><strong>{a}</strong><p>{b}</p></div></div>)}<a href="#" className="download-template" onClick={e => { e.preventDefault(); window.alert('Plantilla descargable disponible al conectar Supabase Storage.'); }}><Download size={15} /> Descargar plantilla de carga</a></div></div></div></>;
}

function Approvals({ setScreen }) {
  const [priority, setPriority] = useState('Todas');
  const [items, setItems] = useState(approvals);
  const [open, setOpen] = useState(null);
  const filtered = priority === 'Todas' ? items : items.filter(a => a.priority === priority);
  const resolve = (ref, action) => { setItems(items.filter(a => a.ref !== ref)); window.alert(`${ref}: solicitud ${action}.`); };
  return <><Header title="Aprobaciones" subtitle="Revisa y autoriza solicitudes de respaldo" /><div className="page-content"><div className="welcome-row"><div><span className="eyebrow dark">BANDEJA DE SUPERVISIÓN</span><h2>Solicitudes pendientes <span className="count-pill">{items.length}</span></h2></div><div className="popover-wrap"><button className="secondary" onClick={() => setOpen(!open)}><Filter size={16} /> Filtrar</button>{open && <div className="popover approval-filter">{['Todas', 'Alta', 'Media', 'Baja'].map(value => <button key={value} onClick={() => { setPriority(value); setOpen(false); }}>{value} prioridad</button>)}</div>}</div></div><div className="approval-list">{filtered.map((a, i) => <div className="approval-card" key={a.ref}><div className={`approval-mark ${i === 0 ? 'high' : ''}`}><FileCheck2 size={20} /></div><div className="approval-body"><div className="approval-top"><span className="badge neutral">{a.priority} prioridad</span><small>{a.time}</small></div><h3>{a.title}</h3><p><strong>{a.ref}</strong> · Solicitado por {a.owner} · {a.records}</p><div className="approval-actions"><button className="secondary" onClick={() => setScreen('detail')}>Revisar documentos</button><button className="primary" onClick={() => resolve(a.ref, 'aprobada')}><Check size={15} /> Aprobar</button><button className="reject" onClick={() => resolve(a.ref, 'rechazada')}>Rechazar</button></div></div><button className="icon-btn approval-more" onClick={() => window.alert(`${a.ref}: ${a.records} asociados.`)}><MoreHorizontal size={18} /></button></div>)}</div>{!filtered.length && <div className="empty-page"><Check size={36} /><h2>No hay solicitudes pendientes</h2><p>La bandeja está al día para este filtro.</p></div>}</div></>;
}

function Placeholder({ title, setScreen }) { return <><Header title={title} subtitle="Administración / Consulta" /><div className="page-content empty-page"><ShieldCheck size={36} /><h2>Módulo protegido</h2><p>Esta vista está disponible para perfiles autorizados. La trazabilidad y los permisos se verifican en el servidor.</p><button className="primary" onClick={() => setScreen('dashboard')}>Volver al resumen</button></div></>; }

function App() {
  const [logged, setLogged] = useState(false);
  const [screen, setScreen] = useState('dashboard');
  const [selected, setSelected] = useState(records[0]);
  const [mobileNav, setMobileNav] = useState(false);
  if (!logged) return <Login onLogin={() => setLogged(true)} />;
  const content = screen === 'dashboard' || screen === 'records' ? <Dashboard setScreen={setScreen} setSelected={setSelected} /> : screen === 'detail' ? <Detail record={selected} setScreen={setScreen} /> : screen === 'upload' ? <Upload setScreen={setScreen} /> : screen === 'approvals' ? <Approvals setScreen={setScreen} /> : <Placeholder title={screen === 'audit' ? 'Auditoría' : 'Usuarios y roles'} setScreen={setScreen} />;
  return <div className="app-shell"><div className={`sidebar-wrap ${mobileNav ? 'open' : ''}`}><Sidebar screen={screen} setScreen={id => { setScreen(id); setMobileNav(false); }} onLogout={() => setLogged(false)} /></div>{mobileNav && <button className="nav-overlay" onClick={() => setMobileNav(false)} /> }<main className="main-content">{React.cloneElement(content, { onMenu: () => setMobileNav(true) })}</main></div>;
}

createRoot(document.getElementById('root')).render(<App />);
