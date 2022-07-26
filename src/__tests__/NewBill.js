/**
 * @jest-environment jsdom
 */
import {fireEvent, screen, waitFor} from "@testing-library/dom";
import BillsUI from "../views/BillsUI.js";
import {bills} from "../fixtures/bills.js";
import {ROUTES, ROUTES_PATH} from "../constants/routes";
import {localStorageMock} from "../__mocks__/localStorage.js";
import router from "../app/Router.js";
import Bills from "../containers/Bills";
import userEvent from "@testing-library/user-event";
import mockStore from "../__mocks__/store";
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


describe("Given I am connected as an employee", () => {

    describe("When I am on NewBill Page and I submit the form correctly", () => {
        test("Then I should be returned to the Bills page", () => {
            Object.defineProperty(window, "localStorage", {value: localStorageMock});
            window.localStorage.setItem("user", JSON.stringify({
                type: "Employee"
            }));
            document.body.innerHTML = NewBillUI();
            const store = null;
            const onNavigate = (pathname) => {
                document.body.innerHTML = ROUTES({pathname})
            };
            const newBill = new NewBill({
                document, onNavigate, store, localStorage: window.localStorage
            });

            const handleSubmit = jest.fn(newBill.handleSubmit);

            const formNewBill = screen.getByTestId("form-new-bill");
            formNewBill.addEventListener("submit", handleSubmit);

            fireEvent.submit(formNewBill);

            expect(handleSubmit).toHaveBeenCalled();
            expect(screen.getAllByText("Mes notes de frais")).toBeTruthy();
        });
    });

    describe("When I am on NewBill Page and I submit a correct image file extension", () => {
        test("Then the correct file name should appear in the form", () => {
            Object.defineProperty(window, "localStorage", {value: localStorageMock});
            window.localStorage.setItem("user", JSON.stringify({
                type: "Employee"
            }));
            document.body.innerHTML = NewBillUI();
            const store = null;
            const onNavigate = (pathname) => {
                document.body.innerHTML = ROUTES({pathname})
            };
            const newBill = new NewBill({
                document, onNavigate, store, localStorage: window.localStorage
            });

            const handleChangeFile = jest.fn(newBill.handleChangeFile);
            const fileInput = screen.getByTestId("file");
            fileInput.addEventListener("change", handleChangeFile);

            fireEvent.change(fileInput, {
                target: {
                    files: [
                        new File(["receipt.jpg"], "receipt.jpg", {
                            type: "image/jpg",
                        }),
                    ],
                },
            });

            expect(handleChangeFile).toHaveBeenCalled();
            expect(screen.getByText('Envoyer une note de frais')).toBeTruthy();
            expect(fileInput.files[0].name).toBe('receipt.jpg');
        })
    });

});
