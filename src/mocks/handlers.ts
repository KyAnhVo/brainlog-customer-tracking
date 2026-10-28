import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/tracking/BLJ-good-code', () => {
    return HttpResponse.json({
      details: {
        billNumber: 'goodcode',
        contOrSeal: 'abcd1234',
        pol: 'SomeRandomPort of Houston',
        pod: 'SomeRandomPort of Vietnam'
      },
      statuses: [
        {
          time: '2026-10-15T09:11:00Z',
          title: 'Package resigered',
          warnings: [],
        },
        {
          time: '2026-10-20T09:15:00Z',
          title: 'Package picked up',
          location: 'Hanoi, VN',
          warnings: [],
        },
        {
          time: '2026-10-21T14:30:00Z',
          title: 'Departed origin facility',
          location: 'Hanoi, VN',
          warnings: [],
        },
        {
          time: '2026-10-23T08:00:00Z',
          title: 'Arrived at destination hub',
          location: 'Ho Chi Minh City, VN',
          warnings: ['Delayed by customs inspection'],
        },
        {
          time: '2026-10-24T11:45:00Z',
          title: 'Out for delivery',
          location: 'Ho Chi Minh City, VN',
          warnings: [],
        },
      ]
    })
  }),

  http.get('/api/tracking/BLJ-badd-code', () => {
    return HttpResponse.json(
      { errorCode: 404, errorMsg: 'No shipment found for this tracking code' },
      { status: 404 },
    )
  }),
]
