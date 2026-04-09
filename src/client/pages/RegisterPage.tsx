import { TextInput, PasswordInput, Button, Paper, Title, Container, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Invalid email'),
      password: (v) => (v.length < 6 ? 'Min 6 characters' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const res = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (res.ok) navigate('/login');
    else alert('Registration failed');
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Title ta="center" mb="lg">Register</Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput label="Email" required {...form.getInputProps('email')} />
            <PasswordInput label="Password" required {...form.getInputProps('password')} />
            <Button type="submit" fullWidth>Sign Up</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}