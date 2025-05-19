import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Container, Spinner } from '@chakra-ui/react';
import { confirmPayment } from '@api/services/payments';
import { useNavigate } from 'react-router-dom';
export default function PaymentsPage() {
    const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const checkPayment = async (sessionId: string) => {
    try {
      const res = await confirmPayment(sessionId);
      console.log(res, "res");
      navigate('/dashboard');
    } catch (error) {
      console.log(error, "error");
    }
  }
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    console.log('Session ID:', sessionId);
    if (sessionId) {
      checkPayment(sessionId);
    }
  }, [searchParams]);
  return (
    <Container>
        <Spinner />
    </Container>
  );
}