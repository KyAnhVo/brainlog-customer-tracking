import { Alert, AlertTitle, Box, Card, CardContent, Divider, List, ListItem, Typography } from '@mui/material';
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

export const Route = createFileRoute('/tracking/$trackingId')({
  component: RouteComponent,
})

/**
 * An order's status section comprises of
 * - time (Date): when the status was achieved,
 * - title (string): the title of that status (e.g. customs clearance, arrive at POL, etc.)
 * - warnings (string[]): there could be several warnings needed: shipment falling, 
 *   customs adding money, etc.
 * - location (string?): where that action happens. 
 *   Not all actions require a location (e.g. FINISH, tracking registered, etc.)
 */
interface Status {
  time: Date,
  title: string,
  location?: string,
  warnings: string[],
}

/**
 * This is the details of a shipment. There are:
 * - Bill number
 * - Cont/Seal number
 * - POL (Port of Loading)
 * - POD (Port of Discharge)
 * - Physical details, including pieces count, mass (and potentially dimension)
 */
interface Details {
  billNumber: string,
  contOrSeal?: string,
  pol: string,
  pod: string,
  physicalDetails?: {
    pcs: number,
    mass: number,

  }
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
          let { statuses, details } = body as { statuses: Status[], details: Details };
          setStatuses(
            statuses.map((status) => (
              { ...status, time: new Date(status.time) })));
          setDetails(details);
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
      <Box sx={{ margin: 2 }}>
        {
          err == null ?
            <>
              <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Tracking {trackingId}
              </Typography>
              <Card variant="outlined" sx={{ marginBottom: 3 }}>
                <CardContent>
                  <Typography component="h2" variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Item Details
                  </Typography>
                  {details && (
                    <List dense>
                      <ListItem sx={{ gap: 1 }}>
                        <Typography color="text.secondary" sx={{ minWidth: 160, flexShrink: 0 }}><b>Bill Number:</b></Typography>
                        <Typography>{details.billNumber}</Typography>
                      </ListItem>
                      {details.contOrSeal && (
                        <ListItem sx={{ gap: 1 }}>
                          <Typography color="text.secondary" sx={{ minWidth: 160, flexShrink: 0 }}><b>Cont/Seal Number:</b></Typography>
                          <Typography>{details.contOrSeal}</Typography>
                        </ListItem>
                      )}
                      <ListItem sx={{ gap: 1 }}>
                        <Typography color="text.secondary" sx={{ minWidth: 160, flexShrink: 0 }}><b>Port of Loading:</b></Typography>
                        <Typography>{details.pol}</Typography>
                      </ListItem>
                      <ListItem sx={{ gap: 1 }}>
                        <Typography color="text.secondary" sx={{ minWidth: 160, flexShrink: 0 }}><b>Port of Discharge:</b></Typography>
                        <Typography>{details.pod}</Typography>
                      </ListItem>
                      {details.physicalDetails && (
                        <ListItem sx={{ gap: 1 }}>
                          <Typography color="text.secondary" sx={{ minWidth: 160, flexShrink: 0 }}><b>Physical Details:</b></Typography>
                          <Typography>
                            {details.physicalDetails.pcs} pcs, {details.physicalDetails.mass} kg
                          </Typography>
                        </ListItem>
                      )}
                    </List>
                  )}
                </CardContent>
              </Card>
              <Timeline position="right" sx={{ padding: 0 }}>
                {statuses.map((status, i) => (
                  <TimelineItem key={i} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TimelineOppositeContent
                      color="text.secondary"
                      sx={{ flex: 0.3, textAlign: { xs: 'left', sm: 'right' } }}
                    >
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
                        <Typography key={wi} variant="body2" color="warning.main" sx={{ fontWeight: 600 }}>
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
