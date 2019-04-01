# Plotting a chart

## The challenge

The proposed problem is to transform text into **JSON** in structured data.
We call the already structured "***events***" data, which are read by the chart for later plotting. At the end of the process it is expected to obtain a graphic illustration of the reported data.

## Implements application

The construction of the application was based on `"react": "^16.8.5"`, through **create-react-app**. There was no special reason for choosing this version. Some architecture techniques were used to order the state evolution calls of the application. Redux is the key tool of this application.
Alongside :heart:**Redux**, an array of other dependencies were included in the project with the goal of making the application more robust.

#*eslint****airbnb*** :ok_hand:

## Dependencies

`react-simple-code-editor`
 <sub><sup>Text box highlighting **JSON**</sup></sub>

`react-debounce-input`
 <sub><sup>Box and text that delays the delivery of data waiting for the end of typing</sup></sub>


 `react-chartjs-2`
 <sub><sup>Graphic component set :bar_chart: :chart_with_upwards_trend: :pizza:</sup></sub>


 `admin-lte`
 <sub><sup>Template based on bootstrap, used in the layout of the application</sup></sub>

## Workflow

 The application waits for text input in **JSON**. After the text is entered, you can start the process of constructing the graph. The application makes a call to an editor action that structures the text and turns the events into ***dispatches***, which will be forwarded to the reducers. The gearbox connected to the chart waits for these ***dispatches*** to capture event information and evolve state. Finally, the evolution of the state in the reducer reflects on the data that is displayed in the graph. It is done to discard the textual data that corresponds to the event processed at that time.
With each new event processed, the status evolves, and the graph displays more information.
Invalid entries are not processed and will remain in the text box for investigation. The process begins with an **START** event and ends with an **STOP** event. You can enter part of the data at a time and then finalize the processing by entering the rest of the data. This behavior enables us to integrate this application into a real-time monitoring environment where a user or API will provide the data in real time and the graph will plot event after event.

## Events

***START***

    {type: 'start', timestamp: 1519780251293, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser']}

***SPAN***

    {type: 'span', timestamp: 1519780251293, begin: 1519780251293, end: 1519780260201}

***DATA***

    {type: 'data', timestamp: 1519780251000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3}

 ***STOP***

    {type: 'stop', timestamp: 1519780251293}



## Performance

From the data already structured, we have a volume of bytes to consider. This volume will be processed, and in the end we will have more bytes that will be stored and used by the graphical tool. In an attempt to prevent the volume of data from doubling, all text representing an event already processed and plotted on the chart will be discarded. So the volume of data will not be duplicated in the text box and graph, leaving only the already processed events shown in the chart.

## Tests

`jest` `enzyme` `enzyme-adapter-react-16`

These dependencies were used to develop **SnapShot**.
Where the data structure is stored and the application is marked at any given time. The test tends to fail when the test is run and the data structure and markup of the application change relative to the previous snapshot.

## Design

`admin-lte` template is based on bootstrap and is simple to use. I do not have great skills and knowledge in design, but I noticed that the template would fit the requirements well. Thinking about reuse, I chose this template because I already used it in other projects.

