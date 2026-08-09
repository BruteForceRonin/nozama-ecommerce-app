import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext"

function ProductList() {
  const [products, setProducts] = useState([]);
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = useCart() ;

  useEffect(() => {
    const fetchProducts = async()=>{
      try{
        const [res1,res2,res3] = await Promise.all([
          fetch("https://dummyjson.com/products/category/smartphones"),
          fetch("https://dummyjson.com/products/category/laptops"),
          fetch("https://dummyjson.com/products/category/sports-accessories")
        ])

        const data1 = await res1.json()
        const data2 = await res2.json()
        const data3 = await res3.json()
        
        const allProducts = [...data1.products,...data2.products,...data3.products]
        setProducts(allProducts)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchProducts()
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedId(product.id);
    
    // Reset button color after 1 second
    setTimeout(() => {
      setAddedId(null);
    }, 1000);
  };

  return (
    <main className="container-fluid py-5" style={{ backgroundColor: 'var(--light-beige)' }}>
      <div className="container">
        <h1 className="mb-4 fw-bold">Our Products</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {products.map((product) => (
            <div key={product.id} className="col">
              <div className="card h-100 shadow-sm">
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'contain', padding: '10px', backgroundColor: '#f8f8f8' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text text-muted flex-grow-1">{product.description?.substring(0, 50)}...</p>
                  <p className="fw-bold fs-5" style={{ color: 'var(--navy-blue)' }}>$ {product.price}</p>
                  <button 
                    className="btn w-100 fw-semibold"
                    style={{ 
                      backgroundColor: addedId === product.id ? '#28a745' : 'var(--button-color)',
                      color: 'white',
                      transition: 'background-color 0.3s ease'
                    }}
                    onClick={() => handleAddToCart(product)}
                  >
                    {addedId === product.id ? '✓ Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ProductList;
