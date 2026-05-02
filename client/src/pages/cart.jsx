import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/authcontext";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, updateQty, clearCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold mb-8">
        Your <span className="text-accent">Cart</span>
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-6 text-text-muted">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-text-muted text-xl mb-6">Your cart is empty</p>
          <Link 
            to="/" 
            className="inline-block bg-red-600 text-white px-6 py-3  rounded-lg font-semibold hover:bg-red-600 hover:scale-105  tratransition-all ease-in-out"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={item._id}
              className="animate-slide-in bg-card rounded-xl border border-border p-4 hover:border-accent/30 transition-all"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                {/* Product Image */}
                <div className="w-20 h-20 rounded-lg bg-secondary overflow-hidden shrink-0">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-text-primary truncate">
                    {item.name}
                  </h4>
                  <p className="text-text-muted mt-1">
                    <span className="text-accent font-semibold">₹{item.price}</span>
                    <span className="mx-2">×</span>
                    <span className="bg-secondary px-2 py-0.5 rounded">{item.qty}</span>
                  </p>
                </div>

                {/* Subtotal & Remove */}
                <div className="text-right">
                  <p className="text-lg font-bold text-accent">
                    ₹{item.price * item.qty}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.productId, item.qty - 1)}
                      className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-text-muted hover:bg-danger hover:text-white transition-all"
                    >
                      -
                    </button>
                    <span className="font-semibold w-8 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.productId, item.qty + 1)}
                      className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-text-muted hover:bg-accent hover:text-white transition-all"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-text-muted hover:text-danger text-sm mt-1 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="mt-8 bg-card rounded-xl border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-text-muted">Subtotal</span>
              <span className="text-xl font-semibold">₹{total}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-text-muted">Shipping</span>
              <span className="text-success">Free</span>
            </div>
            <div className="border-t border-border my-4"></div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold">Total</span>
              <span className="text-3xl font-bold text-accent">₹{total}</span>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="flex-1 py-3 border border-border rounded-lg text-text-muted hover:border-danger hover:text-danger hover:scale-[1.02] transition-all"
              >
                Clear Cart
              </button>
              <Link 
                to="/checkout"
                className="flex-1 text-center bg-red-600 text-white py-3 bg-accent text-primary rounded-lg font-semibold hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
