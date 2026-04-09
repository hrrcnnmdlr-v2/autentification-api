import { useEffect, useState } from 'react';
import { Container, Paper, Title, Text, Button, Stack, Loader, Center } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface UserData {
  email: string;
  id?: number;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          // Якщо токен невалідний або прострочений
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Container size="xs" py="xl">
      <Paper withBorder shadow="md" p="xl" radius="md">
        <Stack>
          <Title order={2} ta="center">User Profile</Title>
          <hr style={{ opacity: 0.2, width: '100%' }} />
          
          <Text size="lg">
            <b>Email:</b> {user?.email}
          </Text>
          
          <Text c="dimmed" size="sm">
            You are successfully authenticated using a custom JWT Guard.
          </Text>

          <Button color="red" variant="light" fullWidth mt="xl" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}