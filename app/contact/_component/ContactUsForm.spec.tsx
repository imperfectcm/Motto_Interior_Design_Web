import ContactUsForm from "./ContactUsForm"
import { sendEmail } from '@/utils/sendEmail';
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { only } from "node:test";

// Mock adminLogin function (return Undefined)
jest.mock("@/utils/sendEmail");

// Apply mockLogin to replace adminLogin function (change return Undefined to return Promise)
(sendEmail as jest.Mock).mockReturnValue("Email sent")

describe("ContactUsForm Test", () => {
    beforeEach(() => {
        render(<ContactUsForm />)
    })

    it("should not pass when last name is empty", async () => {
        expect((screen.getByRole("option", { name: /title/i }) as HTMLInputElement).value).toBe("Title");

        const lastNameInput = screen.getByLabelText("Last Name");
        expect(lastNameInput).toBeDefined();
        fireEvent.input(lastNameInput, {
            target: {
                value: ""
            }
        });
        expect((lastNameInput as HTMLInputElement).value).toBe("");

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

        const submitBtn = screen.getByRole("button", { name: /Submit/i })
        expect(submitBtn).toBeDefined();
        act(() => { fireEvent.submit(submitBtn) });

        await waitFor(() => expect(sendEmail).not.toHaveBeenCalled());
    });

    it("should not pass when phone is empty", async () => {
        expect((screen.getByRole("option", { name: /title/i }) as HTMLInputElement).value).toBe("Title");

        const lastNameInput = screen.getByLabelText("Last Name");
        fireEvent.input(lastNameInput, {
            target: {
                value: "Test"
            }
        });
        expect((lastNameInput as HTMLInputElement).value).toBe("Test");

        const phoneInput = screen.getByRole("textbox", { name: /phone/i })
        fireEvent.input(phoneInput, {
            target: {
                value: ""
            }
        });
        expect((phoneInput as HTMLInputElement).value).toBe("");

        const scaleOption = screen.getByRole("option", { name: /scale/i })
        fireEvent.input(scaleOption, {
            target: {
                value: "401 - 700"
            }
        });
        expect((scaleOption as HTMLInputElement).value).toBe("401 - 700");

        const submitBtn = screen.getByRole("button", { name: /Submit/i })
        act(() => { fireEvent.submit(submitBtn) });

        await waitFor(() => expect(sendEmail).not.toHaveBeenCalled());
    });

    it("should not pass when unit scale is empty", async () => {
        expect((screen.getByRole("option", { name: /title/i }) as HTMLInputElement).value).toBe("Title");

        const lastNameInput = screen.getByLabelText("Last Name");
        fireEvent.input(lastNameInput, {
            target: {
                value: "Test"
            }
        });
        expect((lastNameInput as HTMLInputElement).value).toBe("Test");

        const phoneInput = screen.getByRole("textbox", { name: /phone/i })
        fireEvent.input(phoneInput, {
            target: {
                value: "12345678"
            }
        });
        expect((phoneInput as HTMLInputElement).value).toBe("12345678");

        const scaleOption = screen.getByRole("option", { name: /scale/i })
        fireEvent.input(scaleOption, {
            target: {
                value: ""
            }
        });
        expect((scaleOption as HTMLInputElement).value).toBe("");

        const submitBtn = screen.getByRole("button", { name: /Submit/i })
        act(() => { fireEvent.submit(submitBtn) });

        await waitFor(() => expect(sendEmail).not.toHaveBeenCalled());
    });

    it("should pass when inputs are valid", async () => {
        fireEvent.input(screen.getByLabelText("Last Name"), {
            target: {
                value: "Test"
            }
        });
        expect((screen.getByLabelText("Last Name") as HTMLInputElement).value).toBe("Test");

        fireEvent.input(screen.getByRole("textbox", { name: /phone/i }), {
            target: {
                value: "12345678"
            }
        });
        expect((screen.getByRole("textbox", { name: /phone/i }) as HTMLInputElement).value).toBe("12345678");

        fireEvent.input(screen.getByRole("option", { name: /scale/i }), {
            target: {
                value: "401 - 700"
            }
        });
        expect((screen.getByRole("option", { name: /scale/i }) as HTMLInputElement).value).toBe("401 - 700");

        fireEvent.submit(screen.getByRole("button", { name: /Submit/i }))
        await waitFor(() => expect(sendEmail).toHaveBeenCalledTimes(1));
    });

});