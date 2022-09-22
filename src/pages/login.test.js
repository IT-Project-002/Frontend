import {validateEmailInput} from "./login";


describe("Login email format",()=>{
    test("validateEmailInput function should pass on correct input",()=> {
        const text = "text@gmail.com";
        expect(validateEmailInput(text)).toBe(true);
    })

    test("validateEmailInput function should fail when missing @",()=> {
        const text = "textgmailcom";
        expect(validateEmailInput(text)).toBe(false);
    })

    test("validateEmailInput function should fail when missing .",()=> {
        const text = "text@gmailcom";
        expect(validateEmailInput(text)).toBe(false);
    })

    test("validateEmailInput function should fail when missing letters before @",()=> {
        const text = "@gmail.";
        expect(validateEmailInput(text)).toBe(false);
    })

    test("validateEmailInput function should fail when missing letters before .",()=> {
        const text = "text@.com";
        expect(validateEmailInput(text)).toBe(false);
    })

    test("validateEmailInput function should fail when missing letters after .",()=> {
        const text = "text@gmail.";
        expect(validateEmailInput(text)).toBe(false);
    })
});