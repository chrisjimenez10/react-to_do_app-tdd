import {render, screen, fireEvent} from "@testing-library/react"
import Counter from "./Counter"


test(`Counter should have correct initial value when set to 5`, ()=>{
    //We can pass props to the Component when we render it herein the test()
        //Useful to ensure that data can be rendered and displayed correclty
    render(<Counter initialValue={5}/>)
    const count = screen.getByText(5);
    expect(count).toBeInTheDocument();
});

test(`Counter should have default initial value of 0`, ()=>{
    render(<Counter />)
    const count = screen.getByText(0);
    expect(count).toBeInTheDocument();
});

test(`Counter should increase the value correctly when add button is clicked once`, ()=>{
    //Each test is like an independent and isolated environment where whatever data we send as props is SOLELY for this iteration of the test --> In other words, the initial value here is set to 2 and even though it is set to 5 in the first test, when THIS test runs it renders THIS Component with the prop it is sent HERE
    render(<Counter initialValue={2}/>)
    const button = screen.getByText("+")
    //Here we are telling the est to perform a click event on the button we captured/queried by text ("+")
    fireEvent.click(button)
    //Here we are querying the NEW text that SHOULD increase in numerical value that resulted from clicking on an ADD button --> Therefore, if initial value was 2 it should be 2 + 1 = 3
    const count = screen.getByText(3)
    expect(count).toBeVisible();
});

test(`Counter should increase the value correctly when add button is clicked twice`, ()=>{
    render(<Counter initialValue={2}/>)
    const addbutton = screen.getByText("+")
    //If we want to perform multiple fireEvents() we can do so by writing it again in another line of code - NOTE: It's like a sequence of events that we are coding, which act as instructions that the test() will execute in order
    fireEvent.click(addbutton)
    fireEvent.click(addbutton)
    const count = screen.getByText(4)
    expect(count).toBeVisible();
});

test(`Counter should decrease the value correclty when remove button is clicked once`, ()=>{
    render(<Counter initialValue={10}/>)
    const removebutton = screen.getByText("-")
    fireEvent.click(removebutton)
    const count = screen.getByText(9)
    expect(count).toBeInTheDocument();
});

test(`Counter should decrease the value correclty when remove button is clicked twice`, ()=>{
    render(<Counter initialValue={10}/>)
    const removebutton = screen.getByText("-")
    fireEvent.click(removebutton)
    fireEvent.click(removebutton)
    const count = screen.getByText(8)
    expect(count).toBeInTheDocument();
});

test(`Counter should NOT go into the negative number range when initial value is 0 and remove button is clicked 4 times`, ()=>{
    render(<Counter initialValue={0}/>)
    const removebutton = screen.getByText("-")
    fireEvent.click(removebutton)
    fireEvent.click(removebutton)
    fireEvent.click(removebutton)
    fireEvent.click(removebutton)
    const count = screen.getByText(0)
    expect(count).toBeInTheDocument();
});

