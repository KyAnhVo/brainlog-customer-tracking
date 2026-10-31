type TrackingOverview = {
  trackingNumber: string,
  fromLocation: string,
  toLocation: string,
  trackingCreationTime: Date,
  trackingLatestStatus: string,
  trackingCreator: string,
}

const POSSIBLE_STATUSES = [
  'Ex-work', 'Customs clearance at POL', 'Arrived at POL', 'Left POL',
  'Arrived at POT', 'Left POL', 'Arrived at POD', 'Left POD',
  'Customs clearance at POD', 'Inland trucking to Place of Delivery',
  'Arrived at Place of Delivery', 'Finished'
]

type StatusEvent = {
  status: string,
  occurringTime: Date,
  location: string,
  warnings: string[],
  creationTime: Date,
  statusCreator: string,
}

type StatusErrorEvent = {
  errorMsg: string,
}

export { type TrackingOverview, type StatusEvent, POSSIBLE_STATUSES }
