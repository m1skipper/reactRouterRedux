import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogContent from '@mui/joy/DialogContent';

type onCloseFunction = () => void;

interface MessageBoxProps {
  open: boolean,
  onClose: onCloseFunction,
  message: string
}

export default function LoginFailedModalDlg(props: MessageBoxProps) 
{
  const open = props.open;
  const onCloseDlg = props.onClose;
  const msg = props.message;

  return (
      <Modal open={open} onClose={() => onCloseDlg()}>
        <ModalDialog>
          <DialogContent>{msg}
          </DialogContent>
          <Button type="submit" sx={{ mx:"auto", width:"100px" }} onClick={() => onCloseDlg()}>OK</Button>
        </ModalDialog>
      </Modal>
  );
}
