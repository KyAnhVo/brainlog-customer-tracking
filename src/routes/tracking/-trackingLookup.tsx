import { Box, Button, TextField, } from '@mui/material';
import React from 'react';

export default function TrackingLookup({
  handleSubmit,
  setTrackingNumber
}: {
  handleSubmit: (e: React.SubmitEvent) => void,
  setTrackingNumber: React.Dispatch<React.SetStateAction<string>>,
}) {

  return (
    <>
      <Box
        component="form" onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          margin: '1vh'
        }}
      >
        <TextField
          required
          id="cargo-tracking-number-field"
          label="Tracking number, e.g. BLJ-XXXX-XXXX"
          onChange={(e) => setTrackingNumber(e.target.value)}
          sx={{
            flexGrow: 1,
            minWidth: '40ch',
          }}
        />
        <Button variant='contained' type='submit' sx={{
          marginLeft: '1vh'
        }}>
          Track your Cargo
        </Button>
      </Box>
    </>
  )
}
