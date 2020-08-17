import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle
} from 'react-icons/fi';

import { useToast } from '../../../hooks/toast';
import { Container } from './styles';

const icons = {
  info: <FiInfo size={22} />,
  error: <FiAlertCircle size={22} />,
  success: <FiCheckCircle size={22} />
};

const Toast = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);
  return (
    <Container
      type={message.type}
      hasdescription={!!message.description}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={16} />
      </button>
    </Container>
  );
};

export default Toast;
