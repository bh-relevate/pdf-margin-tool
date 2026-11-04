import { render, screen, fireEvent, within } from '@testing-library/react';
import { PDFDocument } from 'pdf-lib';
import App from './App';
import { markGuideSeen } from './components/WelcomeGuide';

async function pdfFile() {
  const doc = await PDFDocument.create();
  doc.addPage([600, 800]);
  const bytes = await doc.save();
  const file = new File([bytes], 'sample.pdf', { type: 'application/pdf' });
  file.arrayBuffer = async () => bytes.buffer;
  return file;
}

beforeEach(() => {
  window.localStorage.clear();
});

describe('welcome guide', () => {
  test('shows on the first visit, with the privacy notice', () => {
    render(<App />);
    const dialog = screen.getByRole('dialog', { name: 'Quick guide' });
    expect(within(dialog).getByText('Privacy:').closest('.banner')).toHaveTextContent('Files are never uploaded to any server.');
    expect(dialog).not.toHaveTextContent(/readme/i);
    expect(dialog).toHaveTextContent('Custom pixels at 375px recommended');
  });

  test('stays hidden on the next visit once dismissed', () => {
    const { unmount } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Get started' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    unmount();
    render(<App />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('reopens from Help', () => {
    markGuideSeen();
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Help' }));
    expect(screen.getByRole('dialog', { name: 'Quick guide' })).toBeInTheDocument();
  });

  test('still works if browser storage is blocked', () => {
    const blocked = () => { throw new Error('blocked'); };
    const get = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(blocked);
    const set = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(blocked);
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Get started' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    get.mockRestore();
    set.mockRestore();
  });
});

describe('after the guide', () => {
  beforeEach(() => {
    markGuideSeen();
  });

  test('renders the app shell with processing disabled until a file is chosen', () => {
    render(<App />);
    expect(screen.getByText('PDF Margin Tool')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Add annotation space' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Process PDF' })).toBeDisabled();
    expect(screen.getByText('Select a PDF to begin')).toBeInTheDocument();
  });

  test('defaults to custom pixels at 375px', () => {
    render(<App />);
    expect(screen.getByLabelText('Custom pixels (375px recommended)')).toBeChecked();
    expect(screen.getByLabelText('TPP/SPP Default (30%)')).not.toBeChecked();
    expect(screen.getByLabelText('Margin width')).toHaveValue(375);
  });

  test('shows the version and an orange banner for feedback', () => {
    render(<App />);
    expect(screen.getByText(/PDF Margin Tool v2\.1/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Feedback' }));
    expect(screen.getByText(/send feedback/).closest('.banner')).toHaveClass('banner-warning');
  });

  test('keeps the privacy notice on the page', () => {
    render(<App />);
    expect(screen.getByText('Privacy:').closest('.banner')).toHaveTextContent('Files are never uploaded to any server.');
  });

  test('shows an error banner instead of an alert for a non-PDF file', () => {
    render(<App />);
    const file = new File(['x'], 'notes.txt', { type: 'text/plain' });
    fireEvent.change(screen.getByLabelText('Choose a PDF file'), { target: { files: [file] } });
    expect(screen.getByRole('alert')).toHaveTextContent('"notes.txt" isn\'t a PDF');
  });

  test('flags an invalid margin on the field and in a summary banner', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Choose a PDF file'), { target: { files: [await pdfFile()] } });
    expect(await screen.findByText('sample.pdf')).toBeInTheDocument();
    expect(await screen.findByText(/1 page$/)).toBeInTheDocument();

    // The default value of 375 is out of range for a percentage
    fireEvent.click(screen.getByLabelText('Custom percentage'));
    fireEvent.click(screen.getByRole('button', { name: 'Process PDF' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Check the margin value');
    expect(screen.getByText('Please enter a valid percentage (0-100)')).toBeInTheDocument();
    expect(screen.getByLabelText('Margin percentage')).toHaveAttribute('aria-invalid', 'true');

    // Fixing the value clears both messages
    fireEvent.change(screen.getByLabelText('Margin percentage'), { target: { value: '25' } });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
