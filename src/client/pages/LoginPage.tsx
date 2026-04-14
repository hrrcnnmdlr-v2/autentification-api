import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Stack,
  Text,
  Anchor,
  Group,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import api, { publicApi } from '../api/axios';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({ initialValues: { email: '', password: '' } });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/profile');
    }
  }, [navigate]);

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const { data } = await publicApi.post('/auth/login', values);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      navigate('/profile');
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Invalid email or password';

      notifications.show({
        title: 'Login Failed',
        message: Array.isArray(message) ? message[0] : message,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Group mb="md">
        <Anchor
          size="sm"
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          ← Back to Menu
        </Anchor>
      </Group>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Title ta="center" mb="lg">
          Login
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Email"
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              required
              {...form.getInputProps('password')}
            />
            <Button type="submit" fullWidth loading={loading}>
              Login
            </Button>
          </Stack>
        </form>
        <Text c="dimmed" size="sm" ta="center" mt="md">
          Don't have an account?{' '}
          <Anchor
            size="sm"
            component="button"
            onClick={() => navigate('/register')}
          >
            Register here
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}
