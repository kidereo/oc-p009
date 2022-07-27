/**
 * @jest-environment jsdom
 */

import {screen, waitFor} from "@testing-library/dom";
import BillsUI from "../views/BillsUI.js";
import {bills} from "../fixtures/bills.js";
import {ROUTES, ROUTES_PATH} from "../constants/routes";
import {localStorageMock} from "../__mocks__/localStorage.js";
import router from "../app/Router.js";
import Bills from "../containers/Bills";
import userEvent from "@testing-library/user-event";
import mockStore from "../__mocks__/store";

describe("Given I am connected as an employee", () => {
    describe("When I am on Bills Page", () => {
        test("Then bill icon in vertical layout should be highlighted", async () => {
            Object.defineProperty(window, 'localStorage', {value: localStorageMock});
            window.localStorage.setItem('user', JSON.stringify({
                type: 'Employee'
            }));
            const root = document.createElement("div");
            root.setAttribute("id", "root");
            document.body.append(root);
            router();
            window.onNavigate(ROUTES_PATH.Bills);
            await waitFor(() => screen.getByTestId('icon-window'));
            const windowIcon = screen.getByTestId('icon-window');

            /**
             * Ajout de tests unitaires et d'intégration:
             * Si tu regardes le premier test il manque la mention “expect”. Ajoute cette mention pour que le test vérifie bien ce que l’on attend de lui.
             * Solution: [1] Verify that the windowIcon is present and that [2] It has "active-icon" class attached.
             */
            expect(windowIcon).toMatchObject(windowIcon);
            expect(windowIcon.classList.contains("active-icon")).toBe(true);
        });

        test("Then bills should be ordered from earliest to latest", () => {
            document.body.innerHTML = BillsUI({data: bills});
            const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML);
            const antiChrono = (a, b) => ((a < b) ? 1 : -1);
            const datesSorted = [...dates].sort(antiChrono);
            expect(dates).toEqual(datesSorted);
        })
    });

    /**
     * Additional tests to check the Bills functionalities.
     */
    describe("When I am on the Bills page and it's loading", () => {
        test("Then the Loading page should be rendered", () => {
            Object.defineProperty(window, "localStorage", {value: localStorageMock});
            window.localStorage.setItem("user", JSON.stringify({
                type: "Employee"
            }));

            document.body.innerHTML = BillsUI({loading: true});
            expect(screen.getAllByText("Loading...")).toBeTruthy();
        });
    });

    describe("When I am on the Bills page but the back-end sends an error message", () => {
        test("Then the Error page should be rendered", () => {
            Object.defineProperty(window, "localStorage", {value: localStorageMock});
            window.localStorage.setItem("user", JSON.stringify({
                type: "Employee"
            }));

            document.body.innerHTML = BillsUI({error: "An error message"});
            expect(screen.getAllByText("Erreur")).toBeTruthy();
        })
    });

    describe("When I am on the Bills page but there are no bills", () => {
        test("Then the bills table (rows) should be empty", () => {
            Object.defineProperty(window, "localStorage", {value: localStorageMock});
            window.localStorage.setItem("user", JSON.stringify({
                type: "Employee"
            }));

            //Pass an empty bills array to the simulated page.
            document.body.innerHTML = BillsUI({data: []});

            //Expect no <<Justificatif>> (eye) icons to be there.
            const iconEye = screen.queryByTestId("icon-eye");
            expect(iconEye).toBeNull();
        })
    });

    describe("When I am on the Bills page and I click on the <<Nouvelle note de frais>> button", () => {
        test("Then a new <<Envoyer une note de frais>> page should open", () => {
            Object.defineProperty(window, "localStorage", {value: localStorageMock});
            window.localStorage.setItem("user", JSON.stringify({
                type: "Employee"
            }));
            document.body.innerHTML = BillsUI({data: bills});
            const store = null;
            const onNavigate = (pathname) => {
                document.body.innerHTML = ROUTES({pathname})
            };
            const allBills = new Bills({
                document, onNavigate, store, bills, localStorage: window.localStorage
            });

            const handleClickNewBill = jest.fn(allBills.handleClickNewBill);
            const btnNewBill = screen.getByTestId("btn-new-bill");
            btnNewBill.addEventListener("click", handleClickNewBill);

            userEvent.click(btnNewBill);
            expect(screen.getAllByText("Envoyer une note de frais")).toBeTruthy();
        });
    });

    describe("When I am on the Bills page and I click on the <<Justificatif>> (eye) icon", () => {
        test("Then a <<Justificatif>> modal should open", () => {
            Object.defineProperty(window, "localStorage", {value: localStorageMock});
            window.localStorage.setItem("user", JSON.stringify({
                type: "Employee"
            }));
            document.body.innerHTML = BillsUI({data: bills});
            const store = null;
            const onNavigate = (pathname) => {
                document.body.innerHTML = ROUTES({pathname})
            };
            const allBills = new Bills({
                document, onNavigate, store, bills, localStorage: window.localStorage
            });

            //Mock bootstrap functionality in Jest testing or the test will fail.
            $.fn.modal = jest.fn();

            const iconEye = screen.getAllByTestId("icon-eye")[0];
            const handleClickIconEye = jest.fn(() =>
                allBills.handleClickIconEye(iconEye)
            );
            iconEye.addEventListener("click", handleClickIconEye);

            userEvent.click(iconEye);

            expect(handleClickIconEye).toHaveBeenCalled();
            expect(screen.getAllByText("Justificatif")).toBeTruthy();
        });
    });
});

/**
 * GET Integration Test.
 */
describe("Given I am a user connected as Employee", () => {
    describe("When I navigate to <<Mes notes de frais>> page", () => {
        test("Then the system fetches bills from the mock API", async () => {
            // Set up the environment.
            localStorage.setItem("user", JSON.stringify({type: "Employee", email: "employee@test.tld"}));
            const root = document.createElement("div");
            root.setAttribute("id", "root");
            document.body.append(root);

            // Connect and wait for the <<Mes notes de frais>> page to appear.
            router();
            window.onNavigate(ROUTES_PATH.Bills);
            await waitFor(() => screen.getByText("Mes notes de frais"))

            // If all is well expect the Justicatif (eye) icon to appear.
            expect(screen.getAllByTestId("icon-eye")[0]).toBeTruthy();
        });
        describe("When an error occurs on API", () => {
            beforeEach(() => {
                jest.spyOn(mockStore, "bills")
                Object.defineProperty(
                    window,
                    'localStorage',
                    {value: localStorageMock}
                );
                window.localStorage.setItem('user', JSON.stringify({
                    type: 'Employee',
                    email: "employee@test.tld"
                }));
            });

            test("Then the system fetches bills from an API and fails with the 404 error", async () => {
                mockStore.bills.mockImplementationOnce(() => {
                    return {
                        list: () => {
                            return Promise.reject(new Error("Error 404"))
                        }
                    }
                });
                document.body.innerHTML = BillsUI({error: "Error 404"});
                const message = await screen.getByText(/Error 404/);
                expect(message).toBeTruthy();
            });

            test("Then the system fetches messages from an API and fails with the 500 error", async () => {
                mockStore.bills.mockImplementationOnce(() => {
                    return {
                        list: () => {
                            return Promise.reject(new Error("Error 500"))
                        }
                    }
                });
                document.body.innerHTML = BillsUI({error: "Error 500"});
                const message = await screen.getByText(/Error 500/);
                expect(message).toBeTruthy();
            });
        });
    });
});



