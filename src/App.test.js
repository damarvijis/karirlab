import { render, screen } from '@testing-library/react';
import App from './App';

test('render judul aplikasi => Reddit Clone', () => {
  render(<App />);
  let applicationName = screen.getByText(/Reddit Clone/i)
  expect(applicationName).toBeInTheDocument();
})

test('render halaman aplikasi => Daftar Post', () => {
  render(<App />);
  let judulHalaman = screen.getByText(/Daftar Post/i)
  expect(judulHalaman).toBeInTheDocument();
})