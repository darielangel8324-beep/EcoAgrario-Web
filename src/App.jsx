
import { useEffect, useState } from 'react'
import PublicarProducto from './components/PublicarProducto'
import './App.css'

function App() {
  const [productos, setProductos] = useState([])
  const [resultados, setResultados] = useState([])
  const [textoBusqueda, setTextoBusqueda] = useState('')
  const [mostrarPublicar, setMostrarPublicar] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [errorAPI, setErrorAPI] = useState('')
  const [mensaje, setMensaje] = useState('')
  // Consultar los productos guardados en MongoDB
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await fetch('/api/productos')

        if (!respuesta.ok) {
          throw new Error('No se pudieron consultar los productos')
        }

        const datos = await respuesta.json()

        setProductos(datos)
        setResultados(datos)
      } catch (error) {
        setErrorAPI('No fue posible conectar con la API de EcoAgrario')
      } finally {
        setCargando(false)
      }
    }

    cargarProductos()
  }, [])


  // Normalizar texto para ignorar tildes y mayúsculas
  const normalizarTexto = (texto) =>
    texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()

  // Buscar productos por nombre
  const buscarProducto = () => {
    const texto = normalizarTexto(textoBusqueda)

    const encontrados = productos.filter((producto) =>
      normalizarTexto(producto.nombre).includes(texto)
    )

    setResultados(encontrados)
  }


  // Recibir el producto guardado por la API

const agregarProducto = (nuevoProducto) => {
  const productosActualizados = [
    nuevoProducto,
    ...productos,
  ]

  setProductos(productosActualizados)
  setResultados(productosActualizados)
  setTextoBusqueda('')
  setMostrarPublicar(false)
  setMensaje('Producto publicado correctamente')
}

  return (
    <div className="contenedor">
      <header className="encabezado">
        <h1>EcoAgrario</h1>
        <p>
          Consulta y búsqueda de productos agrícolas
        </p>
      </header>

      <main>
        <section className="busqueda">
          <h2>Buscar producto</h2>

          <input
            type="text"
            placeholder="Escriba un producto"
            value={textoBusqueda}
            onChange={(evento) =>
              setTextoBusqueda(evento.target.value)
            }
          />

          <button
            type="button"
            onClick={buscarProducto}
          >
            Buscar producto
          </button>
        </section>

{mensaje && (
  <p role="status">{mensaje}</p>
)}

        <section className="productos">
          <h2>Productos disponibles</h2>

          {cargando ? (
            <p>Cargando productos...</p>
          ) : errorAPI ? (
            <p>{errorAPI}</p>
          ) : resultados.length > 0 ? (
            <ul>
              {resultados.map((producto) => (
                <li key={producto._id}>
                  <strong>{producto.nombre}</strong>
                  <p>{producto.descripcion}</p>
                  <p>
                    Cantidad: {producto.cantidad}
                  </p>
                  <p>
                    Precio: $
                    {Number(producto.precio).toLocaleString('es-CO')} COP
                  </p>
                  <p>
                    Ubicación: {producto.ubicacion}
                  </p>
                  <p>
                    Estado: {producto.estado}
                  </p>
                  
<p>
  Productor: {producto.nombreProductor || 'No disponible'}
</p>

<p>
  Teléfono: {producto.telefonoProductor || 'No disponible'}
</p>

{producto.telefonoProductor && (
  <div>
    <a href={`tel:${producto.telefonoProductor}`}>
      Llamar al productor
    </a>

    {' | '}

    <a
      href={`https://wa.me/${producto.telefonoProductor.replace(/\D/g, '').length === 10
        ? `57${producto.telefonoProductor.replace(/\D/g, '')}`
        : producto.telefonoProductor.replace(/\D/g, '')}`}
      target="_blank"
      rel="noreferrer"
    >
      Contactar por WhatsApp
    </a>
  </div>
)}

                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </section>

        <section className="accion-publicar">
          <button
            type="button"
            onClick={() =>
              setMostrarPublicar(!mostrarPublicar)
            }
          >
            {mostrarPublicar
              ? 'Ocultar publicación'
              : 'Publicar producto'}
          </button>
        </section>

        {mostrarPublicar && (
          <PublicarProducto
            onProductoPublicado={agregarProducto}
          />
        )}
      </main>
    </div>
  )
}

export default App
