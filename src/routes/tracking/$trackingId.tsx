import { Alert, AlertTitle, Box, Divider, Typography } from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import { Warning } from '@mui/icons-material';

export const Route = createFileRoute('/tracking/$trackingId')({
  component: RouteComponent,
})

interface Status {
  time: Date,
  title: string,
  location: string | null,
  warnings: string[],
}

interface Details {
  billNumber: number,
  cont_or_seal: string,
  pol: string,
  pod: string,
}
interface Error {
  errorCode: number,
  errorMsg: string,
}

function RouteComponent() {
  const { trackingId } = Route.useParams();
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [details, setDetails] = useState<Details | null>(null);
  const [err, setErr] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    setErr(null);
    setStatuses([]);

    fetch(`/api/tracking/${trackingId}`)
      .then(async (res) => {
        const body = await res.json();
        if (!active) return;

        if (!res.ok) {
          setErr(body as Error);
        } else {
          setStatuses(
            (body as Status[]).map((status) => (
              { ...status, time: new Date(status.time) })));
        }
      })
      .catch((e: unknown) => {
        if (!active) return;
        setErr({ errorCode: 0, errorMsg: e instanceof Error ? e.message : 'Network error' });
      });

    return () => {
      active = false;
    };
  }, [trackingId]);

  return (
    <>
      <Divider variant="fullWidth" />
      <Box sx={{ margin: "1vh" }}>
        {
          err == null ?
            <>
              <Typography component="h1" sx={{
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                Tracking {trackingId}
              </Typography>
              <Timeline position="right">
                {statuses.map((status, i) => (
                  <TimelineItem key={i}>
                    <TimelineOppositeContent color="text.secondary">
                      {status.time.toLocaleString()}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color={status.warnings.length > 0 ? 'warning' : 'primary'} />
                      {i < statuses.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography>{status.title}</Typography>
                      {status.location && (
                        <Typography variant="body2" color="text.secondary">
                          {status.location}
                        </Typography>
                      )}
                      {status.warnings.map((warning, wi) => (
                        <Typography key={wi} variant="body2" color="warning.main">
                          {warning}
                        </Typography>
                      ))}
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </>
            :
            <Alert severity="error" variant="outlined">
              <AlertTitle>Error {err.errorCode}</AlertTitle>
              {err.errorMsg}
            </Alert>
        }
      </Box>
    </>
  )
}
