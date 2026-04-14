import { Button, Paper, Title, Text, Group, Container, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Container size="xs" style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper shadow="xl" p="xl" withBorder radius="md" style={{ width: '100%' }}>
        <Stack align="center" gap="sm">
          <Title order={1}>Welcome</Title>
          <Text c="dimmed" size="sm" ta="center">
            Please register or login to continue to your dashboard.
          </Text>
        </Stack>

        <Group grow mt="xl">
          <Button variant="filled" color="blue" size="md" onClick={() => navigate('/register')}>
            Register
          </Button>
          <Button variant="outline" color="blue" size="md" onClick={() => navigate('/login')}>
            Login
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}