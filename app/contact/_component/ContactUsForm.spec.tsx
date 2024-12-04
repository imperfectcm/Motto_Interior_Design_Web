import ContactUsForm from "./ContactUsForm"
import { sendEmail } from '@/utils/sendEmail';
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { only } from "node:test";

// Mock adminLogin function (return Undefined)
jest.mock("@/utils/sendEmail");

// Make a fake adminLogin function (return Promise)
// const mockSendEmail = jest.fn((data) => {
//     return Promise.resolve("Email sent")
// });

// Apply mockLogin to replace adminLogin function (change return Undefined to return Promise)
(sendEmail as jest.Mock).mockReturnValue("Email sent")

describe("ContactUsForm Test", () => {
    beforeEach(() => {
        render(<ContactUsForm />)
    })

    it("should display required when email is empty", async () => {
        expect((screen.getByRole("option", { name: /title/i }) as HTMLInputElement).value).toBe("Title");

        const lastNameInput = screen.getByLabelText("Last Name");
        expect(lastNameInput).toBeDefined();
        fireEvent.input(lastNameInput, {
            target: {
                value: "Test"
            }
        });
        expect((lastNameInput as HTMLInputElement).value).toBe("Test");

        const phoneInput = screen.getByRole("textbox", { name: /phone/i })
        expect(phoneInput).toBeDefined();
        fireEvent.input(phoneInput, {
            target: {
                value: "12345678"
            }
        });
        expect((phoneInput as HTMLInputElement).value).toBe("12345678");

        const scaleOption = screen.getByRole("option", { name: /scale/i })
        expect(scaleOption).toBeDefined();
        fireEvent.input(scaleOption, {
            target: {
                value: "401 - 700"
            }
        });
        expect((scaleOption as HTMLInputElement).value).toBe("401 - 700");
        // const pwInput = screen.getByLabelText("Password");
        // fireEvent.input(pwInput, {
        //     target: {
        //         value: "password"
        //     }
        // });
        // expect((pwInput as HTMLInputElement).value).toBe("password");

        // const loginBtn = screen.getByRole("button", { name: /Login/i })
        // expect(loginBtn).toBeDefined();
        // act(() => { fireEvent.submit(loginBtn) });

        // expect(await screen.findAllByText("Email required")).toBeDefined();
    });

    // it("should pass when inputs are valid", async () => {
    //     fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
    //         target: {
    //             value: "test@test.com"
    //         }
    //     });
    //     fireEvent.input(screen.getByLabelText("Password"), {
    //         target: {
    //             value: "password"
    //         }
    //     });
    //     fireEvent.submit(screen.getByRole("button", { name: /Login/i }))
    //     await waitFor(() => expect(sendEmail).toHaveBeenCalledTimes(1));
    // });

});