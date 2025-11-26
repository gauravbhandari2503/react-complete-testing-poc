import { useState } from 'react';
import { Form, Input, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../store/hooks';
import { addContact } from '../../store/slices/userInformation';
import { validateName, validateEmail, validatePhone, validateMessage } from '../../utils/validation';
import { Button } from '../Button/Button';

const { TextArea } = Input;

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactFormProps {
  onSuccess?: () => void;
}

export const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ContactFormData) => {
    setLoading(true);
    try {
      // Add contact to Redux store
      dispatch(addContact(values));
      
      // Show success message
      message.success('Contact information submitted successfully!');
      
      // Reset form
      form.resetFields();
      
      // Call success callback if provided
      onSuccess?.();
    } catch (error) {
      message.error('Failed to submit contact information');
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="contactForm"
      onFinish={handleSubmit}
      layout="vertical"
      autoComplete="off"
      className="max-w-2xl mx-auto"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: 'Please enter your name' },
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              const result = validateName(value);
              return result === true ? Promise.resolve() : Promise.reject(new Error(result));
            },
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Enter your full name"
          size="large"
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              const result = validateEmail(value);
              return result === true ? Promise.resolve() : Promise.reject(new Error(result));
            },
          },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Enter your email address"
          size="large"
          type="email"
        />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          { required: true, message: 'Please enter your phone number' },
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              const result = validatePhone(value);
              return result === true ? Promise.resolve() : Promise.reject(new Error(result));
            },
          },
        ]}
      >
        <Input
          prefix={<PhoneOutlined />}
          placeholder="Enter your phone number"
          size="large"
        />
      </Form.Item>

      <Form.Item
        label="Message"
        name="message"
        rules={[
          { required: true, message: 'Please enter your message' },
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              const result = validateMessage(value);
              return result === true ? Promise.resolve() : Promise.reject(new Error(result));
            },
          },
        ]}
      >
        <TextArea
          placeholder="Enter your message (minimum 10 characters)"
          rows={4}
          maxLength={500}
          showCount
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          block
        >
          Submit Contact
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
