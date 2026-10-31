# Shape requirements

## Tracking Metadata

Each tracking is associated with its properties:
- Number
- (Optional) Cont / Seal
- POL
- POD
- (Optional) Physical Details
  - (Optional) pieces count
  - (Optional) weight (kg)
  - (Optional) dimensions (meter)

## Additional information, Admin panel

To show a tracking in the admin panel, we also the following:
- Tracking creator
- Tracking creation time
- Tracking latest status
- (Optional) Name/email/phone/id of customer. Or a hyperlink to /customer/$customerId.
## Good status

Each good status must contain the following data:
- Status
- Occurring time
- Location
- Warnings
- Creation time (time the status is inputted into the system)
- Name of creator of status

## Bad status

A bad status is when bad things happen to a cargo. It could be that the cargo fell of a ship, customs do not approve of the item, etc.

Each bad (error) status must contain the following data:
- Message (Status)
- Occurring time
- Location
- Creation time
- Name of creator of status
