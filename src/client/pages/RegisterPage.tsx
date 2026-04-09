import { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Stack, Text, Anchor, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import api from '@/client/api/axios';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Invalid email'),
      password: (v) => (v.length < 6 ? 'Min 6 characters' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      await api.post('/auth/register', values);
      notifications.show({
        title: 'Success!',
        message: 'Account created successfully. Please login.',
        color: 'green',
      });
      navigate('/login');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed';
      notifications.show({
        title: 'Registration Error',
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
        <Anchor size="sm" onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          ← Back to Menu
        </Anchor>
      </Group>

      <Paper withBorder shadow="md" p={30} radius="md">
        <Title ta="center" mb="lg">Create Account</Title>
        
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput label="Email" placeholder="your@email.com" required {...form.getInputProps('email')} />
            <PasswordInput label="Password" placeholder="Min 6 characters" required {...form.getInputProps('password')} />
            <Button type="submit" fullWidth loading={loading}>Sign Up</Button>
          </Stack>
        </form>

        <Text c="dimmed" size="sm" ta="center" mt="md">
          Already have an account?{' '}
          <Anchor size="sm" component="button" onClick={() => navigate('/login')}>
            Login here
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}