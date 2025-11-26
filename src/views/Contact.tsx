import { Card } from 'antd';
import ContactForm from '../components/Form/ContactForm';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Navigate to users page after successful submission
    setTimeout(() => {
      navigate('/users');
    }, 1500);
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          We'd love to hear from you. Please fill out the form below.
        </p>
      </div>

      <Card className="shadow-lg">
        <ContactForm onSuccess={handleSuccess} />
      </Card>
    </div>
  );
}

export default Contact;
