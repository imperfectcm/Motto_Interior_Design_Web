import LoginForm from "./LoginForm";
import { adminLogin } from "@/controllers/admin";
import { useRouter } from "next/navigation";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

// Mock adminLogin function (return Undefined)
jest.mock("@/controllers/admin");

// Mock useRouter function (return Undefined)
jest.mock("next/navigation");

// Make a fake adminLogin function (return Promise)
const mockLogin = jest.fn((email, password, router) => {
    return Promise.resolve("Logged in")
});

// Apply mockLogin to replace adminLogin function (change return Undefined to return Promise)
(adminLogin as jest.Mock).mockImplementation(mockLogin);

// Apply mock useRouter to replace useRouter function (change return Undefined to return object)
(useRouter as jest.Mock).mockReturnValue("{ push: jest.fn() }");

describe("LoginForm Test", () => {
    beforeEach(() => {
        render(<LoginForm />)
    })

    it("should display required when email is empty", async () => {
        const emailInput = screen.getByRole("textbox", { name: /email/i });
        fireEvent.input(emailInput, {
            target: {
                value: ""
            }
        });
        expect((emailInput as HTMLInputElement).value).toBe("");

        const pwInput = screen.getByLabelText("Password");
        fireEvent.input(pwInput, {
            target: {
                value: "password"
            }
        });
        expect((pwInput as HTMLInputElement).value).toBe("password");

        const loginBtn = screen.getByRole("button", { name: /Login/i })
        expect(loginBtn).toBeDefined();
        act(() => { fireEvent.submit(loginBtn) });

        expect(await screen.findAllByText("Email required")).toBeDefined();
    });

    it("should display required when password is empty", async () => {
        const emailInput = screen.getByRole("textbox", { name: /email/i });
        fireEvent.input(emailInput, {
            target: {
                value: "test@test.com"
            }
        });
        expect((emailInput as HTMLInputElement).value).toBe("test@test.com");

        const pwInput = screen.getByLabelText("Password");
        fireEvent.input(pwInput, {
            target: {
                value: ""
            }
        });

        const loginBtn = screen.getByRole("button", { name: /Login/i })
        expect(loginBtn).toBeDefined();
        act(() => loginBtn.click());
        // fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByText("Password required")).toBeDefined();
    });

    it("should pass when inputs are valid", async () => {
        const router = useRouter();
        // console.log(adminLogin("abc","abc",router))
        fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
            target: {
                value: "test@test.com"
            }
        });
        fireEvent.input(screen.getByLabelText("Password"), {
            target: {
                value: "password"
            }
        });
        fireEvent.submit(screen.getByRole("button", { name: /Login/i }))
        await waitFor(() => expect(adminLogin).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(adminLogin).toHaveBeenCalledWith("test@test.com", "password", router));
    });

});