## Project idea

This app gives you a Scheduler component which accepts data in JSON format from a server, visualizes the data
in the table, takes the user's table modifications on data and posts data back to the server.

## Scheduler features

The scheduler component visualizes given data from a server and offers users the ability to modify the data by changing Scheduler Table
rows and cells and posts data back to the server.
Local data is saved in the browser's storage to prevent losing data on a refreshing page.

## Working with Scheduler

There are two custom hooks, useHandleJsonPeriods and useCreateRow, that deal with data refactoring.
useHandleJsonPeriods returns two functions getPeriodCells, postPeriodCells
```javascript
const { getPeriodCells, postPeriodCells } = useHandleJsonPeriods();
```

#### To get data

We call getPeriodCells inside useEffect to refactor fetched data into proper Scheduler format.

getPeriodCells accepts two parameters: JSON from the server and rows

```javascript
getPeriodCells(json, rows)
```

useCreateRows hook returns rows at the top of the Scheduler.

#### To post data

We call postPeriodCells inside useEffect to send JSON based on what did user selected.
postPeriodCells accepts one parameter - the local Scheduler state defined at the top of the component.

## Customization

All used table colours of Scheduler are located in tableColors inside the styling folder.
Changing colours inside this will affect changing of colours in the table.

## Displaying

Scheduler must be wrapped in a container with such CSS properties:
```javascript
{
minHeight: "100vh",
display: "flex"
}
```

## To start the project in developer mode, run in terminal

### `npm start`
