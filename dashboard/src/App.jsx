import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [usersData, setUsersData] = useState({ count: 0, users: [] });
  const [productsData, setProductsData] = useState({ count: 0, countByCategory: {}, products: [] });
  const [lastProduct, setLastProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch usuarios
        const resUsers = await fetch('http://localhost:3000/api/users');
        const dataUsers = await resUsers.json();
        setUsersData(dataUsers);

        // Fetch productos
        const resProducts = await fetch('http://localhost:3000/api/products');
        const dataProducts = await resProducts.json();
        setProductsData(dataProducts);

        // Fetch detalle del último producto si existen productos
        if (dataProducts.products && dataProducts.products.length > 0) {
          const lastId = dataProducts.products[dataProducts.products.length - 1].id;
          const resLastProd = await fetch(`http://localhost:3000/api/products/${lastId}`);
          const dataLastProd = await resLastProd.json();
          setLastProduct(dataLastProd);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Cargando Dashboard...</div>;
  }

  const categories = Object.entries(productsData.countByCategory || {});

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Panel de Control - Métricas del Negocio</h1>
      </header>

      {/* 1. Paneles con totales */}
      <section className="metrics-grid">
        <div className="card metric-card">
          <h3>Total de Productos</h3>
          <p className="metric-value">{productsData.count}</p>
        </div>
        <div className="card metric-card">
          <h3>Total de Usuarios</h3>
          <p className="metric-value">{usersData.count}</p>
        </div>
        <div className="card metric-card">
          <h3>Total de Categorías</h3>
          <p className="metric-value">{categories.length}</p>
        </div>
      </section>

      {/* 2. Detalle de último producto y Categorías */}
      <section className="details-grid">
        <div className="card detail-card">
          <h2>Último Producto Creado</h2>
          {lastProduct ? (
            <div className="product-detail">
              <h3>{lastProduct.name}</h3>
              <p><strong>Descripción:</strong> {lastProduct.description}</p>
              <p><strong>Precio:</strong> ${lastProduct.price}</p>
              <p><strong>Categoría:</strong> {lastProduct.category ? lastProduct.category.name : 'N/A'}</p>
              {lastProduct.imageUrl && (
                <img
                  src={`http://localhost:3000${lastProduct.imageUrl}`}
                  alt={lastProduct.name}
                  className="product-img"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
            </div>
          ) : (
            <p>No hay productos registrados.</p>
          )}
        </div>

        <div className="card categories-card">
          <h2>Totales por Categoría</h2>
          <div className="categories-list">
            {categories.length > 0 ? (
              categories.map(([category, count]) => (
                <div key={category} className="category-item">
                  <span className="cat-name">{category}</span>
                  <span className="cat-count">{count}</span>
                </div>
              ))
            ) : (
              <p>No hay categorías registradas.</p>
            )}
          </div>
        </div>
      </section>

      {/* 3. Listado de productos */}
      <section className="card table-card">
        <h2>Listado de Productos</h2>
        <div className="table-responsive">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {productsData.products && productsData.products.length > 0 ? (
                productsData.products.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>{prod.name}</td>
                    <td>{prod.description}</td>
                    <td>{prod.category || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No hay productos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;