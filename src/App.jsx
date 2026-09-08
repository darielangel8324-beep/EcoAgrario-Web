import { useState } from 'react'
import PublicarProducto from './components/PublicarProducto'
import './App.css'

function App() {
  // Productos iniciales del proyecto EcoAgrario
  const productosIniciales = [
    'Tomate - Producto activo',
    'Cebolla - Producto activo',
    'Papa - Producto reservado',
    'Yuca - Producto activo',
    'Plátano - Producto agotado',
  ]

  // Recuperar productos guardados en el navegador
  const productosGuardados =
    JSON.parse(localStorage.getItem('productosEcoAgrario')) || []

  // Combinar productos iniciales y productos publicados
  const productosInicialesCompletos = [
    ...productosIniciales,
    ...productosGuardados,
  ]

  // Estado del texto de búsqueda
  const [textoBusqueda, setTextoBusqueda] = useState('')

  // Estado de los productos mostrados
  const [resultados, setResultados] = useState(
    productosInicialesCompletos
  )

  // Estado para mostrar u ocultar el formulario
  const [mostrarPublicar, setMostrarPublicar] = useState(false)

  // Buscar productos
  const buscarProducto = () => {
    const texto = textoBusqueda.trim().toLowerCase()

    if (texto === '') {
      setResultados(productosInicialesCompletos)
      return
    }

    const encontrados = productosInicialesCompletos.filter(
      (producto) =>
        producto.toLowerCase().includes(texto)
    )

    setResultados(encontrados)
  }

  // Recibir un nuevo producto desde el componente de publicación
  const agregarProducto = (nuevoProducto) => {
    const productosActualizados = [
      ...productosInicialesCompletos,
      nuevoProducto,
    ]

    // Guardar productos publicados en el navegador
    const productosPublicados = [
      ...productosGuardados,
      nuevoProducto,
    ]

    localStorage.setItem(
      'productosEcoAgrario',
      JSON.stringify(productosPublicados)
    )

    // Actualizar la lista visible
    setResultados(productosActualizados)

    // Limpiar búsqueda
    setTextoBusqueda('')

    // Mostrar la lista actualizada
    setMostrarPublicar(false)
  }

  return (
    <div className="contenedor">

      {/* Encabezado principal */}
      <header className="encabezado">
        <h1>EcoAgrario</h1>
        <p>
          Consulta y búsqueda de productos agrícolas
        </p>
      </header>

      <main>

        {/* Módulo de búsqueda */}
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

        {/* Lista de productos */}
        <section className="productos">
          <h2>Productos disponibles</h2>

          {resultados.length > 0 ? (
            <ul>
              {resultados.map((producto, indice) => (
                <li key={indice}>
                  {producto}
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </section>

        {/* Botón para mostrar el formulario */}
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

        {/* Formulario de publicación */}
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