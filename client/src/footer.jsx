import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-gray-300 ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        <div>
          <h3 className="text-white text-xl font-bold mb-3">AUREX</h3>
          <p className="text-sm">
            Modern streetwear designed for style, comfort, and confidence.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/">Men</Link></li>
            <li><Link to="/">Women</Link></li>
            <li><Link to="/">Kids</Link></li>
            <li><Link to="/">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/">Careers</Link></li>
            <li><Link to="/">Press</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/">Contact</Link></li>
            <li><Link to="/">Shipping</Link></li>
            <li><Link to="/">Returns</Link></li>
            <li><Link to="/">FAQ</Link></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-800 text-center py-4 text-sm">
        © {new Date().getFullYear()} AUREX. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;