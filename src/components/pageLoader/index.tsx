import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex:1 }}
      open={true}
      //   onClick={handleClose}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}
