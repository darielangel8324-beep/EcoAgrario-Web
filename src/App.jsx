import { useState } from 'react'
import PublicarProducto from './components/PublicarProducto'
import './App.css'

function App() {
  // Productos de ejemplo del proyecto EcoAgrario
  const productosIniciales = [
    'Tomate - Producto activo',
    'Cebolla - Producto activo',
    'Papa - Producto reservado',
    'Yuca - Producto activo',
    'Plátano - Producto agotado',
  ]

  // Estado para almacenar el texto de búsqueda
  const [textoBusqueda, setTextoBusqueda] = useState('')

  // Estado para mostrar los resultados
  const [resultados, setResultados] = useState(productosIniciales)

  // Estado para mostrar u ocultar el formulario de publicación
  const [mostrarPublicar, setMostrarPublicar] = useState(false)

  // Función para buscar productos
  const buscarProducto = () => {
    const texto = textoBusqueda.trim().toLowerCase()

    // Si el campo está vacío, mostrar todos los productos
    if (texto === '') {
      setResultados(productosIniciales)
      return
    }

    // Buscar productos ignorando mayúsculas y minúsculas
    const encontrados = productosIniciales.filter((producto) =>
      producto.toLowerCase().includes(texto)
    )

    setResultados(encontrados)
  }

  return (
    <div className="contenedor">
      {/* Encabezado principal */}
      <header className="encabezado">
        <h1>EcoAgrario</h1>
        <p>Consulta y búsqueda de productos agrícolas</p>
      </header>

      <main>
        {/* Módulo de búsqueda */}
        <section className="busqueda">
          <h2>Buscar producto</h2>

          <input
            type="text"
            placeholder="Escriba un producto"
            value={textoBusqueda}
            onChange={(evento) => setTextoBusqueda(evento.target.value)}
          />

          <button type="button" onClick={buscarProducto}>
            Buscar producto
          </button>
        </section>

        {/* Lista de productos */}
        <section className="productos">
          <h2>Productos disponibles</h2>

          {resultados.length > 0 ? (
            <ul>
              {resultados.map((producto, indice) => (
                <li key={indice}>{producto}</li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </section>

        {/* Botón para mostrar el formulario de publicación */}
        <section className="accion-publicar">
          <button
            type="button"
            onClick={() => setMostrarPublicar(!mostrarPublicar)}
          >
            {mostrarPublicar
              ? 'Ocultar publicación'
              : 'Publicar producto'}
          </button>
        </section>

        {/* Componente de publicación */}
        {mostrarPublicar && <PublicarProducto />}
      </main>
    </div>
  )
}

export default App