// src/components/ThankYouPage.jsx
import './ThankYouPage.css';
import {Link} from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div id="thank-page">
      <div className="thank-container">
        <img
          src="https://lazurde.bloomreach.io/delivery/resources/content/gallery/channel-templates/new-3-by-3-images/lazurde/split-banner-ksa/diamond_ksa_mobile-at-3x.jpg"
          alt="Product"
          className="product-image-thank"
        />
        <div className="thank-content">
          <h2 className="thank-title">Thank you!</h2>
          <p className="thank-text">
            Thank you very much for using our service.
            We hope you had a wonderful and beneficial experience that will make your life better.
            See you next time.
          </p>
          <div className="social-buttons">
            <button className="back-link-button"><Link to='/'>Back to home</Link></button>
            <button className="check-order-button "><Link to='/listorder'>Check Order</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;

