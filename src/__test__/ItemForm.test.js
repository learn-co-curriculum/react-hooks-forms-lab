import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemForm from "../components/ItemForm";
import App from "../components/App";

// test("the name input is a controlled input", () => {
//   render(<ItemForm />);

//   const nameInput = screen.queryByLabelText(/Name/);

//   expect(nameInput.value).toBe("");

//   fireEvent.change(nameInput, {
//     target: { value: "Ice Cream" },
//   });

//   expect(nameInput.value).toBe("Ice Cream");
// });

// test("the category input is a controlled input", () => {
//   render(<ItemForm />);

//   const categoryInput = screen.queryByLabelText(/Category/);

//   expect(categoryInput.value).toBe("Produce");

//   fireEvent.change(categoryInput, {
//     target: { value: "Dairy" },
//   });

//   expect(categoryInput.value).toBe("Dairy");
// });

test("calls the onItemFormSubmit callback prop when the form is submitted", () => {
  const onItemFormSubmit = jest.fn();
  render(<ItemForm onItemFormSubmit={onItemFormSubmit} />);

  fireEvent.change(screen.queryByLabelText(/Name/), {
    target: { value: "Ice Cream" },
  });

  fireEvent.change(screen.queryByLabelText(/Category/), {
    target: { value: "Dessert" },
  });

  fireEvent.submit(screen.queryByText(/Add to List/));

  expect(onItemFormSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      id: expect.any(String),
      name: "Ice Cream",
      category: "Dessert",
    })
  );
});

test("adds a new item to the list when the form is submitted", () => {
  render(<App />);

  const dessertCount = screen.queryAllByText(/Dessert/).length;

  fireEvent.change(screen.queryByLabelText(/Name/), {
    target: { value: "Ice Cream" },
  });

  fireEvent.change(screen.queryByLabelText(/Category/), {
    target: { value: "Dessert" },
  });

  fireEvent.submit(screen.queryByText(/Add to List/));

  expect(screen.queryByText(/Ice Cream/)).toBeInTheDocument();

  expect(screen.queryAllByText(/Dessert/).length).toBe(dessertCount + 1);
});
