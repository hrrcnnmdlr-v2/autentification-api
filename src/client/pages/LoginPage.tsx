import { TextInput, PasswordInput, Button, Paper, Title, Container, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const form = useForm({ initialValues: { email: '', password: '' } });

  const handleSubmit = async (values: typeof form.values) => {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      navigate('/profile');
    } else {
      alert('Login failed');
    }
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Title ta="center" mb="lg">Login</Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput label="Email" required {...form.getInputProps('email')} />
            <PasswordInput label="Password" required {...form.getInputProps('password')} />
            <Button type="submit" fullWidth>Login</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}