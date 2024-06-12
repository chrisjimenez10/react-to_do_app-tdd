import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
// import Form from "./Form";

//NOTE: We can use the "jest.mock()" method to ASSING a "data-testid" attribute to a Component and capture it via that Test Id --> This is the syntax
  // Using the "jest.mock()" method: It is a powerful tool for creating mock functions and modules. This is essential for isolating the component or function being tested from its dependencies, ensuring that tests are reliable, maintainable, and efficient --> 1.Isolation: To test a component or function without invoking its dependencies, 2.Control: To control the behavior of dependencies and simulate different scenarios, 3.Performance: To speed up tests by avoiding expensive operations like network requests
// jest.mock("./Form", ()=> ()=> <div data-testid="form-component"/>)

//Unit Tests
test('Heading is present in component', () => {
    const app = render(<App />);
    const heading = app.getByTestId("title")
    expect(heading).toBeInTheDocument();
});

test(`Heading displays: Welcome to the To-do App`, () => {
    const app = render(<App />);
    const heading = app.getByText("Welcome to the To-Do App")
    expect(heading).toHaveTextContent("Welcome to the To-Do App");
});

test(`Form exists`, () => {
  const app = render(<App />)
  //We can add the attribute: "data-testid" and assign a value directly to the HTML element and use that to capture it to run a test with an expected result
  const form = app.getByTestId("form")
  expect(form).toBeInTheDocument();

});

test(`Two labels exist inside the form`, () => {
    const app = render(<App />);
    //Here, we use the query "getAllByRole()" to capture mulitple elements (which will return an array) and we can use that to run a test to check the length of the array
    const textboxes = app.getAllByRole("textbox")
    expect(textboxes.length).toBe(2);
});

test(`Task Label and Description Label exist`, () => {
    const app = render(<App />);
    //Here, we use the query "getByLabelText()" and include the text inside that label to capture each <label> element and store it in a variable --> Then we run the test to check if they exist in the document
    const taskLabel = app.getByLabelText("Task:")
    const descriptionLabel = app.getByLabelText("Description:")
    expect(taskLabel).toBeInTheDocument();
    expect(descriptionLabel).toBeInTheDocument();
});

test(`Task input and Description input exist`, () => {
    const app = render(<App />);
    const taskInput = app.getByTestId("task-input")
    const descInput = app.getByTestId("desc-input")
    expect(taskInput).toBeInTheDocument();
    expect(descInput).toBeInTheDocument();
});

test(`Form submission button is clickable`, ()=>{
    const app = render(<App />);
    const button = app.getByText("+");
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
});

test(`Input fields change value on user input`, ()=>{
    const app = render(<App />);
    //We can CAPTURE the input element by the text of its label - so we can use the query "getByLabelText()" and pass the TEXT inside the <label> element
    const taskInput = app.getByLabelText("Task:")
    const descInput = app.getByLabelText("Description:")

    //Here, we can use the change() method on "fireEvent" to SIMULATE an event --> In other words, with the change() method we can simluate a user TYPING inside the input fields of our application --> We use the event object's "target.value" property to SIMULATE a specific value to be typed inside the input field
      //The syntax and format is:  fireEvent.change(element, {target: {value: "Any value to be inserted that we want"}})
    fireEvent.change(taskInput, {target: {value: "New Task"}})
    fireEvent.change(descInput, {target: {value: "New Description"}})
    
    //Here, we access the value property of the input element (which is the actual text that is being typed inside of it) and we use the test query "toBe()" and see if it is equal to the text we set it to during the change() method --> Lines 69-70
    expect(taskInput.value).toBe("New Task")
    expect(descInput.value).toBe("New Description")
});

test(`Form submission is successful`, ()=>{
    const app = render(<App />);
    const button = app.getByText("+");
    //Simulating a "click" event on the button
    fireEvent.click(button);
    //Using state and conditional rendering as testing logic
    const stateMessage = app.getByText("Form submitted successfully");
    //Our logic here is that after clicking the submission button we have our component set up to conditionally render the message "Form submitted successfully" by updating state via form submission handling logic (we can do this through a handleSubmission function) --> If this is true, then our test will result as expected because the message WILL INDEED be rendered in the Document
    expect(stateMessage).toBeInTheDocument();
});

test(`Tasks are put into state array after form submission`, ()=>{
    const app = render(<App />);
    const button = app.getByText("+");
    const taskInput = app.getByLabelText("Task:")
    const descInput = app.getByLabelText("Description:")
    //Here, we begin the simulation after capturing all the necessary elements for the action of "form submission" to occur
    fireEvent.change(taskInput, {target: {value: "New Task"}})
    fireEvent.change(descInput, {target: {value: "New Description"}})
    fireEvent.click(button);

    //Here, we will be targeting the elements that will hold the rendered input we generated through the fireEvent.click(button) --> We will be setting a "data-testid" attribute to both elements and checking if their TEXT CONTENT is what we set the inputs to be through the fireEvent.change() method
    const taskName = app.getByTestId("taskName");
    const descName = app.getByTestId("descName");
    expect(taskName).toHaveTextContent("New Task");
    expect(descName).toHaveTextContent("New Description");
})




