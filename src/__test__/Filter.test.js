import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../components/Filter";
import ShoppingList from "../components/ShoppingList";

const testData = [
  { id: 1, name: "Yogurt", category: "Dairy" },
  { id: 2, name: "Pomegranate", category: "Produce" },
  { id: 3, name: "Lettuce", category: "Produce" },
  { id: 4, name: "String Cheese", category: "Dairy" },
  { id: 5, name: "Swiss Cheese", category: "Dairy" },
  { id: 6, name: "Cookies", category: "Dessert" },
];

// Filter
test("uses a prop of 'search' to display the search term in the input field", () => {
  render(<Filter search="testing" />);

  expect(screen.queryByPlaceholderText(/Search/).value).toBe("testing");
});

test("the input field acts as a controlled input", () => {
  render(<Filter search="testing" />);

  fireEvent.change(screen.queryByPlaceholderText(/Search/), {
    target: { value: "testing 123" },
  });

  expect(screen.queryByPlaceholderText(/Search/).value).toBe("testing 123");
});

test("calls the onSearchChange callback prop when the input is changed", () => {
  const onSearchChange = jest.fn();
  render(<Filter onSearchChange={onSearchChange} />);

  fireEvent.change(screen.queryByPlaceholderText(/Search/), {
    target: { value: "testing" },
  });
  expect(onSearchChange).toHaveBeenCalled();
});

// Shopping List
test("the shopping list displays all items when initially rendered", () => {
  const { container } = render(<ShoppingList items={testData} />);
  expect(container.querySelector(".Items").children).toHaveLength(
    testData.length
  );
});

test("filters the items based on the search term to include full matches", () => {
  const { container } = render(<ShoppingList items={testData} />);

  fireEvent.change(screen.queryByPlaceholderText(/Search/), {
    target: { value: "Yogurt" },
  });

  expect(container.querySelector(".Items").children).toHaveLength(1);

  fireEvent.change(screen.queryByPlaceholderText(/Search/), {
    target: { value: "Lettuce" },
  });

  expect(container.querySelector(".Items").children).toHaveLength(1);
});

test("filters the items based on the search term to include partial matches", () => {
  const { container } = render(<ShoppingList items={testData} />);

  fireEvent.change(screen.queryByPlaceholderText(/Search/), {
    target: { value: "Cheese" },
  });

  expect(container.querySelector(".Items").children).toHaveLength(2);
});
