import { useState } from 'react'

function PublicarProducto({ onProductoPublicado }) {
  // Estados para almacenar los datos del formulario
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [precio, setPrecio] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [nombreProductor, setNombreProductor] = useState('')
  const [telefonoProductor, setTelefonoProductor] = useState('')

  // Estado para mostrar mensajes de validación
  const [mensaje, setMensaje] = useState('')

  // Función para validar y publicar el producto
  const validarYPublicar = async (evento) => {
    evento.preventDefault()

    // Limpiar mensaje anterior
    setMensaje('')
    // Validar nombre del productor
if (nombreProductor.trim() === '') {
  setMensaje('Ingrese el nombre del productor')
  return
}

// Validar teléfono del productor
if (telefonoProductor.trim() === '') {
  setMensaje('Ingrese el teléfono de contacto')
  return
}

// Validar formato del teléfono
if (!/^[0-9+\s()-]{7,20}$/.test(telefonoProductor.trim())) {
  setMensaje('Ingrese un teléfono válido')
  return
}

    // Validar nombre vacío
    if (nombre.trim() === '') {
      setMensaje('Ingrese el nombre del producto')
      return
    }

    // Validar descripción vacía
    if (descripcion.trim() === '') {
      setMensaje('Ingrese la descripción del producto')
      return
    }

    // Validar cantidad vacía
    if (cantidad.trim() === '') {
      setMensaje('Ingrese la cantidad del producto')
      return
    }

    // Validar precio vacío
    if (precio.trim() === '') {
      setMensaje('Ingrese el precio del producto')
      return
    }

    // Validar que el precio contenga solo números
    if (!/^\d+$/.test(precio.trim())) {
      setMensaje('El precio debe contener solo números')
      return
    }

    // Validar que el precio no sea negativo
    const precioNumero = Number(precio)

    if (precioNumero < 0) {
      setMensaje('El precio no puede ser negativo')
      return
    }

    // Validar ubicación vacía
    if (ubicacion.trim() === '') {
      setMensaje('Ingrese la ubicación del producto')
      return
    }

    // Validar longitud del nombre
    if (nombre.trim().length > 30) {
      setMensaje(
        'El nombre no puede superar los 30 caracteres'
      )
      return
    }

    // Validar caracteres especiales en el nombre
    const caracteresEspeciales =
      /[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]/

    if (caracteresEspeciales.test(nombre.trim())) {
      setMensaje(
        'El nombre no permite caracteres especiales'
      )
      return
    }

    // Validar longitud de la descripción
    if (descripcion.trim().length > 100) {
      setMensaje(
        'La descripción no puede superar los 100 caracteres'
      )
      return
    }

    // Validar que la cantidad contenga solamente números
    if (!/^\d+$/.test(cantidad.trim())) {
      setMensaje(
        'La cantidad debe contener solo números'
      )
      return
    }

    // Convertir la cantidad a número
    const cantidadNumero = Number(cantidad)

    // Validar que la cantidad sea mayor que cero
    if (cantidadNumero <= 0) {
      setMensaje(
        'La cantidad debe ser mayor que 0'
      )
      return
    }

    // Validar longitud de la ubicación
    if (ubicacion.trim().length > 50) {
      setMensaje(
        'La ubicación no puede superar los 50 caracteres'
      )
      return
    }

    // Validar caracteres especiales en la ubicación
    if (caracteresEspeciales.test(ubicacion.trim())) {
      setMensaje(
        'La ubicación no permite caracteres especiales'
      )
      return
    }


// Preparar los datos completos del producto
const producto = {
  nombreProductor: nombreProductor.trim(),
  telefonoProductor: telefonoProductor.trim(),
  nombre: nombre.trim(),
  descripcion: descripcion.trim(),
  cantidad: Number(cantidad),
  precio: Number(precio),
  ubicacion: ubicacion.trim(),
}

    try {
      // Enviar el producto a la API
      const respuesta = await fetch('/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      })

      const datos = await respuesta.json()

      // Comprobar si la API rechazó la publicación
      if (!respuesta.ok) {
        setMensaje(
          datos.error || 'No se pudo publicar el producto'
        )
        return
      }

      // Enviar el producto guardado al componente principal
      onProductoPublicado(datos.producto)

      // Mostrar confirmación
      setMensaje('Producto publicado correctamente')

      // Limpiar el formulario
      setNombre('')
      setDescripcion('')
      setCantidad('')
      setPrecio('')
      setUbicacion('')
      setNombreProductor('')
      setTelefonoProductor('')
    } catch (error) {
      setMensaje('No fue posible conectar con la API')
    }

  }

  return (
    <section className="publicar-producto">
      <h2>Publicar producto</h2>

      <form onSubmit={validarYPublicar}>
        
        {/* Campo para el nombre del productor */}
        <label htmlFor="nombreProductor">
          Nombre del productor
        </label>

        <input
          id="nombreProductor"
          type="text"
          value={nombreProductor}
          onChange={(evento) =>
            setNombreProductor(evento.target.value)
          }
          placeholder="Nombre del productor"
        />

        {/* Campo para el teléfono del productor */}
        <label htmlFor="telefonoProductor">
          Teléfono de contacto
        </label>

        <input
          id="telefonoProductor"
          type="tel"
          value={telefonoProductor}
          onChange={(evento) =>
            setTelefonoProductor(evento.target.value)
          }
          placeholder="Ej. 3001234567"
        />


        {/* Campo para el nombre */}
        <label htmlFor="nombre">
          Nombre del producto
        </label>

        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(evento) =>
            setNombre(evento.target.value)
          }
          placeholder="Nombre del producto"
        />

        {/* Campo para la descripción */}
        <label htmlFor="descripcion">
          Descripción
        </label>

        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(evento) =>
            setDescripcion(evento.target.value)
          }
          placeholder="Descripción"
        />

        {/* Campo para la cantidad */}
        <label htmlFor="cantidad">
          Cantidad disponible
        </label>

        <input
          id="cantidad"
          type="text"
          value={cantidad}
          onChange={(evento) =>
            setCantidad(evento.target.value)
          }
          placeholder="Cantidad disponible"
        />
<label htmlFor="precio">
  Precio por unidad (COP)
</label>

<input
  id="precio"
  type="number"
  min="0"
  value={precio}
  onChange={(evento) =>
    setPrecio(evento.target.value)
  }
  placeholder="Ej. 2500"
/>
        {/* Campo para la ubicación */}
        <label htmlFor="ubicacion">
          Ubicación
        </label>

        <input
          id="ubicacion"
          type="text"
          value={ubicacion}
          onChange={(evento) =>
            setUbicacion(evento.target.value)
          }
          placeholder="Ubicación"
        />

        <button type="submit">
          Publicar producto
        </button>
      </form>

      {/* Mensaje de validación o confirmación */}
      {mensaje && (
        <p className="mensaje">
          {mensaje}
        </p>
      )}
    </section>
  )
}

export default PublicarProducto